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
    Zap,
    Activity,
    Droplets
} from "lucide-react";

export const NonCardiogenicEdema = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;

    // --- CALCULS ---

    // 1. FUROSEMIDE ?
    // Controverse. Souvent inefficace (Perméabilité vs Hydrostatique).
    // Si doute ou composante mixte : 1-2 mg/kg.
    const lasixDose = w > 0 ? (w * 1).toFixed(1) : "--";

    // 2. ANALGÉSIE / SÉDATION (Pour réduire la conso O2)
    // Butorphanol : 0.2 mg/kg
    const butorphanol = w > 0 ? (w * 0.2).toFixed(2) : "--";

    return (
        <ProtocolLayout title="Œdème Pulmonaire Non-Cardiogénique (NCPE)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Diagnostic Différentiel" icon="📉">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                        <strong className="block text-slate-800 mb-1">Cardiogénique</strong>
                                        <ul className="text-sm list-disc pl-4 text-slate-600">
                                            <li>Souffle cardiaque (souvent fort).</li>
                                            <li>Dilatation Atrium Gauche (Echo/Rx).</li>
                                            <li>Veines pulmonaires distendues.</li>
                                            <li>Réponse rapide au Furosémide.</li>
                                        </ul>
                                    </div>
                                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                                        <strong className="block text-red-900 mb-1">Non-Cardiogénique</strong>
                                        <ul className="text-sm list-disc pl-4 text-red-800">
                                            <li>Pas de souffle (ou innocent).</li>
                                            <li>Cœur taille normale.</li>
                                            <li>Distribution souvent Caudo-Dorsale.</li>
                                            <li><strong>Causes :</strong> Électrocution, Étranglement, Convulsions, Noyade.</li>
                                        </ul>
                                    </div>
                                </div>
                            </Section>

                            <Section title="Causes Fréquentes" icon="⚡">
                                <CheckList
                                    items={[
                                        "Électrocution (Mâchonnement fils) : Signes parfois retardés 12-36h.",
                                        "Post-Obstructif (Étranglement, Paralysie Laryngée).",
                                        "Post-Ictal (Après convulsions sévères - Neurogénique).",
                                        "ARDS / SIRS (Sepsis, Pancréatite).",
                                        "Noyade."
                                    ]}
                                />
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Exclusion Cardiaque" icon="💓">
                            <div className="space-y-4">
                                <AlertBox type="info" title="Radiographie Thorax">
                                    <strong>Distribution :</strong> Souvent Caudo-Dorsale (NCPE) vs Péri-hilaire (Cardio Chien) vs Ventrale (Pneumonie).
                                    <br />
                                    Pas de cardiomégalie (VHS Normal).
                                </AlertBox>
                                <CheckList
                                    items={[
                                        "Echocardiographie : Atrium Gauche NORMAL (Rapport AG/Ao < 1.6).",
                                        "Pro-BNP : Normal.",
                                        "SatO2 (Pulse Ox) : Désaturation sévère fréquente."
                                    ]}
                                />
                            </div>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses calculées.</AlertBox>
                            )}

                            <Section title="1. Oxygénothérapie (Le Pilier)" icon="🌬️">
                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-center">
                                    <span className="text-4xl font-black text-blue-600 mb-2 block">O₂ 100%</span>
                                    <p className="text-blue-800 font-medium">Cage à oxygène, Flow-by ou Canules nasales.</p>
                                    <p className="text-sm text-blue-600 mt-2">
                                        Ventilation mécanique (Ventilateur) si PaO2 &lt; 60mmHg malgré O2 pur (ARDS).
                                    </p>
                                </div>
                            </Section>

                            <Section title="2. Diurétiques ? (Furosémide)" icon="💧">
                                <AlertBox type="warning" title="Efficacité Limitée">
                                    L'œdème est dû à une lésion de perméabilité, pas à une surcharge de pression.
                                    <br />
                                    Le furosémide peut DÉSHYDRATER et aggraver l'hypovolémie.
                                </AlertBox>
                                <div className="mt-4 opacity-75">
                                    <DosageCard
                                        title="Furosémide (Lasix) - Si Doute"
                                        value={lasixDose}
                                        unit="mg"
                                        subtitle="IV/IM. Uniquement si surcharge volémique suspectée ou doute cardiogénique."
                                        color="slate"
                                    />
                                </div>
                            </Section>

                            <Section title="3. Support & Nursing" icon="📉">
                                <CheckList
                                    items={[
                                        "Sédation légère (Butorphanol " + butorphanol + " mg) pour réduire l'anxiété et la demande en O2.",
                                        "Fluidothérapie prudente (Sous-maintenance) si hémodynamique stable.",
                                        "Si Électrocution : Vérifier brûlures buccales.",
                                        "Si Post-Obstructif : Corticoïdes anti-inflammatoires (Dexaméthasone 0.1 mg/kg) parfois indiqués (œdème laryngé)."
                                    ]}
                                />
                                <div className="mt-2 text-xs text-slate-500">
                                    Corticoïdes contre-indiqués en général (Sauf obstruction haute).
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "Non-Cardiogenic Pulmonary Edema (Vin)", type: "external" },
                                    { label: "Electroshock Treatment", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

