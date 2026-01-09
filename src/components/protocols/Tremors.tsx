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
    Droplets,
    Zap,
    Thermometer
} from "lucide-react";

export const Tremors = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;

    // --- CALCULS ---

    // 1. METHOCARBAMOL (Robaxin)
    // 15-20 mg/kg IV lent.
    const methocMin = w > 0 ? (w * 15).toFixed(0) : "--";
    const methocMax = w > 0 ? (w * 20).toFixed(0) : "--";

    // 2. LIPIDES (Intralipid 20%)
    // Bolus 1.5 ml/kg
    const lipidBolus = w > 0 ? (w * 1.5).toFixed(0) : "--";
    // CRI 0.25 ml/kg/min (sur 30-60 min)
    const lipidCRI = w > 0 ? (w * 0.25).toFixed(1) : "--";

    // 3. DIAZEPAM (Valium) - Si Convulsions associées
    const valium = w > 0 ? (w * 0.5).toFixed(1) : "--";

    return (
        <ProtocolLayout title="Tremblements / Myoclonies Aiguës">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Triage Rapide" icon="⚡">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <AlertBox type="critical" title="Perméthrine (Chat)">
                                        <strong>Pipette Chien sur Chat ?</strong>
                                        <br />URGENCE ABSOLUE. Tremblements, Salivation, Hyperthermie.
                                        <br />Pronostic bon si traité tôt (Méthocarbamol + Lipides).
                                    </AlertBox>
                                    <AlertBox type="critical" title="Métaldéhyde (Anti-Limace)">
                                        <strong>'Shake and Bake'</strong>
                                        <br />Tremblements violents + Hyperthermie sévère (&gt;41°C).
                                        <br />Risque décès par CID/Défaillance multi-organes.
                                    </AlertBox>
                                </div>
                                <div className="mt-4">
                                    <AlertBox type="warning" title="Ne pas confondre">
                                        <strong>Tremblements (Conscient)</strong> vs <strong>Convulsions (Inconscient/Perte contact)</strong>.
                                        <br />Les tremblements ne répondent PAS bien au Valium. Il faut du Méthocarbamol.
                                    </AlertBox>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="La Traque des Toxines" icon="🕵️">
                            <div className="space-y-4">
                                <AlertBox type="info" title="Anamnèse Ciblée">
                                    <ul className="list-disc pl-5">
                                        <li><strong>Perméthrine ?</strong> (Pipette chien mise sur le chat).</li>
                                        <li><strong>Poubelle ?</strong> (Mycotoxines, Caféine).</li>
                                        <li><strong>Compost ?</strong> (Mycotoxines).</li>
                                        <li><strong>Médicaments humains ?</strong> (Antidépresseurs, Amphétamines).</li>
                                    </ul>
                                </AlertBox>
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Bilan Sanguin Immédiat</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li><strong>Calcium (iCa) :</strong> Éclampsie (Chienne allaitante / Petite race).</li>
                                        <li><strong>Glucose :</strong> Hypoglycémie sévère (Insulinome, Xylitol).</li>
                                        <li><strong>Électrolytes :</strong> Troubles sévères.</li>
                                    </ul>
                                </div>
                            </div>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses calculées.</AlertBox>
                            )}

                            <Section title="1. Contrôle Moteur (Myorelaxants)" icon="📉">
                                <DosageCard
                                    title="Méthocarbamol (Robaxin)"
                                    value={`${methocMin} - ${methocMax}`}
                                    unit="mg"
                                    subtitle="IV LENT. Répéter à effet. Dose max journalière élevée."
                                    color="blue"
                                />
                                <div className="mt-2 text-sm text-slate-600 italic">
                                    Si agitation extrême ou convulsions associées : Ajouter Diazépam ({valium} mg IV).
                                </div>
                            </Section>

                            <Section title="2. Antidote Toxines Lipophiles (ILE)" icon="💧">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
                                    <p className="text-sm font-semibold text-slate-900 mb-1">Indications :</p>
                                    <ul className="list-disc pl-5 text-sm text-slate-700">
                                        <li>Perméthrine (Chat).</li>
                                        <li>Ivermectine / Lactones macrocycliques (Colley MDR1).</li>
                                        <li>Anesthésiques locaux (Surdosage Lidocaïne).</li>
                                    </ul>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DosageCard
                                        title="Intralipid 20% (Bolus)"
                                        value={`${lipidBolus}`}
                                        unit="ml"
                                        subtitle="IV sur 15 min. (1.5 ml/kg)."
                                        color="green"
                                    />
                                    <DosageCard
                                        title="Intralipid 20% (CRI)"
                                        value={`${lipidCRI}`}
                                        unit="ml/min"
                                        subtitle="Perfusion continue pendant 30-60 min après le bolus."
                                        color="green"
                                    />
                                </div>
                            </Section>

                            <Section title="3. Nursing & Décontamination" icon="🌡️">
                                <CheckList
                                    items={[
                                        "Hyperthermie ? : Si T° &gt; 40°C, refroidir activement (Bains tibes, ventilateur) jusqu'à 39°C. STOP à 39°C pour éviter l'hypothermie.",
                                        "Lavage Cutané (Perméthrine) : Bains détergents (Liquide vaisselle) DOUX. Sécher rapidement pour ne pas refroidir.",
                                        "Lavage Gastrique ? : Uniquement si ingestion &lt; 1h et animal intubé (risque fausse route majeur si tremblements)."
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
                                    { label: "Permethrin Toxicity Management", type: "external" },
                                    { label: "Lipid Emulsion (ILE) Guidelines", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

