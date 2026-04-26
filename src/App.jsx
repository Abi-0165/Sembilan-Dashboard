import { useState } from "react";
import { useSheetData }  from "./hooks/useSheetData";
import Navbar        from "./components/layout/Navbar";
import Footer        from "./components/layout/Footer";
import LoginPage     from "./pages/LoginPage";
import HomePage      from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import InputPage     from "./pages/InputPage";

export default function App() {
  const [isAuth, setIsAuth] = useState(() => sessionStorage.getItem("auth") === "1");

  function handleLogin() {
    sessionStorage.setItem("auth", "1");
    setIsAuth(true);
  }

  const [page, setPage] = useState(() => {
    const saved = localStorage.getItem("page") || "home";
    const auth  = sessionStorage.getItem("auth") === "1";
    return (!auth && (saved === "dashboard" || saved === "input")) ? "home" : saved;
  });

  function navigate(p) {
    localStorage.setItem("page", p);
    setPage(p);
  }

  const { players, shootingData, runningData, loading, error } = useSheetData();

  const STYLES = `
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #050d09; color: #f0fdf4; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #050d09; }
    ::-webkit-scrollbar-thumb { background: #1f3329; border-radius: 3px; }
    input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.7) sepia(1) saturate(3) hue-rotate(90deg); cursor: pointer; }
    select option { background: #0d1f14; }
    * { -webkit-tap-highlight-color: transparent; }
    html, body { overflow-x: hidden; max-width: 100vw; }
  `;

  // Login gate — berlaku untuk dashboard & input
  if ((page === "dashboard" || page === "input") && !isAuth) {
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
      {page === "home"      && <HomePage      players={players} onNavigate={navigate} />}
      {page === "dashboard" && <DashboardPage players={players} shootingData={shootingData} runningData={runningData} loading={loading} error={error} />}
      {page === "input"     && <InputPage     players={players} />}
      <Footer />
    </>
  );
}