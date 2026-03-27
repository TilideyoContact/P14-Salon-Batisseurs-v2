import { Shield, MapPin, Award } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden rounded-b-3xl">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1D3A]/80 via-[#0B1D3A]/70 to-[#0B1D3A]/90" />
      </div>

      <div className="relative z-10 py-16 md:py-20 px-4 mt-14">
        <div className="max-w-4xl mx-auto text-center">
          {/* Event badge */}
          <div className="inline-block glass-sm text-white text-xs md:text-sm font-semibold px-4 py-1.5 mb-6">
            Salon des Bâtisseurs 2026 · Fort-de-France
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-4 leading-tight text-white">
            Configurez votre<br />
            <span className="text-primary">formation sur mesure</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 text-balance">
            3 parcours — Architecture, BIM, 3D & IA. Composez votre programme, profitez de <b className="text-white">jusqu'à -35%</b> aujourd'hui.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-8">
            <Stat value="-35%" label="Offre salon" highlight />
            <Stat value="3" label="Parcours" />
            <Stat value="24" label="Modules" />
            <Stat value="114,5h" label="de formation" />
          </div>

          {/* Badges row: 3 badges aligned */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-5 mb-4">
            <img src="/badge-qualiopi.jpg" alt="Qualiopi" className="h-12 md:h-14 rounded-lg bg-white/90 p-1.5" />
            <img src="/badge-france2030.jpg" alt="France 2030" className="h-12 md:h-14 rounded-lg bg-white/90 p-1.5" />
            <img src="/badge-republique.jpg" alt="République Française" className="h-12 md:h-14 rounded-lg bg-white/90 p-1.5" />
          </div>

          {/* Locations below */}
          <div className="flex justify-center">
            <div className="glass-sm px-4 py-2 flex items-center gap-2 text-white/70 text-xs font-medium">
              <MapPin className="w-3.5 h-3.5" />
              Martinique · Guadeloupe · Guyane
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label, highlight = false }: { value: string; label: string; highlight?: boolean }) {
  return (
    <div className={`glass-sm px-5 py-3 flex flex-col items-center min-w-[110px] ${
      highlight ? "border-primary/50 shadow-[0_0_15px_rgba(198,30,90,0.2)]" : ""
    }`}>
      <span className={`text-2xl font-bold font-display ${highlight ? "text-primary" : "text-white"}`}>
        {value}
      </span>
      <span className="text-xs text-white/60 uppercase tracking-wider font-semibold mt-1">
        {label}
      </span>
    </div>
  );
}
