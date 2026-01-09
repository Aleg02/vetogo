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
    Droplets,
    Activity,
    Calculator,
    AlertTriangle,
    Scale
} from "lucide-react";

export const FluidTherapy = () => {
    const { weightKg, species } = useAppStore();
    const [dehydrationPercent, setDehydrationPercent] = useState<number>(5);

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. MAINTENANCE (Formule linéaire simplifiée AAHA/WSAVA)
    // Chien : ~2-6 ml/kg/h (ou 50-60 ml/kg/j)
    // Chat : ~2-3 ml/kg/h (ou 40-50 ml/kg/j)
    // On affiche un range horaire.
    const maintRateMin = isCat ? (w * 2).toFixed(1) : (w * 2).toFixed(1);
    const maintRateMax = isCat ? (w * 3).toFixed(1) : (w * 4).toFixed(1); // Chien un peu plus large

    // 2. DÉFICIT DE DÉSHYDRATATION
    // Vol (ml) = % x Poids (kg) x 10
    const deficitVol = w > 0 ? (dehydrationPercent * w * 10).toFixed(0) : "--";

    // 3. KMAX (Vitesse max potassium)
    // 0.5 mEq/kg/h
    const kMaxRate = w > 0 ? (w * 0.5).toFixed(2) : "--";

    return (
        <ProtocolLayout hasExamens={false} title="Fluidothérapie & Calculs">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Les 3 Piliers" icon="💧">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                        <div className="font-bold text-blue-700">1. Maintenance</div>
                                        <div className="text-sm text-blue-600">Besoins physiologiques</div>
                                    </div>
                                    <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                                        <div className="font-bold text-red-700">2. Déficit</div>
                                        <div className="text-sm text-red-600">Correction Déshydratation</div>
                                    </div>
                                    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                                        <div className="font-bold text-yellow-700">3. Pertes en cours</div>
                                        <div className="text-sm text-yellow-600">Vomissements / Diarrhée</div>
                                    </div>
                                </div>
                            </Section>

                            <Section title="Monitoring Potassium (K+)" icon="📉">
                                <AlertBox type="critical" title="Règle du KMax">
                                    <strong>Ne JAMAIS dépasser 0.5 mEq/kg/h en IV.</strong>
                                    <br />
                                    Risque d'arrêt cardiaque réfractaire.
                                    <br />
                                    Si besoin de plus -&gt; Voie voie centrale + ECG continu.
                                </AlertBox>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET CALCULATRICES --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Saisir Poids">
                                    Calculs impossibles sans poids.
                                </AlertBox>
                            )}

                            <Section title="1. Besoins de Maintenance" icon="📉">
                                <DosageCard
                                    title="Débit Maintenance"
                                    value={`${maintRateMin} - ${maintRateMax}`}
                                    unit="ml/h"
                                    subtitle="Rythme de base (Sain). A ajuster selon pathologie (Cardiaque/Rénal = réduire)."
                                    color="blue"
                                />
                            </Section>

                            <Section title="2. Correction Déshydratation" icon="⚖️">
                                <div className="mb-4 bg-white p-4 rounded-lg border border-slate-200">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Estimation Déshydratation : <strong>{dehydrationPercent}%</strong>
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="12"
                                        step="1"
                                        value={dehydrationPercent}
                                        onChange={(e) => setDehydrationPercent(parseInt(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                                        <span>0% (Hydraté)</span>
                                        <span>5% (Pli peau)</span>
                                        <span>8% (Yeux)</span>
                                        <span>10%+ (Choc)</span>
                                    </div>
                                </div>

                                <DosageCard
                                    title="Volume à Combler (Déficit)"
                                    value={deficitVol}
                                    unit="ml"
                                    subtitle="Volume TOTAL à perfuser EN PLUS de la maintenance. Souvent sur 12-24h."
                                    color="red"
                                />
                            </Section>

                            <Section title="3. Sécurité Potassium" icon="⚠️">
                                <DosageCard
                                    title="Vitesse KMax (0.5 mEq/kg/h)"
                                    value={kMaxRate}
                                    unit="mEq/h"
                                    subtitle="Plafond de sécurité ABSOLU pour le Potassium."
                                    color="slate"
                                />
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "AAHA/AAFP Fluid Therapy Guidelines", type: "external" },
                                    { label: "Minitools Calculateur", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

