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
    Syringe,
    IceCream,
    Scissors
} from "lucide-react";

export const Paraphimosis = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    // Principalement chien.

    // --- CALCULS ---

    // 1. SÉDATION / ANALGÉSIE
    // Dexmedetomidine (5-10 µg/kg) ou Acepromazine (0.01-0.03 mg/kg) pour vasodilatation périphérique ?
    // Acepromazine est souvent contre-indiquée chez les reproducteurs (priapisme), mais ici le pénis est déjà sorti.
    // Cependant, on cherche à décongestionner.
    // Protocole simple : Opioïde (Butorphanol/Methadone).
    const butorphanol = w > 0 ? (w * 0.2).toFixed(2) : "--"; // 0.2 mg/kg

    return (
        <ProtocolLayout title="Paraphimosis">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Urgence Fonctionnelle" icon="📉">
                                <AlertBox type="critical" title="Risque Nécrose (Gland)">
                                    Urgence vraie. Si le pénis reste sorti et étranglé &gt; Nécrose &gt; Amputation.
                                    <br />
                                    <strong>Objectif :</strong> Réduire la taille (Oedème) pour rentrer le pénis.
                                </AlertBox>
                                <div className="mt-4">
                                    <CheckList
                                        items={[
                                            "Nettoyer (Sérum physio froid).",
                                            "Vérifier : Anneau de poils étranglant à la base ?",
                                            "Lubrifier abondamment AVANT de tenter réduction.",
                                            "Si échec > Chirurgie (Incision anneau préputial)."
                                        ]}
                                    />
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Viabilité Tissus" icon="🔍">
                            <AlertBox type="critical" title="Couleur & Température">
                                <strong>Rose/Rouge :</strong> Viable.
                                <br />
                                <strong>Violet/Noir / Froid :</strong> Nécrose possible. &rarr; Amputation pénienne ?
                            </AlertBox>
                            <div className="mt-4 bg-white p-4 rounded-xl border border-slate-200">
                                <h4 className="font-bold text-slate-800 mb-2">Intégrité Urinaire</h4>
                                <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                    <li><strong>Vessie :</strong> Globe urinaire ? L'urètre peut être occlus par l'étranglement.</li>
                                    <li><strong>Sondage :</strong> Si miction impossible, sondage urinaire (difficile si oedème massif) ou cystocentèse décompressive.</li>
                                </ul>
                            </div>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            <Section title="1. Réduction de l'Oedème (Osmose)" icon="🍦">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                                        <h4 className="font-bold text-blue-900 mb-2">Technique du Sucre (Topique)</h4>
                                        <p className="text-sm text-blue-800">
                                            Saupoudrer du <strong>Sucre Cristal</strong> ou appliquer du <strong>Dextrose 50%</strong> (G50) sur la muqueuse pénienne.
                                            <br />
                                            Laisser agir 5-10 min. L'eau sort des tissus par osmose.
                                        </p>
                                    </div>
                                    <div className="bg-cyan-50 p-4 rounded-xl border border-cyan-200">
                                        <h4 className="font-bold text-cyan-900 mb-2">Froid (Vasoconstriction)</h4>
                                        <p className="text-sm text-cyan-800">
                                            Poche de glace (enveloppée dans un linge) ou compresses glacées sur le pénis.
                                            <br />
                                            Attention aux gelures si laissé trop longtemps.
                                        </p>
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Sédation & Lubrification" icon="💉">
                                <AlertBox type="info" title="Sédation recommandée">
                                    La douleur empêche la réduction et stresse l'animal.
                                </AlertBox>
                                <div className="mt-4 space-y-4">
                                    <DosageCard
                                        title="Butorphanol (Analgésie légère + Sédation)"
                                        value={butorphanol}
                                        unit="mg"
                                        subtitle="IV ou IM. Pour calmer l'animal."
                                        color="purple"
                                    />
                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                        <h4 className="font-bold text-slate-700">Lubrifiant Hydro-Soluble</h4>
                                        <p className="text-sm text-slate-600">
                                            Utiliser du gel lubrifiant stérile (type KY, Lubrificat, Gel Écho) en grande quantité.
                                            <br />NE PAS utiliser de vaseline si chirurgie envisagée (difficile à nettoyer).
                                        </p>
                                    </div>
                                </div>
                            </Section>

                            <Section title="3. Chirurgie (Si échec)" icon="✂️">
                                <p className="text-sm text-slate-700">
                                    Si après 2-3 tentatives la réduction échoue :
                                    <br />
                                    &rarr; Incision longitudinale de l'anneau préputial (ventralement ou dorsalement).
                                    <br />
                                    &rarr; Réduction.
                                    <br />
                                    &rarr; Suture de l'anneau (si possible) ou suture cutanéomuqueuse.
                                </p>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "Plumb's Veterinary Drugs", type: "external" },
                                    { label: "Management of Paraphimosis", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

