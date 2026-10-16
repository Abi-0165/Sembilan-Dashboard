import HeroSection    from "../components/home/HeroSection";
import GallerySection from "../components/home/GallerySection";
import AboutSection   from "../components/home/AboutSection";
import { C, FONT_HEAD } from "../theme";

export default function HomePage({ onNavigate }) {
  return (
    <main style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: FONT_HEAD, overflowX: "hidden" }}>
      <HeroSection    onNavigate={onNavigate} />
      <GallerySection />
      <AboutSection />
    </main>
  );
}
