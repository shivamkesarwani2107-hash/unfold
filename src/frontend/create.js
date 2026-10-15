import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const occasions = [
  { name: "Birthday", emoji: "🎂", color: "rose" },
  { name: "Love", emoji: "💗", color: "pink" },
  { name: "Anniversary", emoji: "💍", color: "amber" },
  { name: "Friends", emoji: "🫶", color: "sky" },
  { name: "Festivals", emoji: "🪔", color: "orange" },
  { name: "Just Because", emoji: "🌷", color: "teal" },
  { name: "Wedding", emoji: "💐", color: "violet" },
  { name: "Achievements", emoji: "🏆", color: "amber" },
  { name: "Long Distance", emoji: "🌍", color: "indigo" },
];

const categories = {
  Birthday: [
    "Birthday Wishes",
    "Funny & Cute",
    "From the Heart",
    "Birthday Surprise",
    "Emotional Wish",
    "Best Person Ever",
    "Birthday Gift Note",
    "Make a Memory",
  ],
  Love: [
    "Love Letter",
    "Just I Love You",
    "I Miss You",
    "Romantic Message",
    "Appreciation Note",
    "Good Night Love",
    "Long-Distance Love",
    "Flirty & Cute",
  ],
  Anniversary: [
    "Anniversary Wishes",
    "From My Heart",
    "Our Memories",
    "Milestone Celebration",
    "Romantic Surprise",
    "For My Partner",
    "Thank You for Us",
    "Our Next Chapter",
  ],
  Friends: [
    "Best Friend Forever",
    "Funny Friendship",
    "Thank You",
    "Cheer Someone Up",
    "You Matter",
    "Sending Hugs",
    "Family Love",
    "Just Checking In",
  ],
  Festivals: [
    "Diwali Wishes",
    "Holi Greetings",
    "Eid Mubarak",
    "Christmas Cheer",
    "Makar Sankranti",
    "Navratri Wishes",
    "New Year Wishes",
    "Festive Greetings",
  ],
  "Just Because": [
    "Just Checking In",
    "Motivation",
    "Thank You",
    "Sending Hugs",
    "Good Morning",
    "Sweet Dreams",
    "Sorry & Make Up",
    "Random Kindness",
  ],
  Wedding: [
    "Wedding Wishes",
    "Engagement Wishes",
    "For the Bride",
    "For the Groom",
    "Newlywed Blessings",
    "Romantic Wedding Note",
    "Wedding Invitation",
    "Wedding Congratulations",
  ],
  Achievements: [
    "Graduation Wishes",
    "Congratulations",
    "New Job Wishes",
    "Proud of You",
    "Exam Success",
    "New Beginnings",
    "Keep Going",
    "Achievement Surprise",
  ],
  "Long Distance": [
    "I Miss You",
    "Miles Apart",
    "A Letter for You",
    "Long-Distance Love",
    "Virtual Hug",
    "Countdown to Reunion",
    "Thinking of You",
    "Still Connected",
  ],
};

const decorationOptions = [
  { name: "Hearts", emoji: "💗" },
  { name: "Flowers", emoji: "🌷" },
  { name: "Stars", emoji: "✨" },
  { name: "Confetti", emoji: "🎊" },
  { name: "Balloons", emoji: "🎈" },
  { name: "Butterflies", emoji: "🦋" },
];

const themes = [
  {
    name: "Rose",
    background: "from-rose-100 via-pink-50 to-orange-50",
    accent: "#e11d48",
  },
  {
    name: "Lavender",
    background: "from-violet-100 via-purple-50 to-pink-50",
    accent: "#7c3aed",
  },
  {
    name: "Sunshine",
    background: "from-amber-100 via-yellow-50 to-orange-50",
    accent: "#b45309",
  },
  {
    name: "Ocean",
    background: "from-sky-100 via-cyan-50 to-indigo-50",
    accent: "#0369a1",
  },
  {
    name: "Nature",
    background: "from-emerald-100 via-teal-50 to-lime-50",
    accent: "#047857",
  },
];

const sampleMessages = {
  Birthday:
    "Happy Birthday! 🎂 May your day be filled with laughter, beautiful memories, and all the little things that make you smile. You deserve so much happiness today and always.",
  Love:
    "Somehow, you make ordinary moments feel extraordinary. Thank you for being you and for bringing so much warmth into my life. You mean more to me than words can say. 💗",
  Anniversary:
    "Every memory with you is a little treasure. Here's to everything we've shared, everything we've learned, and all the beautiful moments still waiting for us. ❤️",
  Friends:
    "Life feels a little brighter with a friend like you. Thank you for the laughs, the support, and all the memories. I'm lucky to have you in my corner. 🫶",
  Festivals:
    "Wishing you and your loved ones a beautiful celebration filled with happiness, warmth, peace, and countless reasons to smile. ✨",
  "Just Because":
    "Just a little reminder that you're appreciated more than you know. I hope something wonderful happens to you today. You deserve kindness, happiness, and a reason to smile. 🌷",
  Wedding:
    "Wishing you both a lifetime of love, laughter, friendship, and beautiful memories. May every new chapter bring you closer and make your journey together even more special. 💐",
  Achievements:
    "You worked for this, believed in yourself, and kept going. I'm so proud of everything you've accomplished. Celebrate this moment—you've earned it! 🏆",
  "Long Distance":
    "Miles may separate us, but they can't change how much you mean to me. Until we're together again, know that you're in my thoughts and always close to my heart. 🌍",
};

const occasionStyles = {
  Birthday: {
    emoji: "🎂",
    title: "A little birthday magic",
    subtitle: "Make their special day unforgettable.",
  },
  Love: {
    emoji: "💗",
    title: "Put your feelings into words",
    subtitle: "Create something straight from the heart.",
  },
  Anniversary: {
    emoji: "💍",
    title: "Celebrate your story",
    subtitle: "Every chapter deserves a little love.",
  },
  Friends: {
    emoji: "🫶",
    title: "For your favourite people",
    subtitle: "Celebrate the friendship that means so much.",
  },
  Festivals: {
    emoji: "🪔",
    title: "Share the festive joy",
    subtitle: "Send warmth and happiness to your loved ones.",
  },
  "Just Because": {
    emoji: "🌷",
    title: "No occasion needed",
    subtitle: "Sometimes a small gesture means everything.",
  },
  Wedding: {
    emoji: "💐",
    title: "A beautiful new beginning",
    subtitle: "Celebrate love and the start of a new chapter.",
  },
  Achievements: {
    emoji: "🏆",
    title: "Celebrate their big moment",
    subtitle: "Let them know how proud you are.",
  },
  "Long Distance": {
    emoji: "🌍",
    title: "Love knows no distance",
    subtitle: "Make someone far away feel close to you.",
  },
};

function Create() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [occasion, setOccasion] = useState("Birthday");
  const [relationship, setRelationship] = useState("Friend");
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [age, setAge] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    categories.Birthday[0]
  );
  const [selectedDecorations, setSelectedDecorations] = useState([
    "Hearts",
    "Stars",
  ]);
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const photoInputRef = useRef(null);

  const currentOccasion = occasionStyles[occasion];

  const chooseOccasion = (name) => {
    setOccasion(name);
    setSelectedCategory(categories[name][0]);
    setMessage("");
    setShowPreview(false);

    const themeByOccasion = {
      Birthday: "Rose",
      Love: "Lavender",
      Anniversary: "Sunshine",
      Friends: "Ocean",
      Festivals: "Sunshine",
      "Just Because": "Nature",
      Wedding: "Sunshine",
      Achievements: "Lavender",
      "Long Distance": "Ocean",
    };

    const nextTheme = themes.find(
      (theme) => theme.name === themeByOccasion[name]
    );

    if (nextTheme) setSelectedTheme(nextTheme);

    const defaultDecorations = {
      Birthday: ["Balloons", "Confetti", "Stars"],
      Love: ["Hearts", "Flowers"],
      Anniversary: ["Hearts", "Stars"],
      Friends: ["Stars", "Confetti"],
      Festivals: ["Stars", "Confetti", "Flowers"],
      "Just Because": ["Flowers", "Butterflies"],
      Wedding: ["Flowers", "Hearts"],
      Achievements: ["Stars", "Confetti"],
      "Long Distance": ["Hearts", "Stars"],
    };

    setSelectedDecorations(defaultDecorations[name] || ["Stars"]);
  };

  const toggleDecoration = (name) => {
    setSelectedDecorations((previous) =>
      previous.includes(name)
        ? previous.filter((item) => item !== name)
        : [...previous, name]
    );
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Please choose an image smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result);
      setShowPreview(false);
    };
    reader.onerror = () => {
      alert("Unable to read this image. Please try another one.");
      event.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const suggestMessage = () => {
    const firstName = recipient.trim() || "you";
    const signOff = sender.trim() || "Someone who cares";

    setMessage(
      `${sampleMessages[occasion]}\n\nTo ${firstName},\n\nWith love,\n${signOff}`
    );
    setShowPreview(false);
  };

  const handleNext = () => {
    if (step === 1 && !recipient.trim()) {
      alert("Please enter the recipient's name or nickname.");
      return;
    }

    if (step === 1 && !sender.trim()) {
      alert("Please enter your name.");
      return;
    }

    setStep((previous) => Math.min(previous + 1, 3));
    setShowPreview(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep((previous) => Math.max(previous - 1, 1));
    setShowPreview(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCreatePreview = () => {
    if (!message.trim()) {
      alert("Please write a message or use the suggestion button.");
      return;
    }

    setShowPreview(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const continueToPayment = () => {
    const greeting = {
      occasion,
      relationship,
      recipient: recipient.trim(),
      sender: sender.trim(),
      age,
      category: selectedCategory,
      decoration: { emoji: currentOccasion.emoji, name: occasion },
      message: message.trim(),
      photo,
    };

    navigate("/payment", {
      state: { greeting },
    });
  };

  const handleCopy = async () => {
    const greeting = `${occasionStyles[occasion].title}\n\nDear ${
      recipient || "you"
    },\n\n${message}\n\nWith love,\n${sender || "Someone who cares"}`;

    try {
      await navigator.clipboard.writeText(greeting);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Copy is not available in this browser. Please select and copy the message manually.");
    }
  };

  const handleReset = () => {
    setStep(1);
    setOccasion("Birthday");
    setRelationship("Friend");
    setRecipient("");
    setSender("");
    setAge("");
    setSelectedCategory(categories.Birthday[0]);
    setSelectedDecorations(["Hearts", "Stars"]);
    setSelectedTheme(themes[0]);
    setMessage("");
    setPhoto("");
    setShowPreview(false);

    if (photoInputRef.current) {
      photoInputRef.current.value = "";
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buttonPrimary =
    "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-rose-200 transition duration-200 hover:-translate-y-0.5 hover:from-rose-600 hover:to-pink-600 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-rose-100 disabled:cursor-not-allowed disabled:opacity-50";

  const buttonSecondary =
    "inline-flex items-center justify-center gap-2 rounded-full border border-rose-200 bg-white px-6 py-3.5 text-sm font-semibold text-stone-700 transition duration-200 hover:border-rose-300 hover:bg-rose-50 focus:outline-none focus:ring-4 focus:ring-rose-100";

  return (
    <main className="min-h-screen bg-[#fffaf7] px-4 py-10 text-[#30252b] sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        {/* Page heading */}
        <div className="mb-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-rose-50 hover:text-rose-600"
          >
            ← Back to Home
          </Link>

          <div className="mt-6 text-4xl">💌</div>

          <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
            Create a little <span className="text-rose-500">magic.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-stone-600">
            A few thoughtful details, a message from the heart, and a surprise
            made just for someone special.
          </p>
        </div>

        {/* Stepper */}
        <div className="mx-auto mb-8 grid max-w-3xl grid-cols-3 gap-2">
          {[
            { number: 1, label: "The people" },
            { number: 2, label: "The design" },
            { number: 3, label: "Your message" },
          ].map((item) => (
            <button
              key={item.number}
              type="button"
              onClick={() => {
                if (item.number < step) {
                  setStep(item.number);
                  setShowPreview(false);
                }
              }}
              className={`flex flex-col items-center gap-2 rounded-2xl border p-3 text-center transition sm:flex-row sm:justify-center sm:gap-3 ${
                step === item.number
                  ? "border-rose-300 bg-rose-50 text-rose-600"
                  : step > item.number
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-stone-100 bg-white text-stone-400"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  step === item.number
                    ? "bg-rose-500 text-white"
                    : step > item.number
                    ? "bg-emerald-500 text-white"
                    : "bg-stone-100 text-stone-500"
                }`}
              >
                {step > item.number ? "✓" : item.number}
              </span>

              <span className="text-xs font-semibold sm:text-sm">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Form panel */}
          <section className="rounded-3xl border border-rose-100 bg-white p-5 shadow-sm sm:p-8">
            {/* STEP 1 */}
            {step === 1 && (
              <div>
                <span className="text-sm font-semibold text-rose-500">
                  STEP 01 · THE PEOPLE
                </span>

                <h2 className="mt-3 font-serif text-3xl font-bold">
                  Who is this surprise for?
                </h2>

                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Let's start with the people behind this little moment.
                </p>

                <div className="mt-7">
                  <label className="mb-3 block text-sm font-semibold">
                    Choose an occasion
                  </label>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {occasions.map((item) => (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => chooseOccasion(item.name)}
                        className={`rounded-2xl border p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                          occasion === item.name
                            ? "border-rose-300 bg-rose-50 ring-2 ring-rose-100"
                            : "border-stone-100 bg-[#fffdfb] hover:border-rose-200"
                        }`}
                      >
                        <span className="text-2xl">{item.emoji}</span>
                        <span
                          className={`mt-2 block text-sm font-semibold ${
                            occasion === item.name
                              ? "text-rose-600"
                              : "text-stone-700"
                          }`}
                        >
                          {item.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-7">
                  <label
                    htmlFor="relationship"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Who are they to you?
                  </label>

                  <select
                    id="relationship"
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
                      "Brother",
                      "Sister",
                      "Son",
                      "Daughter",
                      "Colleague",
                      "Teacher",
                      "Other",
                    ].map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="recipient"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Their name / nickname *
                    </label>

                    <input
                      id="recipient"
                      type="text"
                      value={recipient}
                      onChange={(event) => setRecipient(event.target.value)}
                      placeholder="e.g. Sunshine"
                      maxLength={60}
                      className="w-full rounded-xl border border-stone-200 px-4 py-3 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="sender"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Your name *
                    </label>

                    <input
                      id="sender"
                      type="text"
                      value={sender}
                      onChange={(event) => setSender(event.target.value)}
                      placeholder="e.g. Shivam"
                      maxLength={60}
                      className="w-full rounded-xl border border-stone-200 px-4 py-3 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-50"
                    />
                  </div>
                </div>

                {occasion === "Birthday" && (
                  <div className="mt-5">
                    <label
                      htmlFor="age"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Their age (optional)
                    </label>

                    <input
                      id="age"
                      type="number"
                      min="1"
                      max="120"
                      value={age}
                      onChange={(event) => setAge(event.target.value)}
                      placeholder="e.g. 25"
                      className="w-full rounded-xl border border-stone-200 px-4 py-3 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-50 sm:max-w-xs"
                    />
                  </div>
                )}
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div>
                <span className="text-sm font-semibold text-rose-500">
                  STEP 02 · THE DESIGN
                </span>

                <h2 className="mt-3 font-serif text-3xl font-bold">
                  Give it your kind of magic.
                </h2>

                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Pick a message style, choose a theme, and add decorations.
                </p>

                <div className="mt-7">
                  <label className="mb-3 block text-sm font-semibold">
                    Message category
                  </label>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {categories[occasion].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setSelectedCategory(item)}
                        className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                          selectedCategory === item
                            ? "border-rose-300 bg-rose-50 text-rose-600 ring-2 ring-rose-100"
                            : "border-stone-100 bg-[#fffdfb] text-stone-600 hover:border-rose-200 hover:bg-rose-50/50"
                        }`}
                      >
                        <span className="mr-2">
                          {selectedCategory === item ? "●" : "○"}
                        </span>
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-7">
                  <label className="mb-3 block text-sm font-semibold">
                    Choose a colour theme
                  </label>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {themes.map((theme) => (
                      <button
                        key={theme.name}
                        type="button"
                        onClick={() => setSelectedTheme(theme)}
                        className={`rounded-2xl border p-3 text-left transition ${
                          selectedTheme.name === theme.name
                            ? "border-rose-300 bg-rose-50 ring-2 ring-rose-100"
                            : "border-stone-100 bg-white hover:border-rose-200"
                        }`}
                      >
                        <span
                          className={`block h-12 rounded-xl bg-gradient-to-br ${theme.background}`}
                        />
                        <span className="mt-2 flex items-center justify-between text-sm font-semibold">
                          {theme.name}
                          {selectedTheme.name === theme.name && (
                            <span className="text-rose-500">✓</span>
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-7">
                  <label className="mb-3 block text-sm font-semibold">
                    Add decorations
                  </label>

                  <div className="flex flex-wrap gap-2">
                    {decorationOptions.map((item) => {
                      const isSelected = selectedDecorations.includes(
                        item.name
                      );

                      return (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => toggleDecoration(item.name)}
                          aria-pressed={isSelected}
                          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                            isSelected
                              ? "border-rose-300 bg-rose-50 text-rose-600"
                              : "border-stone-200 bg-white text-stone-600 hover:border-rose-200 hover:bg-rose-50/50"
                          }`}
                        >
                          <span>{item.emoji}</span>
                          {item.name}
                          {isSelected && <span>✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div>
                <span className="text-sm font-semibold text-rose-500">
                  STEP 03 · YOUR MESSAGE
                </span>

                <h2 className="mt-3 font-serif text-3xl font-bold">
                  Put it into words.
                </h2>

                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Add a photo and write something they'll want to remember.
                </p>

                <div className="mt-7">
                  <label className="mb-3 block text-sm font-semibold">
                    Add a photo (optional)
                  </label>

                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                    id="create-photo"
                  />

                  <label
                    htmlFor="create-photo"
                    className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/50 px-5 py-8 text-center transition hover:border-rose-400 hover:bg-rose-50"
                  >
                    {photo ? (
                      <>
                        <img
                          src={photo}
                          alt="Selected greeting"
                          className="h-36 w-36 rounded-2xl object-cover shadow-sm"
                        />
                        <span className="mt-3 text-sm font-semibold text-rose-600">
                          Choose another photo
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-4xl">📸</span>
                        <span className="mt-3 font-semibold">
                          Upload a favourite memory
                        </span>
                        <span className="mt-1 text-xs text-stone-500">
                          Images only · Maximum 5 MB
                        </span>
                      </>
                    )}
                  </label>

                  {photo && (
                    <button
                      type="button"
                      onClick={() => {
                        setPhoto("");
                        if (photoInputRef.current) {
                          photoInputRef.current.value = "";
                        }
                      }}
                      className="mt-3 text-sm font-semibold text-rose-600 hover:underline"
                    >
                      Remove photo
                    </button>
                  )}
                </div>

                <div className="mt-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <label
                      htmlFor="greeting-message"
                      className="text-sm font-semibold"
                    >
                      Your personal message *
                    </label>

                    <button
                      type="button"
                      onClick={suggestMessage}
                      className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold text-violet-700 transition hover:border-violet-300 hover:bg-violet-100 sm:text-sm"
                    >
                      ✨ Suggest a message
                    </button>
                  </div>

                  <textarea
                    id="greeting-message"
                    value={message}
                    onChange={(event) => {
                      setMessage(event.target.value);
                      setShowPreview(false);
                    }}
                    placeholder={`Write something special for ${
                      recipient || "your person"
                    }...`}
                    rows={8}
                    maxLength={2000}
                    className="mt-3 w-full resize-y rounded-2xl border border-stone-200 px-4 py-4 leading-7 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-50"
                  />

                  <div className="mt-2 flex items-center justify-between gap-3 text-xs text-stone-500">
                    <span>Make it personal. Write from the heart.</span>
                    <span>{message.length}/2000</span>
                  </div>

                  <p className="mt-3 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800">
                    Note: Message suggestions are sample templates right now,
                    not live AI-generated responses.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCreatePreview}
                  className={`${buttonPrimary} mt-6 w-full`}
                >
                  Preview My Surprise ✨
                </button>
              </div>
            )}

            {/* Step navigation */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className={buttonSecondary}
                >
                  ← Back
                </button>
              ) : (
                <span className="text-xs text-stone-400">
                  Made with love, on Unfold.
                </span>
              )}

              {step < 3 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className={buttonPrimary}
                >
                  Continue <span>→</span>
                </button>
              )}
            </div>
          </section>

          {/* Live preview panel */}
          <aside className="lg:sticky lg:top-28">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
                  A little sneak peek
                </p>
                <h2 className="mt-1 font-serif text-2xl font-bold">
                  Your greeting
                </h2>
              </div>

              <span className="rounded-full border border-rose-100 bg-white px-3 py-1.5 text-xs font-semibold text-stone-500">
                Live preview
              </span>
            </div>

            <div
              className={`relative overflow-hidden rounded-[2rem] border border-white bg-gradient-to-br ${selectedTheme.background} p-5 shadow-xl shadow-rose-100/60 sm:p-7`}
            >
              {/* Decorative elements */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/70" />
              <div className="pointer-events-none absolute -bottom-12 -left-10 h-40 w-40 rounded-full border border-white/70" />

              <div className="relative rounded-[1.5rem] border border-white/80 bg-white/75 p-5 text-center shadow-sm backdrop-blur-sm sm:p-7">
                <div className="flex flex-wrap justify-center gap-2 text-xl">
                  {selectedDecorations.map((name) => {
                    const decoration = decorationOptions.find(
                      (item) => item.name === name
                    );

                    return decoration ? (
                      <span key={name}>{decoration.emoji}</span>
                    ) : null;
                  })}
                </div>

                <div className="mt-5 text-5xl">
                  {currentOccasion.emoji}
                </div>

                <p
                  className="mt-4 text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: selectedTheme.accent }}
                >
                  {occasion}
                </p>

                <h3 className="mt-3 font-serif text-2xl font-bold leading-tight sm:text-3xl">
                  {currentOccasion.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-stone-600">
                  {currentOccasion.subtitle}
                </p>

                <div
                  className="mx-auto my-6 h-px w-20"
                  style={{ backgroundColor: selectedTheme.accent }}
                />

                {photo && (
                  <img
                    src={photo}
                    alt="Greeting memory"
                    className="mx-auto mb-5 max-h-56 w-full rounded-2xl object-cover shadow-sm"
                  />
                )}

                <p className="text-sm font-medium text-stone-600">
                  Dear {recipient || "someone special"},
                </p>

                {age && occasion === "Birthday" && (
                  <p className="mt-1 text-xs text-stone-500">
                    Celebrating {age} wonderful years
                  </p>
                )}

                <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-stone-700">
                  {message ||
                    "Your heartfelt message will appear here. Add a few words and watch your surprise come to life."}
                </p>

                <p className="mt-6 font-serif text-lg font-semibold">
                  With love,
                </p>

                <p
                  className="mt-1 font-serif text-xl font-bold"
                  style={{ color: selectedTheme.accent }}
                >
                  {sender || "Your name"}
                </p>

                <div className="mt-5 flex flex-wrap justify-center gap-2 text-lg">
                  {selectedDecorations.map((name) => {
                    const decoration = decorationOptions.find(
                      (item) => item.name === name
                    );

                    return decoration ? (
                      <span key={name}>{decoration.emoji}</span>
                    ) : null;
                  })}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-rose-100 bg-white p-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">💡</span>
                <div>
                  <p className="text-sm font-semibold">A little tip</p>
                  <p className="mt-1 text-xs leading-5 text-stone-500">
                    A shared memory, an inside joke, or a simple thank-you can
                    make your message feel truly personal.
                  </p>
                </div>
              </div>
            </div>

            {showPreview && (
              <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="font-semibold text-emerald-800">
                  ✨ Your greeting preview is ready!
                </p>

                <p className="mt-1 text-sm leading-6 text-emerald-700">
                  Your personalized greeting is shown above. You can copy its
                  text or make more changes.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    {copied ? "Copied ✓" : "Copy Message"}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
                  >
                    Start Again
                  </button>

                  <button
                    type="button"
                    onClick={continueToPayment}
                    className="mt-2 w-full inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-5 py-3 text-sm font-bold text-white shadow-md shadow-rose-200 transition hover:-translate-y-0.5"
                  >
                    Unlock My Surprise — ₹19 →
                  </button>
                </div>
              </div>
            )}

            <p className="mt-4 text-center text-xs leading-5 text-stone-500">
              Preview only. Saving a greeting online and generating a shareable
              link require backend integration.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Create;