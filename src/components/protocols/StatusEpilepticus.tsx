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
    Zap,
    Activity,
    AlertTriangle,
    Syringe,
    Timer,
    Brain,
    Thermometer,
    Stethoscope
} from "lucide-react";

export const StatusEpilepticus = () => {
    const { weightKg, species } = useAppStore();

    // Safe wrappers
    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS DOSES ---

    // 1. BENZODIAZEPINES (1ère ligne)
    // Midazolam: 0.2 mg/kg (IV/IM/IN)
    const midazDose = w > 0 ? (w * 0.2).toFixed(2) : "--";
    const midazVol = w > 0 ? (w * 0.2 / 5).toFixed(2) : "--"; // Conc standard 5mg/mL

    // Diazepam: 0.5 - 1.0 mg/kg (IV / Intra-rectal)
    // Attention Diazepam IV peut être 0.5 mg/kg
    const valiumDose = w > 0 ? (w * 0.5).toFixed(2) : "--";
    const valiumVol = w > 0 ? (w * 0.5 / 5).toFixed(2) : "--"; // Conc 10mg/2mL = 5mg/mL

    // 2. ANTI-EPILEPTIQUES (2e ligne)
    // Levetiracetam: 60 mg/kg (Charge)
    const keppraDose = w > 0 ? (w * 60).toFixed(0) : "--";
    const keppraVol = w > 0 ? (w * 60 / 100).toFixed(1) : "--"; // Conc 100mg/mL

    // Phenobarbital: 15 mg/kg (Charge)
    const phenoDose = w > 0 ? (w * 15).toFixed(0) : "--"; // 15-20 mg/kg
    const phenoVol = w > 0 ? (w * 15 / 200).toFixed(2) : "--"; // Conc souvent 200mg/mL ou 40mg/mL... Attention concentration variable. On affiche juste la dose mg.

    // 3. ANESTHESIQUES (3e ligne - Réfractaire)
    // Propofol: 1-6 mg/kg à effet, puis CRI
    const propofolBolusMin = w > 0 ? (w * 1).toFixed(1) : "--";
    const propofolBolusMax = w > 0 ? (w * 6).toFixed(1) : "--";

    return (
        <ProtocolLayout title="Status Epilepticus">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Définition (ACVIM 2024)" icon="📖">
                                <AlertBox type="critical" title="Urgence Neurologique Majeure">
                                    Crise &gt; 5 minutes OU crises successives sans reprise de conscience (Cluster).
                                    <br />
                                    <strong>Risque de lésions cérébrales irréversibles après 30 min.</strong>
                                </AlertBox>
                                <div className="mt-4 text-slate-600">
                                    <p>
                                        L'activité épileptique prolongée entraîne une excitotoxicité (Glutamate), un œdème cérébral et une hyperthermie maligne.
                                    </p>
                                </div>
                            </Section>

                            <Section title="Signes de Gravité" icon="🚨">
                                <CriticalList
                                    items={[
                                        "Hyperthermie > 40°C (Priorité absolue après l'arrêt de la crise)",
                                        "Hypoglycémie associée (Toy breeds, insulinome)",
                                        "Hypertension intracrânienne (Réflexe de Cushing : Bradycardie + Hypertension)",
                                        "Arythmies cardiaques post-ictales"
                                    ]}
                                />
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <>
                            <Section title="Bilan d'Urgence Immédiat" icon="⚡">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                        <h4 className="font-bold text-slate-800 mb-1">Glycémie</h4>
                                        <p className="text-sm text-slate-500">Exclure hypoglycémie avant tout traitement si possible.</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                        <h4 className="font-bold text-slate-800 mb-1">Ionogramme / Ca++</h4>
                                        <p className="text-sm text-slate-500">Hypocalcémie ? (Tétanie, éclampsie).</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                        <h4 className="font-bold text-slate-800 mb-1">Ammoniac / Acides Biliaires</h4>
                                        <p className="text-sm text-slate-500">Encéphalose hépatique (Shunt ?).</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                        <h4 className="font-bold text-slate-800 mb-1">Lactates</h4>
                                        <p className="text-sm text-slate-500">Souvent élevés post-ictale (activité musculaire).</p>
                                    </div>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Attention">
                                    Sélectionnez une espèce et un poids pour voir les doses.
                                </AlertBox>
                            )}

                            <Section title="1. Arrêt de la Crise (1ère Ligne)" icon="🛑">
                                <div className="space-y-6">
                                    {/* MIDAZOLAM */}
                                    <div>
                                        <h4 className="font-bold text-blue-600 mb-2 flex items-center gap-2">
                                            <Syringe size={20} /> Midazolam (Choix #1)
                                        </h4>
                                        <DosageCard
                                            title="Midazolam IV / IM / IN"
                                            value={midazDose}
                                            unit="mg"
                                            subtitle={
                                                <span>
                                                    Volume : <strong>{midazVol} ml</strong> (Standard 5 mg/ml)
                                                    <br />
                                                    Voie : IV, IM ou Intranasale (IN) très efficace.
                                                </span>
                                            }
                                            color="blue"
                                        />
                                    </div>

                                    {/* DIAZEPAM */}
                                    <div>
                                        <h4 className="font-bold text-slate-600 mb-2 flex items-center gap-2">
                                            <Syringe size={20} /> Diazepam (Alternative)
                                        </h4>
                                        <DosageCard
                                            title="Diazepam IV / IR"
                                            value={valiumDose}
                                            unit="mg"
                                            subtitle={
                                                <span>
                                                    Volume : <strong>{valiumVol} ml</strong> (Standard 5 mg/ml)
                                                    <br />
                                                    Voie : IV stricte ou Intra-rectale (IR). <span className="text-rose-600">Jamais IM (douleur/absorption nulle).</span>
                                                    <br />
                                                    ⚠️ <strong>Chat :</strong> Risque nécrose hépatique PO (IV unique OK en urgence).
                                                </span>
                                            }
                                            color="slate"
                                        />
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Prévention Récidive (2e Ligne)" icon="🛡️">
                                <div className="space-y-6">
                                    <AlertBox type="info" title="Indication">
                                        À débuter dès l'arrêt de la crise pour éviter la récidive rapide (t 1/2 BZD très courte).
                                    </AlertBox>

                                    {/* KEPPRA */}
                                    <div>
                                        <h4 className="font-bold text-purple-600 mb-2">Levetiracetam (Keppra)</h4>
                                        <DosageCard
                                            title="Dose de Charge"
                                            value={keppraDose}
                                            unit="mg"
                                            subtitle={
                                                <span>
                                                    Volume : <strong>{keppraVol} ml</strong> (100 mg/ml)
                                                    <br />
                                                    IV lent sur 5-10 min. Très sûr (pas métabolisme hépatique).
                                                </span>
                                            }
                                            color="purple"
                                        />
                                    </div>

                                    {/* PHENO */}
                                    <div>
                                        <h4 className="font-bold text-slate-700 mb-2">Phénobarbital</h4>
                                        <DosageCard
                                            title="Dose de Charge"
                                            value={phenoDose}
                                            unit="mg"
                                            subtitle="À administrer si échec Keppra ou maintenance long cours."
                                            color="slate"
                                        />
                                        <p className="mt-2 text-xs text-slate-500">Attention dépression respiratoire si cumulé avec BZD.</p>
                                    </div>
                                </div>
                            </Section>

                            <Section title="3. Status Réfractaire (CRI)" icon="💤">
                                <CriticalList
                                    items={[
                                        "Si échec après 2 bolus BZD + 1 charge (Keppra/Pheno)...",
                                        "Induction Propofol : Bolus 1-6 mg/kg à effet.",
                                        "Entretien CRI Propofol : 0.1 - 0.4 mg/kg/min.",
                                        "Intubation et Oxygène OBLIGATOIRES."
                                    ]}
                                />
                                <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-700">Calcul CRI Propofol</h4>
                                    <p className="text-sm mt-1">Nécessite pousse-seringue. Surveillance continue ECG/SpO2/Capno.</p>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "ACVIM Consensus Statement 2024 (Status Epilepticus)", url: "https://onlinelibrary.wiley.com/doi/full/10.1111/jvim.16928", type: "external" },
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
