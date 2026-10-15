
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ideas = [
  { emoji: "🪔", title: "Diwali Wishes", text: "Spread light, happiness, and prosperity." },
  { emoji: "🎨", title: "Holi Greetings", text: "Share colourful wishes and joyful memories." },
  { emoji: "🌙", title: "Eid Mubarak", text: "Send warm wishes filled with peace and joy." },
  { emoji: "🎄", title: "Christmas Cheer", text: "Make someone's Christmas extra special." },
  { emoji: "🪁", title: "Makar Sankranti", text: "Celebrate new beginnings and festive happiness." },
  { emoji: "🌺", title: "Navratri Wishes", text: "Share blessings, strength, and positivity." },
  { emoji: "🎆", title: "New Year Wishes", text: "Welcome a fresh year full of possibilities." },
  { emoji: "🎉", title: "Festive Greetings", text: "Create a thoughtful greeting for any occasion." },
];

const decorations = [
  { emoji: "🪔", title: "Traditional Diyas" },
  { emoji: "🌸", title: "Flower Garland" },
  { emoji: "✨", title: "Golden Lights" },
  { emoji: "🎨", title: "Colourful Rangoli" },
  { emoji: "🎄", title: "Festive Celebration" },
  { emoji: "🎊", title: "Balloons & Confetti" },
];

const suggestions = [
  "May this festive season fill your home with happiness, your heart with peace, and your days with beautiful memories. Sending you lots of love and warm wishes! ✨",
  "Wishing you and your family a season full of laughter, good health, new opportunities, and countless reasons to smile. May every day bring something wonderful! 💛",
  "Festivals remind us to celebrate togetherness, kindness, and the little joys of life. May happiness find its way to you today and throughout the year. 🎉",
];

const festivalMessages = {
  "Diwali Wishes": {
    heading: "Happy Diwali",
    emoji: "🪔",
    background: "from-amber-200 via-orange-100 to-yellow-100",
  },
  "Holi Greetings": {
    heading: "Happy Holi",
    emoji: "🎨",
    background: "from-pink-200 via-yellow-100 to-sky-100",
  },
  "Eid Mubarak": {
    heading: "Eid Mubarak",
    emoji: "🌙",
    background: "from-emerald-100 via-teal-50 to-amber-100",
  },
  "Christmas Cheer": {
    heading: "Merry Christmas",
    emoji: "🎄",
    background: "from-emerald-100 via-red-50 to-green-100",
  },
  "Makar Sankranti": {
    heading: "Happy Makar Sankranti",
    emoji: "🪁",
    background: "from-sky-100 via-yellow-50 to-orange-100",
  },
  "Navratri Wishes": {
    heading: "Happy Navratri",
    emoji: "🌺",
    background: "from-rose-100 via-orange-50 to-amber-100",
  },
  "New Year Wishes": {
    heading: "Happy New Year",
    emoji: "🎆",
    background: "from-violet-100 via-sky-50 to-amber-100",
  },
  "Festive Greetings": {
    heading: "Season's Greetings",
    emoji: "🎉",
    background: "from-fuchsia-100 via-amber-50 to-sky-100",
  },
};

function Festivals() {
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

  const theme = {
    page: "bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50",
    accent: "text-orange-700",
    button: "bg-orange-600 hover:bg-orange-700",
    selected: "border-orange-400 bg-orange-50 ring-2 ring-orange-100",
  };

  const selectedFestival = ideas[selectedIdea];
  const festival = festivalMessages[selectedFestival.title];

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
    setRelationship("Friend");
    setRecipient("");
    setSender("");
    setAge("");
    setSelectedIdea(0);
    setSelectedDecoration(0);
    setMessage("");
    setPhoto("");
    setPreview(false);
    setSuggestionIndex(0);
  }

  function continueToPayment() {
    const greeting = {
      occasion: "Festivals",
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
            <div className={`rounded-2xl bg-gradient-to-br ${festival.background} p-6 text-center sm:p-10`}>
              <div className="text-6xl">{festival.emoji}</div>

              <p className="mt-5 text-xs font-bold uppercase tracking-widest text-orange-700">
                A little festive surprise
              </p>

              <h1 className="mt-4 font-serif text-3xl sm:text-5xl">
                {festival.heading}, {recipient}! ✨
              </h1>

              <p className="mt-3 text-sm text-stone-600">
                {selectedFestival.title}
              </p>

              {photo && (
                <img
                  src={photo}
                  alt="Festive memory"
                  className="mx-auto mt-6 max-h-72 w-full rounded-2xl object-cover"
                />
              )}

              <p className="mt-7 whitespace-pre-wrap text-left text-base leading-8 text-stone-700">
                {message}
              </p>

              {age && (
                <p className="mt-4 text-sm text-stone-600">
                  Sending warm wishes to you at {age} years old.
                </p>
              )}

              <p className="mt-8 font-serif text-lg italic text-orange-700">
                With love, {sender || "Someone who cares"} ♡
              </p>

              <div className="mt-6 text-2xl">
                {festival.emoji} {decorations[selectedDecoration].emoji} ✨ 🎉
              </div>
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
          <span className="text-5xl">🎉</span>

          <h1 className="mt-4 font-serif text-3xl sm:text-5xl">
            Make Every Festival Special
          </h1>

          <p className="mt-3 text-sm leading-6 text-stone-500 sm:text-base">
            Share the joy of every celebration with a personal greeting.
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
                  <div className="h-px w-6 bg-orange-200 sm:w-12" />
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
                Who are we sending wishes to? 💌
              </h2>

              <p className="mt-2 text-center text-sm text-stone-500">
                Personalise your festive greeting.
              </p>

              <label className={`mt-7 block text-sm font-semibold ${theme.accent}`}>
                Your relationship

                <select
                  value={relationship}
                  onChange={(event) => setRelationship(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-700 outline-none focus:border-orange-300"
                >
                  <option>Friend</option>
                  <option>Best Friend</option>
                  <option>Family Member</option>
                  <option>Mother</option>
                  <option>Father</option>
                  <option>Sibling</option>
                  <option>Partner</option>
                  <option>Colleague</option>
                  <option>Teacher</option>
                  <option>Other</option>
                </select>
              </label>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className={`text-sm font-semibold ${theme.accent}`}>
                  Their name / nickname *

                  <input
                    value={recipient}
                    onChange={(event) => setRecipient(event.target.value)}
                    placeholder="e.g. Aanya, Family..."
                    maxLength={60}
                    className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3 font-normal text-stone-800 outline-none focus:border-orange-300"
                  />
                </label>

                <label className={`text-sm font-semibold ${theme.accent}`}>
                  Your name

                  <input
                    value={sender}
                    onChange={(event) => setSender(event.target.value)}
                    placeholder="e.g. Your name"
                    maxLength={60}
                    className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3 font-normal text-stone-800 outline-none focus:border-orange-300"
                  />
                </label>
              </div>

              <label className={`mt-5 block text-sm font-semibold ${theme.accent}`}>
                Their age (optional)

                <input
                  type="number"
                  min="1"
                  max="120"
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                  placeholder="e.g. 25"
                  className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3 font-normal text-stone-800 outline-none focus:border-orange-300"
                />
              </label>

              <div className="mt-5 rounded-xl bg-orange-50 p-4 text-sm text-stone-600">
                🎊 Creating festive wishes for your {relationship.toLowerCase()}.
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-center font-serif text-2xl sm:text-3xl">
                Choose your festival & decorations ✨
              </h2>

              <p className="mt-2 text-center text-sm text-stone-500">
                Each festival has its own greeting and colour theme.
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
                        : "border-stone-200 bg-white hover:border-orange-200"
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
                        : "border-stone-200 bg-white hover:border-orange-200"
                    }`}
                  >
                    <span className="text-4xl">{decoration.emoji}</span>

                    <p className="mt-2 text-sm font-semibold text-stone-800">
                      {decoration.title}
                    </p>
                  </button>
                ))}
              </div>

              <div className={`mt-6 rounded-2xl bg-gradient-to-br ${festival.background} p-6 text-center`}>
                <div className="text-6xl">{festival.emoji}</div>

                <p className="mt-3 font-serif text-2xl">
                  {festival.heading}
                </p>

                <p className="mt-2 text-sm text-stone-600">
                  {decorations[selectedDecoration].title}
                </p>

                <div className="mt-3 text-2xl">
                  {festival.emoji} {decorations[selectedDecoration].emoji} ✨
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <form onSubmit={createSurprise}>
              <h2 className="text-center font-serif text-2xl sm:text-3xl">
                Add your festive wishes 💌
              </h2>

              <p className="mt-2 text-center text-sm text-stone-500">
                Share a message that makes the celebration more meaningful.
              </p>

              <div className={`mt-6 rounded-2xl bg-gradient-to-br ${festival.background} p-5 text-center`}>
                <span className="text-5xl">{festival.emoji}</span>

                <p className="mt-3 font-serif text-2xl">
                  {festival.heading}, {recipient || "Your Special Person"}!
                </p>

                <p className="mt-2 text-sm text-stone-600">
                  {selectedFestival.title}
                </p>
              </div>

              <label className={`mt-6 block text-sm font-semibold ${theme.accent}`}>
                Your message

                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={6}
                  maxLength={1500}
                  placeholder="Write your festive wishes, blessings, and warm thoughts..."
                  className="mt-2 w-full resize-y rounded-2xl border border-stone-200 px-4 py-4 font-normal leading-7 text-stone-800 outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-50"
                />
              </label>

              <p className="mt-1 text-right text-xs text-stone-400">
                {message.length}/1500
              </p>

              <button
                type="button"
                onClick={suggestMessage}
                className="mt-3 w-full rounded-xl border border-orange-200 bg-orange-50 px-5 py-3 font-semibold text-orange-700 hover:bg-orange-100"
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
                    alt="Selected festive memory"
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

export default Festivals;
