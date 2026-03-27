import { Shield, Award, MapPin } from "lucide-react";

export function Hero() {
  return (
    <div className="py-12 md:py-16 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-4 leading-tight">
          <span className="text-foreground">Configurez votre</span>
          <br />
          <span className="text-primary">formation sur mesure</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance">
          3 parcours — Architecture, BIM, 3D & IA. Composez votre programme, profitez de <b className="text-foreground">jusqu'à -35%</b> aujourd'hui.
        </p>

        <div className="flex flex-wrap justify-center gap-3 md:gap-6">
          <Stat value="-35%" label="Offre salon" highlight />
          <Stat value="3" label="Parcours" />
          <Stat value="24" label="Modules" />
          <Stat value="114,5h" label="de formation" />
        </div>

        <div className="mt-8 flex flex-wrap justify-center items-center gap-3 md:gap-4">
          <span className="glass-sm flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground">
            <Shield className="w-4 h-4 text-emerald-500" /> Certifié Qualiopi
          </span>
          <span className="glass-sm flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground">
            <Award className="w-4 h-4 text-emerald-500" /> RS6776 · RS6372
          </span>
          <span className="glass-sm flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground">
            <MapPin className="w-4 h-4 text-emerald-500" /> Martinique · Guadeloupe · Guyane
          </span>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label, highlight = false }: { value: string; label: string; highlight?: boolean }) {
  return (
    <div className={`glass-sm px-5 py-3 rounded-2xl flex flex-col items-center min-w-[110px]`}>
      <span className={`text-2xl font-bold font-display ${highlight ? "text-primary" : "text-foreground"}`}>
        {value}
      </span>
      <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">
        {label}
      </span>
    </div>
  );
}
