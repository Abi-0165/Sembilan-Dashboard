import HeroSection  from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";

export default function HomePage({ players, onNavigate }) {
  return (
    <div style={{ minHeight: "100vh", background: "#050d09", color: "white", fontFamily: "'Barlow Condensed', sans-serif", overflowX: "hidden" }}>
      <HeroSection  onNavigate={onNavigate} />
      <AboutSection />
    </div>
  );
}