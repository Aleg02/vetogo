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

export const HypovolemicShock = () => {
  const { weightKg, species } = useAppStore();

  // Safe weight wrapper
  const w = weightKg || 0;
  const isDog = species === "chien";
  const isCat = species === "chat";

  // Calculations
  const bolusVol = isDog ? 20 : 10;
  const bolusAmount = w > 0 ? (w * bolusVol).toFixed(0) : "--";
  const bolusMax = isDog ? 60 : 40;

  const gelatineAmount = w > 0 ? (w * 5).toFixed(0) : "--";

  return (
    <ProtocolLayout title="Choc Hypovolémique">
      {(tab) => (
        <ProtocolContainer>
          {tab === "general" && (
            <>
              <Section title="Définition" icon="📖">
                <p className="font-medium text-slate-700">
                  Défaillance circulatoire aiguë liée à une diminution du volume intravasculaire effectif, entraînant une hypoperfusion tissulaire et une hypoxie cellulaire.
                </p>
              </Section>

              <Section title="Signes Clés (Les 6 P)" icon="🚨">
                <CheckList items={[
                  "Pâleur des muqueuses",
                  "Pouls filant ou absent",
                  "Pression artérielle basse (Hypotension)",
                  "Précipitation respiratoire (Tachypnée)",
                  "Perte de chaleur (Hypothermie)",
                  "Prostration (Altération conscience)"
                ]} />
                <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600">
                  <strong className="block mb-1 text-slate-800">TRC (Temps de Recoloration Capillaire)</strong>
                  {">"} 2 secondes = Signe précoce de choc.
                </div>
              </Section>

              <Section title="Objectifs" icon="🎯">
                <ul className="list-disc pl-5 space-y-2 text-slate-700">
                  <li>Restaurer la volémie efficace.</li>
                  <li>Normaliser les paramètres de perfusion (Lactates, TRC, PA).</li>
                  <li>Identifier et traiter la cause sous-jacente (Hémorragie, Pertes digestives...).</li>
                </ul>
              </Section>
            </>
          )}

          {tab === "examens" && (
            <>
              <Section title="Bilan d'Urgence" icon="⚡">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
                    <div className="text-xs uppercase text-slate-500 font-bold">Lactates</div>
                    <div className="text-xl font-black text-slate-800">{">"} 2.5</div>
                    <div className="text-[10px] text-slate-400">mmol/L</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
                    <div className="text-xs uppercase text-slate-500 font-bold">MAP</div>
                    <div className="text-xl font-black text-slate-800">{"<"} 60-80</div>
                    <div className="text-[10px] text-slate-400">mmHg</div>
                  </div>
                </div>
                <CheckList items={[
                  "Hématocrite / Protéines Totales (Avant fluides !)",
                  "Ionogramme (Na+, K+, Cl-)",
                  "Gaz du sang (pH, Reserve alcaline)",
                  "Échographie A-FAST / T-FAST (Recherche épanchement)"
                ]} />
              </Section>

              <AlertBox type="warning" title="Surveillance Continue">
                Réévaluer le patient toutes les <strong>10–15 minutes</strong> pendant la phase de stabilisation.<br />
                Attention à la surcharge volumique (crépitants, tachypnée).
              </AlertBox>
            </>
          )}

          {tab === "traitements" && (
            <>
              {!w && (
                <AlertBox type="warning" title="Poids Manquant">
                  Veuillez renseigner le poids du patient (en haut) pour calculer les doses précises.
                </AlertBox>
              )}

              <Section title="Fluidothérapie" icon="💧">
                <div className="space-y-4">
                  <DosageCard
                    title="Bolus Cristalloïdes IV"
                    value={bolusAmount}
                    unit="ml"
                    color="blue"
                    icon="💉"
                    subtitle={
                      <span>
                        <strong>{bolusVol} ml/kg</strong> (NaCl 0.9% ou Ringer Lactate)<br />
                        À passer en 10 minutes.
                      </span>
                    }
                  />

                  <AlertBox type="info">
                    Répéter jusqu'à stabilisation (Max: <strong>{bolusMax} ml/kg</strong>).
                  </AlertBox>
                </div>
              </Section>

              <Section title="Alternative Colloïdes" icon="🩸">
                <DosageCard
                  title="Bolus Colloïdes / Gélatines"
                  value={gelatineAmount}
                  unit="ml"
                  color="slate"
                  subtitle={
                    <span>
                      <strong>5 ml/kg</strong> (Si échec cristalloïdes ou hypotension réfractaire)
                    </span>
                  }
                />
              </Section>

              <Section title="Contre-indications" icon="🚫">
                <CriticalList items={[
                  "Pas de Vasopresseurs tant que la volémie n'est pas corrigée.",
                  "Ne pas utiliser de solutés hypotoniques (G5%).",
                  "Attention aux patients cardiaques (réduire bolus par 2)."
                ]} />
              </Section>
            </>
          )}

          {tab === "liens" && (
            <>
              <Section title="Sources" icon="📚">
                <LinkList links={[
                  { label: "ACVECC Guidelines 2023", type: "external" },
                  { label: "VECCS Consensus on Shock", type: "external" }
                ]} />
              </Section>

              <Section title="Voir aussi" icon="🔗">
                <LinkList links={[
                  { label: "Choc Hémorragique", type: "protocol" },
                  { label: "Choc Septique", type: "protocol" }
                ]} />
              </Section>
            </>
          )}
        </ProtocolContainer>
      )}
    </ProtocolLayout>
  );
};

