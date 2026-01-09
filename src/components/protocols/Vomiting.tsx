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
    Ban
} from "lucide-react";

export const Vomiting = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. MAROPITANT (Cerenia/Prevomax) - NK1 Antagoniste
    // 1 mg/kg SC/IV (Chat/Chien)
    const maropitantDose = w > 0 ? (w * 1).toFixed(2) : "--"; // mg
    const maropitantVol = w > 0 ? (w * 1 / 10).toFixed(2) : "--"; // ml (10 mg/ml)

    // 2. METOCLOPRAMIDE (Emeprid) - Prokinétique
    // 0.5 mg/kg SC/IM/IV toutes les 6-8h
    const metocloDose = w > 0 ? (w * 0.5).toFixed(2) : "--"; // mg
    const metocloVol = w > 0 ? (w * 0.5 / 5).toFixed(2) : "--"; // ml (5 mg/ml)
    // CRI : 1-2 mg/kg/j -> 0.04 - 0.08 mg/kg/h

    // 3. ONDANSETRON (Zophren) - 5HT3 Antagoniste
    // 0.2 - 0.5 mg/kg IV/PO bid/tid
    const ondansetronMin = w > 0 ? (w * 0.2).toFixed(2) : "--";
    const ondansetronMax = w > 0 ? (w * 0.5).toFixed(2) : "--";
    // Ampoule 2 mg/ml souvent.
    const ondansetronVolMax = w > 0 ? (w * 0.5 / 2).toFixed(2) : "--";

    // 4. FLUIDES (Déshydratation)
    // Maintien chien : 2-3 ml/kg/h | Chat : 1.5-2 ml/kg/h
    // On affiche juste le bolus si choc : 10-20 ml/kg
    const bolusFluids = w > 0 ? (w * 10).toFixed(0) : "--";

    return (
        <ProtocolLayout title="Vomissements Aigus Sévères">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Règle n°1 : Obstructif ?" icon="🚧">
                                <AlertBox type="critical" title="Stop Prokinétiques !">
                                    AVANT de donner du Métoclopramide (Emeprid), il faut <strong>EXCLURE</strong> un corps étranger digestif.
                                    <br />
                                    Risque de perforation si occlusion mécanique.
                                </AlertBox>
                                <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                                    <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                                        <ScanLine size={20} /> Signes d'Occlusion
                                    </h4>
                                    <ul className="list-disc pl-4 text-sm text-orange-700 space-y-1">
                                        <li>Vomissements en jet / Incoercibles.</li>
                                        <li>Douleur abdominale focale.</li>
                                        <li>Absence de selles.</li>
                                        <li>Palpation : Anse dilatée, Masse, Douleur.</li>
                                        <li>Radio : Image de "gravier", IlÉus segmentaire, Corps étranger.</li>
                                    </ul>
                                </div>
                            </Section>

                            <Section title="Approche Diagnostique" icon="🔎">
                                <CheckList
                                    items={[
                                        "Palpation abdominale (Souple ? Tendu ?)",
                                        "Hydratation (Pli de peau, Muqueuses)",
                                        "Fièvre ? (Gastro-entérite, Pancréatite, Pyomètre)",
                                        "Radio Abdominale (Si doute occlusion)",
                                        "Echo Rapide (Pancréate ? Liquide libre ?)",
                                        "Bilan Sanguin (Urée/Créat/ALAT/PAL/Ions) si abattu."
                                    ]}
                                />
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <>
                            <Section title="Diagnostics Différentiels" icon="list">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white p-3 border rounded shadow-sm">
                                        <strong className="text-red-600 block mb-1">Causes Digestives</strong>
                                        <ul className="text-sm text-slate-600 list-disc pl-4">
                                            <li>Gastro-entérite (Indiscrétion)</li>
                                            <li>Corps Étranger / Occlusion</li>
                                            <li>Pancréatite Aiguë (Douleur ++, Lipase +)</li>
                                            <li>Parvovirose (Jeune, Diarrhée sang)</li>
                                            <li>AHDS (Gastro hémorragique)</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white p-3 border rounded shadow-sm">
                                        <strong className="text-blue-600 block mb-1">Causes Extra-Digestives</strong>
                                        <ul className="text-sm text-slate-600 list-disc pl-4">
                                            <li>Insuffisance Rénale Aiguë/Chr (Urée uremic)</li>
                                            <li>Hépatite / Cholangite</li>
                                            <li>Pyomètre (Femelle intacte)</li>
                                            <li>Addison (Crise - Na/K ?)</li>
                                            <li>Cétoacidose Diabétique</li>
                                        </ul>
                                    </div>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Saisir Poids">
                                    Doses anti-vomitives calculées selon le poids.
                                </AlertBox>
                            )}

                            <Section title="1. Antiemétiques (Symptomatique)" icon="💊">
                                <div className="space-y-6">
                                    {/* MAROPITANT */}
                                    <div>
                                        <h4 className="font-bold text-green-600 mb-2 flex items-center gap-2">
                                            <Syringe size={20} /> Maropitant (Cerenia)
                                        </h4>
                                        <DosageCard
                                            title="Maropitant SC / IV"
                                            value={maropitantDose}
                                            unit="mg"
                                            subtitle={
                                                <span>
                                                    Vol (10mg/ml) : <strong>{maropitantVol} ml</strong>.
                                                    <br />
                                                    1x / jour. Sans douleur à l'injection si IV lent. SC douloureux (froid).
                                                    <br />
                                                    Analgésie viscérale (NK1). Idéal Pancréatite.
                                                </span>
                                            }
                                            color="blue"
                                        />
                                    </div>

                                    {/* METOCLOPRAMIDE */}
                                    <div>
                                        <h4 className="font-bold text-blue-600 mb-2 flex items-center gap-2">
                                            <Syringe size={20} /> Métoclopramide (Prokinétique)
                                        </h4>
                                        <AlertBox type="critical" title="CONTRE-INDICATON">
                                            Ne PAS utiliser si suspicion d'OCCLUSION.
                                        </AlertBox>
                                        <DosageCard
                                            title="Métoclopramide SC/IM/IV"
                                            value={metocloDose}
                                            unit="mg"
                                            subtitle={
                                                <span>
                                                    Vol (5mg/ml) : <strong>{metocloVol} ml</strong>.
                                                    <br />
                                                    Toutes les 6-8h.
                                                </span>
                                            }
                                            color="blue"
                                        />
                                    </div>

                                    {/* ONDANSETRON */}
                                    <div>
                                        <h4 className="font-bold text-purple-600 mb-2 flex items-center gap-2">
                                            <Pill size={20} /> Ondansétron (Zophren) - 2nde ligne
                                        </h4>
                                        <DosageCard
                                            title="Ondansétron IV"
                                            value={`${ondansetronMin} - ${ondansetronMax}`}
                                            unit="mg"
                                            subtitle="0.2 à 0.5 mg/kg. Si vomissements réfractaires au Maropitant. Très puissant (5HT3)."
                                            color="purple"
                                        />
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Fluidothérapie" icon="💧">
                                <div className="mb-4">
                                    <h4 className="font-bold text-blue-500 mb-2 flex items-center gap-2">
                                        <Droplets size={20} /> Remplissage (si déshydraté)
                                    </h4>
                                    <DosageCard
                                        title="Bolus Cristalloïdes"
                                        value={bolusFluids}
                                        unit="ml"
                                        subtitle="10 ml/kg sur 15 min. Répéter si pli de peau persistant ou tachycardie."
                                        color="blue"
                                    />
                                </div>
                                <CheckList
                                    items={[
                                        "Corriger la déshydratation est PRIORITAIRE.",
                                        "L'hypovolémie aggrave la nausée (ischémie splanchnique).",
                                        "Si vomissements perdurent : Mettre à jeun 12h-24h (Discuté, la nutrition précoce est mieux si tolérée).",
                                        "Réintroduction progressive eau puis aliment hyperdigestible."
                                    ]}
                                />
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "ACVIM Consensus on Pancreatitis", type: "external" },
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

