import { C } from "../../theme";

export default function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.line}`, padding: "20px 16px", textAlign: "center", color: C.textSub, fontSize: 13, fontFamily: "'Barlow Condensed', sans-serif", background: C.bg }}>
      © {new Date().getFullYear()} Sembilan Basketball · SMAN 9 Surabaya
    </footer>
  );
}
