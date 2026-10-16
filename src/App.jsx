import { useState, useMemo } from "react";
import { useSheetData }  from "./hooks/useSheetData";
import { useTheme }      from "./hooks/useTheme";
import { isActive }      from "./utils/sheets";
import GlobalStyles  from "./components/layout/GlobalStyles";
import Navbar        from "./components/layout/Navbar";
import Footer        from "./components/layout/Footer";
import LoginPage     from "./pages/LoginPage";
import HomePage      from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage   from "./pages/ProfilePage";

// Halaman input dinonaktifkan sementara — pelatih mengisi langsung di Google Sheets.
// Komponennya (pages/InputPage, dashboard/InputForm) masih ada kalau mau dipasang lagi.
const PROTECTED = ["dashboard", "profil"];
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

  const { theme, toggle: toggleTheme } = useTheme();

  const { players, shootingData, physical, schedule, benchmarks, loading, error } = useSheetData();
  // Hanya pemain berstatus "aktif" yang tampil di dropdown & dihitung di rata-rata tim
  const activePlayers = useMemo(() => players.filter(isActive), [players]);

  if (PROTECTED.includes(page) && !isAuth) {
    return (
      <>
        <GlobalStyles />
        <LoginPage onLogin={handleLogin} onBack={() => navigate("home")} />
      </>
    );
  }

  return (
    <div className="has-tabbar">
      <GlobalStyles />
      <Navbar page={page} onNavigate={navigate} theme={theme} onToggleTheme={toggleTheme} />
      {page === "home"      && <HomePage onNavigate={navigate} />}
      {page === "dashboard" && <DashboardPage players={activePlayers} shootingData={shootingData} loading={loading} error={error} />}
      {page === "profil"    && <ProfilePage players={activePlayers} physical={physical} schedule={schedule} benchmarks={benchmarks} loading={loading} error={error} />}
      <Footer />
    </div>
  );
}
