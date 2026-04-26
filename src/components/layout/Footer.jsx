export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #0f1f15", padding: "20px 24px", textAlign: "center", color: "#374151", fontSize: 13, fontFamily: "'Barlow Condensed', sans-serif" }}>
      © {new Date().getFullYear()} Sembilan Basketball · SMAN 9 Surabaya
    </footer>
  );
}