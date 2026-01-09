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
    Stethoscope,
    ScanLine,
    Syringe,
    Pill,
    Droplets,
    AlertTriangle,
    Ban,
    Microscope,
    Utensils
} from "lucide-react";

export const Diarrhea = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. SMECTITE (Pansement - Smecta/Montmorillonite)
    // ~ 0.5 - 1 g/kg/jour en 2-3 prises.
    // Souvent : < 10kg=1 sachet, >10kg=2 sachets (Humain 3g).
    // On va donner une estimation en grammes par prise (bid).
    const smectaDose = w > 0 ? (w * 0.5).toFixed(1) : "--"; // g par jour
    // Pas très précis, souvent empirique.

    // 2. METRONIDAZOLE (Flagyl/Metrobactin) - Controversé si aiguë simple.
    // 10-15 mg/kg BID.
    const metroMin = w > 0 ? (w * 10).toFixed(0) : "--";
    const metroMax = w > 0 ? (w * 15).toFixed(0) : "--";

    // 3. PROBIOTIQUES (Fortiflora/Canikur)
    // Dose standard : 1 sachet/jour quelque soit le poids.

    // 4. FLUIDES (AHDS / Choc)
    // Bolus 10-20 ml/kg
    const bolusFluids = w > 0 ? (w * 20).toFixed(0) : "--";

    return (
        <ProtocolLayout title="Diarrhée Aiguë">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Approche Evidence-Based (ACVIM/ENOVAT)" icon="⚖️">
                                <AlertBox type="info" title="Antibiotiques : STOP Automatisme">
                                    La majorité des diarrhées aiguës sont auto-limitantes ou virales.
                                    <br />
                                    Le <strong>Métrnidazole</strong> n'accélère PAS la guérison dans les cas simples et perturbe le microbiote.
                                    <br />
                                    <strong>Indication Antibios :</strong> Sepsis, Parvo, Hémorragie Sévère (AHDS) avec neutropénie, Giardiose confirmée.
                                </AlertBox>
                            </Section>

                            <Section title="Signes d'Alerte (AHDS / Parvo)" icon="🚨">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                                        <strong className="text-red-800 flex items-center gap-2">
                                            <Microscope size={18} /> AHDS (Gastro Hémorragique)
                                        </strong>
                                        <ul className="mt-2 text-sm text-red-700 list-disc pl-4 space-y-1">
                                            <li>Vomissements + Diarrhée "confiture de framboise".</li>
                                            <li>Hémoconcentration massive (PCV &gt; 60%) avec Protéines Totales NORMALES/BASSES.</li>
                                            <li><strong>Urgence Volémique :</strong> Remplissage agressif requis.</li>
                                        </ul>
                                    </div>
                                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                                        <strong className="text-orange-800 flex items-center gap-2">
                                            <AlertTriangle size={18} /> Parvovirose
                                        </strong>
                                        <ul className="mt-2 text-sm text-orange-700 list-disc pl-4 space-y-1">
                                            <li>Chiot &lt; 6 mois, non vacciné.</li>
                                            <li>Abattement sévère, Leucopénie.</li>
                                            <li>Test Snap Parvo +/-.</li>
                                        </ul>
                                    </div>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <>
                            <Section title="Bilan Minimal" icon="🔎">
                                <CheckList
                                    items={[
                                        "Coproscopie (Flottation) : Giardia, Ascaris, Coccidies.",
                                        "Snap Giardia / Parvo (selon contexte).",
                                        "Hématocrite / Protéines Totales (Déshydratation vs AHDS).",
                                        "Toucher Rectal (Sang ? Os ? Masse ?)"
                                    ]}
                                />
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Saisir Poids">
                                    Doses calculées selon le poids.
                                </AlertBox>
                            )}

                            <Section title="1. Nutrition & Microbiote (1ère intention)" icon="🥗">
                                <div className="space-y-4">
                                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                        <h4 className="font-bold text-green-800 flex items-center gap-2">
                                            <Utensils size={18} /> Diète Hyperdigestible
                                        </h4>
                                        <p className="text-sm text-green-700 mt-1">
                                            Riz très cuit, Poulet blanc, ou Aliments Gastro-Intestinal (i/d, Gastro, etc.).
                                            <br />
                                            Petits repas fréquents. Pas de jeûne prolongé sauf vomissements incoercibles.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-blue-600 mb-2 flex items-center gap-2">
                                            <Microscope size={20} /> Probiotiques / Pansements
                                        </h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <DosageCard
                                                title="Probiotiques"
                                                value="1"
                                                unit="dose/j"
                                                subtitle="Fortiflora, Canikur Pro... Efficacité prouvée pour raccourcir la durée."
                                                color="blue"
                                            />
                                            <DosageCard
                                                title="Smectite (Argile)"
                                                value="Empirique"
                                                unit=""
                                                subtitle="Kaolin/Pectine. Adsorbant (Toxines, Eau). À distance des autres meds (2h)."
                                                color="slate"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Antiparasitaires / Antibiotiques" icon="💊">
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-bold text-slate-700 mb-2">Vermifugation</h4>
                                        <p className="text-sm text-slate-600">
                                            Fenbefendazole (Panacur) 50 mg/kg/j pendant 3-5j (Large spectre + Giardia).
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-purple-600 mb-2 flex items-center gap-2">
                                            <Pill size={20} /> Métronidazole (Cas spécifiques)
                                        </h4>
                                        <AlertBox type="warning" title="Késako ?">
                                            Uniquement si : Giardiose clinique, Diarrhée chronique (IBD?), Clostridium perfringens toxigène.
                                        </AlertBox>
                                        <DosageCard
                                            title="Métronidazole PO"
                                            value={`${metroMin} - ${metroMax}`}
                                            unit="mg"
                                            subtitle="BID (Matin/Soir). Neurotoxique à haute dose (>30-60mg/kg/j)."
                                            color="purple"
                                        />
                                    </div>
                                </div>
                            </Section>

                            <Section title="3. Réanimation (AHDS / Choc)" icon="💧">
                                <div className="mb-4">
                                    <h4 className="font-bold text-red-600 mb-2 flex items-center gap-2">
                                        <Droplets size={20} /> Bolus Cristalloïdes
                                    </h4>
                                    <DosageCard
                                        title="Bolus Ringer Lactate"
                                        value={bolusFluids}
                                        unit="ml"
                                        subtitle="Si tachycardie, TRC > 2s, Pouls faible. Répéter jusqu'à stabilisation."
                                        color="red"
                                    />
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "ACVIM Consensus on Diarrhea", type: "external" },
                                    { label: "ENOVAT Guidelines (Antimicrobial)", url: "https://enovat.eu", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

