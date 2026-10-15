
import { useState } from "react";
import { Link } from "react-router-dom";

const occasionMessages = {
  Birthday: {
    emoji: "🎂",
    title: "Birthday wishes",
    messages: [
      "Happy Birthday! 🎂 May your day be filled with laughter, beautiful memories, and all the little things that make you smile. You deserve so much happiness today and always.",
      "Another year, another reason to celebrate the amazing person you are! ✨ Keep smiling, keep shining, and keep making life beautiful.",
    ],
  },
  Love: {
    emoji: "💗",
    title: "Love messages",
    messages: [
      "You make ordinary moments feel extraordinary. Thank you for being you and bringing so much warmth into my life. You mean more to me than words can say. 💗",
      "If I could choose one person to share all my little moments with, I would choose you every single time. You make my world brighter. ❤️",
    ],
  },
  Anniversary: {
    emoji: "💍",
    title: "Anniversary wishes",
    messages: [
      "Every memory with you is a little treasure. Here's to everything we've shared, everything we've learned, and all the beautiful moments still waiting for us. ❤️",
      "Our story is my favourite story. May every new chapter bring us more laughter, understanding, and reasons to fall in love all over again.",
    ],
  },
  Friends: {
    emoji: "🫶",
    title: "Friendship messages",
    messages: [
      "Life feels brighter with a friend like you. Thank you for the laughs, the support, and all the memories. I'm lucky to have you in my corner. 🫶",
      "Some people become friends, and some become family. Thank you for being the kind of person who makes even an ordinary day special.",
    ],
  },
  Festivals: {
    emoji: "🪔",
    title: "Festive greetings",
    messages: [
      "Wishing you and your loved ones a beautiful celebration filled with happiness, warmth, peace, and countless reasons to smile. ✨",
      "May this festive season bring fresh beginnings, wonderful memories, and happiness that stays with you throughout the year. 🌷",
    ],
  },
  "Just Because": {
    emoji: "🌷",
    title: "Just because",
    messages: [
      "Just a little reminder that you're appreciated more than you know. I hope something wonderful happens to you today. You deserve kindness, happiness, and a reason to smile. 🌷",
      "No special occasion, no big reason. I just wanted you to know that you matter, you're appreciated, and I'm glad you're in my life.",
    ],
  },
  Wedding: {
    emoji: "💐",
    title: "Wedding wishes",
    messages: [
      "Wishing you both a lifetime of love, laughter, friendship, and beautiful memories. May every new chapter bring you closer and make your journey together even more special. 💐",
      "May your marriage be filled with kindness, endless support, shared dreams, and little moments that remind you why you chose each other.",
    ],
  },
  Achievements: {
    emoji: "🏆",
    title: "Congratulations",
    messages: [
      "You worked for this, believed in yourself, and kept going. I'm so proud of everything you've accomplished. Celebrate this moment—you've earned it! 🏆",
      "This achievement is proof of your dedication and determination. Keep believing in yourself because this is just the beginning of amazing things.",
    ],
  },
  "Long Distance": {
    emoji: "🌍",
    title: "Long-distance messages",
    messages: [
      "Miles may separate us, but they can't change how much you mean to me. Until we're together again, know that you're in my thoughts and always close to my heart. 🌍",
      "Distance can keep us apart for a while, but it cannot erase our memories or the connection we share. Counting down to the next time I see you. ❤️",
    ],
  },
};

const tones = [
  "Heartfelt",
  "Romantic",
  "Funny",
  "Cute",
  "Emotional",
  "Simple",
];

function AIWishes() {
  const [occasion, setOccasion] = useState("Birthday");
  const [recipient, setRecipient] = useState("");
  const [relationship, setRelationship] = useState("Friend");
  const [tone, setTone] = useState("Heartfelt");
  const [details, setDetails] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generateSuggestion = () => {
    if (!recipient.trim()) {
      setError("Please enter the recipient's name or nickname.");
      setSuggestion("");
      return;
    }

    const data = occasionMessages[occasion];
    const message =
      data.messages[Math.floor(Math.random() * data.messages.length)];

    const toneIntro = {
      Heartfelt: "A message from the heart 💗",
      Romantic: "A little love, just for you ❤️",
      Funny: "A little laugh for your special person 😄",
      Cute: "Sending a little extra sweetness 🌷",
      Emotional: "Some feelings deserve to be shared 💌",
      Simple: "A simple message, with lots of meaning ✨",
    };

    const personalizedMessage =
      `${toneIntro[tone]}\n\nDear ${recipient.trim()},\n\n${message}` +
      (details.trim() ? `\n\n${details.trim()}` : "") +
      `\n\nWith love,\nSomeone who cares`;

    setSuggestion(personalizedMessage);
    setError("");
    setCopied(false);
  };

  const copySuggestion = async () => {
    try {
      await navigator.clipboard.writeText(suggestion);
      setCopied(true);
    } catch {
      setError(
        "Unable to copy automatically. Please select and copy the message manually."
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#30252b]">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
        <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-rose-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-violet-100/70 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-medium text-rose-600">
            ✨ A little help from Unfold
          </span>

          <h1 className="mt-6 font-serif text-4xl font-bold leading-tight sm:text-6xl">
            The right words,
            <span className="block text-rose-500">from the heart.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
            Birthday wishes, romantic notes, heartfelt thank-yous, or a little
            message just because. Find the words for someone special.
          </p>

          <a
            href="#wish-builder"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-7 py-3.5 font-semibold text-white shadow-md shadow-rose-200 transition hover:-translate-y-0.5 hover:from-rose-600 hover:to-pink-600 hover:shadow-lg"
          >
            Create a Wish <span>✦</span>
          </a>
        </div>
      </section>

      {/* Builder */}
      <section id="wish-builder" className="scroll-mt-28 px-4 pb-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-rose-100 bg-white p-5 shadow-sm sm:p-8">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-500">
                Your wish, your way
              </span>

              <h2 className="mt-3 font-serif text-3xl font-bold">
                Let's make it personal.
              </h2>

              <p className="mt-2 text-sm leading-6 text-stone-600">
                Share a few details to get a message idea you can personalize.
              </p>
            </div>

            <div className="mt-7">
              <label
                htmlFor="wish-occasion"
                className="mb-2 block text-sm font-semibold"
              >
                What's the occasion?
              </label>

              <select
                id="wish-occasion"
                value={occasion}
                onChange={(event) => {
                  setOccasion(event.target.value);
                  setSuggestion("");
                }}
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-50"
              >
                {Object.keys(occasionMessages).map((item) => (
                  <option key={item} value={item}>
                    {occasionMessages[item].emoji} {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5">
              <label
                htmlFor="wish-recipient"
                className="mb-2 block text-sm font-semibold"
              >
                Who is this for?
              </label>

              <input
                id="wish-recipient"
                type="text"
                value={recipient}
                onChange={(event) => {
                  setRecipient(event.target.value);
                  setError("");
                }}
                placeholder="Their name or nickname"
                maxLength={60}
                className="w-full rounded-xl border border-stone-200 px-4 py-3 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-50"
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="wish-relationship"
                className="mb-2 block text-sm font-semibold"
              >
                Your relationship
              </label>

              <select
                id="wish-relationship"
                value={relationship}
                onChange={(event) => setRelationship(event.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-50"
              >
                {[
                  "Friend",
                  "Best Friend",
                  "Partner",
                  "Husband",
                  "Wife",
                  "Boyfriend",
                  "Girlfriend",
                  "Mother",
                  "Father",
                  "Sibling",
                  "Colleague",
                  "Other",
                ].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6">
              <label className="mb-3 block text-sm font-semibold">
                Choose a tone
              </label>

              <div className="flex flex-wrap gap-2">
                {tones.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setTone(item);
                      setSuggestion("");
                    }}
                    aria-pressed={tone === item}
                    className={`rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                      tone === item
                        ? "border-rose-300 bg-rose-50 text-rose-600 ring-2 ring-rose-100"
                        : "border-stone-200 bg-white text-stone-600 hover:border-rose-200 hover:bg-rose-50/50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="wish-details"
                className="mb-2 block text-sm font-semibold"
              >
                Add a personal detail (optional)
              </label>

              <textarea
                id="wish-details"
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                placeholder="A favourite memory, an inside joke, or something you appreciate about them..."
                rows={4}
                maxLength={500}
                className="w-full resize-y rounded-xl border border-stone-200 px-4 py-3 leading-6 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-50"
              />

              <p className="mt-1 text-right text-xs text-stone-400">
                {details.length}/500
              </p>
            </div>

            {error && (
              <p
                role="alert"
                className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700"
              >
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={generateSuggestion}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-4 font-semibold text-white shadow-md shadow-rose-200 transition hover:-translate-y-0.5 hover:from-rose-600 hover:to-pink-600 hover:shadow-lg"
            >
              ✨ Suggest a Message
            </button>

            <p className="mt-3 text-center text-xs leading-5 text-stone-500">
              These are sample-based suggestions, not live AI-generated text.
            </p>
          </div>

          {/* Message result */}
          <aside className="lg:sticky lg:top-28">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-500">
                A little preview
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold">
                Your message idea
              </h2>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-rose-100 bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50 p-5 shadow-lg shadow-rose-100/60 sm:p-8">
              <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full border border-white/80" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full border border-white/80" />

              <div className="relative rounded-2xl border border-white/80 bg-white/80 p-5 text-center backdrop-blur-sm sm:p-7">
                <div className="text-5xl">
                  {occasionMessages[occasion].emoji}
                </div>

                <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-rose-500">
                  {occasionMessages[occasion].title}
                </p>

                <h3 className="mt-3 font-serif text-2xl font-bold">
                  For {recipient.trim() || "someone special"}
                </h3>

                <p className="mt-2 text-sm text-stone-500">
                  {relationship} · {tone}
                </p>

                <div className="mx-auto my-5 h-px w-16 bg-rose-200" />

                {suggestion ? (
                  <p className="whitespace-pre-wrap break-words text-left text-sm leading-7 text-stone-700">
                    {suggestion}
                  </p>
                ) : (
                  <p className="text-sm leading-7 text-stone-500">
                    Your message idea will appear here. Choose an occasion,
                    add a name, and click “Suggest a Message”.
                  </p>
                )}

                <div className="mt-6 text-xl">💗 ✨ 🌷</div>
              </div>
            </div>

            {suggestion && (
              <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <p className="font-semibold text-emerald-800">
                  Your message idea is ready!
                </p>

                <p className="mt-1 text-sm leading-6 text-emerald-700">
                  Personalize it further or copy it to use in your greeting.
                </p>

                <button
                  type="button"
                  onClick={copySuggestion}
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  {copied ? "Copied ✓" : "Copy Message"}
                </button>
              </div>
            )}

            <div className="mt-5 rounded-2xl border border-rose-100 bg-white p-5">
              <p className="font-semibold">Ready to create a greeting?</p>

              <p className="mt-2 text-sm leading-6 text-stone-600">
                Use your message in a personalized Unfold surprise.
              </p>

              <Link
                to="/create"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-5 py-3 text-sm font-semibold text-rose-600 transition hover:border-rose-300 hover:bg-rose-100"
              >
                Create Surprise <span>✦</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default AIWishes;