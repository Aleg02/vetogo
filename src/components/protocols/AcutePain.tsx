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
    Zap,
    Activity,
    Syringe,
    Thermometer,
    Cat,
    Dog,
    HeartPulse,
    Scale
} from "lucide-react";

export const AcutePain = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. OPIOIDES AGONISTES PURS (Methadone / Morphine)
    // Methadone: 0.1 - 0.2 mg/kg IV/IM (jusqu'à 0.4 si douleur sévère)
    const methadoneMin = w > 0 ? (w * 0.1).toFixed(2) : "--";
    const methadoneMax = w > 0 ? (w * 0.2).toFixed(2) : "--";
    const methadoneVolMin = w > 0 ? (w * 0.1 / 10).toFixed(2) : "--"; // Conc 10 mg/ml
    const methadoneVolMax = w > 0 ? (w * 0.2 / 10).toFixed(2) : "--";

    // Morphine: 0.2 - 0.5 mg/kg
    const morphineMin = w > 0 ? (w * 0.2).toFixed(2) : "--";
    const morphineMax = w > 0 ? (w * 0.5).toFixed(2) : "--";

    // 2. KETAMINE (Co-analgésie / "Low Dose")
    // Bolus: 0.5 mg/kg
    const ketaBolus = w > 0 ? (w * 0.5).toFixed(2) : "--";
    // CRI: 0.6 mg/kg/h (10 mcg/kg/min)

    // 3. LIDOCAINE (CHIEN UNIQUEMENT)
    // Bolus: 1 mg/kg
    // CRI: 25-50 mcg/kg/min

    return (
        <ProtocolLayout title="Douleur Aiguë Sévère">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Évaluation de la Douleur" icon="📏">
                                <AlertBox type="info" title="Échelles Validées">
                                    L'évaluation DOIT être objective et répétée.
                                    <br />
                                    <strong>Chien :</strong> Glasgow Composite Pain Scale (CMPS-SF). Seuil intervention &gt; 6/24.
                                    <br />
                                    <strong>Chat :</strong> Feline Grimace Scale (FGS). Seuil intervention &gt; 4/10.
                                </AlertBox>
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <div className="font-bold flex items-center gap-2 mb-2 text-slate-700">
                                            <Dog size={18} /> Glasgow (Chien)
                                        </div>
                                        <ul className="text-sm text-slate-600 list-disc pl-4 space-y-1">
                                            <li>Vocalise ?</li>
                                            <li>Attention à la plaie ?</li>
                                            <li>Postoure anormale ?</li>
                                            <li>Réponse à la palpation ?</li>
                                        </ul>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <div className="font-bold flex items-center gap-2 mb-2 text-slate-700">
                                            <Cat size={18} /> Grimace Scale (Chat)
                                        </div>
                                        <ul className="text-sm text-slate-600 list-disc pl-4 space-y-1">
                                            <li>Position des oreilles ?</li>
                                            <li>Yeux fermés ?</li>
                                            <li>Museau tendu ?</li>
                                            <li>Moustache droites/avancées ?</li>
                                        </ul>
                                    </div>
                                </div>
                            </Section>

                            <Section title="Concept Multi-Modal" icon="🧩">
                                <div className="text-slate-600 space-y-2">
                                    <p>
                                        Pour les douleurs sévères, un seul médicament ne suffit pas. Il faut cibler plusieurs récepteurs :
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold">Opioïdes (Mu)</span>
                                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold">Kétamine (NMDA)</span>
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">Lidocaïne (Na+)</span>
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">Alpha-2 (Adréno)</span>
                                    </div>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <>
                            <Section title="Paramètres Physio" icon="🩺">
                                <CheckList
                                    items={[
                                        "Tachycardie ? (Douleur sympathique)",
                                        "Hypertension ? (Douleur sympathique)",
                                        "Tachypnée / Polypnée ?",
                                        "Pupilles dilatées (mydriase) ?"
                                    ]}
                                />
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Attention">
                                    Saisissez le poids pour les doses d'analgésie.
                                </AlertBox>
                            )}

                            <Section title="1. Opioïdes (La Base)" icon="💉">
                                <div className="space-y-6">
                                    {/* METHADONE */}
                                    <div>
                                        <h4 className="font-bold text-red-600 mb-2 flex items-center gap-2">
                                            <Syringe size={20} /> Méthadone
                                        </h4>
                                        <DosageCard
                                            title="Méthadone IV/IM"
                                            value={`${methadoneMin} - ${methadoneMax}`}
                                            unit="mg"
                                            subtitle={
                                                <span>
                                                    Volume : <strong>{methadoneVolMin}-{methadoneVolMax} ml</strong> (10 mg/ml)
                                                    <br />
                                                    Agoniste Mu pur. Moins de vomissements que Morphine. Durée 4h.
                                                </span>
                                            }
                                            color="red"
                                        />
                                    </div>

                                    {/* MORPHINE */}
                                    <div>
                                        <h4 className="font-bold text-red-800 mb-2">Alternative : Morphine</h4>
                                        <p className="text-sm text-slate-700 bg-white p-3 border rounded mb-2">
                                            Dose : <strong>{morphineMin}-{morphineMax} mg</strong>. Attention histamino-libération si IV rapide (hypotension). Préférer IM.
                                        </p>
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Adjuvants (CRI)" icon="💧">
                                {/* KETAMINE */}
                                <div className="mb-4">
                                    <h4 className="font-bold text-purple-600 mb-2 flex items-center gap-2">
                                        <Zap size={20} /> Kétamine "Low Dose"
                                    </h4>
                                    <DosageCard
                                        title="Bolus (Charge)"
                                        value={ketaBolus}
                                        unit="mg"
                                        subtitle="IV lent. Prévient l'hyperalgésie centrale (NMDA)."
                                        color="purple"
                                    />
                                </div>

                                {/* LIDOCAINE */}
                                {isDog && (
                                    <div className="mb-4">
                                        <h4 className="font-bold text-blue-600 mb-2 flex items-center gap-2">
                                            <Activity size={20} /> Lidocaïne (Chien Seulement)
                                        </h4>
                                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                            <strong className="text-blue-900">Protocole MLK (Morphine-Lidocaïne-Kétamine)</strong>
                                            <p className="text-sm mt-1 text-blue-700">
                                                La Lidocaïne systémique est un analgésique viscéral puissant et anti-inflammatoire.
                                                <br />
                                                <span className="font-bold">Bolus :</span> 1 mg/kg IV lent.
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {isCat && (
                                    <AlertBox type="critical" title="Péril Félin">
                                        <strong>JAMAIS de Lidocaïne IV chez le chat.</strong>
                                        <br />
                                        Risque de dépression myocardique sévère et collapsus.
                                    </AlertBox>
                                )}
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "WSAVA Global Pain Council Guidelines", url: "https://wsava.org", type: "external" },
                                    { label: "Feline Grimace Scale", url: "https://www.felinegrimacescale.com", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};
