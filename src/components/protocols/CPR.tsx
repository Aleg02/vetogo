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
    HeartPulse,
    Activity,
    Syringe,
    Timer,
    Zap,
    Wind
} from "lucide-react";

export const CPR = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS RECOVER 2024 ---

    // 1. COMPRESSIONS
    // Rate: 100-120 bpm (Tout animal)
    // Ratio: 30:2 (Si seul) ou Continu (Si intubé)

    // 2. ÉPINÉPHRINE (Adrénaline)
    // Low Dose (Standard) : 0.01 mg/kg IV/IO (Toutes les 3-5 min / 1 cycle sur 2)
    const epiLowDose = w > 0 ? (w * 0.01).toFixed(3) : "--"; // mg
    const epiLowVol = w > 0 ? (w * 0.01).toFixed(2) : "--"; // ml (1 mg/ml)

    // High Dose (Plus recommandé en 1ère intention RECOVER 2024, sauf exception)
    // On ne l'affiche pas pour sécurité ou en "Rouge" si échec prolongé (> 10min)

    // 3. ATROPINE
    // 0.04 mg/kg IV/IO (Une seule fois ! - Tonalité vagale)
    const atropineDose = w > 0 ? (w * 0.04).toFixed(2) : "--"; // mg
    // Solution souvent variable (0.5 mg/ml ou 1 mg/ml). On affiche mg.

    // 4. DÉFIBRILLATION (Biphasique)
    // Choc 1 : 2 J/kg
    // Choc 2+ : 4 J/kg
    const defib2J = w > 0 ? (w * 2).toFixed(0) : "--";
    const defib4J = w > 0 ? (w * 4).toFixed(0) : "--";

    // 5. ANTAGONISTES
    // Naloxone (0.04 mg/kg)
    const naloxone = w > 0 ? (w * 0.04).toFixed(2) : "--";
    // Flumazenil (0.01 mg/kg)
    const flumazenil = w > 0 ? (w * 0.01).toFixed(2) : "--";
    // Atipamezole (Antisedan) : Volume vol/vol ou 5x dose medetomidine.

    return (
        <ProtocolLayout title="Arrêt Cardio-Respiratoire (CPR)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Basic Life Support (BLS)" icon="💓">
                                <AlertBox type="critical" title="Compressions : Pousser Fort & Vite">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                        <div>
                                            <strong className="block text-lg">100 - 120 bpm</strong>
                                            <span className="text-sm">Rythme "Stayin' Alive". Relâchement total entre compressions.</span>
                                        </div>
                                        <div>
                                            <strong className="block text-lg">Déficit Latéral</strong>
                                            <span className="text-sm">Chien &gt; 15kg (Partie la plus large).</span>
                                        </div>
                                        <div>
                                            <strong className="block text-lg">Pompe Cardiaque</strong>
                                            <span className="text-sm">Chat / Petit Chien (Sur le coeur).</span>
                                        </div>
                                        <div>
                                            <strong className="block text-lg">Cycles de 2 min</strong>
                                            <span className="text-sm">Relais sans arrêt &gt; 5 sec.</span>
                                        </div>
                                    </div>
                                </AlertBox>

                                <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-2">
                                        <Wind size={20} /> Ventilation
                                    </h4>
                                    <ul className="list-disc pl-4 text-sm text-blue-800 space-y-1">
                                        <li><strong>Intubé :</strong> 10 rpm (1 souffle toutes les 6 sec). Ne pas hyperventiler !</li>
                                        <li><strong>Non-Intubé :</strong> 30 compressions / 2 insufflations (Bouche-museau étanche).</li>
                                    </ul>
                                </div>
                            </Section>

                            <Section title="Algorithme RECOVER 2024" icon="⚙️">
                                <div className="space-y-2 text-sm text-slate-600">
                                    <p>1. <strong>Apnée + Inconscient</strong> = START CPR.</p>
                                    <p>2. <strong>Accès IV/IO</strong> + Moniteur (ECG/EtCO2) sans arrêter compressions.</p>
                                    <p>3. <strong>Toutes les 2 min :</strong> Changer masseur + Check ECG (Rapide !).</p>
                                    <p>4. <strong>EtCO2 :</strong> Si &lt; 15 mmHg, améliorer compressions. Si bond soudain = ROSC !</p>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <>
                            <Section title="Suivi per-ressuscitation" icon="🖥️">
                                <CheckList
                                    items={[
                                        "ECG : Asystolie ? PEA ? Fibrillation (Choc) ?",
                                        "EtCO2 (Capnographie) : Indicateur n°1 perfusion pulmonaire.",
                                        "Pouls fémoral ? (Difficile à sentir, ne pas perdre de temps).",
                                        "Discuter les causes réversibles (5H / 5T)."
                                    ]}
                                />
                            </Section>
                            <Section title="Causes Réversibles (H & T)" icon="🔄">
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div className="bg-slate-50 p-2 rounded"><strong>Hypo</strong>volémie</div>
                                    <div className="bg-slate-50 p-2 rounded"><strong>T</strong>oxines</div>
                                    <div className="bg-slate-50 p-2 rounded"><strong>Hypo</strong>xygénation</div>
                                    <div className="bg-slate-50 p-2 rounded"><strong>T</strong>amponnade</div>
                                    <div className="bg-slate-50 p-2 rounded"><strong>H</strong>ydrogène (Acidose)</div>
                                    <div className="bg-slate-50 p-2 rounded"><strong>T</strong>ension (Pneumothorax)</div>
                                    <div className="bg-slate-50 p-2 rounded"><strong>Hyper/Hypo</strong>kaliémie</div>
                                    <div className="bg-slate-50 p-2 rounded"><strong>T</strong>hrombo-embolie</div>
                                    <div className="bg-slate-50 p-2 rounded"><strong>Hypo</strong>thermie</div>
                                    <div className="bg-slate-50 p-2 rounded"><strong>T</strong>rauma</div>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Saisir Poids">
                                    Doses vitales calculées sur le poids.
                                </AlertBox>
                            )}

                            <Section title="Advanced Life Support (ALS)" icon="💉">
                                <div className="space-y-6">
                                    {/* EPINEPHRINE */}
                                    <div>
                                        <h4 className="font-bold text-red-600 mb-2 flex items-center gap-2">
                                            <Syringe size={20} /> Adrénaline (Low Dose)
                                        </h4>
                                        <DosageCard
                                            title="Adrénaline IV/IO"
                                            value={epiLowDose}
                                            unit="mg"
                                            subtitle={
                                                <span>
                                                    Vol (1mg/ml) : <strong>{epiLowVol} ml</strong>.
                                                    <br />
                                                    Toutes les 3-5 min (1 cycle sur 2). RECOVER 2024 privilégie Low Dose.
                                                </span>
                                            }
                                            color="red"
                                        />
                                    </div>

                                    {/* ATROPINE */}
                                    <div>
                                        <h4 className="font-bold text-purple-600 mb-2 flex items-center gap-2">
                                            <Syringe size={20} /> Atropine
                                        </h4>
                                        <DosageCard
                                            title="Atropine IV/IO"
                                            value={atropineDose}
                                            unit="mg"
                                            subtitle="0.04 mg/kg. UNE SEULE FOIS. Si Asystolie ou PEA lent."
                                            color="purple"
                                        />
                                    </div>

                                    {/* DEFIBRILLATION */}
                                    <div>
                                        <h4 className="font-bold text-amber-500 mb-2 flex items-center gap-2">
                                            <Zap size={20} /> Défibrillation (FV / TV sans pouls)
                                        </h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <DosageCard
                                                title="Choc 1 (2 J/kg)"
                                                value={defib2J}
                                                unit="Joules"
                                                subtitle="Dose initiale biphasique."
                                                color="purple"
                                            />
                                            <DosageCard
                                                title="Choc 2+ (4 J/kg)"
                                                value={defib4J}
                                                unit="Joules"
                                                subtitle="Si échec, augmenter dose."
                                                color="red"
                                            />
                                        </div>
                                        <p className="text-xs text-amber-700 mt-1">
                                            Reprendre massage IMMÉDIATEMENT après choc (Pas de lecture ECG).
                                        </p>
                                    </div>

                                    {/* ANTAGONISTES */}
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <h4 className="font-bold text-slate-700 mb-2">Antidotes (Si cause suspectée)</h4>
                                        <ul className="text-sm space-y-1 text-slate-600">
                                            <li><strong>Naloxone (Opioïdes) :</strong> {naloxone} mg</li>
                                            <li><strong>Flumazenil (Benzos) :</strong> {flumazenil} mg</li>
                                            <li><strong>Atipamezole (Alpha2) :</strong> Volume égal au vol. injecté.</li>
                                        </ul>
                                    </div>
                                </div>
                            </Section>

                            <Section title="Post-Ressuscitation (ROSC)" icon="🏥">
                                <CheckList
                                    items={[
                                        "Optimiser l'oxygénation (SpO2 > 94%)",
                                        "Maintenir Pression Artérielle (Bolus / Vasopresseurs)",
                                        "Contrôler la température (Éviter hyperthermie)",
                                        "Surveillance ECG continue (Risque ré-arrêt)"
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
                                    { label: "RECOVER Initiative Guidelines 2024", url: "https://recoverinitiative.org", type: "external" },
                                    { label: "ACVECC CPR Guidelines", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

