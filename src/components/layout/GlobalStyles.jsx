import { C, FONT_HEAD, FONT_BODY, alpha, themeCss } from "../../theme";

// Reset + kelas layout responsif yang dipakai lintas halaman.
// Font dimuat di index.html (preconnect), bukan @import di sini.
const CSS = `
  ${themeCss()}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { -webkit-text-size-adjust: 100%; }
  html, body { overflow-x: hidden; max-width: 100vw; }
  body { background: ${C.bg}; color: ${C.text}; font-family: ${FONT_HEAD}; -webkit-font-smoothing: antialiased; }
  button, input, select { font: inherit; color: inherit; }
  * { -webkit-tap-highlight-color: transparent; }
  ::-webkit-scrollbar { width: 8px; height: 8px; }
  ::-webkit-scrollbar-track { background: ${C.bg}; }
  ::-webkit-scrollbar-thumb { background: ${C.line}; border-radius: 4px; }
  select:focus, input:focus { border-color: ${C.primary} !important; box-shadow: 0 0 0 3px ${alpha(C.primary, 15)}; }
  button:focus-visible, a:focus-visible { outline: 2px solid ${C.primary}; outline-offset: 2px; }
  input[type="date"]::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0.55; }
  .body-font { font-family: ${FONT_BODY}; }

  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
  .fade-up { animation: fadeUp 0.35s ease both; }
  @media (prefers-reduced-motion: reduce) { .fade-up { animation: none; } }

  .container { width: 100%; max-width: 1120px; margin: 0 auto; padding: 0 16px; }
  .page { margin: 0 auto; padding: 24px 16px 48px; }
  @media (min-width: 768px) {
    .container { padding: 0 24px; }
    .page { padding: 36px 24px 72px; }
  }

  .stack { display: flex; flex-direction: column; gap: 16px; }
  .grid-kpi { display: grid; gap: 12px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .grid-split { display: grid; gap: 16px; grid-template-columns: minmax(0, 1fr); }
  .grid-3 { display: grid; gap: 16px; grid-template-columns: minmax(0, 1fr); }
  @media (min-width: 720px) { .grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  @media (min-width: 900px) {
    .grid-kpi { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
    .grid-split { grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); }
  }

  /* Ruang untuk tab bar bawah di HP */
  @media (max-width: 640px) {
    .has-tabbar { padding-bottom: calc(68px + env(safe-area-inset-bottom)); }
  }
`;

export default function GlobalStyles() {
  return <style>{CSS}</style>;
}
