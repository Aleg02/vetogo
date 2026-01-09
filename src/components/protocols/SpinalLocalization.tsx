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
    Map,
    Activity,
    AlertTriangle,
    Move
} from "lucide-react";

export const SpinalLocalization = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;

    // Pas de calculs de doses ici, c'est du diagnostic pur.
    // On pourrait remettre les doses de cortico/gabarit pour la gestion aiguë.

    return (
        <ProtocolLayout title="Suspicion Compression Médullaire (Localisation)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="1. Localiser la Lésion (Le B-A-BA)" icon="🗺️">
                                <p className="text-sm text-slate-700 mb-4">
                                    Tester les réflexes (Patellaire / Retrait) sur les 4 membres pour localiser.
                                    <br />
                                    <strong>UMN (Upper Motor Neuron) :</strong> Réflexes Normaux ou Augmentés + Tonus augmenté.
                                    <br />
                                    <strong>LMN (Lower Motor Neuron) :</strong> Réflexes Diminués ou Absents + Flaccidité.
                                </p>

                                <div className="space-y-3">
                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                        <h4 className="font-bold text-slate-900">C1 - C5 (Cervical Haut)</h4>
                                        <ul className="text-sm text-slate-700 list-disc pl-5">
                                            <li>Patte Avant : UMN (Normal/Exagéré)</li>
                                            <li>Patte Arrière : UMN (Normal/Exagéré)</li>
                                            <li><em>Signe :</em> Tétraparesse, cou douloureux.</li>
                                        </ul>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                        <h4 className="font-bold text-slate-900">C6 - T2 (Cervical Bas - Intumescence)</h4>
                                        <ul className="text-sm text-slate-700 list-disc pl-5">
                                            <li>Patte Avant : <strong>LMN (Mou, Aréflexif)</strong></li>
                                            <li>Patte Arrière : UMN (Normal/Exagéré)</li>
                                            <li><em>Signe :</em> "Two Engine Gait" (Pas courts devant, grands pas derrière). Horner possible.</li>
                                        </ul>
                                    </div>
                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                        <h4 className="font-bold text-blue-900">T3 - L3 (Thoraco-Lombaire - Le plus fréquent)</h4>
                                        <ul className="text-sm text-blue-800 list-disc pl-5">
                                            <li>Patte Avant : Normal</li>
                                            <li>Patte Arrière : UMN (Normal/Exagéré)</li>
                                            <li><em>Signe :</em> Paraparésie/plégie. <strong>Schiff-Sherrington</strong> (Pattes avant très raides) possible si lésion sévère (ne pas confondre avec cervical !).</li>
                                        </ul>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                        <h4 className="font-bold text-slate-900">L4 - S3 (Lombaire Bas - Intumescence)</h4>
                                        <ul className="text-sm text-slate-700 list-disc pl-5">
                                            <li>Patte Avant : Normal</li>
                                            <li>Patte Arrière : <strong>LMN (Mou, Aréflexif)</strong></li>
                                            <li><em>Signe :</em> Paraparésie flasque. Incontinence fécale/urinaire fréquente (Sphincter dilaté).</li>
                                        </ul>
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Diagnostic Différentiel Rapide" icon="📉">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <AlertBox type="info" title="FCE (Embolie Fibro-Cartilagineuse)">
                                        <ul>
                                            <li><strong>Début :</strong> Suraigu (en exercice).</li>
                                            <li><strong>Douleur :</strong> NON (ou très brève au début).</li>
                                            <li><strong>Latéralisé :</strong> Souvent asymétrique (Gauche != Droite).</li>
                                            <li><strong>Évolution :</strong> Stable ou s'améliore après 24h.</li>
                                        </ul>
                                    </AlertBox>
                                    <AlertBox type="critical" title="Hernie Discale (IVDD) / Trauma">
                                        <ul>
                                            <li><strong>Début :</strong> Aigu ou Progressif.</li>
                                            <li><strong>Douleur :</strong> OUI (Hyperesthésie rachidienne).</li>
                                            <li><strong>Évolution :</strong> Peut s'aggraver.</li>
                                        </ul>
                                    </AlertBox>
                                    <AlertBox type="warning" title="Tumeur">
                                        <ul>
                                            <li><strong>Début :</strong> Progressif (souvent), parfois aigu si micro-fracture pathologique.</li>
                                            <li><strong>Douleur :</strong> OUI.</li>
                                            <li><strong>Âge :</strong> Souvent âgé.</li>
                                        </ul>
                                    </AlertBox>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="La Preuve par l'Image" icon="🩻">
                            <div className="space-y-4">
                                <AlertBox type="warning" title="Radiographie Rachis">
                                    Souvent décevante.
                                    <br />
                                    Peut montrer : Rétrécissement espace intervertébral (Suggestif mais pas diagnostique), Fracture, Tumeur osseuse.
                                    <br />
                                    <em>Ne voit pas la moelle.</em>
                                </AlertBox>
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Ponction LCR (Liquide Céphalo-Rachidien)</h4>
                                    <p className="text-sm text-slate-700">
                                        Indiqué si :
                                        <br />- Suspicion Méningite/Myélite (SRMA - Beagle, Bouvier).
                                        <br />- Douleur cervicale extrême chez jeune chien.
                                        <br />- Hyperthermie associée.
                                    </p>
                                </div>
                                <CheckList
                                    items={[
                                        "IRM : Le seul moyen de voir l'inflammation (Hypersignal T2) ou l'infarctus (FCE).",
                                        "Scanner : Très bien pour le minéral (Hernie discale aiguë calcifiée)."
                                    ]}
                                />
                            </div>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            <Section title="Gestion Initiale" icon="↔️">
                                <CriticalList
                                    title="À FAIRE / À NE PAS FAIRE"
                                    items={[
                                        "NE PAS manipuler le cou excessivement si suspicion cervicale.",
                                        "Transporter sur plan dur (planche) si trauma.",
                                        "Sédation si douleur intense (Opioïdes) pour éviter que l'animal ne bouge.",
                                        "Corticothérapie haute dose ? NON recommandés (pas de bénéfice prouvé vs risques GI, sauf lymphome spinal).",
                                        "Scanner/IRM indispensable pour chirurgie."
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
                                    { label: "Neuro Localization Guide", type: "external" },
                                    { label: "Schiff-Sherrington Explained", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

