import { C, FONT_BODY } from "../../theme";

export default function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.line}`, background: C.surface, fontFamily: FONT_BODY }}>
      <div className="container" style={{ paddingTop: 20, paddingBottom: 20, display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap", color: C.textSub, fontSize: 13 }}>
        <span>© {new Date().getFullYear()} Sembilan Basketball · SMAN 9 Surabaya</span>
        <span>Dashboard Latihan</span>
      </div>
    </footer>
  );
}
