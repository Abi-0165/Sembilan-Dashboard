import { useState } from "react";

function ClawIcon({ size = 14 }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 20 28" fill="none" style={{ display: "inline-block", verticalAlign: "middle", marginRight: 6, opacity: 0.7 }}>
      <path d="M 4 2 C 3 10 1 18 3 26"  stroke="#4ade80" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M 10 1 C 10 10 9 18 10 27" stroke="#4ade80" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M 16 2 C 17 10 19 18 17 26" stroke="#4ade80" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  );
}

const NAV_ITEMS = [
  { id: "home",      label: "Beranda"   },
  { id: "dashboard", label: "Dashboard" },
  { id: "input",     label: "+ Input"   },
];

export default function Navbar({ page, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNav(id) {
    onNavigate(id);
    setMenuOpen(false);
  }

  return (
    <>
      <style>{`
        .navbar { border-bottom: 1px solid #0f1f15; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; background: #050d09; position: sticky; top: 0; z-index: 100; }
        .navbar-brand { font-size: 18px; font-weight: 900; letter-spacing: 0.05em; text-transform: uppercase; cursor: pointer; color: white; font-family: 'Barlow Condensed', sans-serif; display: flex; align-items: center; gap: 2px; }
        .navbar-links { display: flex; gap: 6px; }
        .navbar-btn { background: none; border: 1px solid transparent; color: #6b7280; padding: 6px 14px; border-radius: 6px; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; font-family: 'Barlow Condensed', sans-serif; transition: all 0.15s; }
        .navbar-btn.active { background: #16a34a22; border-color: #16a34a55; color: #4ade80; }
        .navbar-btn.input-btn { border-color: #1f3329; color: #9ca3af; }
        .navbar-btn.input-btn.active, .navbar-btn.input-btn:hover { background: #16a34a22; border-color: #16a34a55; color: #4ade80; }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
        .hamburger span { display: block; width: 22px; height: 2px; background: #9ca3af; border-radius: 2px; transition: all 0.2s; }
        .mobile-menu { display: none; flex-direction: column; background: #0a180f; border-top: 1px solid #0f1f15; padding: 12px 24px 16px; gap: 4px; }
        .mobile-menu.open { display: flex; }
        .mobile-btn { background: none; border: none; color: #9ca3af; padding: 10px 0; font-size: 15px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; font-family: 'Barlow Condensed', sans-serif; text-align: left; border-bottom: 1px solid #0f1f15; }
        .mobile-btn.active { color: #4ade80; }
        .mobile-btn:last-child { border-bottom: none; }
        @media (max-width: 540px) {
          .navbar-links { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>

      <nav className="navbar">
        <span className="navbar-brand" onClick={() => handleNav("home")}>
          <ClawIcon size={13} />
          <span style={{ color: "#4ade80" }}>SEMBILAN</span>&nbsp;BASKETBALL
        </span>
        <div className="navbar-links">
          {NAV_ITEMS.map((p) => (
            <button key={p.id} className={`navbar-btn ${p.id === "input" ? "input-btn" : ""} ${page === p.id ? "active" : ""}`} onClick={() => handleNav(p.id)}>
              {p.label}
            </button>
          ))}
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_ITEMS.map((p) => (
          <button key={p.id} className={`mobile-btn ${page === p.id ? "active" : ""}`} onClick={() => handleNav(p.id)}>
            {p.label}
          </button>
        ))}
      </div>
    </>
  );
}