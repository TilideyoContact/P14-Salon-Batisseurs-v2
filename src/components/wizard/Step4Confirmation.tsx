import { useWizard } from "@/store/use-wizard";
import { PARCOURS } from "@/data/parcours";
import { computeTotals } from "@/lib/submit-order";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2, Printer, RotateCcw, User, Building2, ShoppingCart } from "lucide-react";

const SITUATION_LABELS: Record<string, string> = {
  dirigeant: "Dirigeant / Gerant",
  rh: "Resp. Formation / RH",
  salarie: "Salarie",
  independant: "Independant",
  autre: "Autre",
};

export function Step4Confirmation() {
  const { reference, contact, cart, quote, resetAll } = useWizard();

  const cartItems = Object.values(cart);
  const { rawTotal, finalTotal, discounts } = computeTotals(cart);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto py-10 px-4"
    >
      {/* Print-only header — professional PDF layout */}
      <div className="hidden print:block mb-6">
        <div className="flex items-center justify-between border-b-2 border-[#c61e5a] pb-4 mb-4">
          <div>
            <img src="/logo-p14-fc.jpg" alt="P14" className="h-10 mb-1" />
            <p className="text-[9pt] text-gray-500">Organisme certifié Qualiopi · NDA 97970203497</p>
          </div>
          <div className="text-right">
            <h1 className="text-[14pt] font-bold text-[#0B1D3A]">Proposition commerciale</h1>
            <p className="text-[10pt] text-gray-500">Salon des Bâtisseurs 2026</p>
            <p className="text-[10pt] font-mono font-bold text-[#c61e5a] mt-1">{reference}</p>
          </div>
        </div>
      </div>

      {/* Success card — screen only hero */}
      <div className="glass p-6 sm:p-8 md:p-12 text-center print:hidden">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,201,167,0.3)] text-white">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-display text-foreground mb-4">Pré-commande envoyée !</h2>

        <p className="text-muted-foreground mb-6 text-balance">
          Vous allez recevoir votre proposition commerciale détaillée et le catalogue P14 par email d&apos;ici quelques minutes.
        </p>

        <div className="glass-sm p-4 mb-8">
          <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Votre référence</div>
          <div className="text-xl font-bold text-foreground font-mono tracking-widest">{reference}</div>
        </div>

        <p className="text-sm font-medium text-foreground mb-8">
          Notre équipe pédagogique vous contactera sous 24h pour finaliser votre inscription et votre dossier de financement.
        </p>
      </div>

      {/* ===== RECAP SECTION ===== */}
      <div className="glass mt-8 overflow-hidden print:shadow-none print:mt-4">

        {/* Contact */}
        <div className="p-5 glass-sm border-b border-border">
          <h3 className="font-bold text-foreground flex items-center gap-2 text-sm uppercase tracking-wider">
            <User className="w-4 h-4 text-secondary" /> Contact
          </h3>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
          <div>
            <span className="text-muted-foreground">Nom</span>
            <p className="font-semibold text-foreground">{contact.prenom} {contact.nom}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Email</span>
            <p className="font-semibold text-foreground">{contact.email}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Telephone</span>
            <p className="font-semibold text-foreground">{contact.tel || "Non renseigne"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Situation</span>
            <p className="font-semibold text-foreground">
              {contact.situation ? SITUATION_LABELS[contact.situation] ?? contact.situation : "Non renseignee"}
              {contact.situation === "autre" && contact.autreSituation ? ` (${contact.autreSituation})` : ""}
            </p>
          </div>
        </div>

        {/* Company (conditional) */}
        {(quote.entreprise || quote.entrepriseDetails) && (
          <>
            <div className="p-5 glass-sm border-y border-border">
              <h3 className="font-bold text-foreground flex items-center gap-2 text-sm uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-secondary" /> Entreprise
              </h3>
            </div>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">Raison sociale</span>
                <p className="font-semibold text-foreground">{quote.entrepriseDetails?.nom || quote.entreprise}</p>
              </div>
              {quote.entrepriseDetails?.siret && (
                <div>
                  <span className="text-muted-foreground">SIRET</span>
                  <p className="font-semibold text-foreground font-mono">{quote.entrepriseDetails.siret}</p>
                </div>
              )}
              {quote.entrepriseDetails?.adresse && (
                <div className="sm:col-span-2">
                  <span className="text-muted-foreground">Adresse</span>
                  <p className="font-semibold text-foreground">{quote.entrepriseDetails.adresse}</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Cart items */}
        {cartItems.length > 0 && (
          <>
            <div className="p-5 glass-sm border-y border-border">
              <h3 className="font-bold text-foreground flex items-center gap-2 text-sm uppercase tracking-wider">
                <ShoppingCart className="w-4 h-4 text-secondary" /> Selection ({cartItems.length} ligne{cartItems.length > 1 ? "s" : ""})
              </h3>
            </div>
            <div className="divide-y divide-border">
              {cartItems.map((item) => {
                const track = PARCOURS[item.trackId];
                if (item.isFullTrack) {
                  const linePrice = Math.round(track.price * 0.95) * item.qty;
                  return (
                    <div key={item.id} className="p-4 flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div
                          className="inline-block px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase mb-1"
                          style={{ backgroundColor: track.color }}
                        >
                          Parcours Complet
                        </div>
                        <h4 className="font-bold text-foreground">{track.label}</h4>
                        <p className="text-xs text-muted-foreground">{track.dur}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs text-muted-foreground">x{item.qty}</div>
                        <div className="font-bold text-foreground">{formatPrice(linePrice)}</div>
                      </div>
                    </div>
                  );
                } else {
                  const mod = track.modules.find((m) => m.id === item.id);
                  if (!mod) return null;
                  const linePrice = mod.price * item.qty;
                  return (
                    <div key={item.id} className="p-4 flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-secondary mb-0.5">{track.label}</div>
                        <h4 className="font-bold text-foreground text-sm">{mod.title}</h4>
                        <p className="text-xs text-muted-foreground">{mod.dur}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs text-muted-foreground">x{item.qty}</div>
                        <div className="font-bold text-foreground">{formatPrice(linePrice)}</div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>

            {/* Totals */}
            <div className="p-5 bg-[#0B1D3A] text-white rounded-b-3xl print-totals">
              {discounts.length > 0 && (
                <div className="mb-4 pb-4 border-b border-white/20 space-y-2">
                  <div className="flex justify-between text-sm text-white/70">
                    <span>Total brut</span>
                    <span>{formatPrice(rawTotal)}</span>
                  </div>
                  {discounts.map((d, i) => (
                    <div key={i} className="flex justify-between text-sm text-pink-300 font-semibold print:text-primary">
                      <span>{d.label}</span>
                      <span>-{formatPrice(d.amount)}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-white/70 text-sm uppercase tracking-wider font-semibold mb-1">Total Estime</div>
                  <div className="text-xs text-white/50 font-medium">Prix definitif sur devis officiel</div>
                </div>
                <div className="text-right">
                  {discounts.length > 0 && (
                    <div className="text-sm line-through text-white/50">{formatPrice(rawTotal)}</div>
                  )}
                  <div className="text-3xl font-display text-white">{formatPrice(finalTotal)}</div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Comment */}
        {quote.comment && (
          <div className="p-5 border-t border-border">
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Commentaire</div>
            <p className="text-sm text-foreground">{quote.comment}</p>
          </div>
        )}
      </div>

      {/* Print-only footer */}
      <div className="hidden print:block mt-8 pt-4 border-t border-gray-300 text-[9pt] text-gray-500">
        <div className="flex justify-between">
          <div>
            <p className="font-bold text-[#0B1D3A]">Parallel 14 Academy</p>
            <p>Centre d'affaires Californie, Le Lamentin · 0596 02 02 28</p>
            <p>fc@parallel14.com · www.parallel14.com</p>
          </div>
          <div className="text-right">
            <p>Ce document est un devis estimatif.</p>
            <p>Le prix définitif sera communiqué sur devis officiel.</p>
            <p className="font-bold text-[#c61e5a] mt-1">Certifié Qualiopi · NDA 97970203497</p>
          </div>
        </div>
      </div>

      {/* Buttons (hidden on print) */}
      <div className="mt-8 space-y-3 print:hidden">
        <Button size="lg" className="btn-primary w-full text-base" onClick={() => window.print()}>
          <Printer className="w-5 h-5 mr-2" /> Imprimer le recapitulatif
        </Button>
        <Button variant="secondary" size="lg" className="glass-sm text-foreground w-full" onClick={resetAll}>
          <RotateCcw className="w-4 h-4 mr-2" /> Nouvelle simulation
        </Button>
      </div>
    </motion.div>
  );
}
