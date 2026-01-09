"use client";

import React, { useState } from "react";
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
    Activity,
    Syringe,
    Zap,
    Droplets,
    TestTube
} from "lucide-react";

export const DiabeticKetoacidosis = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;

    // --- CALCULS ---

    // 1. FLUIDOTHERAPIE
    // Besoin de base + Déshydratation.
    const maintenance = w > 0 ? (w * (species === "chat" ? 2 : 4)).toFixed(0) : "0"; // ml/h est (très approximatif ici, à ajuster)

    // 2. INSULINE RAPIDE (Intermittent IM - Protocole simplifié)
    // Initial : 0.2 UI/kg IM
    const insulinInit = w > 0 ? (w * 0.2).toFixed(1) : "--";
    // Suivi : 0.1 UI/kg IM toutes les heures
    const insulinMaintenance = w > 0 ? (w * 0.1).toFixed(1) : "--";

    return (
        <ProtocolLayout title="Acidocétose Diabétique (DKA)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Non, l'insuline n'est pas la priorité !" icon="⚠️">
                                <AlertBox type="critical" title="Urgence = HYPOVOLÉMIE">
                                    1. Remplissage vasculaire (NaCl 0.9%).<br />
                                    2. Correction K+ et Phos.<br />
                                    3. Insuline seulement après 4-6h de fluides et K+ &gt; 3.5 mmol/L.
                                </AlertBox>
                                <div className="mt-4">
                                    <CheckList
                                        items={[
                                            "K+ & Phos : Prioritaire ! Risque mortel si insuline sur hypokaliémie.",
                                            "Glycémie : Objectif baisse lente (< 50-75 mg/dL/h).",
                                            "Cétones : Disparaissent LENTEMENT (24-48h). Ne pas arrêter l'insuline si glycémie normale mais cétones présentes (Mettre dextrose !)."
                                        ]}
                                    />
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Monitoring Intensif" icon="📈">
                            <div className="space-y-4">
                                <AlertBox type="critical" title="Gaz du Sang (pH & Bicarbs)">
                                    Acidose métabolique sévère (pH &lt; 7.1).
                                    <br />
                                    Le Bicarbonate n'est donné que si pH &lt; 7.0-6.9 (Risque aggravement acidose intracellulaire).
                                </AlertBox>
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Bilan Électrolytique</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li><strong>Potassium (K+) :</strong> Souvent normal/haut à l'arrivée, mais CHUTE massivement avec l'insuline.</li>
                                        <li><strong>Phosphore :</strong> Risque d'hémolyse si &lt; 1.0-1.5 mg/dL.</li>
                                        <li><strong>Cétones (Sang/Urine) :</strong> Suivi de la résolution.</li>
                                    </ul>
                                </div>
                                <CheckList
                                    items={[
                                        "Analyse Urinaire : Infection Urinaire fréquente (Culture systématique).",
                                        "Panréatite ? (cPL/fPL) : Facteur déclenchant fréquent."
                                    ]}
                                />
                            </div>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses calculées.</AlertBox>
                            )}

                            <Section title="1. Fluides & Electrolytes" icon="💧">
                                <div className="space-y-4">
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <h4 className="font-bold text-slate-700 mb-2">Supplementation K+ (KCl)</h4>
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs text-slate-500 uppercase bg-slate-100">
                                                <tr>
                                                    <th className="px-2 py-1">K+ Sérique (mmol/L)</th>
                                                    <th className="px-2 py-1">Ajout KCl (mEq/L)</th>
                                                    <th className="px-2 py-1">Débit Max (ml/kg/h)</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-200">
                                                <tr><td className="px-2 py-1">3.0 - 3.5</td><td className="px-2 py-1">30</td><td className="px-2 py-1">16</td></tr>
                                                <tr><td className="px-2 py-1">2.5 - 3.0</td><td className="px-2 py-1">50</td><td className="px-2 py-1">10</td></tr>
                                                <tr><td className="px-2 py-1">2.0 - 2.5</td><td className="px-2 py-1">60</td><td className="px-2 py-1">8</td></tr>
                                                <tr><td className="px-2 py-1">&lt; 2.0</td><td className="px-2 py-1">80</td><td className="px-2 py-1">6</td></tr>
                                            </tbody>
                                        </table>
                                        <p className="text-xs text-slate-500 mt-2">
                                            * Ne jamais dépasser 0.5 mEq/kg/h de débit K+ total (Risque Arrêt Cardiaque).
                                        </p>
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Protocole Insuline (IM Intermittent)" icon="💉">
                                <AlertBox type="info" title="Après réhydratation (H+4)">
                                    Utiliser Insuline Rapide (Actrapid / Humulin R).
                                </AlertBox>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <DosageCard
                                        title="Dose Initiale"
                                        value={insulinInit}
                                        unit="UI"
                                        subtitle="IM strict. Une seule fois."
                                        color="blue"
                                    />
                                    <DosageCard
                                        title="Dose Suivante (Horaire)"
                                        value={insulinMaintenance}
                                        unit="UI"
                                        subtitle="IM toutes les heures. Ajuster selon Glycémie."
                                        color="blue"
                                    />
                                </div>
                                <div className="mt-4 bg-orange-50 p-4 rounded-xl border border-orange-100">
                                    <h4 className="font-bold text-orange-800 mb-2">Ajustement Glycémique</h4>
                                    <ul className="text-sm text-orange-800 space-y-1 list-disc pl-4">
                                        <li><strong>&gt; 2.5 g/L :</strong> Continuer 0.1 UI/kg/h.</li>
                                        <li><strong>1.5 - 2.5 g/L :</strong> Passer à 0.05 UI/kg/h ou espacer q2h.</li>
                                        <li><strong>&lt; 1.5 g/L :</strong> Mettre Dextrose 2.5% ou 5% dans la perf. NE PAS ARRÊTER L'INSULINE TANT QUE CÉTONES POSITIVES.</li>
                                    </ul>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "AAHA Diabetes Guidelines", url: "https://www.aaha.org/aaha-guidelines/diabetes-management/diabetes-management-home/", type: "external" },
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

