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
    Zap, // Paralysis / Nerve
    Bed, // Rest
    Pill,
    Activity
} from "lucide-react";

export const AcuteParalysis = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;

    // --- CALCULS ---

    // 1. AINS (Meloxicam)
    const metacamChien = w > 0 ? (w * 0.1).toFixed(1) : "--"; // Dose maintenance

    // 2. CORTICOÏDES (Anti-inflammatoire)
    // Prednisolone 0.5 - 1 mg/kg. (Si choix cortico vs AINS)
    const predni = w > 0 ? (w * 0.5).toFixed(1) : "--";

    // 3. GABAPENTINE (Douleur neuro)
    const gaba = w > 0 ? (w * 10).toFixed(0) : "--";

    return (
        <ProtocolLayout title="Paralysie Aiguë (IVDD / Hernie Discale)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Grading & Pronostic (Échelle de Scott)" icon="📉">
                                <div className="space-y-2">
                                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                        <strong>Grade 1 (Douleur) :</strong> Dos voussé, refuse de sauter. Marche normale.
                                    </div>
                                    <div className="bg-green-100 p-3 rounded-lg border border-green-200">
                                        <strong>Grade 2 (Ataxie) :</strong> Marche mais titube (parésie ambulatoire).
                                    </div>
                                    <div className="bg-amber-100 p-3 rounded-lg border border-amber-200">
                                        <strong>Grade 3 (Parésie Non-Ambulatoire) :</strong> Bouge les pattes mais ne tient pas debout.
                                    </div>
                                    <div className="bg-orange-100 p-3 rounded-lg border border-orange-200">
                                        <strong>Grade 4 (Paralysie + DPP) :</strong> Ne bouge plus. Sent la Douleur Profonde (Pincement doigt).
                                    </div>
                                    <div className="bg-red-100 p-3 rounded-lg border border-red-200">
                                        <strong>Grade 5 (Paralysie - DPP) :</strong> Ne sent plus RIEN (Urgence Chirurgicale &lt; 24h).
                                        <br /><em className="text-xs text-red-800">Pronostic : Chir &lt;24h = 50%. Médical = &lt;5%. Risque Myélomalacie.</em>
                                    </div>
                                </div>
                            </Section>

                            <Section title="La DPP (Douleur Profonde)" icon="⚡">
                                <AlertBox type="critical" title="Test de la Douleur Profonde">
                                    Attention, le retrait de la patte est un réflexe (moelle intacte localement).
                                    <br />
                                    La DPP est positive UNIQUEMENT si l'animal <strong>réagit consciemment</strong> (se retourne, crie, dilate pupilles) quand on écrase un doigt/os avec une pince hémostatique.
                                </AlertBox>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Imagerie & Bilan" icon="📸">
                            <div className="space-y-4">
                                <AlertBox type="warning" title="Radiographie Simple ?">
                                    Peu utile pour hernie discale (IVDD).
                                    <br />
                                    Utile pour : Fracture, Luxation, Tumeur osseuse (Lyse), Discospondylite.
                                </AlertBox>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Imagerie Avancée (Gold Standard)</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li><strong>Scanner (CT) :</strong> Excellent pour l'os et les hernies minéralisées (Hansen I - Teckel/Bouledogue). Rapide.</li>
                                        <li><strong>IRM :</strong> Indispensable pour la moelle elle-même (Oedème, AVC, Hernie non-minéralisée, Tumeur molle).</li>
                                    </ul>
                                </div>
                                <CheckList
                                    items={[
                                        "Bilan pré-opératoire : PCV/TP, Créat/Urée, Glycémie (Avant anesthésie).",
                                        "Douleur Profonde (DPP) : À tester AVANT toute sédation lourde si possible, c'est le facteur pronostic #1."
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

                            <Section title="1. Gestion Conservatrice (Grade 1-2 ou Refus Chir)" icon="🛏️">
                                <CriticalList
                                    title="Repos Strict (CAGE REST)"
                                    items={[
                                        "Durée : 4 à 6 SEMAINES minimum.",
                                        "Confinement strict : Cage ou Parc bébé. Zéro saut, Zéro escalier.",
                                        "Sorties : Uniquement en laisse courte pour besoins (soutien arrière-train).",
                                        "C'est la clé du succès (Cicatrisation de l'anneau fibreux)."
                                    ]}
                                />
                            </Section>

                            <Section title="2. Anti-Inflammatoires & Analgésie" icon="💊">
                                <AlertBox type="warning" title="AINS vs Corticoïdes">
                                    Consensus actuel : AINS préférés (Moins d'effets 2ndaires).
                                    <br />
                                    <strong>Ne JAMAIS associer les deux (Risque ulcère perforant).</strong>
                                    <br />
                                    Pas de &apos;Wash-out&apos; nécessaire si Cortico &rarr; AINS ? (Si, 3-5j recommandés).
                                </AlertBox>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <DosageCard
                                        title="Meloxicam (AINS)"
                                        value={metacamChien}
                                        unit="mg"
                                        subtitle="PO q24h. Avec repas. Protocole standard."
                                        color="blue"
                                    />
                                    <DosageCard
                                        title="Prednisolone (Cortico)"
                                        value={predni}
                                        unit="mg"
                                        subtitle="PO q12-24h. 0.5-1 mg/kg. Alternative (débat)."
                                        color="slate"
                                    />
                                </div>
                                <div className="mt-4">
                                    <DosageCard
                                        title="Gabapentine"
                                        value={gaba}
                                        unit="mg"
                                        subtitle="PO q8-12h. Douleur neuropathique (Indispensable)."
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
                                    { label: "IVDD Grading & Prognosis", type: "external" },
                                    { label: "ACVIM Consensus on IVDH", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

