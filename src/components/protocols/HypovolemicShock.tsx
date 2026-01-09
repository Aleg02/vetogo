"use client";

import React from "react";
import { ProtocolLayout } from "@/components/ProtocolLayout";
import { useAppStore } from "@/store/useAppStore";
import {
  Section,
  DosageCard,
  AlertBox,
  CheckList,
  CriticalList,
  LinkList,
  ProtocolContainer
} from "@/components/ui/ProtocolUI";

import {
  HeartPulse,
  ThermometerSnowflake,
  Activity,
  AlertCircle,
  Droplets,
  Stethoscope,
  ArrowRight,
  TrendingDown,
  Brain,
  Timer
} from "lucide-react";

export const HypovolemicShock = () => {
  const { weightKg, species } = useAppStore();

  // Safe weight wrapper
  const w = weightKg || 0;
  const isDog = species === "chien";
  const isCat = species === "chat";
  const isSpeciesSelected = isDog || isCat;

  // Constants
  const bolusMinVol = isDog ? 15 : isCat ? 5 : null;
  const bolusMaxVol = isDog ? 20 : isCat ? 10 : null;

  const bolusAmountMin = w > 0 && bolusMinVol ? (w * bolusMinVol).toFixed(0) : "--";
  const bolusAmountMax = w > 0 && bolusMaxVol ? (w * bolusMaxVol).toFixed(0) : "--";
  const bolusDisplay = w > 0 && bolusMinVol ? `${bolusAmountMin}-${bolusAmountMax}` : "--";
  const bolusLabel = bolusMinVol ? `${bolusMinVol}-${bolusMaxVol} ml/kg` : "-- ml/kg";
  const gelatineAmount = w > 0 ? (w * 5).toFixed(0) : "--";

  return (
    <ProtocolLayout title="Choc Hypovolémique">
      {(tab) => (
        <ProtocolContainer>
          {tab === "general" && (
            <>
              <Section title="Définition" icon="📖">
                <p className="font-medium text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  Défaillance circulatoire aiguë liée à une diminution du volume intravasculaire effectif, entraînant une <span className="text-rose-600 font-bold">hypoperfusion tissulaire</span> et une hypoxie cellulaire.
                </p>
              </Section>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100/50">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  Signes Clés (Les 6 P)
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-xl">👻</div>
                    <span className="font-bold text-slate-700 text-sm">Pâleur</span>
                    <span className="text-xs text-slate-500">Muqueuses blanches</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500"><HeartPulse size={20} /></div>
                    <span className="font-bold text-slate-700 text-sm">Pouls</span>
                    <span className="text-xs text-slate-500">Filant ou absent</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500"><TrendingDown size={20} /></div>
                    <span className="font-bold text-slate-700 text-sm">Pression</span>
                    <span className="text-xs text-slate-500">Hypotension</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">🌬️</div>
                    <span className="font-bold text-slate-700 text-sm">Précipitation</span>
                    <span className="text-xs text-slate-500">Tachypnée</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-500"><ThermometerSnowflake size={20} /></div>
                    <span className="font-bold text-slate-700 text-sm">Perte chaleur</span>
                    <span className="text-xs text-slate-500">Hypothermie</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500"><Brain size={20} /></div>
                    <span className="font-bold text-slate-700 text-sm">Prostration</span>
                    <span className="text-xs text-slate-500">Altération conscience</span>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-center gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0 text-amber-600 font-bold"><Timer size={20} /></div>
                  <div>
                    <strong className="block text-amber-900 text-sm">TRC &gt; 2 secondes</strong>
                    <span className="text-xs text-amber-800/80">Signe précoce de choc (Temps de Recoloration Capillaire)</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {tab === "examens" && (
            <>
              <Section title="Bilan d'Urgence" icon="⚡">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50 p-4 rounded-2xl shadow-sm border border-slate-200">
                    <div className="absolute top-0 right-0 p-2 opacity-10"><Activity size={60} /></div>
                    <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Lactates</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-800 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">&gt; 2.5</span>
                      <span className="text-xs font-bold text-slate-400">mmol/L</span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50 p-4 rounded-2xl shadow-sm border border-slate-200">
                    <div className="absolute top-0 right-0 p-2 opacity-10"><HeartPulse size={60} /></div>
                    <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">MAP</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-rose-500">&lt; 60</span>
                      <span className="text-xs font-bold text-rose-300">mmHg</span>
                    </div>
                  </div>
                </div>

                <h4 className="font-bold text-slate-700 mb-3 ml-1 flex items-center gap-2"><Stethoscope size={16} /> Examens Complémentaires</h4>
                <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-50 shadow-sm">
                  {["Hématocrite / Protéines Totales (AVANT fluides !)", "Ionogramme (Na+, K+, Cl-)", "Gaz du sang (pH, réserve alcaline)", "Echographie A-FAST / T-FAST"].map((item, i) => (
                    <div key={i} className="p-3 flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        {i + 1}
                      </div>
                      <span className="text-slate-600 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </Section>
            </>
          )}

          {tab === "traitements" && (
            <>
              {(!w || !isSpeciesSelected) && (
                <div className="animate-pulse bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-100 flex items-center gap-3 shadow-sm">
                  <AlertCircle className="text-amber-500 shrink-0" />
                  <div className="text-sm text-amber-800 font-medium">
                    Veuillez sélectionner l'espèce et le poids pour voir les doses calculées.
                  </div>
                </div>
              )}

              <Section title="Algorithme Décisionnel (AAHA 2024)" icon="🧭">
                <div className="relative space-y-0 pb-2">
                  {/* Step 1 */}
                  <div className="flex gap-4 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold shadow-md z-10">1</div>
                      <div className="w-0.5 h-full bg-slate-200 -my-2 py-4"></div>
                    </div>
                    <div className="pb-8 pt-1">
                      <h4 className="font-bold text-slate-800 text-lg">Repérer & Sécuriser</h4>
                      <p className="text-slate-500 text-sm mt-1">Oxygène flow-by, accès veineux, prélèvements sanguins.</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-4 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shadow-md shadow-blue-200 z-10">2</div>
                      <div className="w-0.5 h-full bg-slate-200 -my-2 py-4"></div>
                    </div>
                    <div className="pb-8 pt-1">
                      <h4 className="font-bold text-blue-600 text-lg">Bolus Cristalloïdes IV</h4>
                      <p className="text-slate-500 text-sm mt-1">
                        <span className="font-semibold text-slate-700">{bolusLabel}</span> sur 15 min. Isotoniques balancés.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-200 z-10">3</div>
                      <div className="w-0.5 h-full bg-slate-200 -my-2 py-4"></div>
                    </div>
                    <div className="pb-8 pt-1">
                      <h4 className="font-bold text-amber-600 text-lg">Réévaluer & Réchauffer</h4>
                      <p className="text-slate-500 text-sm mt-1">Check perfusion après chaque bolus. Réchauffement actif immédiat.</p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex gap-4 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold shadow-md shadow-rose-200 z-10">4</div>
                    </div>
                    <div className="pt-1">
                      <h4 className="font-bold text-rose-600 text-lg">Echec ?</h4>
                      <p className="text-slate-500 text-sm mt-1">Si hypotension réfractaire: Vasopresseurs / Colloïdes.</p>
                    </div>
                  </div>
                </div>
              </Section>

              <Section title="Fluidothérapie" icon="💧">
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 shadow-lg shadow-blue-200 text-white">
                    <div className="absolute top-0 right-0 p-4 opacity-20"><Droplets size={120} /></div>
                    <div className="relative z-10">
                      <div className="text-blue-100 text-sm font-bold uppercase tracking-wider mb-2">Bolus Cristalloïdes Isotoniques</div>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-5xl font-black tracking-tighter">{bolusDisplay}</span>
                        <span className="text-xl font-bold text-blue-100">ml</span>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 text-sm font-medium">
                        Passer en <span className="text-white font-bold">15 minutes</span>. Utiliser des solutés réchauffés.
                      </div>
                    </div>
                  </div>

                  <AlertBox type="info" title="Réévaluation Continue">
                    Arrêter les bolus dès normalisation (TRC &lt; 2s, pouls fort). <br />
                    <strong className="text-blue-700">Chat : Respecter strictement 5-10 ml/kg.</strong>
                  </AlertBox>

                  <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 flex gap-4">
                    <div className="p-2 bg-orange-100 rounded-lg h-fit text-orange-600"><ThermometerSnowflake /></div>
                    <div>
                      <h4 className="font-bold text-orange-800 text-sm uppercase mb-1">Réchauffement Actif</h4>
                      <p className="text-sm text-orange-800/80 leading-snug">
                        L'hypothermie aggrave la coagulopathie. Utiliser tapis chauffants, Bair Hugger... dès l'accès veineux posé.
                      </p>
                    </div>
                  </div>
                </div>
              </Section>

              <Section title="Alternatives" icon="⚖️">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-700">Bolus Colloïdes / Gélatines</h4>
                    <p className="text-xs text-slate-400 mt-1">Si échec cristalloïdes / Hypoprotéinémie</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-slate-800">{gelatineAmount} <span className="text-sm font-bold text-slate-400">ml</span></div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">5 ml/kg (Lent)</div>
                  </div>
                </div>
              </Section>

              <Section title="Sécurité" icon="🛡️">
                <CriticalList
                  items={[
                    "STOP si : tachypnée brutale, crépitants, écoulement nasal séreux.",
                    "Chat : volumes réduits indispensables.",
                    "Pas de vasopresseurs tant que la volémie n'est pas corrigée.",
                  ]}
                />
              </Section>
            </>
          )}

          {tab === "liens" && (
            <>
              <Section title="Sources" icon="📚">
                <LinkList
                  links={[
                    { label: "AAHA Fluid Therapy Guidelines 2024", type: "external" },
                    { label: "ACVECC Guidelines", type: "external" }
                  ]}
                />
              </Section>
            </>
          )}
        </ProtocolContainer>
      )}
    </ProtocolLayout>
  );
};
