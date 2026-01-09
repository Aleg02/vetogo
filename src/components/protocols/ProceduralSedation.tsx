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
    Moon,
    Syringe,
    Timer,
    HeartPulse,
    Activity,
    Zap
} from "lucide-react";

export const ProceduralSedation = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. PROTOCOLE "MIXTE" (Butorphanol + Midazolam) - Cardio-Safe
    // Butorphanol : 0.2 - 0.3 mg/kg
    const butDose = w > 0 ? (w * 0.25).toFixed(2) : "--";
    // Midazolam : 0.2 mg/kg
    const midDose = w > 0 ? (w * 0.2).toFixed(2) : "--";

    // 2. PROTOCOLE "DEXDOMITOR" (Dexmedetomidine) - Microdoses
    // Microdose IV (Chien) : 1 - 3 mcg/kg (0.001 - 0.003 mg/kg)
    // Standard IM : 5 - 10 mcg/kg
    const dexMicroMin = w > 0 ? (w * 1).toFixed(1) : "--"; // mcg
    const dexMicroVol = w > 0 ? (w * 1 / 500).toFixed(2) : "--"; // ml (0.5 mg/ml = 500 mcg/ml)

    const dexStdMin = w > 0 ? (w * 5).toFixed(1) : "--"; // mcg
    const dexStdVol = w > 0 ? (w * 5 / 500).toFixed(2) : "--"; // ml

    // 3. ANTAGONISTES (Reversal)
    // Atipamezole (Antisedan) : Volume = Volume Dexdomitor (IM).
    // Flumazenil : 0.01 - 0.02 mg/kg IV
    const flumaDose = w > 0 ? (w * 0.01).toFixed(2) : "--";
    // Naloxone : 0.04 mg/kg (Mais rare pour Butorphanol)

    return (
        <ProtocolLayout hasExamens={false} title="Sédation Procédurale & Flash">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Objectifs" icon="🌙">
                                <p className="text-sm text-slate-700">
                                    Pour les actes courts et peu douloureux (Radio, Retrait drains, Pansements, Points peau).
                                    <br />
                                    Ne remplace PAS une anesthésie générale si intubation requise.
                                </p>
                                <AlertBox type="warning" title="Sûreté">
                                    Toujours avoir matériel d'intubation et O2 à portée de main.
                                </AlertBox>
                            </Section>

                            <Section title="Choix du Protocole" icon="📉">
                                <CheckList
                                    items={[
                                        "Cardio-Safe (Vieux, Cardiaque) : Butorphanol + Midazolam.",
                                        "Patient sain / Jeune : Dexmédétomidine (Microdose IV ou IM).",
                                        "Chat agressif : 'Kitty Magic' (Dexdomitor + Ketamine + Butorphanol) IM.",
                                        "Douleur importante : Ajouter un bolus analgésique (Méthadone) au lieu du Butorphanol."
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
                                    Doses sédation calculées.
                                </AlertBox>
                            )}

                            <Section title="1. Protocole 'Soft' (Cardio-Safe)" icon="💓">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DosageCard
                                        title="Butorphanol"
                                        value={butDose}
                                        unit="mg"
                                        subtitle="IV/IM. Sédatif léger, analgésie viscérale courte. Peu d'effets CV."
                                        color="blue"
                                    />
                                    <DosageCard
                                        title="Midazolam"
                                        value={midDose}
                                        unit="mg"
                                        subtitle="IV/IM. Myorelaxant. Synergie avec Opioïdes."
                                        color="blue"
                                    />
                                </div>
                            </Section>

                            <Section title="2. Protocole Alpha-2 (Dexdomitor)" icon="⚡">
                                <AlertBox type="critical" title="Contre-Indication">
                                    Cardiopathie, Choc, Déshydratation, Obstruction urinaire (effet diurétique).
                                </AlertBox>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-bold text-purple-600 mb-2">Microdose IV (Chien calme)</h4>
                                        <DosageCard
                                            title="Dexmédétomidine"
                                            value={dexMicroMin}
                                            unit="mcg" // Microgrammes !
                                            subtitle={
                                                <span>
                                                    Vol (0.5mg/ml) : <strong>{dexMicroVol} ml</strong>.
                                                    <br />
                                                    IV LENT. Sédation légère permettant le réveil rapide.
                                                </span>
                                            }
                                            color="purple"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-purple-600 mb-2">Dose Standard IM</h4>
                                        <DosageCard
                                            title="Dexmédétomidine"
                                            value={dexStdMin}
                                            unit="mcg"
                                            subtitle={
                                                <span>
                                                    Vol (0.5mg/ml) : <strong>{dexStdVol} ml</strong>.
                                                    <br />
                                                    IM. Attendre 15-20 min le pic d'action.
                                                </span>
                                            }
                                            color="purple"
                                        />
                                    </div>
                                </div>
                            </Section>

                            <Section title="3. Réveil (Antagonistes)" icon="⏱️">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DosageCard
                                        title="Atipamézole (Antisedan)"
                                        value="Vol = Vol Dex"
                                        unit="ml"
                                        subtitle="IM strict. Dose volume pour volume par rapport au Dexdomitor."
                                        color="slate"
                                    />
                                    <DosageCard
                                        title="Flumazénil"
                                        value={flumaDose}
                                        unit="mg"
                                        subtitle="IV. Si sédation Midazolam trop profonde."
                                        color="slate"
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
                                    { label: "BSAVA Manual of Anaesthesia", type: "external" },
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

