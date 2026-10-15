import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { API_BASE_URL, UPI_ID, PRICE_INR } from "./api";
import { downloadGreetingPNG } from "./downloadGreeting";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  // Safely restore greeting from location.state or sessionStorage
  const [greeting] = useState(() => {
    const fromState = location.state?.greeting;
    if (fromState && (fromState.recipient || fromState.message)) {
      try {
        sessionStorage.setItem(
          "unfold_saved_greeting",
          JSON.stringify(fromState)
        );
      } catch (err) {
        console.warn("Could not save greeting to sessionStorage", err);
      }
      return fromState;
    }

    try {
      const saved = sessionStorage.getItem("unfold_saved_greeting");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.warn("Could not read greeting from sessionStorage", err);
    }
    return fromState || {};
  });

  const {
    occasion = "Personalized Greeting",
    recipient = "",
    sender = "",
    message = "",
    photo = "",
    decoration = {},
    category = "",
  } = greeting;

  const originalPrice = 39;
  const discount = 20;
  const finalPrice = PRICE_INR; // ₹19

  // Payment State
  const [loading, setLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [copiedUPI, setCopiedUPI] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [upiIntentUri, setUpiIntentUri] = useState("");

  // Load Razorpay checkout script dynamically
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Copy UPI ID to clipboard
  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopiedUPI(true);
      setTimeout(() => setCopiedUPI(false), 2500);
    } catch (err) {
      console.warn("Clipboard copy failed", err);
    }
  };

  // Process payment flow
  const handlePayment = async () => {
    setErrorMessage("");
    setLoading(true);

    try {
      // Step 1: Create Order on Backend
      const response = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          greeting: {
            occasion,
            recipient: recipient || "Someone Special",
            sender: sender || "You",
            message: message || "Heartfelt wishes",
            photo,
            decoration,
            category,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create order: ${response.statusText}`);
      }

      const orderData = await response.json();

      if (!orderData.success) {
        throw new Error(orderData.message || "Failed to initialize payment.");
      }

      const { orderId, keyId, upiIntentUri: intentUri, mode } = orderData;
      if (intentUri) setUpiIntentUri(intentUri);

      // Step 2: Handle Razorpay Gateway or Direct UPI
      if (mode === "razorpay" && keyId && window.Razorpay) {
        const options = {
          key: keyId,
          amount: 1900, // 1900 paise = ₹19
          currency: "INR",
          name: "Unfold",
          description: `Personalized Greeting for ${recipient || "Someone Special"}`,
          order_id: orderId,
          prefill: {
            name: sender || "Customer",
            contact: "",
            email: "",
          },
          theme: {
            color: "#f43f5e",
          },
          config: {
            display: {
              blocks: {
                upi_only: {
                  name: "Pay using UPI",
                  instruments: [{ method: "upi" }],
                },
              },
              sequence: ["block.upi_only"],
              preferences: {
                show_default_blocks: false,
              },
            },
          },
          handler: async (paymentResponse) => {
            await verifyBackendPayment({
              orderId: paymentResponse.razorpay_order_id || orderId,
              paymentId: paymentResponse.razorpay_payment_id,
              signature: paymentResponse.razorpay_signature,
            });
          },
          modal: {
            ondismiss: () => {
              setLoading(false);
            },
          },
        };

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.on("payment.failed", (failedRes) => {
          setErrorMessage(
            failedRes.error?.description || "Payment failed. Please try again."
          );
          setLoading(false);
        });
        razorpayInstance.open();
      } else {
        // Direct UPI Mode: If user is on mobile, launch UPI app or verify confirmation
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile && intentUri) {
          window.location.href = intentUri;
        }

        // Verify order on backend
        await verifyBackendPayment({
          orderId,
          paymentId: `pay_upi_${Date.now()}`,
          signature: "",
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      setErrorMessage(
        error.message ||
          "Unable to complete payment. Please check your connection and try again."
      );
      setLoading(false);
    }
  };

  // Step 3: Verify payment on backend
  const verifyBackendPayment = async ({ orderId, paymentId, signature }) => {
    try {
      const verifyRes = await fetch(`${API_BASE_URL}/api/payment/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          paymentId,
          signature,
          greeting: {
            occasion,
            recipient,
            sender,
            message,
            photo,
            decoration,
            category,
          },
        }),
      });

      const verifyData = await verifyRes.json();

      if (verifyData.success && verifyData.verified) {
        setIsPaid(true);
        setPaymentDetails({
          orderId: verifyData.orderId,
          paymentId: verifyData.paymentId,
        });
      } else {
        throw new Error(verifyData.message || "Payment verification failed.");
      }
    } catch (err) {
      setErrorMessage(
        err.message || "Payment verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 4: Handle high-quality PNG download
  const handleDownload = async () => {
    if (!isPaid) {
      alert("Please complete payment to unlock your greeting download.");
      return;
    }

    setDownloading(true);
    setDownloadSuccess(false);

    try {
      await downloadGreetingPNG(greeting);
      setDownloadSuccess(true);
    } catch (error) {
      console.error("Download failed:", error);
      alert(
        "Could not generate download image. Please try again or take a screenshot."
      );
    } finally {
      setDownloading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="inline-flex rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700">
            {isPaid ? "🎉 Surprise Unlocked" : "💌 Your surprise is ready"}
          </span>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {isPaid ? "Your Greeting Is Ready!" : "Make Their Day Special"}
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
            {isPaid
              ? "Payment verified successfully. Download your high-quality personalized greeting below."
              : "Your personalized greeting is ready. Complete payment with UPI to unlock your download."}
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid items-start gap-6 lg:grid-cols-2">
          {/* Left: Greeting and Price */}
          <section className="overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-5 text-white">
              <p className="text-sm font-medium text-rose-50">
                YOUR PERSONALIZED SURPRISE
              </p>

              <h2 className="mt-1 text-2xl font-bold">{occasion}</h2>

              <p className="mt-2 text-sm text-rose-50">
                Made especially for {recipient || "someone special"}
              </p>
            </div>

            <div className="p-6">
              {/* Greeting Preview */}
              <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-4">
                <div className="flex items-start gap-4">
                  {photo ? (
                    <img
                      src={photo}
                      alt="Greeting preview"
                      className="h-24 w-24 shrink-0 rounded-xl object-cover shadow-sm"
                    />
                  ) : (
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-white text-4xl shadow-sm">
                      {decoration?.emoji || "💌"}
                    </div>
                  )}

                  <div className="min-w-0">
                    <h3 className="break-words text-lg font-bold text-gray-900">
                      For {recipient || "Someone Special"}
                    </h3>

                    {category && (
                      <p className="mt-1 text-sm font-medium text-rose-600">
                        {category}
                      </p>
                    )}

                    <p className="mt-1 text-sm text-gray-500">
                      From {sender || "You"}
                    </p>
                  </div>
                </div>

                {message && (
                  <div className="mt-4 rounded-xl bg-white p-4 shadow-sm">
                    <p className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-700">
                      {message}
                    </p>
                  </div>
                )}
              </div>

              {/* Pricing */}
              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-900">
                  Price Details
                </h3>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Greeting price</span>
                    <span className="text-gray-500 line-through">
                      ₹{originalPrice}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-semibold text-green-600">
                      -₹{discount}
                    </span>
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">
                        Total payable
                      </span>
                      <span className="text-3xl font-extrabold text-rose-600">
                        ₹{finalPrice}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-start gap-3 rounded-xl bg-gray-50 p-4">
                  <span className="text-xl">🔒</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      100% Secure UPI Payment
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Proceeds go directly to {UPI_ID}. Payment verified by
                      backend before greeting unlock.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Right: Payment / Download Section */}
          <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            {!isPaid ? (
              <>
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900">
                    Complete Your Payment
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Pay ₹{finalPrice} using UPI to download your personalized
                    surprise.
                  </p>
                </div>

                {errorMessage && (
                  <div className="mt-4 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-600">
                    ⚠️ {errorMessage}
                  </div>
                )}

                {/* UPI-Only Payment Method Card */}
                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border-2 border-rose-400 bg-rose-50/60 p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                          📱
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-900">
                              UPI Payment
                            </h3>
                            <span className="rounded-full bg-rose-200 px-2.5 py-0.5 text-xs font-bold text-rose-800">
                              Recommended
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">
                            GPay, PhonePe, Paytm, BHIM & UPI apps
                          </p>
                        </div>
                      </div>
                      <span className="text-lg font-extrabold text-rose-600">
                        ₹{finalPrice}
                      </span>
                    </div>

                    {/* Merchant UPI ID Box */}
                    <div className="mt-4 rounded-xl border border-rose-200 bg-white p-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">
                            UPI ID
                          </span>
                          <span className="font-mono text-sm font-bold text-gray-800 sm:text-base">
                            {UPI_ID}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyUPI}
                          className="shrink-0 rounded-lg bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-200"
                        >
                          {copiedUPI ? "Copied ✓" : "Copy UPI"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary Action Button: Pay ₹19 with UPI */}
                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={loading}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-5 py-4 text-base font-bold text-white shadow-md shadow-rose-200 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60"
                >
                  {loading ? (
                    <span>Processing UPI Payment...</span>
                  ) : (
                    <>
                      <span>Pay ₹{finalPrice} with UPI</span>
                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                  Instant UPI payment · Fast backend verification
                </p>

                {upiIntentUri && (
                  <a
                    href={upiIntentUri}
                    className="mt-2 block text-center text-xs font-semibold text-rose-600 hover:underline"
                  >
                    📱 Tap here to open directly in Google Pay, PhonePe, or Paytm
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="mt-4 w-full rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  ← Back to Greeting
                </button>
              </>
            ) : (
              /* Success & Download State */
              <div className="text-center py-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
                  ✓
                </div>

                <h2 className="mt-4 text-2xl font-extrabold text-gray-900">
                  Payment Successful!
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Your payment of ₹{finalPrice} was verified. Your greeting is ready
                  to download!
                </p>

                {paymentDetails && (
                  <div className="mt-4 rounded-xl bg-gray-50 p-3 text-xs text-gray-500">
                    <span>Order: {paymentDetails.orderId}</span>
                    <span className="mx-2">·</span>
                    <span>Paid via UPI</span>
                  </div>
                )}

                {/* Prominent Download Greeting Button */}
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-200 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60"
                >
                  <span>📥</span>
                  <span>{downloading ? "Generating High-Res PNG..." : "Download Greeting"}</span>
                </button>

                {downloadSuccess && (
                  <p className="mt-3 text-xs font-semibold text-emerald-600">
                    ✓ Greeting PNG downloaded successfully!
                  </p>
                )}

                {/* Mobile Gallery Helper Note */}
                <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-left">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">💡</span>
                    <div>
                      <p className="text-xs font-bold text-emerald-900">
                        Saving to Phone Photo Gallery
                      </p>
                      <p className="mt-1 text-xs leading-5 text-emerald-800">
                        On mobile (Android & iPhone): Tap <strong>Download Greeting</strong>.
                        When your browser displays the downloaded image, tap <strong>Save Image</strong> or check your device Downloads folder to save it directly into your photo gallery.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    to="/"
                    className="w-full rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    Return to Home
                  </Link>
                  <Link
                    to="/create"
                    className="text-xs font-semibold text-rose-600 hover:underline"
                  >
                    + Create another surprise
                  </Link>
                </div>
              </div>
            )}

            <div className="mt-6 border-t border-gray-100 pt-5">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <span>🔐</span>
                <span>Verified UPI Gateway Integration · 256-bit SSL</span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-6 text-gray-400">
          Your greeting details are safely preserved in this session. Once your
          payment is completed, your high-resolution PNG is generated directly on
          your device.
        </p>
      </div>
    </main>
  );
}

export default Payment;
