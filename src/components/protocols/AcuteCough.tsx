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
    Pill,
    Syringe,
    Wind
} from "lucide-react";

export const AcuteCough = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";

    // --- CALCULS (Antitussifs - CHIEN PRINCIPALEMENT) ---

    // 1. HYDROCODONE (Chien)
    // 0.22 - 0.25 mg/kg q6-12h PO
    const hydrocodone = w > 0 ? (w * 0.25).toFixed(2) : "--";

    // 2. BUTORPHANOL (Oral Chien)
    // 0.5 - 1 mg/kg PO (Forte dose premier passage)
    const butorphanolOral = w > 0 ? (w * 0.5).toFixed(1) : "--";

    // Butorphanol (Inj Chat/Chien) : 0.2 mg/kg
    const butorphanolInj = w > 0 ? (w * 0.2).toFixed(2) : "--";

    // 3. CODEINE (Chien)
    // 1-2 mg/kg PO.
    const codeine = w > 0 ? (w * 1.5).toFixed(1) : "--";

    return (
        <ProtocolLayout title="Toux Aiguë (Antitussifs)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Quand traiter ?" icon="🩺">
                                <AlertBox type="critical" title="Contre-Indications">
                                    NE PAS couper une toux <strong>PRODUCTIVE</strong> (Pneumonie) ou cardiaque (OAP) sans traiter la cause.
                                    <br />
                                    L'antitussif est pour la <strong>toux sèche, irritative, épuisante</strong> (Trachéite, Collapsus, Bronchite chronique).
                                </AlertBox>
                                <div className="mt-4">
                                    <CheckList
                                        items={[
                                            "Radiographie Thorax : Indispensable pour exclure pneumonie/OAP/tumeur.",
                                            "Examen : Toux déclenchable ? (Palpation trachéale).",
                                            "Toux de chenil ? : Souvent auto-limitant, mais antitussif améliore le confort.",
                                            "Chat : Attention l'asthme félin tousse &rarr; Corticoïdes + Bronchodilatateurs (Pas antitussifs)."
                                        ]}
                                    />
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Approche Diagnostique" icon="🩺">
                            <CheckList
                                items={[
                                    "Radiographie Thorax (3 vues) : Indispensable (Cœur vs Poumons).",
                                    "Déclenchement Toux : Pincement trachéal positif ? (Trachéite/Collapsus).",
                                    "Coproscopie (Baermann) : Angiostrongylose ? (Jeune chien, toux sèche).",
                                    "Fluoroscopie : Dynamique trachéale (Collapsus)."
                                ]}
                            />
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || species === "chat") && (
                                <AlertBox type="warning" title="Saisir Poids / Espèce">
                                    Protocole orienté Chien. Le chat tousse rarement "pour rien" (souvent Asthme/Pneumonie).
                                </AlertBox>
                            )}

                            <Section title="Antitussifs (Opioïdes)" icon="💊">
                                {isDog ? (
                                    <div className="space-y-4">
                                        <DosageCard
                                            title="Hydrocodone"
                                            value={hydrocodone}
                                            unit="mg"
                                            subtitle="PO q6-12h. Gold Standard (USA)."
                                            color="blue"
                                        />
                                        <DosageCard
                                            title="Butorphanol (Oral)"
                                            value={butorphanolOral}
                                            unit="mg"
                                            subtitle="PO q6-12h. Dose > Inj car effet 1er passage."
                                            color="slate"
                                        />
                                        <DosageCard
                                            title="Codéine (Neocodion/Paderyl)"
                                            value={codeine}
                                            unit="mg"
                                            subtitle="PO q6-8h. (1-2 mg/kg). Attention sédation / constipation."
                                            color="slate"
                                        />
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <AlertBox type="info" title="Chat">
                                            Les antitussifs oraux sont rarement utilisés. Traiter la cause (Asthme &rarr; Corticoïdes).
                                            <br />
                                            Si besoin absolu : Butorphanol inj.
                                        </AlertBox>
                                        <DosageCard
                                            title="Butorphanol (Inj)"
                                            value={butorphanolInj}
                                            unit="mg"
                                            subtitle="SC / IM. Effet antitussif puissant."
                                            color="blue"
                                        />
                                    </div>
                                )}
                            </Section>

                            <Section title="Traitements Adjuvants" icon="🌬️">
                                <CheckList
                                    items={[
                                        "Miel : Effet apaisant muqueuses (si pas diabétique).",
                                        "Vapeur / Humidification : Réduit l'irritation trachéale.",
                                        "Repos strict : L'exercice déclenche la toux.",
                                        "Harnais : Bannir le collier."
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
                                    { label: "Plumb's Veterinary Drugs", type: "external" },
                                    { label: "Cough Management Guidelines", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

