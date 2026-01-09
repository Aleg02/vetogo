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
    Pill,
    Scissors
} from "lucide-react";

export const Prostatitis = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    // Principalement chien.

    // --- CALCULS ---

    // 1. ANTIBIOTIQUES (Diffusion Prostatique)
    // Enrofloxacine : 10 mg/kg q24h PO (Jusqu'à 20mg/kg si infection sévère/Pseudomonas).
    // Marbofloxacine : 2-4 mg/kg q24h PO.
    // TMS (Trimethoprim-Sulfamethoxazole) : 15-30 mg/kg BID PO.

    const enro = w > 0 ? (w * 10).toFixed(0) : "--";
    const marbo = w > 0 ? (w * 2).toFixed(1) : "--";
    const tmsHigh = w > 0 ? (w * 15).toFixed(0) : "--"; // Dose basse de la fourchette pour commencer

    return (
        <ProtocolLayout title="Prostatite">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Points Clés" icon="📉">
                                <AlertBox type="critical" title="Barrière Hémato-Prostatique">
                                    Seuls les antibiotiques liposolubles et basiques pénètrent bien (Fluoroquinolones, TMS).
                                    <br />
                                    Les pénicillines/céphalosporines diffusent MAL (sauf si abcès aigu rompu).
                                </AlertBox>
                                <div className="mt-4">
                                    <CheckList
                                        items={[
                                            "Castration : FORTEMENT recommandée (réduit l'hyperplasie et favorise la guérison).",
                                            "Durée traitement : 4 à 6 semaines minimum (sinon récidive fréquente).",
                                            "Abcès prostatique : Si > 1cm ou ne répond pas, drainage chirurgical ou échoguidé requis."
                                        ]}
                                    />
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Bilan Prostatique" icon="🩺">
                            <CheckList
                                items={[
                                    "Echographie : Parenchyme hétérogène, Cavités (Abcès/Kystes), Augmentation taille.",
                                    "Culture : Liquide prostatique (via éjaculat ou lavage prostatique) ou Urine (si communication).",
                                    "Brucellose : Toujours tester Brucella canis sur chien entier reproducteur (Zoonose !)."
                                ]}
                            />
                            <AlertBox type="info" title="Cytologie">
                                Ponction à l'aiguille fine (FNA) possible SAUF si suspicion abcès important (risque péritonite septique si rupture).
                            </AlertBox>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses calculées.</AlertBox>
                            )}

                            <Section title="1. Antibiothérapie (1ère intention)" icon="💊">
                                <p className="text-sm text-slate-700 mb-2">Choisir une seule molécule. Fluoroquinolones préférées.</p>
                                <div className="space-y-4">
                                    <DosageCard
                                        title="Enrofloxacine (Baytril)"
                                        value={enro}
                                        unit="mg"
                                        subtitle="PO q24h. Excellente diffusion. Attention croissance (chiots)."
                                        color="green"
                                    />
                                    <DosageCard
                                        title="Marbofloxacine (Marbocyl)"
                                        value={marbo}
                                        unit="mg"
                                        subtitle="PO q24h. Alternative à l'enrofloxacine."
                                        color="green"
                                    />
                                    <DosageCard
                                        title="Trimethyl-Sulfa (TMS)"
                                        value={tmsHigh}
                                        unit="mg"
                                        subtitle="PO BID. Alternative économique. Attention KCS (regarder les yeux)."
                                        color="blue"
                                    />
                                </div>
                            </Section>

                            <Section title="2. Gestion Médicale Complémentaire" icon="💉">
                                <CheckList
                                    items={[
                                        "Analgésie : AINS si pas de contre-indication (Meloxicam).",
                                        "Laxatifs : Si douleur à la défécation (prostate augmentée).",
                                        "Finasteride : 0.1-0.5 mg/kg PO si hypertrophie bénigne associée."
                                    ]}
                                />
                            </Section>

                            <Section title="3. Chirurgie" icon="✂️">
                                <AlertBox type="info" title="Castration">
                                    Indispensable pour guérison à long terme. Peut être faite une fois l'infection aiguë stabilisée (quelques jours).
                                </AlertBox>
                                <p className="text-sm text-slate-700 mt-2">
                                    Si <strong>Abcès Prostatique</strong> : Drainage chirurgical avec omentalisation est la technique de choix.
                                </p>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "Plumb's Veterinary Drugs", type: "external" },
                                    { label: "Prostatic Diseases Steps", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

