
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ideas = [
  { emoji: "💍", title: "Anniversary Wishes", text: "Celebrate another beautiful year together." },
  { emoji: "💌", title: "From My Heart", text: "Express feelings that words can barely describe." },
  { emoji: "📸", title: "Our Memories", text: "Reminisce about your favourite moments." },
  { emoji: "🥂", title: "Milestone Celebration", text: "Make an important anniversary unforgettable." },
  { emoji: "🌹", title: "Romantic Surprise", text: "Create a thoughtful romantic moment." },
  { emoji: "❤️", title: "For My Partner", text: "Remind your partner how much they mean to you." },
  { emoji: "🫶", title: "Thank You for Us", text: "Appreciate the journey you share." },
  { emoji: "🌅", title: "Our Next Chapter", text: "Celebrate the memories still waiting to happen." },
];

const decorations = [
  { emoji: "💍", title: "Golden Rings" },
  { emoji: "🌹", title: "Classic Roses" },
  { emoji: "🥂", title: "Celebration Toast" },
  { emoji: "🕯️", title: "Candlelight" },
  { emoji: "📸", title: "Memory Collage" },
  { emoji: "✨", title: "Golden Lights" },
];

const suggestions = [
  "Another year, another collection of beautiful memories, little adventures, and reasons to love you even more. I am so grateful for everything we share. Happy anniversary! ❤️",
  "Our story is made of ordinary days that became extraordinary because we shared them. Thank you for being part of my happiest memories and my hopes for tomorrow. 💌",
  "If I could go back and choose again, I would still choose the moments, the laughter, the lessons, and the love that brought us here. Here's to everything still ahead of us. 🥂",
];

function Anniversary() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [relationship, setRelationship] = useState("Partner");
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [age, setAge] = useState("");
  const [years, setYears] = useState("");
  const [selectedIdea, setSelectedIdea] = useState(0);
  const [selectedDecoration, setSelectedDecoration] = useState(0);
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState("");
  const [preview, setPreview] = useState(false);
  const [suggestionIndex, setSuggestionIndex] = useState(0);

  const theme = {
    page: "bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50",
    accent: "text-amber-700",
    button: "bg-amber-600 hover:bg-amber-700",
    selected: "border-amber-400 bg-amber-50 ring-2 ring-amber-100",
  };

  function nextStep() {
    if (step === 1 && !recipient.trim()) {
      window.alert("Please enter the recipient's name.");
      return;
    }

    setStep((current) => Math.min(3, current + 1));
  }

  function suggestMessage() {
    setMessage(suggestions[suggestionIndex % suggestions.length]);
    setSuggestionIndex((current) => current + 1);
  }

  function handlePhoto(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      window.alert("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      window.alert("Please select an image smaller than 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.onerror = () => {
      window.alert("Unable to read this image. Please try another one.");
      event.target.value = "";
    };
    reader.readAsDataURL(file);
  }

  function createSurprise(event) {
    event.preventDefault();

    if (!message.trim()) {
      window.alert("Please write a message or use the suggestion button.");
      return;
    }

    setPreview(true);
  }

  function createAnother() {
    setStep(1);
    setRelationship("Partner");
    setRecipient("");
    setSender("");
    setAge("");
    setYears("");
    setSelectedIdea(0);
    setSelectedDecoration(0);
    setMessage("");
    setPhoto("");
    setPreview(false);
    setSuggestionIndex(0);
  }

  function continueToPayment() {
    const greeting = {
      occasion: "Anniversary",
      relationship,
      recipient: recipient.trim(),
      sender: sender.trim(),
      age,
      years,
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
      <main className={`min-h-screen ${theme.page} px-4 py-10 sm:px-6`}>
        <div className="mx-auto max-w-2xl">
          <button
            type="button"
            onClick={() => setPreview(false)}
            className={`mb-6 font-semibold ${theme.accent}`}
          >
            ← Edit Surprise
          </button>

          <article className="overflow-hidden rounded-3xl border border-white bg-white p-4 shadow-xl sm:p-8">
            <div className="rounded-2xl bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 p-6 text-center sm:p-10">
              <div className="text-6xl">
                {decorations[selectedDecoration].emoji}
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-widest text-amber-700">
                A celebration of your story
              </p>

              <h1 className="mt-4 font-serif text-3xl sm:text-5xl">
                Happy Anniversary, {recipient}! 💍
              </h1>

              <p className="mt-3 text-sm text-stone-500">
                {ideas[selectedIdea].title}
              </p>

              {photo && (
                <img
                  src={photo}
                  alt="Anniversary memory"
                  className="mx-auto mt-6 max-h-72 w-full rounded-2xl object-cover"
                />
              )}

              <p className="mt-7 whitespace-pre-wrap text-left text-base leading-8 text-stone-700">
                {message}
              </p>

              {years && (
                <p className="mt-5 font-serif text-xl text-amber-700">
                  Celebrating {years} {years === "1" ? "year" : "years"} together ✨
                </p>
              )}

              {age && (
                <p className="mt-3 text-sm text-stone-500">
                  With warm wishes for your {age}th year of life.
                </p>
              )}

              <p className="mt-8 font-serif text-lg italic text-amber-700">
                With love, {sender || "Someone who cares"} ♡
              </p>

              <div className="mt-6 text-2xl">🌹 💍 🥂 ✨</div>
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

            <button
              type="button"
              onClick={createAnother}
              className="mt-3 w-full rounded-full border border-stone-200 bg-white px-6 py-3 text-sm font-semibold text-stone-600 transition hover:bg-stone-50"
            >
              Create Another Surprise ✨
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
    <main className={`min-h-screen ${theme.page} px-4 py-8 sm:px-6 sm:py-12`}>
      <div className="mx-auto max-w-4xl">
        <Link to="/" className={`text-sm font-semibold ${theme.accent}`}>
          ← Back to Home
        </Link>

        <header className="mx-auto mt-8 max-w-2xl text-center">
          <span className="text-5xl">💍</span>

          <h1 className="mt-4 font-serif text-3xl sm:text-5xl">
            Celebrate Your Beautiful Story
          </h1>

          <p className="mt-3 text-sm leading-6 text-stone-500 sm:text-base">
            Every year together deserves a little something special.
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
                  <div className="h-px w-6 bg-amber-200 sm:w-12" />
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
                Who are we celebrating? 💌
              </h2>

              <p className="mt-2 text-center text-sm text-stone-500">
                Add a few details to make this surprise personal.
              </p>

              <label className={`mt-7 block text-sm font-semibold ${theme.accent}`}>
                Your relationship

                <select
                  value={relationship}
                  onChange={(event) => setRelationship(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-700 outline-none focus:border-amber-300"
                >
                  <option>Partner</option>
                  <option>Girlfriend</option>
                  <option>Boyfriend</option>
                  <option>Wife</option>
                  <option>Husband</option>
                  <option>Fiancé</option>
                  <option>Fiancée</option>
                  <option>Parents</option>
                  <option>Friends</option>
                  <option>Other</option>
                </select>
              </label>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className={`text-sm font-semibold ${theme.accent}`}>
                  Their name / nickname *

                  <input
                    value={recipient}
                    onChange={(event) => setRecipient(event.target.value)}
                    placeholder="e.g. Aanya, My Love..."
                    maxLength={60}
                    className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3 font-normal text-stone-800 outline-none focus:border-amber-300"
                  />
                </label>

                <label className={`text-sm font-semibold ${theme.accent}`}>
                  Your name

                  <input
                    value={sender}
                    onChange={(event) => setSender(event.target.value)}
                    placeholder="e.g. Your name"
                    maxLength={60}
                    className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3 font-normal text-stone-800 outline-none focus:border-amber-300"
                  />
                </label>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className={`text-sm font-semibold ${theme.accent}`}>
                  Years together (optional)

                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={years}
                    onChange={(event) => setYears(event.target.value)}
                    placeholder="e.g. 5"
                    className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3 font-normal text-stone-800 outline-none focus:border-amber-300"
                  />
                </label>

                <label className={`text-sm font-semibold ${theme.accent}`}>
                  Their age (optional)

                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                    placeholder="e.g. 28"
                    className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3 font-normal text-stone-800 outline-none focus:border-amber-300"
                  />
                </label>
              </div>

              <div className="mt-5 rounded-xl bg-amber-50 p-4 text-sm text-stone-600">
                🥂 Every shared memory makes your story more beautiful.
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-center font-serif text-2xl sm:text-3xl">
                Choose your anniversary vibe ✨
              </h2>

              <p className="mt-2 text-center text-sm text-stone-500">
                Select a message style and decorations for your celebration.
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
                        : "border-stone-200 bg-white hover:border-amber-200"
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
                Choose your decorations
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
                        : "border-stone-200 bg-white hover:border-amber-200"
                    }`}
                  >
                    <span className="text-4xl">{decoration.emoji}</span>
                    <p className="mt-2 text-sm font-semibold text-stone-800">
                      {decoration.title}
                    </p>
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 p-6 text-center">
                <div className="text-6xl">
                  {decorations[selectedDecoration].emoji}
                </div>

                <p className="mt-3 font-serif text-2xl">
                  {decorations[selectedDecoration].title}
                </p>

                <p className="mt-2 text-sm text-stone-600">
                  {ideas[selectedIdea].title}
                </p>

                <div className="mt-3 text-2xl">💍 🌹 🥂 ✨</div>
              </div>
            </>
          )}

          {step === 3 && (
            <form onSubmit={createSurprise}>
              <h2 className="text-center font-serif text-2xl sm:text-3xl">
                Write a message to remember 💌
              </h2>

              <p className="mt-2 text-center text-sm text-stone-500">
                Celebrate your journey in your own words.
              </p>

              <div className="mt-6 rounded-2xl bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 p-5 text-center">
                <span className="text-5xl">
                  {decorations[selectedDecoration].emoji}
                </span>

                <p className="mt-3 font-serif text-2xl">
                  Happy Anniversary, {recipient || "Your Special Person"}! 💍
                </p>

                <p className="mt-2 text-sm text-stone-600">
                  {ideas[selectedIdea].title}
                </p>

                {years && (
                  <p className="mt-2 text-sm text-stone-600">
                    {years} {years === "1" ? "year" : "years"} together
                  </p>
                )}
              </div>

              <label className={`mt-6 block text-sm font-semibold ${theme.accent}`}>
                Your message

                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={6}
                  maxLength={1500}
                  placeholder="Write about your favourite memories, your love, and your hopes for the future..."
                  className="mt-2 w-full resize-y rounded-2xl border border-stone-200 px-4 py-4 font-normal leading-7 text-stone-800 outline-none focus:border-amber-300 focus:ring-4 focus:ring-amber-50"
                />
              </label>

              <p className="mt-1 text-right text-xs text-stone-400">
                {message.length}/1500
              </p>

              <button
                type="button"
                onClick={suggestMessage}
                className="mt-3 w-full rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 font-semibold text-amber-800 hover:bg-amber-100"
              >
                ✨ Suggest a message
              </button>

              <p className="mt-2 text-xs text-stone-400">
                These are sample suggestions, not a live AI service yet.
              </p>

              <label className={`mt-6 block text-sm font-semibold ${theme.accent}`}>
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
                    alt="Selected anniversary memory"
                    className="max-h-64 w-full rounded-2xl object-cover"
                  />
                </div>
              )}

              <button
                type="submit"
                className={`mt-7 w-full rounded-full ${theme.button} px-6 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5`}
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

export default Anniversary;
