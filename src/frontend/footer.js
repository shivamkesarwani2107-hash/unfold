
import { Link } from "react-router-dom";

function Footer() {
  const footerLink =
    "inline-flex items-center rounded-full px-3 py-2 text-sm font-medium text-stone-500 transition duration-200 hover:bg-rose-50 hover:text-rose-600";

  return (
    <footer className="border-t border-rose-100 bg-[#fffaf7] px-4 py-10 sm:px-6 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
        {/* Brand */}
        <div>
          <Link
            to="/"
            className="font-serif text-3xl font-bold tracking-tight text-[#30252b] transition hover:text-rose-600"
          >
            unfold<span className="text-rose-500">.</span>
          </Link>

          <p className="mt-2 text-sm text-stone-500">
            Little surprises. Big feelings. Beautiful memories. 💗
          </p>
        </div>

        {/* Footer Navigation */}
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center gap-1"
        >
          <a href="/#occasions" className={footerLink}>
            Explore
          </a>

          <Link to="/ai-wishes" className={footerLink}>
            AI Wishes ✨
          </Link>

          <a href="/#how-it-works" className={footerLink}>
            How it works
          </a>

          <Link to="/help" className={footerLink}>
            Help ?
          </Link>

          <Link to="/create" className={footerLink}>
            Create Surprise
          </Link>
        </nav>

        {/* Copyright */}
        <p className="text-xs text-stone-400">
          © {new Date().getFullYear()} Unfold · Made with ♡
        </p>
      </div>

      {/* Bottom line */}
      <div className="mx-auto mt-8 max-w-7xl border-t border-rose-100 pt-5 text-center">
        <p className="text-xs text-stone-400">
          Made to make someone smile, one message at a time. 🌷
        </p>
      </div>
    </footer>
  );
}

export default Footer;
