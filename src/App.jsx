import { useState, useMemo } from "react";
import { useSheetData }  from "./hooks/useSheetData";
import { isActive }      from "./utils/sheets";
import { C }             from "./theme";
import Navbar        from "./components/layout/Navbar";
import Footer        from "./components/layout/Footer";
import LoginPage     from "./pages/LoginPage";
import HomePage      from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import InputPage     from "./pages/InputPage";
import ProfilePage   from "./pages/ProfilePage";

const PROTECTED = ["dashboard", "profil", "input"];
const PAGES = ["home", ...PROTECTED];

export default function App() {
  const [isAuth, setIsAuth] = useState(() => sessionStorage.getItem("auth") === "1");

  function handleLogin() {
    sessionStorage.setItem("auth", "1");
    setIsAuth(true);
  }

  const [page, setPage] = useState(() => {
    const saved = localStorage.getItem("page");
    const auth  = sessionStorage.getItem("auth") === "1";
    if (!PAGES.includes(saved)) return "home";
    return (!auth && PROTECTED.includes(saved)) ? "home" : saved;
  });

  function navigate(p) {
    localStorage.setItem("page", p);
    setPage(p);
    window.scrollTo(0, 0);
  }

  const { players, shootingData, shootingAll, physical, schedule, benchmarks, loading, error, reload } = useSheetData();
  // Hanya pemain berstatus "aktif" yang tampil di dropdown & dihitung di rata-rata tim
  const activePlayers = useMemo(() => players.filter(isActive), [players]);

  const STYLES = `
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${C.bg}; color: ${C.text}; font-family: 'Barlow Condensed', sans-serif; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: ${C.bg}; }
    ::-webkit-scrollbar-thumb { background: ${C.line}; border-radius: 3px; }
    select:focus, input:focus { border-color: ${C.primary} !important; box-shadow: 0 0 0 3px ${C.primary}22; }
    * { -webkit-tap-highlight-color: transparent; }
    html, body { overflow-x: hidden; max-width: 100vw; }
  `;

  if (PROTECTED.includes(page) && !isAuth) {
    return (
      <>
        <style>{STYLES}</style>
        <LoginPage onLogin={handleLogin} onBack={() => navigate("home")} />
      </>
    );
  }

  return (
    <>
      <style>{STYLES}</style>
      <Navbar page={page} onNavigate={navigate} />
      {page === "home"      && <HomePage onNavigate={navigate} />}
      {page === "dashboard" && <DashboardPage players={activePlayers} shootingData={shootingData} loading={loading} error={error} />}
      {page === "profil"    && <ProfilePage players={activePlayers} physical={physical} schedule={schedule} benchmarks={benchmarks} loading={loading} error={error} />}
      {page === "input"     && <InputPage players={activePlayers} existingRows={shootingAll} onSaved={reload} />}
      <Footer />
    </>
  );
}
