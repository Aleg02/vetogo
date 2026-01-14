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
    Activity,
    HeartPulse,
    Bandage,
    AlertOctagon,
    Timer
} from "lucide-react";

export const AcuteHemorrhage = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS (Supprimés, gérés par DosageCard) ---

    return (
        <ProtocolLayout title="Hémorragie Aiguë (Choc Hémorragique)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Concept : 'Pop the Clot'" icon="🩸">
                                <AlertBox type="critical" title="Hypotension Permissive">
                                    <strong>NE PAS REMPLIR TROP VITE !</strong>
                                    <br />
                                    Objectif : PAS systolique 80-90 mmHg (Juste assez pour perfuser).
                                    <br />
                                    Si on remonte trop la pression avant l'hémostase chirurgicale, on réactive le saignement ("Pop the Clot").
                                </AlertBox>
                                <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100">
                                    <h4 className="font-bold text-red-900 flex items-center gap-2">
                                        <Bandage size={20} /> Hémostase Externe
                                    </h4>
                                    <ul className="text-sm text-red-800 list-disc pl-4 mt-2 space-y-1">
                                        <li>Compression directe (5-10 min sans relâcher).</li>
                                        <li>Pansement compressif (Abdominal) : Max 2-4h ! Surveiller respiration.</li>
                                        <li>Garrot (Tourniquet) : UNIQUEMENT sur membre sacrifié ou hémorragie artérielle incontrôlable vie menacée.</li>
                                    </ul>
                                </div>
                            </Section>

                            <Section title="Signes de Choc Décompensé" icon="📉">
                                <div className="bg-slate-50 p-4 border rounded text-sm text-slate-600">
                                    <p className="mb-2"><strong>Triade de la Mort :</strong></p>
                                    <ul className="list-disc pl-4 space-y-1">
                                        <li>Hypothermie (Joue contre la coagulation).</li>
                                        <li>Acidose (Lactates élevés).</li>
                                        <li>Coagulopathie (PT/aPTT allongés).</li>
                                    </ul>
                                    <p className="mt-2 text-xs text-slate-500 italic">Il faut réchauffer activement tout patient hémorragique.</p>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <>
                            <Section title="Seuils Transfusionnels" icon="🧪">
                                <CheckList
                                    items={[
                                        "PCV < 20% (Chien) / < 15-18% (Chat) AVEC signes cliniques.",
                                        "Lactates > 4 mmol/L persistants malgré remplissage (Hypoperfusion).",
                                        "Tachycardie persistante, Hypotension sévère.",
                                        "Perte sanguine estimée > 20-30% volume sanguin."
                                    ]}
                                />
                            </Section>
                            <Section title="Imagerie d'Urgence (A-FAST)" icon="💾">
                                <div className="bg-blue-50 p-3 rounded border border-blue-100 text-blue-900 text-sm">
                                    <strong className="flex items-center gap-2"><Activity size={16} /> A-FAST (Score 0-4)</strong>
                                    <p className="mt-1">
                                        Recherche de liquide libre (anécho) en 4 points (Diaphragmatico-Hépatique, Spléno-Rénal, Cysto-Colique, Hépato-Rénal).
                                        <br />
                                        Si positif + PCV/PT liquide &gt; PCV/PT périph = Hémorragie Active.
                                    </p>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Saisir Poids">
                                    Doses hémostatiques calculées.
                                </AlertBox>
                            )}

                            <Section title="1. Stabilisation Hémodynamique" icon="💉">
                                <div className="space-y-6">
                                    {/* TRANEXAMIC ACID */}
                                    <div>
                                        <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                                            <Syringe size={20} /> Acide Tranexamique (Exacyl)
                                        </h4>
                                        <DosageCard
                                            title="TXA IV Lent"
                                            value="10-15"
                                            unit="mg/kg"
                                            dosageRange={[10, 15]}
                                            concentration={100}
                                            route="IV"
                                            subtitle={
                                                <span>
                                                    Sur 15 min. Efficace si donné dans les 3h post-trauma (CRASH-2 Study).
                                                </span>
                                            }
                                            color="purple"
                                            intentionLabel="Hémostatique"
                                        />
                                    </div>

                                    {/* FLUIDES */}
                                    <div>
                                        <h4 className="font-bold text-blue-600 mb-2 flex items-center gap-2">
                                            <Droplets size={20} /> Petits Bolus (Hypotension Permissive)
                                        </h4>
                                        <DosageCard
                                            title="Bolus Cristalloïdes"
                                            value={isDog ? "10" : "5"}
                                            unit="ml/kg"
                                            dosage={isDog ? 10 : 5}
                                            route="IV"
                                            subtitle="Objectif PAS 80-90 mmHg. Ne pas viser une normotension totale avant chirurgie."
                                            color="blue"
                                            intentionLabel="1ère Intention"
                                        />
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Transfusion Sanguine" icon="💓">
                                {isCat && (
                                    <AlertBox type="critical" title="Grouper le CHAT !">
                                        Le Chat A a des anticorps anti-B (Mortel) et le B a des AC anti-A.
                                        <br />
                                        <strong>Typage ou Cross-Match OBLIGATOIRE.</strong>
                                    </AlertBox>
                                )}
                                <div className="mt-4">
                                    <h4 className="font-bold text-red-600 mb-2">Sang Total / Culot (Estimation)</h4>
                                    <DosageCard
                                        title="Volume à Transfuser"
                                        value="10-20"
                                        unit="ml/kg"
                                        dosageRange={[10, 20]}
                                        route="IV"
                                        subtitle="Débit lent (0.5 ml/kg) les 15 premières min (Réaction ?)."
                                        color="red"
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
                                    { label: "VECCS Guidelines on Antifibrinolytics", type: "external" },
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

