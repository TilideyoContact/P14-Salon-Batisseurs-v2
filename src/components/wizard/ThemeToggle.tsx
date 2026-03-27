import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("p14-theme");
    if (saved === "light") {
      setIsDark(false);
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("p14-theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("p14-theme", "light");
    }
  };

  return (
    <button
      onClick={toggle}
      className="w-9 h-9 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
    >
      {isDark ? <Sun className="w-4 h-4 text-yellow-300" /> : <Moon className="w-4 h-4 text-navy" />}
    </button>
  );
}
