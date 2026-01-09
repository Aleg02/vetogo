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
    Baby,
    Syringe,
    Timer,
    HeartPulse,
    Thermometer,
    Stethoscope
} from "lucide-react";

export const CSection = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. TRAITEMENT MÉDICAL (Si pas d'obstruction)
    // Oxytocine : Dose faible recommandée (0.5 - 2 UI TOTAL, pas par kg, sauf si très gros chien)
    // Standard : Chien 0.5-2 UI IM. Chat 0.5-1 UI IM.
    // On affiche une plage safe.
    const oxyDose = isDog ? "0.5 - 2.0 UI (Total)" : "0.5 - 1.0 UI (Total)";

    // Calcium Gluconate 10% : 0.5 - 1 ml/kg IV LENT (Protection ou Inertie)
    const calcGluco = w > 0 ? (w * 0.5).toFixed(1) : "--";

    // 2. RÉANIMATION NÉONATALE
    // Naloxone (Si mère a eu des opioïdes) : 0.1 mg/kg (1 goutte sous la langue ou IV/IO)
    // Poids moyen chiot/chaton : ~0.1 - 0.5 kg.
    // On ne peut pas calculer sur le poids mère. On met une info générique.

    // 3. ANESTHÉSIE CÉSARIENNE
    // Propofol : 4-6 mg/kg (Induction)
    const propofolInduc = w > 0 ? (w * 4).toFixed(1) : "--";
    // Alfaxalone : 2-3 mg/kg
    const alfaxaloneInduc = w > 0 ? (w * 2).toFixed(1) : "--";

    return (
        <ProtocolLayout title="Dystocie & Césarienne">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Critères d'Urgence (Césarienne)" icon="⏱️">
                                <AlertBox type="critical" title="Décision Chirurgicale">
                                    Si UN seul de ces critères est présent = Césarienne.
                                    <ul className="list-disc pl-4 mt-2">
                                        <li><strong>Temps :</strong> &gt; 2h entre deux chiots.</li>
                                        <li><strong>Efforts :</strong> &gt; 30 min d'efforts expulsifs improductifs.</li>
                                        <li><strong>Souffrance :</strong> FC Fœtale &lt; 160 bpm (Stress) ou &lt; 140 bpm (Urgence).</li>
                                        <li><strong>Obstruction :</strong> Chiots coincés, bassin étroit.</li>
                                        <li><strong>Inertie :</strong> Pas de réponse au traitement médical (2x Oxytocine).</li>
                                    </ul>
                                </AlertBox>
                                <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                                    <h4 className="font-bold text-orange-900 flex items-center gap-2">
                                        <Thermometer size={20} /> Signes avant-coureurs
                                    </h4>
                                    <p className="text-sm text-orange-800 mt-1">
                                        Chute de température rectale (&lt; 37.5°C) 12-24h avant la mise bas (Chien).
                                        <br />
                                        Pertes verdâtres (Utréroverdine) SANS chiot dans les minutes qui suivent = Décollement placentaire = Césarienne urgence.
                                    </p>
                                </div>
                            </Section>

                            <Section title="Réanimation Néonatale (ABC)" icon="🍼">
                                <CheckList
                                    items={[
                                        "Airway : Dégager les voies (Poire), ne PAS balancer (Secouer).",
                                        "Breathing : Stimulation vigoureuse (Friction thorax) + O2 Flow-by.",
                                        "Circulation : Si FC < 60 bpm malgré O2 -> Massage cardiaque externe.",
                                        "Drugs : Naloxone (1 goutte s/s langue) si mère a eu Morphine/Fentanyl.",
                                        "Echauffement : Sécher, lampe chauffante, contact."
                                    ]}
                                />
                                <div className="bg-white p-3 border rounded text-sm text-slate-600 mt-2">
                                    <strong>Point Jen Chung (GV26) :</strong> Aiguille 25G dans le philtrum (nez) + rotation. Stimule la respiration.
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <>
                            <Section title="Monitoring Fœtal" icon="🩺">
                                <AlertBox type="info" title="FC Fœtale (Echo)">
                                    <strong>Normale :</strong> &gt; 200 bpm.
                                    <br />
                                    <strong>Stress :</strong> 160 - 180 bpm. (Surveiller).
                                    <br />
                                    <strong>Détresse :</strong> &lt; 140 - 160 bpm (Césarienne immédiate).
                                </AlertBox>
                                <p className="mt-2 text-sm text-slate-600">
                                    Radio : Compter les crânes/colonnes pour savoir combien il en reste.
                                </p>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Saisir Poids">
                                    Doses calculées pour la Mère.
                                </AlertBox>
                            )}

                            <Section title="1. Traitement Médical (Inertie Utérine)" icon="💉">
                                <AlertBox type="warning" title="Contre-Indication">
                                    Jamais d'Oxytocine si OBSTRUCTION (Radio requise).
                                </AlertBox>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DosageCard
                                        title="Gluconate Calcium 10%"
                                        value={`${calcGluco}`}
                                        unit="ml"
                                        subtitle="IV LENT (5-10 min) sous ECG. Renforce la contraction."
                                        color="blue"
                                    />
                                    <DosageCard
                                        title="Oxytocine"
                                        value={oxyDose}
                                        unit="UI Total"
                                        subtitle="IM. Ne pas dépasser 2 UI par injection. Max 2-3 injections à 30 min d'intervalle."
                                        color="purple"
                                    />
                                </div>
                            </Section>

                            <Section title="2. Anesthésie " icon="🌙">
                                <div className="space-y-4">
                                    <p className="text-sm text-slate-600">Pré-oxigénation 100% 5 min OBLIGATOIRE. Pas de sédation lourde (Xylazine/Dexmedetomidine INTERDITS).</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <DosageCard
                                            title="Propofol Induction"
                                            value={propofolInduc}
                                            unit="mg"
                                            subtitle="IV lent à effet. Titrer."
                                            color="blue"
                                        />
                                        <DosageCard
                                            title="Alfaxalone"
                                            value={alfaxaloneInduc}
                                            unit="mg"
                                            subtitle="IV lent à effet. Bonne sécurité CV."
                                            color="blue"
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
                                    { label: "RECOVER CPR Guidelines (Neonatal)", type: "external" },
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

