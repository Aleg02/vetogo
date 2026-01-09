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
    Bone,
    ShieldAlert,
    Scissors,
    Syringe
} from "lucide-react";

export const ClosedFracture = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;

    // --- CALCULS ---

    // 1. KETAMINE CRI (Analgesie multimodale)
    // Bolus : 0.5 mg/kg
    const ketamineBolus = w > 0 ? (w * 0.5).toFixed(2) : "--";
    // CRI : 0.6 mg/kg/h (10 mcg/kg/min) - Dosage "Low Dose"
    const ketamineCRI = w > 0 ? (w * 0.6).toFixed(2) : "--";

    // 2. METHADONE
    const methadone = w > 0 ? (w * 0.2).toFixed(2) : "--";

    return (
        <ProtocolLayout title="Fracture Fermée (Stabilisation)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Règles d'Or" icon="🛡️">
                                <AlertBox type="critical" title="Priorité Vitale">
                                    Une fracture fermée n'est <strong>JAMAIS</strong> une urgence vitale immédiate.
                                    <br />
                                    Traiter d'abord : Choc, Pneumothorax, Hémorragie abdominale.
                                    <br />
                                    Une anesthésie sur un animal instable pour une radio de fracture = Risque de mort.
                                </AlertBox>
                                <div className="mt-4">
                                    <CheckList
                                        items={[
                                            "Ne pas couvrir une plaie ouverte sans l'avoir nettoyée/protégée (Voir protocole Plaie).",
                                            "Immobiliser uniquement si ça soulage (parfois le ballottement d'un bandage mal fait est pire).",
                                            "Toujours radio Thorax avant anesthésie (Contusions pulmonaires ?).",
                                            "Vérifier vessie (Rupture ?) et innervation (Pincement doigts)."
                                        ]}
                                    />
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Bilan Radiographique" icon="🦴">
                            <AlertBox type="info" title="Règle des 2">
                                2 Vues orthogonales (Face + Profil).
                                <br />
                                2 Articulations (Celle du dessus et celle du dessous).
                                <br />
                                2 Membres (Comparer avec le côté sain si doute, surtout chez le jeune).
                            </AlertBox>
                            <div className="mt-4 bg-white p-4 rounded-xl border border-slate-200">
                                <h4 className="font-bold text-slate-800 mb-2">Checklist Radio</h4>
                                <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                    <li>Thorax (3 vues) : Obligatoire (Pneumothorax ? Contusions ?).</li>
                                    <li>Abdomen (A-FAST) : Si accident voie publique (Hémoabdomen ?).</li>
                                    <li>Fracture : Comminutive ? Ouverte (Gaz ?) Articulaire ?</li>
                                </ul>
                            </div>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses calculées.</AlertBox>
                            )}

                            <Section title="1. Analgésie Multimodale (FLK/MLK)" icon="💉">
                                <p className="text-sm text-slate-700 mb-2">
                                    L'association Opioïde + Kétamine (NMDA) est idéale pour la douleur osseuse.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DosageCard
                                        title="Méthadone (ou Morphine)"
                                        value={methadone}
                                        unit="mg"
                                        subtitle="IV q4h. Base de l'analgésie."
                                        color="red"
                                    />
                                    <DosageCard
                                        title="Kétamine (CRI)"
                                        value={ketamineCRI}
                                        unit="mg/heure"
                                        subtitle={`Après Bolus IV de ${ketamineBolus} mg. Prévient l'hyperalgésie.`}
                                        color="blue"
                                    />
                                </div>
                            </Section>

                            <Section title="2. Immobilisation Temporaire" icon="🦴">
                                <AlertBox type="info" title="Robert-Jones Modifié">
                                    Indiqué UNIQUEMENT pour fractures distales (En dessous Coude / Genou).
                                    <br />
                                    <strong>Contre-indiqué :</strong> Humerus, Fémur (Le bandage fait levier et aggrave la fracture).
                                </AlertBox>
                                <div className="mt-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Technique RJ</h4>
                                    <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-2">
                                        <li>Pansements sur plaies éventuelles.</li>
                                        <li>Étriers (Sparadrap) pour traction.</li>
                                        <li>Couche épaisse Coton (Ouate) : Doit sonner "mûr" quand on tape.</li>
                                        <li>Bande crêpe (Serrage modéré).</li>
                                        <li>Bande cohésive (Vetrap) : Attention garrot ! Laisser 2 doigts du milieu visibles.</li>
                                    </ol>
                                </div>
                                <div className="mt-4">
                                    <CheckList
                                        items={[
                                            "Cage Rest strict : Pas de sorties sauf besoins.",
                                            "Si Humerus/Fémur : Cage Rest seul (Pas de bandage).",
                                            "Reférer pour chirurgie dans les 24-72h une fois stable."
                                        ]}
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
                                    { label: "AO Vet Fracture Management", type: "external" },
                                    { label: "Ketamine CRI Calculators", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

