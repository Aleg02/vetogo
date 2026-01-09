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
    Utensils,
    Syringe,
    Pill,
    Ban,
    Droplets,
    Thermometer
} from "lucide-react";

export const Gastroenteritis = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. ANTI-VOMITIF
    // Maropitant (Cerenia/Prevomax)
    // Chien : 1 mg/kg SC/IV ou 2 mg/kg PO.
    // Chat : 1 mg/kg SC/IV/PO.
    let maropitantInj = w > 0 ? (w * 1).toFixed(1) : "--"; // mg
    let maropitantInjVol = w > 0 ? (w * 0.1).toFixed(2) : "--"; // ml (10mg/ml)
    let maropitantPO = w > 0 ? (w * (isDog ? 2 : 1)).toFixed(0) : "--"; // mg

    // Metoclopramide (Emeprid) : 0.5 - 1 mg/kg/j (CRI ou tid)
    // Prudence si obstruction.

    // 2. PANSEMENTS
    // Smectite / Montmorillonite : Souvent 1 sachet/doser
    // Sucralfate : 1g (Gd chien) / 0.5g (Petit)

    // 3. FLUIDES
    // Maintenance standard (cf Fluidothérapie)

    return (
        <ProtocolLayout title="Gastro-Entérite Aiguë Simple">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Approche Symptomatique" icon="🍽️">
                                <AlertBox type="info" title="Pas d'Antibiotiques !">
                                    La gastro-entérite simple est souvent virale ou indiscrétion alimentaire.
                                    <br />
                                    <strong>Antibiotiques (Metrobactin ille) contre-indiqués</strong> sauf si :
                                    <ul className="list-disc pl-4 mt-1 text-sm">
                                        <li>Hématochézie sévère avec atteinte état général.</li>
                                        <li>Fièvre / Sepsis (Neutropénie).</li>
                                        <li>Immunodépression.</li>
                                    </ul>
                                </AlertBox>
                                <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-100">
                                    <h4 className="font-bold text-green-900 flex items-center gap-2">
                                        <Utensils size={20} /> Nutrition ("Early Refeeding")
                                    </h4>
                                    <p className="text-sm text-green-800 mt-1">
                                        Ne pas mettre à jeun &gt; 12-24h (Chien) ou &gt; 12h (Chat).
                                        <br />
                                        Reprise alimentaire dès l'arrêt des vomissements (Petits repas, Hyperdigestible).
                                        <br />
                                        Nourrir le microbiote accélère la guérison.
                                    </p>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Exclusion / Confirmation" icon="🔍">
                            <CheckList
                                items={[
                                    "Coproscopie : Flottaison (Giardia, Isospora, Vers).",
                                    "Test Parvovirose (SNAP) : Chiots, ou adultes non vaccinés avec diarrhée hémorragique.",
                                    "Bilan sanguin (Base) : PCV/TP (Déshydratation), Ionogramme (Pertes K+).",
                                    "Palpation : Si douleur focalisée ou masse &rarr; Imagerie obligatoire."
                                ]}
                            />
                            <div className="mt-4">
                                <AlertBox type="warning" title="Drapeaux Rouges">
                                    Si abattement sévère, hypotension, ou abdomen chirurgical &rarr; Passer au protocole "Abdomen Aigu" ou "Parvovirose".
                                </AlertBox>
                            </div>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Saisir Poids">
                                    Doses anti-vomitifs calculées.
                                </AlertBox>
                            )}

                            <Section title="1. Anti-Vomitifs" icon="💉">
                                <AlertBox type="warning" title="Exclure Obstruction">
                                    Palpation abdo +/- Radio avant anti-vomitifs si doute corps étranger.
                                </AlertBox>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-bold text-blue-600 mb-2">Maropitant (Cerenia/Prevomax)</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <DosageCard
                                                title="Injectable (SC/IV)"
                                                value={maropitantInj}
                                                unit="mg"
                                                subtitle={
                                                    <span>
                                                        Vol (10mg/ml) : <strong>{maropitantInjVol} ml</strong>.
                                                        <br />
                                                        1 mg/kg. Douloureux en SC (Froid).
                                                    </span>
                                                }
                                                color="blue"
                                            />
                                            <DosageCard
                                                title="Comprimés (PO)"
                                                value={maropitantPO}
                                                unit="mg"
                                                subtitle={isDog ? "2 mg/kg (Chien)." : "1 mg/kg (Chat)."}
                                                color="blue"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Support Digestif" icon="💊">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DosageCard
                                        title="Probiotiques"
                                        value="1 Dose"
                                        unit="PO"
                                        subtitle="Fortiflora / Canikur / Diarsanyl. Réduit la durée de la diarrhée."
                                        color="green"
                                    />
                                    <DosageCard
                                        title="Pansements (Option)"
                                        value="--"
                                        unit="PO"
                                        subtitle="Smecta / Kaopectate. A distance des autres médicaments (2h)."
                                        color="green"
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
                                    { label: "BSAVA Gastroenterology", type: "external" },
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

