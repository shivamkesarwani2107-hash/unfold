
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL, UPI_ID, PRICE_INR } from "./api";
import {
  downloadGreetingPNG,
  downloadGreetingPDF,
} from "./downloadGreeting";

const ORDER_ID_KEY = "unfold_manual_order_id";
const ACCESS_TOKEN_KEY = "unfold_manual_order_access_token";
const GREETING_KEY = "unfold_saved_greeting";
const ORDER_GREETING_KEY = "unfold_manual_order_greeting";

function readSessionJSON(key, fallback = {}) {
  try {
    return JSON.parse(sessionStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function sameGreeting(first, second) {
  if (!first || !second) return false;

  return (
    first.occasion === second.occasion &&
    first.recipient === second.recipient &&
    first.sender === second.sender &&
    first.message === second.message &&
    first.photo === second.photo &&
    first.category === second.category &&
    JSON.stringify(first.decoration || {}) ===
      JSON.stringify(second.decoration || {})
  );
}

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const [greeting] = useState(() => {
    const fromState = location.state?.greeting;

    if (fromState && (fromState.recipient || fromState.message)) {
      try {
        sessionStorage.setItem(GREETING_KEY, JSON.stringify(fromState));
      } catch (error) {
        console.error("Could not save greeting:", error);
      }

      return fromState;
    }

    return readSessionJSON(GREETING_KEY, {});
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

  const [orderId, setOrderId] = useState(
    () => sessionStorage.getItem(ORDER_ID_KEY) || ""
  );

  const [status, setStatus] = useState("not_started");
  const [screenshot, setScreenshot] = useState(null);
  const [transactionRef, setTransactionRef] = useState("");
  const [copiedUPI, setCopiedUPI] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isApproved = status === "approved";

  // Poll the backend so admin approval appears automatically.
  useEffect(() => {
    if (!orderId) {
      setStatus("not_started");
      return undefined;
    }

    let active = true;

    const checkStatus = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/manual-payment/orders/${encodeURIComponent(
            orderId
          )}/status`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Could not check order status.");
        }

        if (active) {
          setStatus(data.status);
          setErrorMessage("");
        }
      } catch (error) {
        if (active) {
          setErrorMessage(error.message || "Could not check order status.");
        }
      }
    };

    checkStatus();
    const timer = setInterval(checkStatus, 8000);

    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [orderId]);

  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopiedUPI(true);
      setTimeout(() => setCopiedUPI(false), 2000);
    } catch {
      setErrorMessage(`Please copy this UPI ID manually: ${UPI_ID}`);
    }
  };

  // Create an order and save its private access token in the same browser session.
  const createOrder = async () => {
    const savedOrderId = sessionStorage.getItem(ORDER_ID_KEY) || "";
    const savedToken = sessionStorage.getItem(ACCESS_TOKEN_KEY) || "";
    const savedOrderGreeting = readSessionJSON(ORDER_GREETING_KEY, null);

    // Reuse an existing order only when its token and greeting match.
    if (
      savedOrderId &&
      savedToken &&
      sameGreeting(savedOrderGreeting, greeting)
    ) {
      if (savedOrderId !== orderId) {
        setOrderId(savedOrderId);
      }
      return savedOrderId;
    }

    // Never silently create another paid order when an old token is missing.
    if (savedOrderId && !savedToken && sameGreeting(savedOrderGreeting, greeting)) {
      throw new Error(
        "This order has no saved access token. Do not pay again. Contact support to recover access to this existing order."
      );
    }

    if (!recipient.trim() || !message.trim()) {
      throw new Error("Greeting details are missing. Please go back.");
    }

    const response = await fetch(
      `${API_BASE_URL}/api/manual-payment/orders`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success || !data.orderId || !data.accessToken) {
      throw new Error(
        data.message || "Could not create order or receive access token."
      );
    }

    // Save all order access details together.
    sessionStorage.setItem(ORDER_ID_KEY, data.orderId);
    sessionStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    sessionStorage.setItem(ORDER_GREETING_KEY, JSON.stringify(greeting));

    setOrderId(data.orderId);
    setStatus("pending");
    setErrorMessage("");

    return data.orderId;
  };

  const handleScreenshotUpload = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!screenshot) {
      setErrorMessage("Please select your payment screenshot.");
      return;
    }

    setLoading(true);

    try {
      const id = await createOrder();
      const formData = new FormData();

      formData.append("screenshot", screenshot);
      formData.append("transactionRef", transactionRef);

      const response = await fetch(
        `${API_BASE_URL}/api/manual-payment/orders/${encodeURIComponent(
          id
        )}/screenshot`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Screenshot upload failed.");
      }

      setStatus(data.status || "pending");
      setScreenshot(null);
      setErrorMessage("");

      alert(
        "Screenshot submitted. Your greeting will unlock after admin verifies the payment."
      );
    } catch (error) {
      setErrorMessage(error.message || "Could not upload screenshot.");
    } finally {
      setLoading(false);
    }
  };

  // The backend returns the greeting only for an approved order with a valid token.
  const getApprovedGreeting = async () => {
    const token = sessionStorage.getItem(ACCESS_TOKEN_KEY) || "";

    if (!orderId || !token) {
      throw new Error(
        "Order access token is missing. Do not make another payment; contact support for this existing order."
      );
    }

    const response = await fetch(
      `${API_BASE_URL}/api/manual-payment/orders/${encodeURIComponent(
        orderId
      )}/greeting`,
      {
        method: "GET",
        headers: {
          "X-Order-Access-Token": token,
        },
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success || !data.greeting) {
      throw new Error(
        data.message || "Could not retrieve the approved greeting."
      );
    }

    return data.greeting;
  };

  const handleDownload = async (format = "png") => {
    if (!isApproved) {
      setErrorMessage("Your greeting is locked until admin approval.");
      return;
    }

    setDownloading(true);
    setDownloadSuccess(false);
    setErrorMessage("");

    try {
      const approvedGreeting = await getApprovedGreeting();

      if (format === "pdf") {
        await downloadGreetingPDF(approvedGreeting);
      } else {
        // The PNG helper also offers the mobile share/save option when supported.
        await downloadGreetingPNG(approvedGreeting);
      }

      setDownloadSuccess(true);
    } catch (error) {
      setErrorMessage(error.message || "Could not prepare your greeting.");
    } finally {
      setDownloading(false);
    }
  };

  if (!recipient || !message) {
    return (
      <main className="min-h-screen p-8 text-center">
        <h1 className="text-2xl font-bold">Greeting details not found</h1>
        <p className="my-4">
          Please return and create your greeting again.
        </p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-xl bg-rose-500 px-5 py-3 text-white"
        >
          Back to Greeting
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <span className="rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700">
            {isApproved ? "🎉 Surprise Unlocked" : "💌 Your surprise is ready"}
          </span>

          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {isApproved ? "Your Greeting Is Ready!" : "Complete Your Payment"}
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600">
            Pay ₹{PRICE_INR} using UPI, upload your payment screenshot, and
            wait for manual verification.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-2">
          <section className="overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-5 text-white">
              <p className="text-sm">YOUR PERSONALIZED SURPRISE</p>
              <h2 className="mt-1 text-2xl font-bold">{occasion}</h2>
              <p className="mt-2 text-sm">Made especially for {recipient}</p>
            </div>

            <div className="p-6">
              <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-4">
                <div className="flex items-start gap-4">
                  {photo ? (
                    <img
                      src={photo}
                      alt="Greeting"
                      className="h-24 w-24 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-white text-4xl">
                      {decoration?.emoji || "💌"}
                    </div>
                  )}

                  <div className="min-w-0">
                    <h3 className="font-bold">For {recipient}</h3>
                    {category && (
                      <p className="mt-1 text-sm text-rose-600">{category}</p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">
                      From {sender || "You"}
                    </p>
                  </div>
                </div>

                <p className="mt-4 whitespace-pre-wrap break-words rounded-xl bg-white p-4 text-sm leading-7 text-gray-700">
                  {message}
                </p>
              </div>

              <h3 className="mt-6 font-bold">Price Details</h3>

              <div className="mt-3 flex justify-between text-sm">
                <span>Greeting price</span>
                <span className="text-gray-500 line-through">₹39</span>
              </div>

              <div className="mt-2 flex justify-between text-sm">
                <span>Discount</span>
                <span className="text-green-600">-₹20</span>
              </div>

              <div className="mt-4 flex justify-between border-t pt-4 font-bold">
                <span>Total payable</span>
                <span className="text-2xl text-rose-600">₹{PRICE_INR}</span>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            {isApproved ? (
              <div className="py-5 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
                  ✓
                </div>

                <h2 className="mt-4 text-2xl font-extrabold">
                  Payment Approved!
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                  Your greeting download is now unlocked.
                </p>

                <div className="mt-7 space-y-3">
                  <button
                    type="button"
                    onClick={() => handleDownload("png")}
                    disabled={downloading}
                    className="w-full rounded-xl bg-emerald-600 px-5 py-4 font-bold text-white disabled:opacity-60"
                  >
                    {downloading ? "Preparing greeting..." : "🖼️ Download Greeting Image"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownload("pdf")}
                    disabled={downloading}
                    className="w-full rounded-xl bg-indigo-600 px-5 py-4 font-bold text-white disabled:opacity-60"
                  >
                    📄 Download Greeting PDF
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownload("share")}
                    disabled={downloading}
                    className="w-full rounded-xl border border-emerald-200 px-5 py-4 font-bold text-emerald-700 disabled:opacity-60"
                  >
                    📲 Share / Save Greeting Image
                  </button>
                </div>

                {downloadSuccess && (
                  <p className="mt-3 text-sm text-emerald-700">
                    Your greeting is ready. Check your downloads or share menu.
                  </p>
                )}

                <Link to="/" className="mt-5 block rounded-xl border p-3">
                  Return to Home
                </Link>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-extrabold text-gray-900">
                  Pay ₹{PRICE_INR} with UPI
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Pay the exact amount using your UPI app.
                </p>

                <div className="mt-5 rounded-2xl border-2 border-rose-400 bg-rose-50/60 p-5">
                  <p className="text-xs text-gray-500">YOUR UPI ID</p>

                  <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
                    <span className="break-all font-mono font-bold">{UPI_ID}</span>

                    <button
                      type="button"
                      onClick={handleCopyUPI}
                      className="rounded-lg bg-rose-100 px-3 py-2 text-sm font-bold text-rose-700"
                    >
                      {copiedUPI ? "Copied ✓" : "Copy UPI"}
                    </button>
                  </div>

                  <p className="mt-3 font-bold">Amount: ₹{PRICE_INR}</p>

                  {orderId && (
                    <p className="mt-2 break-all text-xs text-gray-500">
                      Order ID: {orderId}
                    </p>
                  )}
                </div>

                <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900">
                  Pay first and then upload your screenshot. A screenshot alone
                  does not confirm payment. Your greeting unlocks only after
                  admin verification.
                </p>

                <form onSubmit={handleScreenshotUpload} className="mt-5 space-y-4">
                  <label className="block text-sm font-semibold">
                    Payment screenshot (JPG, PNG or WEBP; max 3 MB)
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(event) =>
                        setScreenshot(event.target.files?.[0] || null)
                      }
                      className="mt-2 block w-full rounded-lg border p-3 text-sm"
                      required
                    />
                  </label>

                  <label className="block text-sm font-semibold">
                    UTR / Transaction reference (optional)
                    <input
                      value={transactionRef}
                      onChange={(event) => setTransactionRef(event.target.value)}
                      maxLength={100}
                      placeholder="Enter UTR if available"
                      className="mt-2 w-full rounded-lg border p-3 font-normal"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-5 py-4 font-bold text-white disabled:opacity-60"
                  >
                    {loading
                      ? "Uploading screenshot..."
                      : `I've paid ₹${PRICE_INR} — Upload Screenshot`}
                  </button>
                </form>

                <div className="mt-5 rounded-xl bg-gray-50 p-4">
                  <p className="font-bold">
                    {status === "pending"
                      ? "⏳ Awaiting admin review"
                      : status === "rejected"
                      ? "❌ Payment request rejected"
                      : "🔒 Download locked"}
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {status === "pending"
                      ? "This page checks for approval automatically every few seconds."
                      : status === "rejected"
                      ? "Please check your transaction and contact support."
                      : "Upload your screenshot to submit the payment request."}
                  </p>
                </div>
              </>
            )}

            {errorMessage && (
              <p className="mt-4 break-words rounded-xl bg-red-50 p-3 text-sm text-red-700">
                ⚠️ {errorMessage}
              </p>
            )}

            {!isApproved && (
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="mt-5 w-full rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600"
              >
                ← Back to Greeting
              </button>
            )}

            <div className="mt-6 border-t pt-5 text-center text-xs text-gray-500">
              Manual UPI payment review · ₹{PRICE_INR}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Payment;
