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
    Rat,
    Droplets,
    Clock,
    Pill
} from "lucide-react";

export const AnticoagulantPoisoning = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;

    // --- CALCULS ---

    // 1. VITAMINE K1 (Phytomenadione)
    // Dose standard : 2.5 à 5 mg/kg/j
    const k1Min = w > 0 ? (w * 2.5).toFixed(0) : "--";
    const k1Max = w > 0 ? (w * 5).toFixed(0) : "--";

    // 2. CHARBON ACTIVÉ
    // 1-2 g/kg
    const charcoal = w > 0 ? (w * 1).toFixed(0) : "--";

    // 3. PLASMA (Si saignement actif)
    // 10-20 ml/kg
    const plasmaMin = w > 0 ? (w * 10).toFixed(0) : "--";
    const plasmaMax = w > 0 ? (w * 20).toFixed(0) : "--";

    return (
        <ProtocolLayout title="Intoxication Anticoagulants (Rodenticides)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="La Mécanique Mortelle" icon="🐀">
                                <p className="text-sm text-slate-700 mb-4">
                                    Les rodenticides (Warfarine, Brodifacoum, etc.) bloquent le recyclage de la Vitamine K1.
                                    Conséquence : Épuisement des facteurs de coagulation (II, VII, IX, X).
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <AlertBox type="warning" title="Le Retard Clinique">
                                        IL NE SE PASSE RIEN PENDANT 3-5 JOURS !
                                        <br />
                                        L'animal saigne APRES l'épuisement des facteurs.
                                        <br />
                                        <em>Le PT (Temps de Quick) augmente en premier (Facteur VII a la 1/2 vie la plus courte).</em>
                                    </AlertBox>
                                    <AlertBox type="critical" title="Urgence Hémorragique">
                                        Si l'animal saigne DÉJÀ (épistaxis, hémothorax, hématomes) :
                                        <br />
                                        <strong>La Vitamine K1 NE SUFFIT PAS (Délai d'action 12-24h).</strong>
                                        <br />
                                        &rarr; Transfusion de Plasma (ou Sang total) OBLIGATOIRE.
                                    </AlertBox>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Bilan Coagulation" icon="🩸">
                            <AlertBox type="info" title="3 à 5 jours après ingestion">
                                Le bilan ne sert à RIEN juste après l'ingestion (les facteurs sont encore là).
                                <br />
                                <strong>PT (Temps de Quick) :</strong> Augmente en PREMIER (Facteur VII courte demi-vie).
                                <br />
                                <strong>aPTT (TCA) :</strong> Augmente ensuite (Facteurs IX, X).
                            </AlertBox>
                            <div className="mt-4 bg-white p-4 rounded-xl border border-slate-200">
                                <h4 className="font-bold text-slate-800 mb-2">Autres Paramètres</h4>
                                <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                    <li><strong>Hématocrite / Protéines Totales :</strong> Évaluer les pertes sanguines (Hémoabdomen ? Hémothorax ?).</li>
                                    <li><strong>Imagerie :</strong> Radiographie Thoracique (Saignement pleural ?), A-FAST (Saignement abdo ?).</li>
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

                            <Section title="1. Décontamination (Si < 4h)" icon="⏰">
                                <CheckList
                                    items={[
                                        "Faire vomir (Apomorphine/Xylazine) si ingestion récente.",
                                        `Charbon Activé : ${charcoal} g PO (1-2 g/kg).`
                                    ]}
                                />
                            </Section>

                            <Section title="2. Antidote : Vitamine K1" icon="💊">
                                <DosageCard
                                    title="Vitamine K1 (Phytomenadione)"
                                    value={`${k1Min} - ${k1Max}`}
                                    unit="mg"
                                    subtitle="PO q24h (ou divisé q12h). AVEC UN REPAS GRAS !"
                                    color="green"
                                />
                                <AlertBox type="info" title="Durée du Traitement">
                                    <ul className="list-disc pl-5">
                                        <li><strong>Durée Standard :</strong> 28 jours (4 semaines).</li>
                                        <li><strong>Pourquoi ? :</strong> Les rodenticides modernes (2ème génération) persistent des semaines dans le foie.</li>
                                        <li>Ne JAMAIS arrêter avant, sauf si PT vérifié normal.</li>
                                    </ul>
                                </AlertBox>
                                <AlertBox type="warning" title="Attention IV">
                                    La Vitamine K1 IV peut causer des chocs anaphylactiques mortels. Préférer SC (si vomissements) ou PO.
                                </AlertBox>
                            </Section>

                            <Section title="3. Transfusion (Si Hémorragie)" icon="💧">
                                <DosageCard
                                    title="Plasma Frais Congelé (PFC)"
                                    value={`${plasmaMin} - ${plasmaMax}`}
                                    unit="ml"
                                    subtitle="IV. Apporte les facteurs de coagulation immédiatement."
                                    color="red"
                                />
                            </Section>

                            <Section title="4. Suivi (Crucial)" icon="📉">
                                <CriticalList
                                    title="Protocole de Sortie"
                                    items={[
                                        "Traitement Vit K1 : 4 semaines.",
                                        "ARRÊT Vit K1 au jour 28.",
                                        "REVENIR 48h-72h après l'arrêt (Jour 30-31) pour mesurer le PT (Temps de Quick).",
                                        "Si PT normal &rarr; Fin.",
                                        "Si PT augmenté &rarr; Reprendre Vit K1 pour 2 semaines."
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
                                    { label: "Anticoagulant Rodenticide Guidelines", type: "external" },
                                    { label: "Vitamin K1 Dosing Chart", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

