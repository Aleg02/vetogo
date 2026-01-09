"use client";

import React from "react";
import { ProtocolLayout } from "@/components/ProtocolLayout";
import {
    Section,
    CheckList,
    LinkList,
    ProtocolContainer,
    AlertBox
} from "@/components/ui/ProtocolUI";
import {
    Heart,
    Scale,
    Sun,
    CloudRain
} from "lucide-react";

export const PalliativeCare = () => {
    return (
        <ProtocolLayout title="Soins Palliatifs & Fin de Vie">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Philosophie" icon="❤️">
                                <p className="text-sm text-slate-700 italic mb-4">
                                    "Quand on ne peut plus guérir, il reste beaucoup à faire : Soulager."
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                                        <h4 className="font-bold text-blue-900">Objectif</h4>
                                        <p className="text-sm text-blue-800">
                                            Maximiser le confort, pas la durée de vie.
                                        </p>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                                        <h4 className="font-bold text-purple-900">Le 'Bon' moment</h4>
                                        <p className="text-sm text-purple-800">
                                            Aider le propriétaire à objectiver la Qualité de Vie (QOL).
                                        </p>
                                    </div>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET ÉVALUATION --- */}
                    {tab === "examens" && (
                        <Section title="Échelle HHHHMM (Alice Villalobos)" icon="⚖️">
                            <p className="text-sm text-slate-600 mb-4">
                                Attribuer un score de 0 à 10 pour chaque critère.
                                <br />Total &gt; 35 = Qualité de vie acceptable.
                            </p>
                            <div className="space-y-3">
                                <div className="p-3 bg-white rounded-lg border border-slate-200 flex justify-between items-center">
                                    <span className="font-bold text-slate-700">1. HURT (Douleur)</span>
                                    <span className="text-xs text-slate-500">L'animal est-il soulagé ?</span>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-slate-200 flex justify-between items-center">
                                    <span className="font-bold text-slate-700">2. HUNGER (Faim)</span>
                                    <span className="text-xs text-slate-500">Mange-t-il suffisamment ?</span>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-slate-200 flex justify-between items-center">
                                    <span className="font-bold text-slate-700">3. HYDRATION</span>
                                    <span className="text-xs text-slate-500">Est-il déshydraté ?</span>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-slate-200 flex justify-between items-center">
                                    <span className="font-bold text-slate-700">4. HYGIENE</span>
                                    <span className="text-xs text-slate-500">Propre ? Escarres ? Incontinence gérée ?</span>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-slate-200 flex justify-between items-center">
                                    <span className="font-bold text-slate-700">5. HAPPINESS (Joie)</span>
                                    <span className="text-xs text-slate-500">Interagit-il ? Remue la queue ?</span>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-slate-200 flex justify-between items-center">
                                    <span className="font-bold text-slate-700">6. MOBILITY</span>
                                    <span className="text-xs text-slate-500">Peut-il se lever seul ?</span>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-slate-200 flex justify-between items-center">
                                    <span className="font-bold text-slate-700">7. MORE good days</span>
                                    <span className="text-xs text-slate-500">Plus de bons jours que de mauvais ?</span>
                                </div>
                            </div>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <Section title="La Trousse Palliative" icon="☀️">
                            <CheckList
                                items={[
                                    "Douleur : AINS, Gabapentine, Tramadol, Opioïdes (Buprénorphine). Ne plus craindre les effets secondaires long terme.",
                                    "Nausées / Appétit : Mirtazapine (Stimulant), Maropitant (Cerenia).",
                                    "Hydratation : Fluides sous-cutanés à la maison (apprendre aux propriétaires).",
                                    "Anxiété : Gabapentine, Phéromones.",
                                    "Nursing : Tapis épais, nettoyage fréquent, rampes d'accès."
                                ]}
                            />
                            <AlertBox type="info" title="Accompagnement">
                                Préparer l'euthanasie (Expliquer le protocole, sédation préalable).
                                <br />
                                Valider la décision du propriétaire ("C'est le dernier cadeau d'amour").
                            </AlertBox>
                        </Section>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "Quality of Life Scale (HHHHMM)", type: "external" },
                                    { label: "Palliative Care Guidelines", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

