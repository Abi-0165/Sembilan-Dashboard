import { useState } from "react";
import { C } from "../../theme";

function ClawIcon({ size = 14 }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 20 28" fill="none" style={{ display: "inline-block", verticalAlign: "middle", marginRight: 6 }}>
      <path d="M 4 2 C 3 10 1 18 3 26"  stroke={C.primary} strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M 10 1 C 10 10 9 18 10 27" stroke={C.primary} strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M 16 2 C 17 10 19 18 17 26" stroke={C.primary} strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  );
}

const NAV_ITEMS = [
  { id: "home",      label: "Beranda"     },
  { id: "dashboard", label: "Shooting"    },
  { id: "profil",    label: "Profil Fisik" },
  { id: "input",     label: "+ Input"     },
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
        .navbar { border-bottom: 1px solid ${C.line}; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; background: ${C.surface}; position: sticky; top: 0; z-index: 100; }
        .navbar-brand { font-size: 18px; font-weight: 900; letter-spacing: 0.05em; text-transform: uppercase; cursor: pointer; color: ${C.accent}; font-family: 'Barlow Condensed', sans-serif; display: flex; align-items: center; gap: 2px; background: none; border: none; }
        .navbar-links { display: flex; gap: 6px; }
        .navbar-btn { background: none; border: 1px solid transparent; color: ${C.textSub}; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; font-family: 'Barlow Condensed', sans-serif; transition: all 0.15s; }
        .navbar-btn:hover { color: ${C.primary}; }
        .navbar-btn.active { background: ${C.primary}; border-color: ${C.primary}; color: ${C.onPrimary}; }
        .navbar-btn.input-btn { border-color: ${C.line}; }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 6px; }
        .hamburger span { display: block; width: 22px; height: 2px; background: ${C.accent}; border-radius: 2px; transition: all 0.2s; }
        .mobile-menu { display: none; flex-direction: column; background: ${C.surface}; border-bottom: 1px solid ${C.line}; padding: 8px 16px 12px; gap: 2px; position: sticky; top: 53px; z-index: 99; }
        .mobile-menu.open { display: flex; }
        .mobile-btn { background: none; border: none; color: ${C.text}; padding: 12px 0; font-size: 16px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; font-family: 'Barlow Condensed', sans-serif; text-align: left; border-bottom: 1px solid ${C.lineSoft}; }
        .mobile-btn.active { color: ${C.primary}; }
        .mobile-btn:last-child { border-bottom: none; }
        @media (max-width: 640px) {
          .navbar-links { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>

      <nav className="navbar">
        <button className="navbar-brand" onClick={() => handleNav("home")}>
          <ClawIcon size={13} />
          <span style={{ color: C.primary }}>SEMBILAN</span>&nbsp;BASKETBALL
        </button>
        <div className="navbar-links">
          {NAV_ITEMS.map((p) => (
            <button key={p.id} className={`navbar-btn ${p.id === "input" ? "input-btn" : ""} ${page === p.id ? "active" : ""}`} onClick={() => handleNav(p.id)}>
              {p.label}
            </button>
          ))}
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" aria-expanded={menuOpen}>
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
