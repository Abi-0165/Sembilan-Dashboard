import HeroSection  from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import { C } from "../theme";

export default function HomePage({ onNavigate }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Barlow Condensed', sans-serif", overflowX: "hidden" }}>
      <HeroSection  onNavigate={onNavigate} />
      <AboutSection />
    </div>
  );
}
