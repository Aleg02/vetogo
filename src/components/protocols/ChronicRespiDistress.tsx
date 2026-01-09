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
    Wind,
    Pill,
    Heart,
    Stethoscope
} from "lucide-react";

export const ChronicRespiDistress = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";

    // --- CALCULS ---

    // 1. SILDENAFIL (Viagra) - HTAP Secondaire
    // 1-3 mg/kg q8-12h PO
    const sildenafilLow = w > 0 ? (w * 1).toFixed(1) : "--";
    const sildenafilHigh = w > 0 ? (w * 3).toFixed(1) : "--";

    // 2. THEOPHYLLINE (Bronchodilatateur)
    // 10 mg/kg q12h PO (Chien)
    const theophyllin = w > 0 ? (w * 10).toFixed(0) : "--";

    // 3. PREDNISOLONE (Anti-inflammatoire)
    // 0.5 - 1 mg/kg q12-24h (Dose de départ)
    const pred = w > 0 ? (w * 1).toFixed(1) : "--";

    return (
        <ProtocolLayout title="Détresse Respi Chronique (Fibrose/BPCO)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Gestion de la Décompensation" icon="🌬️">
                                <AlertBox type="critical" title="La Crise Aiguë">
                                    Un animal chronique (Fibrose Westie, Collapsus, BPCO) qui décompense est une <strong>URGENCE CRITIQUE</strong>.
                                    <br />
                                    Oxygène + Sédation (Butorphanol) avant tout diagnostic.
                                </AlertBox>
                                <div className="mt-4">
                                    <CheckList
                                        items={[
                                            "Fibrose Pulmonaire (WHLT, Terriers) : Crépitements inspiratoires secs ('Velcro').",
                                            "Bronchite Chronique : Toux grasse, sibilants expiratoires.",
                                            "HTAP (Hypertension Artérielle Pulmonaire) : Complication fréquente -> Sildénafil.",
                                            "Collapsus Trachéal : Toux 'oie', dyspnée inspiratoire."
                                        ]}
                                    />
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Bilan Respiratoire Avancé" icon="📉">
                            <div className="space-y-4">
                                <AlertBox type="info" title="Gaz du Sang (PaO2)">
                                    Objectiver l'hypoxémie.
                                    <br />
                                    SaO2 &lt; 92-94% = Hypoxémie significative.
                                </AlertBox>
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Imagerie</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li><strong>Scanner (CT) :</strong> Gold standard. (Fibrose, Bulles, Bronchectasie).</li>
                                        <li><strong>Echographie Cœur :</strong> HTAP secondaire ? (Vitesse régurgitation Tricuspide).</li>
                                        <li><strong>Lavage Broncho-Alvéolaire (LBA) :</strong> Cytologie (Inflammation stérile ou septique ?).</li>
                                    </ul>
                                </div>
                            </div>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isDog) && (
                                <AlertBox type="warning" title="Spécificité">
                                    Protocole orienté Chiens (Westies, Terriers, Vieux chiens).
                                </AlertBox>
                            )}

                            <Section title="1. Gestion de l'HTAP (Hypertension Pulmonaire)" icon="❤️">
                                <p className="text-sm text-slate-700 mb-2">
                                    Souvent la cause de la syncope/décompensation. Diagnostic Echo-Doppler.
                                </p>
                                <DosageCard
                                    title="Sildénafil (Viagra)"
                                    value={`${sildenafilLow} - ${sildenafilHigh}`}
                                    unit="mg"
                                    subtitle="PO q8-12h. Vasodilatateur pulmonaire puissant."
                                    color="red"
                                />
                            </Section>

                            <Section title="2. Maintenance Respiratoire" icon="💊">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DosageCard
                                        title="Théophylline"
                                        value={theophyllin}
                                        unit="mg"
                                        subtitle="PO q12h. Bronchodilatateur + Inotrope + Diaphragme."
                                        color="blue"
                                    />
                                    <DosageCard
                                        title="Prednisolone"
                                        value={pred}
                                        unit="mg"
                                        subtitle="PO q24h. Anti-inflammatoire (Fibrose/Bronchite)."
                                        color="slate"
                                    />
                                </div>
                            </Section>

                            <Section title="3. Soins de Support" icon="🩺">
                                <CheckList
                                    items={[
                                        "Perte de poids : CRUCIALE pour réduire la demande en oxygène.",
                                        "Harnais : Éviter compression trachéale.",
                                        "Éviter la chaleur et l'humidité.",
                                        "Corticoïdes inhalés (Fluticasone) : Pour limiter les effets systémiques si bronchite."
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
                                    { label: "Canine Pulmonary Fibrosis", type: "external" },
                                    { label: "Pulmonary Hypertension Management", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

