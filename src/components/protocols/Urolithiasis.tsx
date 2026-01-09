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
    Microscope,
    Utensils,
    Pill,
    Droplets,
    Scissors
} from "lucide-react";

export const Urolithiasis = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";

    // --- CALCULS ---
    // Citrate de Potassium (Alcalinisant) : 40-75 mg/kg q12h
    const citrMin = w > 0 ? (w * 40).toFixed(0) : "--";
    const citrMax = w > 0 ? (w * 75).toFixed(0) : "--";

    // Allopurinol (Urate) : 10-15 mg/kg q12h (Chien)
    const alloMin = w > 0 ? (w * 10).toFixed(0) : "--";
    const alloMax = w > 0 ? (w * 15).toFixed(0) : "--";

    return (
        <ProtocolLayout title="Urolithiases (Gestion Médicale)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Approche Diagnostique" icon="🦠">
                                <CheckList
                                    items={[
                                        "Radio : Oxalates & Struvites sont Radio-Opaques.",
                                        "Echo : Urates & Cystine sont Radio-Transparents (mais visibles écho).",
                                        "pH Urinaire : Struvite aime pH alcalin (>7), Oxalate/Cystine aiment pH acide (<6.5).",
                                        "Cristallurie : Attention, cristaux ≠ calculs (et pas toujours corrélés)."
                                    ]}
                                />
                                <div className="mt-4">
                                    <AlertBox type="warning" title="Dilution Urinaire !">
                                        La base de tout traitement (préventif ou curatif) est d'augmenter la prise de boisson.
                                        <br />
                                        <strong>Objectif densité :</strong> &lt; 1.020 (Chien), &lt; 1.030 (Chat).
                                    </AlertBox>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Caractérisation du Calcul" icon="💎">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AlertBox type="info" title="Radio-Opaque">
                                    Visible à la radio.
                                    <br />
                                    <strong>&rarr; Struvite</strong> (Gros, coins ronds).
                                    <br />
                                    <strong>&rarr; Oxalate</strong> (Irrégulier, mûre, très dense).
                                </AlertBox>
                                <AlertBox type="warning" title="Radio-Transparent">
                                    Invisible radio, Visible Écho.
                                    <br />
                                    <strong>&rarr; Urate</strong> (Dalmatien, Shunt).
                                    <br />
                                    <strong>&rarr; Cystine</strong> (Bulldog, Teckel).
                                </AlertBox>
                            </div>
                            <div className="mt-4 bg-white p-4 rounded-xl border border-slate-200">
                                <h4 className="font-bold text-slate-800 mb-2">Analyses Complémentaires</h4>
                                <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                    <li><strong>pH Urinaire :</strong> Oriente mais ne confirme pas (Struvite peut être acide, Oxalate basique).</li>
                                    <li><strong>Analyse Calcul :</strong> OBLIGATOIRE après récupération (Infrarouge). Seule certitude.</li>
                                    <li><strong>Culture :</strong> Toujours vérifier infection associée (Struvite).</li>
                                </ul>
                            </div>
                        </Section>
                    )}

                    {/* --- ONGLET TYPES --- */}
                    {tab === "traitements" && (
                        <>
                            {/* 1. STRUVITE */}
                            <Section title="1. Struvites (Phospho-Ammoniaco-Magnésien)" icon="🔬">
                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-2 text-sm text-blue-800">
                                    <strong>Dissolution possible (100% médical)</strong>
                                </div>
                                <ul className="list-disc pl-5 space-y-1 text-slate-700 text-sm">
                                    <li><strong>Chien :</strong> Souvent infection (Staph/Proteus). &rarr; Antibio indispensable.</li>
                                    <li><strong>Chat :</strong> Souvent stérile. &rarr; Diète seule suffit.</li>
                                    <li><strong>Diète :</strong> S/O, Urinary, c/d. (Acidifiante, pauvre en Mg/Phos).</li>
                                    <li><strong>Durée :</strong> Continuer 1 mois APRES disparition radio/écho.</li>
                                </ul>
                            </Section>

                            {/* 2. OXALATE DE CALCIUM */}
                            <Section title="2. Oxalate de Calcium" icon="✂️">
                                <div className="bg-red-50 p-3 rounded-lg border border-red-100 mb-2 text-sm text-red-800">
                                    <strong>Dissolution IMPOSSIBLE</strong> &rarr; Retrait (Chirurgie / Urohydropropulsion)
                                </div>
                                <ul className="list-disc pl-5 space-y-1 text-slate-700 text-sm">
                                    <li><strong>Prévention :</strong> Alcaliniser urines (pH 6.5 - 7.5).</li>
                                    <li><strong>Citrate de Potassium :</strong> Inhibiteur formation cristaux.</li>
                                </ul>
                                <div className="mt-2">
                                    <DosageCard
                                        title="Citrate de Potassium"
                                        value={`${citrMin} - ${citrMax}`}
                                        unit="mg"
                                        subtitle="PO BID. Pour alcaliniser (Objectif pH 7)."
                                        color="slate"
                                    />
                                </div>
                            </Section>

                            {/* 3. URATE */}
                            <Section title="3. Urates (Dalmatien / Shunt)" icon="🍽️">
                                <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 mb-2 text-sm text-purple-800">
                                    <strong>Dissolution possible</strong> (Lente et difficile)
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-bold text-slate-700 mb-1">Stratégie</h4>
                                        <ul className="list-disc pl-5 text-sm space-y-1">
                                            <li>Diète pauvre en Purines (Oeuf, végétal).</li>
                                            <li>Alcalinisation (pH &gt; 7).</li>
                                            <li>Inhibiteur Xanthine Oxydase (Allopurinol).</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <DosageCard
                                            title="Allopurinol"
                                            value={`${alloMin} - ${alloMax}`}
                                            unit="mg"
                                            subtitle="PO BID/TID. Attention : risque calculs Xanthine si dose trop forte sans diète stricte."
                                            color="purple"
                                        />
                                    </div>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "Minnesota Urolith Center", url: "https://plumbs.com/treat/urolithiasis", type: "external" },
                                    { label: "ACVIM Consensus Uroliths", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

