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
    Syringe,
    Droplets,
    Activity,
    HeartPulse,
    Ban,
    AlertTriangle
} from "lucide-react";

export const UrinaryObstruction = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. HYPERKALIÉMIE (Protection Cardiaque)
    // Gluconate de Calcium 10% : 0.5 - 1 ml/kg IV LENT (sur 3-5 min) - Monitoring ECG !
    const calcGlucoMin = w > 0 ? (w * 0.5).toFixed(1) : "--";
    const calcGlucoMax = w > 0 ? (w * 1).toFixed(1) : "--";

    // 2. HYPERKALIÉMIE (Shift Intracellulaire)
    // Insuline Rapide (Actrapid) : 0.5 U / chat (ou 0.1 U/kg)
    // Glucose 50% : 1-2 g par unité d'insuline.
    // Protocole Chat Standard : 0.5 U IV + 2g Glucose (4ml G50%).
    // Protocole Chien/Poids : 0.1 U/kg + 0.5g Dextrose/kg

    const insulinDose = w > 0 ? (isCat ? "0.5" : (w * 0.1).toFixed(1)) : "--"; // U
    const dextroseG50Vol = w > 0 ? (isCat ? "4" : (w * 1).toFixed(0)) : "--"; // ml de G50% (0.5g/kg Chien ~= 1ml/kg G50%)

    // 3. SEDATION (Protocole "Blocked Cat")
    // Buprenorphine 0.02 mg/kg
    const bupreDose = w > 0 ? (w * 0.02).toFixed(2) : "--";
    // Diazepam/Midazolam 0.2 mg/kg
    const benzoDose = w > 0 ? (w * 0.2).toFixed(2) : "--";
    // Propofol / Alfaxalone à effet

    return (
        <ProtocolLayout title="Obstruction Urinaire Aiguë (Globe)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="La Menace : Hyperkaliémie" icon="⚡">
                                <AlertBox type="critical" title="Urgence Vitale">
                                    L'arrêt cardiaque est dû au Potassium (K+).
                                    <br />
                                    <strong>ECG Immédiat :</strong> Ondes T pointues, bradycardie, QRS larges, absence d'ondes P.
                                </AlertBox>
                                <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100">
                                    <h4 className="font-bold text-red-900 flex items-center gap-2">
                                        <Activity size={20} /> Protection Cardiaque (Si Bradycardie)
                                    </h4>
                                    <p className="text-sm text-red-800 mt-1">
                                        Si FC &lt; 120 (Chat) ou troubles ECG :
                                        <br />
                                        <strong>Gluconate de Calcium 10%</strong> en urgence absolue avant sédation.
                                    </p>
                                </div>
                            </Section>

                            <Section title="Etape Clé : Décompression" icon="💉">
                                <CheckList
                                    items={[
                                        "Cystocentèse Décompressive : Recommandée AVANT sondage.",
                                        "Soulage la douleur et la contre-pression rénale.",
                                        "Facilite le sondage ultérieur (moins de résistance).",
                                        "Prélèvement stérile pour analyse.",
                                        "Risque de rupture quasi nul si bonne contention."
                                    ]}
                                />
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <>
                            <Section title="Bilan d'Urgence" icon="🔬">
                                <div className="space-y-2 text-sm text-slate-700">
                                    <p><strong>1. Ionogramme (K+) :</strong> Priorité absolue.</p>
                                    <p><strong>2. Créatinine / Urée :</strong> Evaluer l'insuffisance rénale post-rénale.</p>
                                    <p><strong>3. Culot Urinaire :</strong> Cristaux ? (Struvites vs Oxalates) Infection ?</p>
                                    <p><strong>4. Pression Artérielle :</strong> Souvent hypertension douleur ou hypotension choc.</p>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Saisir Poids">
                                    Doses calculées.
                                </AlertBox>
                            )}

                            <Section title="1. Gestion Hyperkaliémie (K+ Elevé)" icon="💓">
                                <div className="space-y-6">
                                    {/* CALCIUM */}
                                    <div>
                                        <h4 className="font-bold text-red-600 mb-2 flex items-center gap-2">
                                            <Activity size={20} /> Protection (Ne baisse pas le K+)
                                        </h4>
                                        <DosageCard
                                            title="Gluconate de Calcium 10%"
                                            value={`${calcGlucoMin} - ${calcGlucoMax}`}
                                            unit="ml"
                                            subtitle="IV LENT (3-5 min) sous ECG. Protège le coeur 20-30 min."
                                            color="red"
                                        />
                                    </div>

                                    {/* INSULINE / GLUCOSE */}
                                    <div>
                                        <h4 className="font-bold text-blue-600 mb-2 flex items-center gap-2">
                                            <Syringe size={20} /> "Chasser" le Potassium
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <DosageCard
                                                title="Insuline Rapide (Actrapid)"
                                                value={insulinDose}
                                                unit="UI"
                                                subtitle="IV. Fait entrer le K+ dans les cellules."
                                                color="blue"
                                            />
                                            <DosageCard
                                                title="Glucose 50% (G50)"
                                                value={dextroseG50Vol}
                                                unit="ml"
                                                subtitle="IV. Prévient l'hypoglycémie. Diluer 1:4 avant injection si possible."
                                                color="blue"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Sédation & Sondage" icon="🌙">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DosageCard
                                        title="Buprénorphine"
                                        value={bupreDose}
                                        unit="mg"
                                        subtitle="IV/IM. Analgésie essentielle."
                                        color="purple"
                                    />
                                    <DosageCard
                                        title="Midazolam/Diazépam"
                                        value={benzoDose}
                                        unit="mg"
                                        subtitle="IV. Myorelaxant strié."
                                        color="purple"
                                    />
                                </div>
                                <AlertBox type="info" title="Sondage">
                                    Utiliser sonde tomcat (open/closed) juste pour débloquer, puis sonde souple (Slippery Sam) pour demeure.
                                </AlertBox>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "Management of the Blocked Cat", type: "external" },
                                    { label: "Plumb's Veterinary Drugs", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

