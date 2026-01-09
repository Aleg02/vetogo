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
    PauseCircle,
    Stethoscope
} from "lucide-react";

export const AcuteDysuria = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. PRAZOSIN (Relaxant musculaire lisse - Spasme urétral)
    // Chien : 0.5 - 2 mg / animal (Indépendant poids souvent, mais 0.067 mg/kg cité)
    // Chat : 0.25 - 1 mg / animal
    // On va utiliser une fourchette simplifiée par animal.
    let prazosinDose = "--";
    if (isSpeciesSelected) {
        if (isDog) prazosinDose = "0.5 - 2 mg / animal";
        if (isCat) prazosinDose = "0.25 - 1 mg / animal";
    }

    // 2. TAMSULOSINE (Mécanisme identique, plus sélectif ?)
    // Chien : 0.1 - 0.4 mg / animal (par 10-20kg)
    const tamsuloDose = isDog ? "0.1 - 0.4 mg / animal" : "0.004 mg/kg (Hors AMM)";

    // 3. DIAZEPAM (Relaxant musculaire strié - Sphincter externe)
    // 0.25 - 0.5 mg/kg PO/IV
    const valiumDose = w > 0 ? (w * 0.25).toFixed(1) : "--";

    // 4. AINS
    const meloxiDose = w > 0 ? (w * (isDog ? 0.1 : 0.05)).toFixed(2) : "--";

    return (
        <ProtocolLayout title="Dysurie Aiguë (Spasme)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Pré-requis" icon="⏸️">
                                <AlertBox type="critical" title="Exclure Obstruction">
                                    <strong>Vérifier la vidange vésicale.</strong>
                                    <br />
                                    Si globe vésical dur et impossible à vidanger &rarr; Sondage / Débouchage (Voir Protocole Globe Urinaire).
                                    <br />
                                    Ce protocole gère le <strong>spasme</strong> et l'inflammation (ex: post-sondage, cystite, prostatite).
                                </AlertBox>
                                <div className="mt-4">
                                    <CheckList
                                        items={[
                                            "Toucher Rectal (Prostate chez le chien ?).",
                                            "Vérifier débit urinaire (Goutte à goutte vs Jet).",
                                            "Analgésie multimodale (La douleur crée le spasme).",
                                            "Environnement calme (Stress = Rétention)."
                                        ]}
                                    />
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Bilan Urinaire" icon="🧪">
                            <div className="space-y-4">
                                <AlertBox type="info" title="Analyse d'Urine (BU + Culot)">
                                    Toujours vérifier si infection associée (Spasme secondaire à cystite ?).
                                    <br />
                                    Densité Urinaire : Vérifier fonction rénale basique.
                                </AlertBox>
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Imagerie</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li><strong>Echographie :</strong> Paroi vésicale, Contenu (Calculs, caillots), Prostate (Chien).</li>
                                        <li><strong>Radiographie :</strong> Calculs urétraux (Radio-opaques) ?</li>
                                    </ul>
                                </div>
                            </div>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses calculées.</AlertBox>
                            )}

                            <Section title="1. Relaxants Sphincter Lisse (Interne)" icon="💊">
                                <div className="space-y-4">
                                    <DosageCard
                                        title="Prazosin (Minipress)"
                                        value={prazosinDose}
                                        unit="par prise"
                                        subtitle="PO BID/TID. Attention Hypotension. Idéal spasme post-obstruction chat."
                                        color="purple"
                                    />
                                    {isDog && (
                                        <DosageCard
                                            title="Tamsulosine (Josir/Omexel)"
                                            value={tamsuloDose}
                                            unit="par prise"
                                            subtitle="PO q24h. Souvent mieux toléré que Prazosin chienc."
                                            color="purple"
                                        />
                                    )}
                                </div>
                            </Section>

                            <Section title="2. Relaxants Sphincter Strié (Externe)" icon="💉">
                                <DosageCard
                                    title="Diazepam (Valium)"
                                    value={valiumDose}
                                    unit="mg"
                                    subtitle="IV ou PO. Utile si rétention volontaire / douleur / contractions."
                                    color="red"
                                />
                            </Section>

                            <Section title="3. Anti-Inflammatoire" icon="📉">
                                <DosageCard
                                    title="Meloxicam"
                                    value={meloxiDose}
                                    unit="mg"
                                    subtitle="PO q24h. Réduit l'oedème urétral."
                                    color="green"
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
                                    { label: "Management of Urethral Sphincter Mechanism", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

