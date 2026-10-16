import { useState, useEffect } from "react";
import { DEFAULT_THEME } from "../theme";

// Tema awal sudah dipasang skrip di index.html (sebelum React jalan, supaya tidak berkedip)
function currentTheme() {
  const t = document.documentElement.dataset.theme;
  return t === "light" || t === "dark" ? t : DEFAULT_THEME;
}

export function useTheme() {
  const [theme, setTheme] = useState(currentTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0A0F0C" : "#F5F6F2");
    try { localStorage.setItem("theme", theme); } catch { /* storage diblokir — tema tetap jalan untuk sesi ini */ }
  }, [theme]);

  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}
