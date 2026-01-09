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
    Pill,
    Droplets,
    Activity,
    RefreshCw // Recirculation
} from "lucide-react";

export const NSAIDPoisoning = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;

    // --- CALCULS ---

    // 1. MISOPROSTOL (Cytotec)
    // 1-3 mcg/kg (microgrammes !)
    // Attention, tablets souvent 200 mcg.
    const misoMin = w > 0 ? (w * 1).toFixed(0) : "--";
    const misoMax = w > 0 ? (w * 3).toFixed(0) : "--";

    // 2. CHARBON ACTIVÉ (Multi-doses)
    // 1 g/kg
    const charcoal = w > 0 ? (w * 1).toFixed(0) : "--";

    // 3. OMEPRAZOLE
    // 1 mg/kg
    const omeprazole = w > 0 ? (w * 1).toFixed(1) : "--";

    // 4. FLUIDES (Diurèse)
    // 2-3 x Maintenance (60 ml/kg/j x 2 = 120 ml/kg/j) environ 5 ml/kg/h
    const fluidRate = w > 0 ? (w * 5).toFixed(0) : "--";

    return (
        <ProtocolLayout title="Intoxication AINS (Ibuprofène, Carprofène...)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="La Double Menace" icon="💊">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <AlertBox type="warning" title="1. Gastro-intestinale">
                                        <strong>Ulcères perforants.</strong>
                                        <br />Inhibition des Prostaglandines protectrices.
                                        <br />Antidote spécifique : <strong>Misoprostol</strong>.
                                    </AlertBox>
                                    <AlertBox type="critical" title="2. Insuffisance Rénale (AKI)">
                                        <strong>Nécrose Papillaire Rénale.</strong>
                                        <br />Ischémie rénale par vasoconstriction.
                                        <br />Prévention : <strong>Diurèse Forcée</strong>.
                                    </AlertBox>
                                </div>
                                <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-200 flex gap-2 items-center">
                                    <RefreshCw className="h-5 w-5 text-blue-600" />
                                    <div className="text-sm text-blue-800">
                                        <strong>Recirculation Entéro-hépatique Massive :</strong>
                                        <br />Les AINS sont réabsorbés en boucle. Il faut donner du Charbon <u>À PLUSIEURS REPRISES</u>.
                                    </div>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Suivi Rénal & Digestif" icon="📉">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AlertBox type="critical" title="Rein (Aiguë)">
                                    <strong>Créatinine / Urée :</strong> Baseline à l'admission. Répéter à 24h, 48h et 72h.
                                    <br />
                                    <strong>Densité Urinaire :</strong> Avant fluidothérapie ! (Isosthénurie précoce ?).
                                </AlertBox>
                                <AlertBox type="warning" title="Sang / Prot">
                                    <strong>PCV / TP :</strong> Chute progressive ? (Hémorragie digestive occulte).
                                    <br />
                                    <strong>Protéines Totales :</strong> Hypoprotéinémie (Perte digestive).
                                </AlertBox>
                            </div>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses calculées.</AlertBox>
                            )}

                            <Section title="1. Décontamination Continue" icon="📉">
                                <CheckList
                                    items={[
                                        `Charbon Activé T0 : ${charcoal} g PO.`,
                                        "Charbon Activé Répété : 0.5 g/kg toutes les 6-8h pendant 24-48h.",
                                        "Surveiller Natrémie (Risque hypernatrémie avec charbon répété)."
                                    ]}
                                />
                            </Section>

                            <Section title="2. Protection Gastrique" icon="💊">
                                <DosageCard
                                    title="Misoprostol (Cytotec)"
                                    value={`${misoMin} - ${misoMax}`}
                                    unit="μg (mcg)"
                                    subtitle="PO q6-8h. Analogue Prostaglandine. INDISPENSABLE."
                                    color="green"
                                />
                                <DosageCard
                                    title="Oméprazole"
                                    value={`${omeprazole}`}
                                    unit="mg"
                                    subtitle="PO/IV q12-24h. IPP."
                                    color="blue"
                                />
                                <div className="mt-2 text-sm text-slate-600 italic">
                                    + Sucralfate (si suspicion ulcères) 2h après les autres meds.
                                </div>
                            </Section>

                            <Section title="3. Protection Rénale" icon="💧">
                                <DosageCard
                                    title="Fluidothérapie (Diurèse)"
                                    value={`${fluidRate}`}
                                    unit="ml/h"
                                    subtitle="Taux : 2 à 3 fois la maintenance (env 5ml/kg/h) pendant min 48h."
                                    color="blue"
                                />
                                <AlertBox type="info" title="Suivi Rénal">
                                    Créatinine / Urée à T0, T24, T48, T72.
                                    <br />Si oligurie/anurie malgré fluides &rarr; Hémodialyse indiquée.
                                </AlertBox>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "NSAID Toxicity Management", type: "external" },
                                    { label: "Misoprostol Dosing", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

