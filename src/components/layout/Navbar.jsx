import { C, FONT_HEAD, FONT_BODY, SHADOW, alpha } from "../../theme";

function ClawIcon({ size = 14, color = C.primary }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 20 28" fill="none" aria-hidden>
      <path d="M 4 2 C 3 10 1 18 3 26"  stroke={color} strokeWidth="2.4" strokeLinecap="round"/>
      <path d="M 10 1 C 10 10 9 18 10 27" stroke={color} strokeWidth="2.4" strokeLinecap="round"/>
      <path d="M 16 2 C 17 10 19 18 17 26" stroke={color} strokeWidth="2.4" strokeLinecap="round"/>
    </svg>
  );
}

export function BrandMark({ size = 34 }) {
  return (
    <span style={{ width: size, height: size, borderRadius: size * 0.28, background: C.primary, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <ClawIcon size={size * 0.38} color={C.onPrimary} />
    </span>
  );
}

const ICONS = {
  home: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />,
  dashboard: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" /></>,
  profil: <path d="M3 12h4l2.5-6 5 12 2.5-6H21" />,
};

function ThemeToggle({ theme, onToggle }) {
  const dark = theme === "dark";
  return (
    <button className="theme-btn" onClick={onToggle} aria-label={dark ? "Ganti ke mode terang" : "Ganti ke mode gelap"} title={dark ? "Mode terang" : "Mode gelap"}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {dark
          ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>
          : <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />}
      </svg>
    </button>
  );
}

function NavIcon({ id }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {ICONS[id]}
    </svg>
  );
}

const NAV_ITEMS = [
  { id: "home",      label: "Beranda"      },
  { id: "dashboard", label: "Shooting"     },
  { id: "profil",    label: "Profil Fisik", short: "Profil" },
];

export default function Navbar({ page, onNavigate, theme, onToggleTheme }) {
  return (
    <>
      <style>{`
        .topbar { position: sticky; top: 0; z-index: 100; background: ${alpha(C.surface, 88)}; backdrop-filter: saturate(1.4) blur(12px); -webkit-backdrop-filter: saturate(1.4) blur(12px); border-bottom: 1px solid ${C.line}; }
        .topbar-inner { height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .brand { display: flex; align-items: center; gap: 10px; background: none; border: none; cursor: pointer; text-align: left; padding: 0; }
        .brand-name { font-family: ${FONT_HEAD}; font-size: 19px; font-weight: 900; letter-spacing: 0.04em; text-transform: uppercase; color: ${C.accent}; line-height: 1; }
        .brand-sub { display: block; font-family: ${FONT_BODY}; font-size: 12px; color: ${C.textSub}; margin-top: 3px; }
        .seg { display: flex; gap: 4px; padding: 4px; background: ${C.lineSoft}; border-radius: 12px; }
        .seg-btn { background: none; border: none; color: ${C.textSub}; padding: 8px 16px; border-radius: 9px; font-family: ${FONT_HEAD}; font-size: 14px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; transition: color 0.15s, background 0.15s; }
        .seg-btn:hover { color: ${C.primary}; }
        .seg-btn.active { background: ${C.surface}; color: ${C.primary}; box-shadow: ${SHADOW}; }
        .nav-right { display: flex; align-items: center; gap: 10px; }
        .theme-btn { width: 40px; height: 40px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; border-radius: 12px; border: 1px solid ${C.line}; background: ${C.surface}; color: ${C.text}; cursor: pointer; transition: color 0.15s, border-color 0.15s; }
        .theme-btn:hover { color: ${C.primary}; border-color: ${C.primary}; }

        .tabbar { display: none; position: fixed; left: 0; right: 0; bottom: 0; z-index: 100; background: ${alpha(C.surface, 94)}; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-top: 1px solid ${C.line}; padding: 6px 8px calc(6px + env(safe-area-inset-bottom)); grid-template-columns: repeat(${NAV_ITEMS.length}, 1fr); }
        .tab-btn { position: relative; background: none; border: none; color: ${C.textSub}; display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 6px 0; font-family: ${FONT_HEAD}; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; }
        .tab-btn.active { color: ${C.primary}; }
        .tab-btn.active::before { content: ""; position: absolute; top: -7px; width: 28px; height: 3px; border-radius: 0 0 3px 3px; background: ${C.primary}; }

        @media (max-width: 640px) {
          .seg { display: none; }
          .tabbar { display: grid; }
          .topbar-inner { height: 56px; }
          .brand-sub { display: none; }
        }
      `}</style>

      <header className="topbar">
        <div className="container topbar-inner">
          <button className="brand" onClick={() => onNavigate("home")} aria-label="Sembilan Basketball — Beranda">
            <BrandMark />
            <span>
              <span className="brand-name"><span style={{ color: C.primary }}>Sembilan</span> Basketball</span>
              <span className="brand-sub">SMAN 9 Surabaya</span>
            </span>
          </button>
          <div className="nav-right">
            <nav className="seg" aria-label="Navigasi utama">
              {NAV_ITEMS.map((p) => (
                <button key={p.id} className={`seg-btn ${page === p.id ? "active" : ""}`}
                  aria-current={page === p.id ? "page" : undefined} onClick={() => onNavigate(p.id)}>
                  {p.label}
                </button>
              ))}
            </nav>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>
      </header>

      <nav className="tabbar" aria-label="Navigasi utama">
        {NAV_ITEMS.map((p) => (
          <button key={p.id} className={`tab-btn ${page === p.id ? "active" : ""}`}
            aria-current={page === p.id ? "page" : undefined} onClick={() => onNavigate(p.id)}>
            <NavIcon id={p.id} />
            {p.short || p.label}
          </button>
        ))}
      </nav>
    </>
  );
}
