import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { createRipple } from "../utils/ripple.js";

const links = [
  { to: "/report", label: "Report" },
  { to: "/adopt", label: "Adopt" },
  { to: "/rescue", label: "Rescue" },
  { to: "/donate", label: "Donate" },
  { to: "/volunteer", label: "Volunteer" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-paper/95 backdrop-blur border-b transition-all duration-300 ${
        scrolled ? "border-ink/15 shadow-[0_1px_0_rgba(0,0,0,0.04)]" : "border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-14" : "h-16"}`}>
          <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path d="M15 27C9 27 4 22.5 4 17.8c0-3.4 2.6-5.6 5.4-6.9C11 10 12.6 8 15 8s4 2 5.6 2.9c2.8 1.3 5.4 3.5 5.4 6.9C26 22.5 21 27 15 27Z" fill="#12433C"/>
              <circle cx="9" cy="6" r="2.6" fill="#C1502E"/>
              <circle cx="21" cy="6" r="2.6" fill="#C1502E"/>
              <circle cx="4.5" cy="12" r="2.2" fill="#C1502E"/>
              <circle cx="25.5" cy="12" r="2.2" fill="#C1502E"/>
            </svg>
            <span className="font-display text-xl font-semibold tracking-tight text-ink">Animal Reach</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-body text-[15px]">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `underline-grow transition-colors ${isActive ? "text-rust font-semibold" : "text-ink/80 hover:text-ink"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <span className="font-body text-sm text-ink/70">Hi, {user.name.split(" ")[0]}</span>
                <button
                  onClick={logout}
                  className="font-body text-sm text-ink/70 hover:text-rust transition-colors"
                >
                  Log out
                </button>
              </>
            ) : (
              <Link to="/login" className="font-body text-sm text-ink/80 hover:text-ink underline-grow">
                Log in
              </Link>
            )}
            <Link
              to="/report"
              onClick={createRipple}
              className="magnetic ripple-container font-body text-sm font-semibold text-paper px-4 py-2 rounded-full transition-colors"
              style={{ background: "linear-gradient(135deg, #C1502E, #D9662F)" }}
            >
              Report an animal
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-ink"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink/10 bg-paper px-5 pb-5 pt-2 flex flex-col gap-4 font-body">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-ink/80 text-base">
              {l.label}
            </NavLink>
          ))}
          <div className="flex items-center gap-4 pt-2 border-t border-ink/10">
            {user ? (
              <button onClick={logout} className="text-ink/70 text-sm">Log out</button>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="text-ink/70 text-sm">Log in</Link>
            )}
            <Link
              to="/report"
              onClick={() => setOpen(false)}
              className="ml-auto bg-rust text-paper px-4 py-2 rounded-full text-sm font-semibold"
            >
              Report an animal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}