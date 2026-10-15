import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ideas = [
  { emoji: "🎂", title: "Birthday Wishes", text: "A heartfelt message for their special day." },
  { emoji: "🎉", title: "Funny & Cute", text: "Make them smile with a playful wish." },
  { emoji: "💌", title: "From the Heart", text: "Tell them how much they mean to you." },
  { emoji: "🌸", title: "Birthday Surprise", text: "Create a little memory they can keep." },
  { emoji: "🥹", title: "Emotional Wish", text: "Share feelings that are hard to express." },
  { emoji: "👑", title: "Best Person Ever", text: "Make them feel truly appreciated." },
  { emoji: "🎁", title: "Birthday Gift Note", text: "Add a sweet message to their gift." },
  { emoji: "✨", title: "Make a Memory", text: "Create a moment to remember." },
];

const decorations = [
  { emoji: "🎂", title: "Chocolate Cake" },
  { emoji: "🍓", title: "Strawberry Cake" },
  { emoji: "🍰", title: "Vanilla Cake" },
  { emoji: "🎈", title: "Balloons & Confetti" },
  { emoji: "🌸", title: "Flowers & Petals" },
  { emoji: "🕯️", title: "Candle Glow" },
];

const suggestions = [
  "Happy birthday to someone who makes life brighter just by being in it. I hope this year brings you endless reasons to smile. 💗",
  "Another year of you being wonderfully you. Keep shining, laughing and making beautiful memories. 🎂",
  "You deserve all the love and happiness in the world today and every day. Happy birthday! ✨",
];

function Birthday() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [relationship, setRelationship] = useState("Friend");
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [age, setAge] = useState("");
  const [selectedIdea, setSelectedIdea] = useState(0);
  const [selectedDecoration, setSelectedDecoration] = useState(0);
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState("");
  const [preview, setPreview] = useState(false);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [photoLoading, setPhotoLoading] = useState(false);

  const theme = {
    page: "bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50",
    accent: "text-rose-600",
    button: "bg-rose-500 hover:bg-rose-600",
    selected: "border-rose-400 bg-rose-50 ring-2 ring-rose-100",
  };

  function nextStep() {
    if (step === 1 && !recipient.trim()) {
      alert("Please enter the recipient's name.");
      return;
    }

    if (step === 1 && !sender.trim()) {
      alert("Please enter your name.");
      return;
    }

    setStep((current) => Math.min(3, current + 1));
  }

  function suggestMessage() {
    setMessage(suggestions[suggestionIndex % suggestions.length]);
    setSuggestionIndex((index) => index + 1);
  }

  function handlePhoto(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Please select an image smaller than 2 MB.");
      event.target.value = "";
      return;
    }

    setPhotoLoading(true);

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result);
      setPhotoLoading(false);
    };

    reader.onerror = () => {
      alert("Unable to read this image. Please try another one.");
      setPhotoLoading(false);
      event.target.value = "";
    };

    reader.readAsDataURL(file);
  }

  function createSurprise(event) {
    event.preventDefault();

    if (!message.trim()) {
      alert("Please write a message or use the suggestion button.");
      return;
    }

    if (photoLoading) {
      alert("Please wait for your photo to finish uploading.");
      return;
    }

    setPreview(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function continueToPayment() {
    const greeting = {
      occasion: "Birthday",
      relationship,
      recipient: recipient.trim(),
      sender: sender.trim(),
      age,
      category: ideas[selectedIdea].title,
      decoration: decorations[selectedDecoration],
      message: message.trim(),
      photo,
    };

    navigate("/payment", {
      state: { greeting },
    });
  }

  if (preview) {
    return (
      <main className={`${theme.page} min-h-screen px-4 py-10 sm:px-6`}>
        <div className="mx-auto max-w-2xl">
          <button
            type="button"
            onClick={() => setPreview(false)}
            className={`mb-6 font-semibold ${theme.accent}`}
          >
            ← Edit Surprise
          </button>

          <article className="overflow-hidden rounded-3xl border border-white bg-white p-4 shadow-xl sm:p-8">
            <div className="rounded-2xl bg-gradient-to-br from-pink-100 via-rose-50 to-orange-100 p-6 text-center sm:p-10">
              <div className="text-6xl">
                {decorations[selectedDecoration].emoji}
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-widest text-rose-600">
                A birthday surprise for you
              </p>

              <h1 className="mt-4 font-serif text-3xl sm:text-5xl">
                Happy Birthday, {recipient}! 🎂
              </h1>

              <p className="mt-3 text-sm text-stone-500">
                {ideas[selectedIdea].title}
              </p>

              {photo && (
                <img
                  src={photo}
                  alt="Birthday memory"
                  className="mx-auto mt-6 max-h-72 w-full rounded-2xl object-cover"
                />
              )}

              <p className="mt-7 whitespace-pre-wrap break-words text-left text-base leading-8 text-stone-700">
                {message}
              </p>

              {age && (
                <p className="mt-4 text-sm text-stone-500">
                  Celebrating {age} wonderful years ✨
                </p>
              )}

              <p className="mt-8 font-serif text-lg italic text-rose-600">
                With love, {sender} ♡
              </p>
            </div>

            <p className="mt-4 text-center text-xs text-stone-400">
              Your greeting preview is ready. Complete payment to unlock the
              paid greeting experience.
            </p>

            <button
              type="button"
              onClick={continueToPayment}
              className={`mt-5 w-full rounded-full ${theme.button} px-6 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-0.5`}
            >
              Unlock My Surprise — ₹19 →
            </button>

            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-stone-500">
              <span>Original price ₹39</span>
              <span>·</span>
              <span className="font-semibold text-emerald-600">
                Save ₹20
              </span>
            </div>
          </article>
        </div>
      </main>
    );
  }

  return (
    <main className={`${theme.page} min-h-screen px-4 py-8 sm:px-6 sm:py-12`}>
      <div className="mx-auto max-w-4xl">
        <Link to="/" className={`text-sm font-semibold ${theme.accent}`}>
          ← Back to Home
        </Link>

        <header className="mx-auto mt-8 max-w-2xl text-center">
          <span className="text-5xl">🎂</span>

          <h1 className="mt-4 font-serif text-3xl sm:text-5xl">
            Make Their Birthday Special
          </h1>

          <p className="mt-3 text-sm leading-6 text-stone-500 sm:text-base">
            Three little steps to create a surprise made just for them.
          </p>

          <div className="mt-7 flex items-center justify-center gap-3">
            {["💌", "🎨", "✨"].map((emoji, index) => (
              <div key={emoji} className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full font-semibold ${
                    step === index + 1
                      ? `${theme.button} text-white`
                      : step > index + 1
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-white text-stone-400"
                  }`}
                >
                  {step > index + 1 ? "✓" : emoji}
                </div>

                {index < 2 && (
                  <div className="h-px w-6 bg-rose-200 sm:w-12" />
                )}
              </div>
            ))}
          </div>

          <p className={`mt-3 text-xs font-bold ${theme.accent}`}>
            STEP {step} OF 3
          </p>
        </header>

        <section className="mt-8 rounded-3xl border border-white bg-white p-5 shadow-xl sm:p-9">
          {step === 1 && (
            <>
              <h2 className="text-center font-serif text-2xl sm:text-3xl">
                Who are we surprising? 💌
              </h2>

              <p className="mt-2 text-center text-sm text-stone-500">
                Tell us a little about your special person.
              </p>

              <label
                className={`mt-7 block text-sm font-semibold ${theme.accent}`}
              >
                Your relationship
                <select
                  value={relationship}
                  onChange={(event) => setRelationship(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-700 outline-none focus:border-rose-300"
                >
                  {[
                    "Friend",
                    "Best Friend",
                    "Girlfriend",
                    "Boyfriend",
                    "Wife",
                    "Husband",
                    "Mother",
                    "Father",
                    "Sister",
                    "Brother",
                    "Other",
                  ].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label
                  className={`text-sm font-semibold ${theme.accent}`}
                >
                  Their name / nickname *
                  <input
                    value={recipient}
                    onChange={(event) => setRecipient(event.target.value)}
                    placeholder="e.g. Aanya, Bestie..."
                    maxLength={60}
                    className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3 font-normal text-stone-800 outline-none focus:border-rose-300"
                  />
                </label>

                <label
                  className={`text-sm font-semibold ${theme.accent}`}
                >
                  Your name *
                  <input
                    value={sender}
                    onChange={(event) => setSender(event.target.value)}
                    placeholder="e.g. Your name"
                    maxLength={60}
                    className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3 font-normal text-stone-800 outline-none focus:border-rose-300"
                  />
                </label>
              </div>

              <label
                className={`mt-5 block text-sm font-semibold ${theme.accent}`}
              >
                Their age (optional)
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                  placeholder="e.g. 25"
                  className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3 font-normal text-stone-800 outline-none focus:border-rose-300"
                />
              </label>

              <div className="mt-5 rounded-xl bg-rose-50 p-4 text-sm text-stone-600">
                🎁 Creating a birthday surprise for your{" "}
                {relationship.toLowerCase()}.
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-center font-serif text-2xl sm:text-3xl">
                Choose your birthday vibe ✨
              </h2>

              <p className="mt-2 text-center text-sm text-stone-500">
                First choose a message style, then pick decorations.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {ideas.map((idea, index) => (
                  <button
                    key={idea.title}
                    type="button"
                    onClick={() => setSelectedIdea(index)}
                    className={`rounded-2xl border p-4 text-left transition hover:-translate-y-1 ${
                      selectedIdea === index
                        ? theme.selected
                        : "border-stone-200 bg-white hover:border-rose-200"
                    }`}
                  >
                    <span className="text-3xl">{idea.emoji}</span>
                    <h3 className="mt-3 text-sm font-bold text-stone-800">
                      {idea.title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-stone-500">
                      {idea.text}
                    </p>
                  </button>
                ))}
              </div>

              <h3 className={`mt-8 font-semibold ${theme.accent}`}>
                Choose cake & decoration
              </h3>

              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {decorations.map((decoration, index) => (
                  <button
                    key={decoration.title}
                    type="button"
                    onClick={() => setSelectedDecoration(index)}
                    className={`rounded-2xl border p-4 text-center transition ${
                      selectedDecoration === index
                        ? theme.selected
                        : "border-stone-200 bg-white hover:border-rose-200"
                    }`}
                  >
                    <span className="text-4xl">{decoration.emoji}</span>
                    <p className="mt-2 text-sm font-semibold text-stone-800">
                      {decoration.title}
                    </p>
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-gradient-to-br from-pink-100 via-rose-50 to-orange-100 p-6 text-center">
                <div className="text-6xl">
                  {decorations[selectedDecoration].emoji}
                </div>
                <p className="mt-3 font-serif text-2xl">
                  {decorations[selectedDecoration].title}
                </p>
                <p className="mt-2 text-sm text-stone-600">
                  {ideas[selectedIdea].title}
                </p>
                <div className="mt-3 text-2xl">🎈 ✨ 🌸 🎁</div>
              </div>
            </>
          )}

          {step === 3 && (
            <form onSubmit={createSurprise}>
              <h2 className="text-center font-serif text-2xl sm:text-3xl">
                Write something from the heart 💌
              </h2>

              <p className="mt-2 text-center text-sm text-stone-500">
                Your words make this surprise truly personal.
              </p>

              <div className="mt-6 rounded-2xl bg-gradient-to-br from-pink-100 via-rose-50 to-orange-100 p-5 text-center">
                <span className="text-5xl">
                  {decorations[selectedDecoration].emoji}
                </span>
                <p className="mt-3 font-serif text-2xl">
                  Happy Birthday, {recipient || "Your Special Person"}!
                </p>
                <p className="mt-2 text-sm text-stone-600">
                  {ideas[selectedIdea].title}
                </p>
              </div>

              <label
                className={`mt-6 block text-sm font-semibold ${theme.accent}`}
              >
                Your message *
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={6}
                  maxLength={1500}
                  placeholder="Write a message for your special person..."
                  className="mt-2 w-full resize-y rounded-2xl border border-stone-200 px-4 py-4 font-normal leading-7 text-stone-800 outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-50"
                />
              </label>

              <p className="mt-1 text-right text-xs text-stone-400">
                {message.length}/1500
              </p>

              <button
                type="button"
                onClick={suggestMessage}
                className="mt-3 w-full rounded-xl border border-rose-200 bg-rose-50 px-5 py-3 font-semibold text-rose-600 transition hover:bg-rose-100"
              >
                ✨ Suggest a message
              </button>

              <p className="mt-2 text-xs text-stone-400">
                This currently uses sample suggestions, not a live AI service.
              </p>

              <label
                className={`mt-6 block text-sm font-semibold ${theme.accent}`}
              >
                Add a photo (optional)
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                  className="mt-2 block w-full rounded-xl border border-stone-200 p-3 text-sm font-normal text-stone-600"
                />
              </label>

              {photo && (
                <div className="mt-4">
                  <img
                    src={photo}
                    alt="Selected birthday memory"
                    className="max-h-64 w-full rounded-2xl object-cover"
                  />
                </div>
              )}

              {photoLoading && (
                <p className="mt-2 text-sm text-stone-500">
                  Preparing your photo...
                </p>
              )}

              <button
                type="submit"
                disabled={photoLoading}
                className={`mt-7 w-full rounded-full ${theme.button} px-6 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50`}
              >
                Create My Surprise ✨
              </button>
            </form>
          )}

          {step < 3 && (
            <div className="mt-8 flex gap-3">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((current) => current - 1)}
                  className="flex-1 rounded-full border border-stone-200 px-5 py-4 font-semibold text-stone-600 hover:bg-stone-50"
                >
                  ← Back
                </button>
              )}

              <button
                type="button"
                onClick={nextStep}
                className={`flex-1 rounded-full ${theme.button} px-5 py-4 font-semibold text-white`}
              >
                {step === 1 ? "Choose Design →" : "Continue to Message →"}
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Birthday;
