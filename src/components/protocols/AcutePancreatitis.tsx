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
    Droplets,
    Syringe,
    Utensils,
    Zap,
    ShieldAlert,
    Thermometer
} from "lucide-react";

export const AcutePancreatitis = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. ANALGÉSIE (Opioïdes purs)
    // Méthadone : 0.2 - 0.4 mg/kg IV q4h
    const methaDose = w > 0 ? (w * 0.2).toFixed(2) : "--";

    // Buprenorphine (Chat) : 0.02 mg/kg
    const bupreDose = w > 0 ? (w * 0.02).toFixed(2) : "--";

    // Lidocaine CRI (Chien uniquement) : Bolus 1-2mg/kg puis 20-50 mcg/kg/min
    // Anti-inflammatoire / Analgésique viscéral.
    // Bolus 1 mg/kg
    const lidoBolus = w > 0 ? (w * 1).toFixed(1) : "--";

    // 2. ANTI-VOMITIFS (Multimodal)
    // Maropitant : 1 mg/kg IV
    const maropitantDose = w > 0 ? (w * 1).toFixed(1) : "--";
    // Ondansetron (Zofran) : 0.5 mg/kg IV
    const ondansetronDose = w > 0 ? (w * 0.5).toFixed(1) : "--";

    // FLUIDES : Maintenance + Déficit + Pertes. (Généralement agressif : x1.5 - x2 maintenance au début).

    return (
        <ProtocolLayout title="Pancréatite Aiguë">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Diagnostic" icon="🔬">
                                <AlertBox type="info" title="SNAP Test (cPL / fPL)">
                                    Très sensible (peu de faux négatifs). Si Négatif &rarr; Ce n'est probablement pas une pancréatite.
                                    <br />
                                    Si Positif &rarr; Suspicion (confirmer avec écho).
                                </AlertBox>
                                <div className="mt-4 bg-white p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Echographie (Gold Standard)</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li>Pancréas hypoéchogène et augmenté de taille.</li>
                                        <li>Graisse  péri-pancrétique hyperéchogène (réactive).</li>
                                        <li>Liquide libre abdominal localisé.</li>
                                    </ul>
                                </div>

                                <div className="mt-4">
                                    <CheckList
                                        items={[
                                            "Lipase DGGR : Plus spécifique que la lipase traditionnelle.",
                                            "Bilan d'extension : Reins/Foie (comorbidités fréquentes).",
                                            "Calcium : Hypocalcémie possible (saponification des graisses)."
                                        ]}
                                    />
                                </div>
                            </Section>
                            <Section title="Les 4 Piliers" icon="⚡">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-blue-50 p-2 rounded border border-blue-100 text-center">
                                        <span className="font-bold text-blue-700 block">1. Fluides</span>
                                        <span className="text-xs">Essentiel (Perfusion pancréatique)</span>
                                    </div>
                                    <div className="bg-red-50 p-2 rounded border border-red-100 text-center">
                                        <span className="font-bold text-red-700 block">2. Analgésie</span>
                                        <span className="text-xs">Opioïdes purs (Méthadone)</span>
                                    </div>
                                    <div className="bg-green-50 p-2 rounded border border-green-100 text-center">
                                        <span className="font-bold text-green-700 block">3. Nutrition</span>
                                        <span className="text-xs">Précoce (Sonde si besoin)</span>
                                    </div>
                                    <div className="bg-yellow-50 p-2 rounded border border-yellow-100 text-center">
                                        <span className="font-bold text-yellow-700 block">4. Nausée</span>
                                        <span className="text-xs">Maropitant + Ondansetron</span>
                                    </div>
                                </div>
                            </Section>

                            <Section title="Diagnostic (ACVIM)" icon="🛡️">
                                <CheckList
                                    items={[
                                        "Test Spécifique : Spec cPL / fPL (Sensible & Spécifique).",
                                        "Echo Abdo : Pancréas hypoéchogène, graisse hyperéchogène, épanchement.",
                                        "Bilan : Lipase DGGR, Neutrophilie, Hypocalcémie (Mauvais pronostic ?)."
                                    ]}
                                />
                                {isDog && (
                                    <AlertBox type="info" title="Nouveau Traitement (USA/Japon)">
                                        <strong>Fuzapladib</strong> (Panoquell) : Inhibiteur LFA-1. Réduit l'inflammation neutrophilique.
                                    </AlertBox>
                                )}
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses calculées.</AlertBox>
                            )}

                            <Section title="1. Analgésie (Priorité Absolue)" icon="💉">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-bold text-red-600 mb-2">Opioïdes (1ère intention)</h4>
                                        {isCat ? (
                                            <DosageCard
                                                title="Buprénorphine"
                                                value={bupreDose}
                                                unit="mg"
                                                subtitle="IV/IM/Sublingual. Si modéré."
                                                color="red"
                                            />
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <DosageCard
                                                    title="Méthadone"
                                                    value={methaDose}
                                                    unit="mg"
                                                    subtitle="IV Lente / IM. Gold Standard. Pas de vomissements."
                                                    color="red"
                                                />
                                                <DosageCard
                                                    title="Lidocaïne (Bolus IV)"
                                                    value={lidoBolus}
                                                    unit="mg"
                                                    subtitle="Chien uniquement. Analgésie viscérale + Anti-inflammatoire."
                                                    color="red"
                                                />
                                            </div>
                                        )}
                                        <p className="text-xs text-slate-500 mt-2">Eviter AINS (Risque Rein/Digestif déjà compromis).</p>
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Anti-Nauséeux & Nutrition" icon="🍽️">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <DosageCard
                                        title="Maropitant (Cerenia)"
                                        value={maropitantDose}
                                        unit="mg"
                                        subtitle="IV (1x/j). Analgésie viscérale accessoire."
                                        color="blue"
                                    />
                                    <DosageCard
                                        title="Ondansétron (Zofran)"
                                        value={ondansetronDose}
                                        unit="mg"
                                        subtitle="IV (2-3x/j). Si nausées persistent."
                                        color="blue"
                                    />
                                </div>

                                <AlertBox type="info" title="Nutrition Précoce">
                                    <strong>NE PAS JEÛNER</strong> si vomissements contrôlés.
                                    <br />
                                    Nourrir (Sonde NE si anorexie) réduit la translocation bactérienne et la mortalité.
                                    <br />
                                    <em>Chien :</em> Low Fat.
                                    <br />
                                    <em>Chat :</em> Hyperdigestible (Fat restriction moins critique).
                                </AlertBox>
                            </Section>

                            <Section title="3. Fluides" icon="💧">
                                <p className="text-sm text-slate-700 mb-2">
                                    Rétablir la perfusion pancréatique est vital pour stopper la nécrose.
                                    <br />
                                    Bolus si choc, puis Maintenance corrigée.
                                </p>
                                <AlertBox type="warning" title="Caution Chat">
                                    Attention à la surcharge volumique chez le chat (Echo cardiaque si souffle).
                                </AlertBox>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "ACVIM Consensus Pancreatitis", type: "external" },
                                    { label: "WSAVA Nutrition Guidelines", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

