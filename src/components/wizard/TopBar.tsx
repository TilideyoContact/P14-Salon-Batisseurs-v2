import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function TopBar() {
  const [timeLeft, setTimeLeft] = useState("--:--:--");
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    // Fixed end date: 28 mars 2026 à 23h59 (fin du Salon des Bâtisseurs)
    const end = new Date(2026, 2, 28, 23, 59, 0);

    const updateCountdown = () => {
      const now = new Date();
      const d = end.getTime() - now.getTime();

      if (d <= 0) {
        setExpired(true);
        return;
      }

      const days = Math.floor(d / 864e5);
      const h = Math.floor((d % 864e5) / 36e5);
      const m = Math.floor((d % 36e5) / 6e4);
      const s = Math.floor((d % 6e4) / 1e3);

      setTimeLeft(
        days > 0
          ? `${days}j ${[h, m, s].map((v) => String(v).padStart(2, "0")).join(":")}`
          : [h, m, s].map((v) => String(v).padStart(2, "0")).join(":")
      );
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl py-2.5 px-4 flex items-center justify-between text-xs md:text-sm font-medium print:hidden rounded-b-2xl">
      <img src="/logo-p14-fc.jpg" alt="P14 Formation Continue" className="h-8 rounded" />

      <div className="flex items-center gap-1.5 sm:gap-2 text-center">
        <span className="hidden sm:inline text-foreground">Salon des Bâtisseurs 2026</span>
        <span className="inline-flex items-center gap-1 sm:gap-1.5 bg-primary/20 text-primary px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs">
          <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          {expired ? <b>Offre expirée</b> : <>Fin dans <b>{timeLeft}</b></>}
        </span>
      </div>

      <ThemeToggle />
    </div>
  );
}
