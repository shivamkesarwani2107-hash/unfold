
import { useState } from "react";
import { Link } from "react-router-dom";

function Help() {
  const [openFaq, setOpenFaq] = useState(0);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      question: "What is Unfold?",
      answer:
        "Unfold helps you create personalized digital greetings and surprises for the people who matter to you. Choose an occasion, customize the design, add your message, and preview your creation.",
    },
    {
      question: "How do I create a surprise?",
      answer:
        "Choose an occasion such as Birthday, Love, Anniversary, or Wedding. Select a message style, enter the recipient and sender details, customize decorations, and add a photo or personal message.",
    },
    {
      question: "Can I write my own message?",
      answer:
        "Yes! You can write a completely personal message. You can also use the suggested message ideas as inspiration and customize the final text.",
    },
    {
      question: "How does AI Wishes work?",
      answer:
        "AI Wishes is intended to help you create personalized messages based on your occasion, relationship, and preferred tone. Live AI-generated suggestions require an AI service to be connected to the application.",
    },
    {
      question: "Can I upload a personal photo?",
      answer:
        "Where the creation page offers photo upload, you can select a photo from your device to personalize your greeting preview.",
    },
    {
      question: "Can I save or share my greeting?",
      answer:
        "Saving and sharing depend on the features currently connected to the application. A preview alone does not automatically save your greeting to a database or create a shareable link.",
    },
  ];

  const handleChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Frontend-only form: no email or database integration yet.
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#30252b]">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
        <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-rose-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-amber-100/70 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-medium text-rose-600">
            <span>💗</span> We're here to help
          </span>

          <h1 className="mt-6 font-serif text-4xl font-bold leading-tight sm:text-6xl">
            Need a little
            <span className="text-rose-500"> help?</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
            Creating something meaningful should feel easy. Find answers,
            learn how Unfold works, and get help with your surprise.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#faqs"
              className="rounded-full bg-rose-500 px-6 py-3 font-semibold text-white transition hover:bg-rose-600"
            >
              Explore FAQs ↓
            </a>

            <Link
              to="/"
              className="rounded-full border border-rose-200 bg-white px-6 py-3 font-semibold text-stone-700 transition hover:bg-rose-50"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Help Cards */}
      <section className="px-4 pb-14 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          <a
            href="#how-to-create"
            className="group rounded-3xl border border-rose-100 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-100/60"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-2xl">
              🎁
            </div>
            <h2 className="mt-5 text-lg font-bold">Creating a Surprise</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Learn how to personalize a greeting for someone special.
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-rose-600 group-hover:underline">
              Learn how →
            </span>
          </a>

          <a
            href="#faqs"
            className="group rounded-3xl border border-amber-100 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-100/60"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-2xl">
              💡
            </div>
            <h2 className="mt-5 text-lg font-bold">FAQs</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Get quick answers about messages, photos, and AI Wishes.
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-amber-700 group-hover:underline">
              Find answers →
            </span>
          </a>

          <a
            href="#contact"
            className="group rounded-3xl border border-violet-100 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-100/60"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-2xl">
              💌
            </div>
            <h2 className="mt-5 text-lg font-bold">Contact Us</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Tell us what you need help with.
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-violet-600 group-hover:underline">
              Get in touch →
            </span>
          </a>
        </div>
      </section>

      {/* How to Create */}
      <section
        id="how-to-create"
        className="scroll-mt-28 bg-white px-4 py-16 sm:px-6"
      >
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">
              Simple and personal
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
              Create your surprise in 3 steps
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-stone-600">
              A few little details can turn an ordinary greeting into
              something memorable.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                number: "01",
                emoji: "🫶",
                title: "Tell us about them",
                description:
                  "Choose your relationship and add the recipient's and sender's names.",
              },
              {
                number: "02",
                emoji: "🎨",
                title: "Choose your style",
                description:
                  "Select an occasion, message category, colors, and matching decorations.",
              },
              {
                number: "03",
                emoji: "💌",
                title: "Make it personal",
                description:
                  "Add a photo if available, write your message, and preview your greeting.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-stone-100 bg-[#fffaf7] p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold tracking-widest text-rose-400">
                    STEP {step.number}
                  </span>
                  <span className="text-3xl">{step.emoji}</span>
                </div>

                <h3 className="mt-5 text-lg font-bold">{step.title}</h3>

                <p className="mt-2 text-sm leading-6 text-stone-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-9 text-center">
            <Link
              to="/"
              className="inline-flex rounded-full bg-rose-500 px-7 py-3 font-semibold text-white transition hover:bg-rose-600"
            >
              Start Creating ✨
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section
        id="faqs"
        className="scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">
              Got questions?
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
              Frequently asked questions
            </h2>

            <p className="mt-4 text-stone-600">
              Everything you need to know about creating with Unfold.
            </p>
          </div>

          <div className="mt-9 space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-rose-100 bg-white"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenFaq(openFaq === index ? -1 : index)
                  }
                  aria-expanded={openFaq === index}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                >
                  <span className="font-semibold text-stone-800">
                    {faq.question}
                  </span>

                  <span className="shrink-0 text-xl text-rose-500">
                    {openFaq === index ? "−" : "+"}
                  </span>
                </button>

                {openFaq === index && (
                  <div className="px-5 pb-5">
                    <p className="text-sm leading-7 text-stone-600">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="scroll-mt-28 bg-white px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">
              We're listening
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
              Still need help?
            </h2>

            <p className="mt-4 max-w-lg leading-7 text-stone-600">
              Tell us what you're trying to do or what went wrong. We'd love
              to make your Unfold experience better.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-xl">
                  💗
                </span>
                <div>
                  <h3 className="font-semibold">Made with care</h3>
                  <p className="mt-1 text-sm leading-6 text-stone-600">
                    Every greeting is an opportunity to make someone feel
                    special.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-xl">
                  ✨
                </span>
                <div>
                  <h3 className="font-semibold">Your feedback matters</h3>
                  <p className="mt-1 text-sm leading-6 text-stone-600">
                    Share your questions and suggestions with us.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-rose-100 bg-[#fffaf7] p-6 sm:p-8">
            {submitted ? (
              <div className="py-8 text-center">
                <div className="text-5xl">💌</div>

                <h3 className="mt-5 text-2xl font-bold">
                  Thanks for reaching out!
                </h3>

                <p className="mt-3 leading-7 text-stone-600">
                  Your message is visible in this demo session, but it has not
                  been sent to a support team yet.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setContact({ name: "", email: "", message: "" });
                    setSubmitted(false);
                  }}
                  className="mt-6 rounded-full bg-rose-500 px-6 py-3 font-semibold text-white hover:bg-rose-600"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold">Send us a message</h3>

                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Fill in the details below.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div>
                    <label
                      htmlFor="help-name"
                      className="mb-2 block text-sm font-medium text-stone-700"
                    >
                      Your name
                    </label>

                    <input
                      id="help-name"
                      type="text"
                      name="name"
                      value={contact.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      autoComplete="name"
                      required
                      className="w-full rounded-xl border border-rose-100 bg-white px-4 py-3 outline-none transition placeholder:text-stone-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="help-email"
                      className="mb-2 block text-sm font-medium text-stone-700"
                    >
                      Email address
                    </label>

                    <input
                      id="help-email"
                      type="email"
                      name="email"
                      value={contact.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="w-full rounded-xl border border-rose-100 bg-white px-4 py-3 outline-none transition placeholder:text-stone-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="help-message"
                      className="mb-2 block text-sm font-medium text-stone-700"
                    >
                      How can we help?
                    </label>

                    <textarea
                      id="help-message"
                      name="message"
                      value={contact.message}
                      onChange={handleChange}
                      placeholder="Tell us what's on your mind..."
                      rows={5}
                      required
                      className="w-full resize-y rounded-xl border border-rose-100 bg-white px-4 py-3 outline-none transition placeholder:text-stone-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-rose-500 px-6 py-3.5 font-semibold text-white transition hover:bg-rose-600"
                  >
                    Submit Message 💌
                  </button>

                  <p className="text-xs leading-5 text-stone-500">
                    Demo form only. Connect a backend or email service to
                    actually deliver support messages.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 py-14 text-center sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="text-3xl">🌷</div>

          <h2 className="mt-4 font-serif text-3xl font-bold">
            Ready to make someone smile?
          </h2>

          <p className="mt-3 text-stone-600">
            A little thought can become a beautiful memory.
          </p>

          <Link
            to="/"
            className="mt-7 inline-flex rounded-full bg-rose-500 px-7 py-3 font-semibold text-white transition hover:bg-rose-600"
          >
            Explore Unfold ✨
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Help;
