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
    Droplets,
    Stethoscope,
    Wind,
    Thermometer,
    Info
} from "lucide-react";

export const Anaphylaxis = () => {
    const { weightKg, species } = useAppStore();

    // Safe wrappers
    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS DOSES ---

    // 1. Epinephrine IM: 0.01 mg/kg
    const epiImDoseMg = w > 0 ? (w * 0.01).toFixed(2) : "--";
    // Si concentration standard 1 mg/mL => Volume = Dose en mg
    const epiImVol = w > 0 ? (w * 0.01).toFixed(2) : "--";

    // 2. Fluides (Bolus)
    // Chien: 10-20 mL/kg | Chat: 5-10 mL/kg
    const fluidMin = w > 0 ? (w * (isDog ? 10 : 5)).toFixed(0) : "--";
    const fluidMax = w > 0 ? (w * (isDog ? 20 : 10)).toFixed(0) : "--";
    const fluidLabel = isDog ? "10-20 ml/kg" : "5-10 ml/kg";

    // 3. Antihistaminiques & Corticoïdes
    // Diphenhydramine: Chien 2 mg/kg | Chat 1-2 mg/kg (prenons 1.5 moyenne ou range, ici on affiche 1-2 pour chat)
    const benadrylDose = w > 0 ? (isDog ? (w * 2).toFixed(1) : `${(w * 1).toFixed(1)}-${(w * 2).toFixed(1)}`) : "--";

    // Dexamethasone: 0.1 - 0.5 mg/kg
    const dexaMin = w > 0 ? (w * 0.1).toFixed(2) : "--";
    const dexaMax = w > 0 ? (w * 0.5).toFixed(2) : "--";

    return (
        <ProtocolLayout title="Anaphylaxie">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="La Minute VetoGo" icon="⚡">
                                <AlertBox type="critical" title="Urgence Vitale">
                                    Réaction d'hypersensibilité systémique immédiate. Progression fulgurante possible.
                                    <br />
                                    <strong>L'Epinéphrine est l'antidote absolu : le retard tue.</strong>
                                </AlertBox>
                                <div className="mt-4 text-slate-600 leading-relaxed">
                                    <p>
                                        <strong>Organe de Choc Espèce-Dépendant :</strong>
                                    </p>
                                    <ul className="list-disc pl-5 mt-2 space-y-2">
                                        <li>
                                            🐕 <strong>Chien (Foie/GI)</strong> : Vomissements, Diarrhée Hémorragique, Collapsus (séquestration splanchnique).
                                        </li>
                                        <li>
                                            🐈 <strong>Chat (Poumons)</strong> : Détresse respiratoire aiguë, Bronchospasme, Respiration gueule ouverte.
                                        </li>
                                    </ul>
                                </div>
                            </Section>

                            <Section title="Signes de Gravité (Critères d'Alerte)" icon="🚨">
                                <CriticalList
                                    items={[
                                        "Apparition < 30 min après exposition",
                                        "Signes respiratoires (Stridor, Cyanose, Dyspnée)",
                                        "Hypotension / Collapsus / Perte de conscience",
                                        "Chien : Signe du Halo (Œdème paroi vésicule biliaire à l'écho)",
                                        "Chat : Bradycardie paradoxale"
                                    ]}
                                />
                            </Section>

                            <Section title="Signes Cliniques Clés" icon="🔍">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-2 font-bold text-slate-700 mb-1">
                                            <Wind size={18} className="text-blue-500" /> Respiratoire
                                        </div>
                                        <p className="text-sm text-slate-500">Stridor, Dyspnée, Toux (Chat ++)</p>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-2 font-bold text-slate-700 mb-1">
                                            <Activity size={18} className="text-rose-500" /> Circulatoire
                                        </div>
                                        <p className="text-sm text-slate-500">Hypotension, Pâleur, Pouls filant</p>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-2 font-bold text-slate-700 mb-1">
                                            <AlertTriangle size={18} className="text-amber-500" /> Digestif
                                        </div>
                                        <p className="text-sm text-slate-500">Vomissements, Diarrhée (souvent hémorragique)</p>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-2 font-bold text-slate-700 mb-1">
                                            <Thermometer size={18} className="text-slate-500" /> Cutané
                                        </div>
                                        <p className="text-sm text-slate-500">Urticaire, Œdème facial ("Tête d'hippopotame")</p>
                                    </div>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <>
                            <Section title="Point-of-Care Ultrasound (POCUS)" icon="📺">
                                <CheckList
                                    items={[
                                        "A-FAST (Chien) : Recherche 'Halo Sign' (Œdème vésicule biliaire) = Quasi pathognomonique.",
                                        "Veine Cave Caudale : Plate/Collabée (Hypovolémie). Si distendue: chercher autre cause (Cardio)."
                                    ]}
                                />
                            </Section>

                            <Section title="Biologie Délocalisée" icon="💉">
                                <div className="space-y-4">
                                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                                        <h4 className="font-bold text-slate-800 flex justify-between">
                                            ALT (ALAT)
                                            <span className="text-rose-500">Élévation brutale</span>
                                        </h4>
                                        <p className="text-sm text-slate-500 mt-1">
                                            Marqueur fort chez le chien (hypoxie hépatique aiguë).
                                        </p>
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                                        <h4 className="font-bold text-slate-800 flex justify-between">
                                            Lactates
                                            <span className="text-rose-500">&gt; 2.5 mmol/L</span>
                                        </h4>
                                        <p className="text-sm text-slate-500 mt-1">
                                            Reflet de l'hypoperfusion. Objectif: normaliser.
                                        </p>
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                                        <h4 className="font-bold text-slate-800 flex justify-between">
                                            aPTT
                                            <span className="text-rose-500">Allongé</span>
                                        </h4>
                                        <p className="text-sm text-slate-500 mt-1">
                                            Libération massive d'héparine (Chien).
                                        </p>
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
                                    Sélectionnez une espèce et un poids pour voir les doses calculées.
                                </AlertBox>
                            )}

                            <Section title="1. Stabilisation Immédiate (Code Rouge)" icon="🚀">
                                <div className="space-y-6">
                                    {/* EPINEPHRINE */}
                                    <div>
                                        <h4 className="font-bold text-rose-600 mb-2 flex items-center gap-2">
                                            <Syringe size={20} /> Epinéphrine (Adrénaline)
                                        </h4>
                                        <DosageCard
                                            title="Epinéphrine IM (1e intention)"
                                            value={epiImDoseMg}
                                            unit="mg"
                                            subtitle={
                                                <span>
                                                    Volume : <strong className="text-slate-900">{epiImVol} ml</strong> (si 1 mg/ml)
                                                    <br />
                                                    Site : Quadriceps / Lombaires. Répéter toutes les 5-15 min.
                                                </span>
                                            }
                                            color="red"
                                        />
                                        <div className="mt-3 text-sm text-slate-600 bg-rose-50 p-3 rounded-lg border border-rose-100">
                                            <strong>Option IV (Choc sévère) :</strong> 0.005 - 0.01 mg/kg.
                                            <br />
                                            ⚠️ <em>Dilution indispensable (1:10 ou 1:100) pour éviter arythmies fatales.</em>
                                        </div>
                                    </div>

                                    {/* FLUIDES */}
                                    <div>
                                        <h4 className="font-bold text-blue-600 mb-2 flex items-center gap-2">
                                            <Droplets size={20} /> Fluidothérapie (Bolus)
                                        </h4>
                                        <DosageCard
                                            title={`Bolus Cristalloïdes (${fluidLabel})`}
                                            value={`${fluidMin}-${fluidMax}`}
                                            unit="ml"
                                            subtitle="À passer en 15 minutes. Répéter si nécessaire (Stop si crépitants)."
                                            color="blue"
                                        />
                                        <p className="mt-2 text-xs text-slate-500">
                                            Objectif : PAM &gt; 60 mmHg, Lactates &lt; 2. Attention surcharge chat !
                                        </p>
                                    </div>

                                    {/* OXYGENE */}
                                    <AlertBox type="info" title="Oxygénothérapie">
                                        100% Flow-by, Masque ou Cage. Intubation immédiate si stridor/obstruction laryngée.
                                    </AlertBox>
                                </div>
                            </Section>

                            <Section title="2. Thérapies Adjuvantes" icon="💊">
                                <div className="space-y-4">
                                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-bold text-slate-700">Diphenhydramine (Anti-H1)</span>
                                            <span className="font-mono bg-white px-2 py-1 rounded border shadow-sm">{benadrylDose} mg</span>
                                        </div>
                                        <p className="text-sm text-slate-500">IM ou IV lent. Ne traite PAS le choc, mais les signes cutanés.</p>
                                    </div>

                                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-bold text-slate-700">Dexaméthasone (Corticoïde)</span>
                                            <span className="font-mono bg-white px-2 py-1 rounded border shadow-sm">{dexaMin}-{dexaMax} mg</span>
                                        </div>
                                        <p className="text-sm text-slate-500">IV. Prévient la phase tardive (4-6h délai).</p>
                                    </div>

                                    {isCat && (
                                        <div className="p-4 border border-blue-200 rounded-xl bg-blue-50">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="font-bold text-blue-800 flex items-center gap-1"><Wind size={16} /> Salbutamol (Ventoline)</span>
                                                <span className="font-mono bg-white px-2 py-1 rounded border border-blue-100 shadow-sm text-blue-900">1-2 Puffs</span>
                                            </div>
                                            <p className="text-sm text-blue-700">Bronchodilatation. Avec chambre d'inhalation. Répéter q15-30min.</p>
                                        </div>
                                    )}
                                </div>
                            </Section>

                            <Section title="3. Cas Réfractaires" icon="💪">
                                <CheckList
                                    items={[
                                        "Vérifier le volume : Bolus fluides insuffisants ?",
                                        "Vasopresseurs : Noradrénaline (0.05-1 mcg/kg/min) si vasoplégie.",
                                        "Glucagon : Si patient sous bêta-bloquants (échec épinéphrine). Bolus 0.05-0.15 mg/kg."
                                    ]}
                                />
                            </Section>

                            <Section title="Surveillance Post-Critique" icon="👁️">
                                <AlertBox type="warning" title="Réaction Biphasique">
                                    Possible récidive dans les 1 à 72h (20% des cas).
                                    <br />
                                    <strong>Surveillance hospitalière 12-24h impérative.</strong>
                                </AlertBox>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "AAHA Fluid Therapy Guidelines 2024", url: "https://www.aaha.org", type: "external" },
                                    { label: "MSPCA Angell - Anaphylaxis", url: "https://www.mspca.org", type: "external" },
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
