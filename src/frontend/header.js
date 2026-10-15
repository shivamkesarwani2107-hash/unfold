
import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const navLink =
    "rounded-full px-4 py-2.5 text-sm font-medium text-stone-600 transition duration-200 hover:bg-rose-50 hover:text-rose-600";

  return (
    <header className="sticky top-0 z-50 border-b border-rose-100 bg-[#fffaf7]/95 shadow-sm backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-12">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="shrink-0 font-serif text-3xl font-bold tracking-tight text-[#30252b] transition hover:text-rose-600"
        >
          unfold<span className="text-rose-500">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          <a href="/#occasions" className={navLink}>
            Explore
          </a>

          <a href="/#how-it-works" className={navLink}>
            How it works
          </a>

          <Link to="/ai-wishes" className={navLink}>
            AI Wishes
          </Link>

          <Link to="/help" className={navLink}>
            Help ?
          </Link>
        </div>

        {/* Create Surprise */}
        <Link
          to="/create"
          onClick={closeMenu}
          className="hidden shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-rose-200 transition duration-200 hover:-translate-y-0.5 hover:from-rose-600 hover:to-pink-600 hover:shadow-lg sm:inline-flex"
        >
          Create Surprise <span>✦</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-rose-200 bg-white text-xl text-rose-600 shadow-sm transition hover:bg-rose-50 hover:shadow-md lg:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-rose-100 bg-white px-4 py-4 shadow-lg lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            <a
              onClick={closeMenu}
              href="/#occasions"
              className={navLink}
            >
              Explore occasions
            </a>

            <a
              onClick={closeMenu}
              href="/#how-it-works"
              className={navLink}
            >
              How it works
            </a>

            <Link
              to="/ai-wishes"
              onClick={closeMenu}
              className={navLink}
            >
              AI Wishes
            </Link>

            <Link
              to="/help"
              onClick={closeMenu}
              className={navLink}
            >
              Help ?
            </Link>

            <Link
              to="/create"
              onClick={closeMenu}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-rose-200 transition hover:from-rose-600 hover:to-pink-600"
            >
              Create Surprise <span>✦</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;