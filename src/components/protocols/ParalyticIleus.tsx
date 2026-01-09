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
    Activity,
    Syringe,
    Ban,
    Utensils,
    Zap
} from "lucide-react";

export const ParalyticIleus = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. METOCLOPRAMIDE CRI (1-2 mg/kg/j)
    // Target : 2 mg/kg/j
    const metoTotalMg = w > 0 ? (w * 2).toFixed(1) : "--";
    const metoVol = w > 0 ? (w * 2 / 5).toFixed(2) : "--"; // 5mg/ml

    // 2. LIDOCAINE CRI (Chien) : 25-50 mcg/kg/min
    // Target : 30 mcg/kg/min = 1.8 mg/kg/h ?
    // 30 * 60 = 1800 mcg/kg/h = 1.8 mg/kg/h.
    const lidoRateMg = w > 0 ? (w * 1.8).toFixed(1) : "--";
    const lidoVol = w > 0 ? (w * 1.8 / 20).toFixed(2) : "--"; // 20mg/ml (2%)

    // 3. CISAPRIDE (PO)
    // 0.5 mg/kg TID
    const cisaprideDose = w > 0 ? (w * 0.5).toFixed(1) : "--";

    return (
        <ProtocolLayout title="Iléus Paralytique Post-Op">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Pré-requis Absolu" icon="🚫">
                                <AlertBox type="critical" title="Exclure Obstruction Mécanique">
                                    <strong>Ne jamais stimuler un intestin bouché.</strong>
                                    <br />
                                    Confirmer l'absence d'obstruction (Echo/Radio) avant de lancer les prokinétiques.
                                    <br />
                                    <em>Causes fréquentes Iléus :</em> Douleur, Opioïdes, Hypokaliémie, Péritonite.
                                </AlertBox>
                            </Section>

                            <Section title="Stratégie" icon="📉">
                                <CheckList
                                    items={[
                                        "1. Analgésie Multimodale (Réduire Opioïdes si possible, mais traiter la douleur).",
                                        "2. Correction Électrolytes (K+, Mg++).",
                                        "3. Nutrition Entérale Précoce (Sonde NE).",
                                        "4. Prokinétiques (CRI Métoclopramide +/- Lidocaïne chien).",
                                        "5. Décompression Nasogastrique (Si estomac dilaté liquide/gaz)."
                                    ]}
                                />
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Est-ce bouché ou paralysé ?" icon="❓">
                            <div className="space-y-4">
                                <AlertBox type="info" title="A-FAST (Suivi)">
                                    Vérifier l'accumulation de liquide libre (Péritonite ? Dehiscence ?).
                                </AlertBox>
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Radiographie</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li><strong>Iléus Mécanique :</strong> Dilatation segmentaire (une partie dilatée, l'autre normale).</li>
                                        <li><strong>Iléus Fonctionnel :</strong> Dilatation gazeuse généralisée (tout l'intestin est un peu dilaté).</li>
                                    </ul>
                                </div>
                                <CheckList
                                    items={[
                                        "Ionogramme : Hypokaliémie ? (Cause fréquente d'iléus).",
                                        "Douleur : Une douleur mal gérée paralyse le transit (Hypertonie sympathique)."
                                    ]}
                                />
                            </div>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses CRI calculées.</AlertBox>
                            )}

                            <Section title="1. Prokinétiques Injectables (CRI)" icon="💉">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-bold text-blue-600 mb-2">Métoclopramide (CRI)</h4>
                                        <DosageCard
                                            title="Dose Journalière (2 mg/kg/j)"
                                            value={metoTotalMg}
                                            unit="mg/24h"
                                            subtitle={
                                                <span>
                                                    Vol (5mg/ml) : <strong>{metoVol} ml</strong> à passer en 24h.
                                                    <br />
                                                    A diluer dans la perfusion ou pousse-seringue.
                                                </span>
                                            }
                                            color="blue"
                                        />
                                    </div>
                                    {isDog && (
                                        <div>
                                            <h4 className="font-bold text-red-600 mb-2">Lidocaïne (CRI Chien)</h4>
                                            <DosageCard
                                                title="Vitesse (30 mcg/kg/min)"
                                                value={lidoRateMg}
                                                unit="mg/h"
                                                subtitle={
                                                    <span>
                                                        Vol (20mg/ml) : <strong>{lidoVol} ml/h</strong> (Pur).
                                                        <br />
                                                        Synergie analgésique & prokinétique. Arrêter si neurotox (Tremblements).
                                                    </span>
                                                }
                                                color="red"
                                            />
                                        </div>
                                    )}
                                </div>
                            </Section>

                            <Section title="2. Relais Oral" icon="⚡">
                                <DosageCard
                                    title="Cisapride (Si dispo)"
                                    value={cisaprideDose}
                                    unit="mg"
                                    subtitle="PO TID. Prokinétique puissant (Colon inclus)."
                                    color="green"
                                />
                            </Section>

                            <Section title="3. Nutrition (Le Moteur)" icon="🍽️">
                                <AlertBox type="info" title="Early Feeding">
                                    La présence d'aliments dans le tube digestif est le meilleur stimulant moteur.
                                    <br />
                                    Micro-repas (1/4 RER) dès le réveil.
                                    <br />
                                    Si vomissements sur iléus gastrique &rarr; Décompression sonde nasée.
                                </AlertBox>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "ACVS Post-Op Ileus", type: "external" },
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

