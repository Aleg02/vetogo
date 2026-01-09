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
    Pill,
    Droplets,
    AlertOctagon,
    Utensils,
    RefreshCw
} from "lucide-react";

export const ChronicKidneyDisease = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. CHELATEURS PHOSPHORE
    // Hydroxyde Aluminium : 10 - 30 mg/kg
    const aluMin = w > 0 ? (w * 10).toFixed(0) : "--";
    const aluMax = w > 0 ? (w * 30).toFixed(0) : "--";
    // Sevelamer : 30 - 40 mg/kg
    const seveMin = w > 0 ? (w * 30).toFixed(0) : "--";
    const seveMax = w > 0 ? (w * 40).toFixed(0) : "--";

    // 2. ANTI-EMETIQUES
    // Maropitant (Cerenia) : 1 mg/kg IV/SQ
    const maropitantDose = w > 0 ? (w * 1).toFixed(1) : "--";
    // Ondansetron : 0.5 - 1 mg/kg
    const ondaMin = w > 0 ? (w * 0.5).toFixed(1) : "--";
    const ondaMax = w > 0 ? (w * 1).toFixed(1) : "--";

    // 3. APPETIT STIMULANTS
    // Mirtazapine (Mirataz)
    // Chat : 2 mg (Ruban 3.8 cm) par oreille q24h.
    // Chien : 0.6 - 1 mg/kg q24h.
    const mirtaDog = w > 0 ? (w * 0.6).toFixed(1) : "--";

    // Capromorelin (Entyce/Elura)
    // Chien : 3 mg/kg eq 0.1 ml/kg
    // Chat : 2 mg/kg eq 0.1 ml/kg
    const caproVol = w > 0 ? (w * 0.1).toFixed(2) : "--";
    const caproDose = w > 0 ? (w * (isDog ? 3 : 2)).toFixed(1) : "--";


    return (
        <ProtocolLayout title="IRC Décompensée (Crise Urémique)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Objectif Crise" icon="🛑">
                                <AlertBox type="warning" title="Le cercle vicieux">
                                    Déshydratation &rarr; Baisse perfs rénale &rarr; Augmentation Toxines &rarr; Nausée &rarr; Anorexie/Vomis &rarr; Déshydratation.
                                </AlertBox>
                                <div className="mt-4">
                                    <CheckList
                                        items={[
                                            "Rétablir l'hydratation (IV) avec précaution (Surcharge !).",
                                            "Stopper les vomissements (Cerenia + Ondansetron).",
                                            "Contrôler le phosphore (Chélateurs).",
                                            "Reprise alimentaire assistée (Sonde nasée si besoin).",
                                            "Surveiller Hypertension & Protéinurie (Une fois stable)."
                                        ]}
                                    />
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Staging IRIS (Une fois stable)" icon="📊">
                            <div className="space-y-4">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Les 3 Piliers du Staging</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li><strong>1. Créatinine / SDMA :</strong> Définit le Stade (1 à 4). Toujours vérifier à jeun et hydraté.</li>
                                        <li><strong>2. Protéinurie (UPC) :</strong> Ratio Protéine/Créatinine urinaire. (Normal &lt; 0.2).</li>
                                        <li><strong>3. Pression Artérielle :</strong> Cible &lt; 140 mmHg (Systolique). Risque lésions organes cibles (Œil, Cœur, Rein, Cerveau).</li>
                                    </ul>
                                </div>
                                <CheckList
                                    items={[
                                        "Analyse Urinaire : Densité (USG) isosthénurique (1.008-1.012). Sédiment inactif ?",
                                        "Culture Urinaire : Pyélonéphrite occulte ?",
                                        "Phosphore : Cible thérapeutique dépend du stade IRIS."
                                    ]}
                                />
                            </div>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses calculées.</AlertBox>
                            )}

                            <Section title="1. Nausée & Vomissements" icon="💉">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DosageCard
                                        title="Maropitant (Cerenia)"
                                        value={maropitantDose}
                                        unit="mg"
                                        subtitle="SC ou IV (Lent). q24h. Douleur injection SC."
                                        color="blue"
                                    />
                                    <DosageCard
                                        title="Ondansetron (Zophren)"
                                        value={`${ondaMin} - ${ondaMax}`}
                                        unit="mg"
                                        subtitle="IV ou PO. q8-12h. Synergie avec Cerenia pour nausée sévère."
                                        color="blue"
                                    />
                                </div>
                            </Section>

                            <Section title="2. Hyperphosphatémie" icon="💊">
                                <p className="text-sm text-slate-700 mb-2">
                                    A débuter dès que l'animal mange. Objectif Phos &lt; 1.6 mmol/L (IRIS).
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DosageCard
                                        title="Hydroxyde Aluminium"
                                        value={`${aluMin} - ${aluMax}`}
                                        unit="mg"
                                        subtitle="PO MELANGÉ au repas (TID). Antiacide phosphate binder."
                                        color="green"
                                    />
                                    <DosageCard
                                        title="Sevelamer (Renagel)"
                                        value={`${seveMin} - ${seveMax}`}
                                        unit="mg"
                                        subtitle="PO MELANGÉ au repas (TID). Si Aluminium inefficace ou Calcium élevé."
                                        color="green"
                                    />
                                </div>
                            </Section>

                            <Section title="3. Stimulants Appétit" icon="🍽️">
                                {isCat && (
                                    <DosageCard
                                        title="Mirtazapine Transdermique (Mirataz)"
                                        value="2 mg"
                                        unit="Ruban 3.8 cm"
                                        subtitle="Sur l'oreille interne q24h. Efficace +++ Chat."
                                        color="purple"
                                    />
                                )}
                                {isDog && (
                                    <DosageCard
                                        title="Mirtazapine PO"
                                        value={mirtaDog}
                                        unit="mg"
                                        subtitle="PO q24h. Attention effets sérotoninergiques."
                                        color="purple"
                                    />
                                )}
                                <div className="mt-4">
                                    <DosageCard
                                        title="Capromorelin (Entyce/Elura)"
                                        value={caproVol}
                                        unit="ml"
                                        subtitle={<span>3 mg/kg (Chien) ou 2 mg/kg (Chat). <strong>{caproDose} mg</strong>. PO q24h.</span>}
                                        color="purple"
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
                                    { label: "IRIS Staging & Treatment", url: "http://www.iris-kidney.com/guidelines/staging.html", type: "external" },
                                    { label: "Plumbs Veterinary Drugs", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

