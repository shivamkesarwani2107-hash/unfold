import { Link } from "react-router-dom";

const categories = [
  {
    name: "Birthday",
    emoji: "🎂",
    description: "Make their day unforgettable.",
    color: "bg-pink-100",
    text: "text-pink-600",
    path: "/birthday",
  },
  {
    name: "Love & Romance",
    emoji: "💗",
    description: "Say what your heart feels.",
    color: "bg-rose-100",
    text: "text-rose-600",
    path: "/love",
  },
  {
    name: "Anniversary",
    emoji: "💍",
    description: "Celebrate your beautiful story.",
    color: "bg-purple-100",
    text: "text-purple-600",
    path: "/anniversary",
  },
  {
    name: "Friends & Family",
    emoji: "🫶",
    description: "For your favourite people.",
    color: "bg-orange-100",
    text: "text-orange-600",
    path: "/friends",
  },
  {
    name: "Festivals",
    emoji: "🪔",
    description: "Share happiness and festive joy.",
    color: "bg-amber-100",
    text: "text-amber-600",
    path: "/festivals",
  },
  {
    name: "Just Because",
    emoji: "🌷",
    description: "Make an ordinary day special.",
    color: "bg-teal-100",
    text: "text-teal-600",
    path: "/just-because",
  },
  {
    name: "Wedding",
    emoji: "💒",
    description: "Celebrate a beautiful beginning.",
    color: "bg-rose-100",
    text: "text-rose-600",
    path: "/wedding",
  },
  {
    name: "Achievements",
    emoji: "🎓",
    description: "Celebrate every milestone.",
    color: "bg-amber-100",
    text: "text-amber-600",
    path: "/achievements",
  },
  {
    name: "Long Distance",
    emoji: "✈️",
    description: "Stay close, even miles apart.",
    color: "bg-sky-100",
    text: "text-sky-600",
    path: "/long-distance",
  },
];

const steps = [
  {
    number: "01",
    emoji: "🎁",
    title: "Choose the Moment",
    description:
      "Choose the kind of surprise that fits your person and the occasion.",
  },
  {
    number: "02",
    emoji: "🖼️",
    title: "Add the Personal Bits",
    description:
      "Make it yours with names, favourite memories and a heartfelt message.",
  },
  {
    number: "03",
    emoji: "👁️",
    title: "Preview Their Experience",
    description:
      "See how your surprise looks before sharing it with someone special.",
  },
  {
    number: "04",
    emoji: "📤",
    title: "Share the Surprise",
    description:
      "Get your creation ready to share and make their day memorable.",
  },
];

function Home() {
  return (
    <main className="overflow-hidden bg-[#fffaf7] text-stone-900">

      {/* ================= HERO SECTION ================= */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-24 lg:px-12 lg:py-28">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-pink-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-orange-200/50 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-2">

          {/* Hero Text */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white/90 px-4 py-2 text-xs font-bold text-rose-600 shadow-sm sm:text-sm">
              <span>✦</span>
              FOR EVERY PERSON WHO MATTERS
              <span>♡</span>
            </div>

            <h1 className="max-w-2xl font-serif text-5xl leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
              Some feelings deserve{" "}
              <span className="italic text-rose-500">
                more than words.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-stone-600 sm:text-lg">
              Create thoughtful digital surprises for the people who make
              your world special. Add your memories, write from the heart
              and turn an ordinary moment into something unforgettable. 💌
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#occasions"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-rose-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:text-base"
              >
                Create Your Surprise
                <span className="transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </a>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white/90 px-7 py-4 text-sm font-semibold text-stone-700 transition hover:border-rose-300 hover:text-rose-600 sm:text-base"
              >
                <span>▷</span>
                See How It Works
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-stone-500 sm:text-sm">
              <span>♡ Made with meaning</span>
              <span>✿ Personal and thoughtful</span>
              <span>✧ Made to be shared</span>
            </div>
          </div>

          {/* Creative Greeting Card Preview */}
          <div className="relative mx-auto w-full max-w-md px-3 py-8 sm:px-5">

            <div className="absolute inset-10 rounded-full bg-pink-200/70 blur-3xl" />

            <span className="absolute left-0 top-3 z-10 rotate-[-12deg] rounded-2xl border border-pink-100 bg-white px-4 py-3 text-sm shadow-lg sm:left-[-12px]">
              💌 A little love
            </span>

            <span className="absolute right-0 top-14 z-10 rotate-[8deg] rounded-2xl border border-orange-100 bg-white px-4 py-3 text-sm shadow-lg sm:right-[-8px]">
              Made for you ✨
            </span>

            <div className="relative rotate-[-2deg] rounded-[2rem] border border-white bg-white p-3 shadow-2xl shadow-rose-200/60 transition duration-500 hover:rotate-0">
              <div className="relative flex min-h-[390px] flex-col items-center justify-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-pink-100 via-rose-50 to-orange-100 px-6 py-10 text-center sm:min-h-[450px]">

                <span className="absolute left-5 top-5 text-3xl text-rose-300">
                  ✿
                </span>
                <span className="absolute right-5 top-5 text-3xl text-rose-300">
                  ♡
                </span>
                <span className="absolute bottom-5 left-5 text-2xl">
                  ✨
                </span>
                <span className="absolute bottom-5 right-5 text-3xl">
                  🌷
                </span>

                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white bg-white/80 text-3xl shadow-sm">
                  💌
                </div>

                <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-rose-600 sm:text-xs">
                  A little something for you
                </p>

                <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
                  You make life
                  <br />
                  <span className="italic text-rose-500">
                    beautiful.
                  </span>
                </h2>

                <div className="my-6 h-px w-16 bg-rose-300" />

                <p className="max-w-xs text-sm leading-7 text-stone-600">
                  Some people turn ordinary moments into memories worth
                  keeping forever.
                </p>

                <p className="mt-5 font-serif text-lg italic text-rose-700">
                  Made just for you ♡
                </p>
              </div>
            </div>

            <div className="absolute -bottom-1 left-0 rounded-xl border border-pink-100 bg-white px-4 py-3 shadow-lg sm:left-[-8px]">
              <p className="text-xs text-stone-500">A little reminder</p>
              <p className="font-serif text-lg">You are special ♡</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section
        id="occasions"
        className="scroll-mt-20 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-rose-500 sm:text-sm">
                ✨ Find your moment
              </p>

              <h2 className="mt-3 font-serif text-3xl sm:text-5xl">
                Every occasion,{" "}
                <span className="italic text-rose-500">
                  made personal.
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-stone-500 sm:text-base">
                From big celebrations to the smallest gestures, find a
                beautiful way to tell someone they matter.
              </p>
            </div>

            <span className="text-sm font-medium text-rose-500">
              9 ways to make someone smile ♡
            </span>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="group relative overflow-hidden rounded-3xl border border-stone-100 bg-[#fffdfa] p-5 transition duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-xl hover:shadow-rose-100/70 sm:p-7"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-rose-50 opacity-0 transition duration-300 group-hover:opacity-100" />

                <div className="relative flex items-start justify-between">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${category.color} text-3xl transition duration-300 group-hover:rotate-6 group-hover:scale-105`}
                  >
                    {category.emoji}
                  </span>

                  <span className="text-lg text-stone-300 transition group-hover:translate-x-1 group-hover:text-rose-500">
                    ↗
                  </span>
                </div>

                <h3 className="relative mt-5 font-serif text-xl font-semibold sm:text-2xl">
                  {category.name}
                </h3>

                <p className="relative mt-2 text-sm leading-6 text-stone-500">
                  {category.description}
                </p>

                <p
                  className={`relative mt-5 text-sm font-semibold ${category.text}`}
                >
                  Explore collection →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section
        id="how-it-works"
        className="scroll-mt-20 bg-gradient-to-b from-rose-50/70 to-[#fffaf7] px-4 py-16 sm:px-6 sm:py-24 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white px-4 py-2 text-xs font-bold text-rose-600 shadow-sm sm:text-sm">
              🚀 Easy to make
            </span>

            <h2 className="mt-5 font-serif text-3xl leading-tight sm:text-5xl">
              Make Something Meaningful{" "}
              <span className="italic text-rose-500">
                in Minutes.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-stone-500 sm:text-base">
              We guide you through the meaningful parts. You add what is
              personal; Unfold brings your surprise together.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-rose-100/70 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="font-serif text-4xl font-bold text-purple-400">
                    {step.number}
                  </span>

                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-50 to-orange-50 text-3xl">
                    {step.emoji}
                  </span>
                </div>

                <h3 className="mt-7 font-serif text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-stone-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CALL TO ACTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 px-4 py-20 sm:px-6 sm:py-28 lg:px-12">
        <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-pink-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-orange-200/50 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white/80 px-4 py-2 text-xs font-bold text-rose-600 shadow-sm sm:text-sm">
            💗 Your words. Their moment.
          </span>

          <h2 className="mt-7 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Ready to Make Something
            <br className="hidden sm:block" />{" "}
            <span className="italic text-rose-500">
              Just for Them?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-stone-600 sm:text-lg">
            No signup. No design skills. Just the details that make your
            relationship yours — turned into something they can open,
            feel and remember. 💌
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#occasions"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-rose-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-auto sm:text-base"
            >
              Start Creating
              <span className="transition-transform group-hover:translate-x-1">
                ✨
              </span>
            </a>

            <a
              href="#how-it-works"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-rose-200 bg-white/80 px-8 py-4 text-sm font-semibold text-stone-700 transition hover:border-rose-400 hover:bg-white hover:text-rose-600 sm:w-auto sm:text-base"
            >
              See How It Works
              <span>↗</span>
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-stone-500 sm:text-sm">
            <span>♡ Made with meaning</span>
            <span>✿ Personal and thoughtful</span>
            <span>✧ Made to be shared</span>
          </div>

          <div className="mx-auto mt-12 flex max-w-md items-center justify-center gap-3">
            <span className="h-px flex-1 bg-rose-200" />
            <span className="text-xl text-rose-300">✿</span>
            <span className="h-px flex-1 bg-rose-200" />
          </div>

          <p className="mt-5 font-serif text-lg italic text-rose-600 sm:text-xl">
            Because the little things are the big things. ♡
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;
