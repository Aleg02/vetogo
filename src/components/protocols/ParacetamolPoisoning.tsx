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
    Cat,
    Skull,
    Droplets,
    Wind // Oxygen
} from "lucide-react";

export const ParacetamolPoisoning = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;

    // --- CALCULS ---

    // 1. NAC (N-acetylcysteine) - Antidote
    // Charge : 140 mg/kg
    const nacLoad = w > 0 ? (w * 140).toFixed(0) : "--";
    // Maintenance : 70 mg/kg
    const nacMaint = w > 0 ? (w * 70).toFixed(0) : "--";

    // 2. VITAMINE C (Acide Ascorbique)
    // 30 mg/kg
    const vitC = w > 0 ? (w * 30).toFixed(0) : "--";

    return (
        <ProtocolLayout title="Intoxication Paracétamol (Chat)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Le Tueur Silencieux du Chat" icon="💀">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="bg-red-100 p-3 rounded-full">
                                        <Cat className="h-8 w-8 text-red-600" />
                                    </div>
                                    <p className="text-sm text-slate-700">
                                        Le chat est déficient en <strong>glucuronyl-transférase</strong>.
                                        <br />Une dose minime (10-40 mg/kg) suffit pour tuer (Métabolite toxique NAPQI).
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <AlertBox type="critical" title="Signe Pathognomonique">
                                        <strong>Œdème de la Face / Hémoglobinurie</strong> (Urines chocolat).
                                        <br />Cyanose "boueuse" (Méthémoglobinémie).
                                    </AlertBox>
                                    <AlertBox type="warning" title="Urgence Vitale">
                                        Le sang ne transporte plus l'oxygène (MetHb).
                                        <br />L'animal meurt d'hypoxie tissulaire.
                                    </AlertBox>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Bilan Sanguin" icon="🩸">
                            <CheckList
                                items={[
                                    "Frottis Sanguin : Corps de Heinz (Inclusions réfractiles dans les GR).",
                                    "Hématocrite : Anémie hémolytique (souvent retardée).",
                                    "Biochimie Hépatique : ALAT (ALT) augmentent (Nécrose hépatique centrolobulaire).",
                                    "Gaz du Sang : Acidose métabolique possible."
                                ]}
                            />
                            <AlertBox type="info" title="Test à la goutte">
                                Sang veineux brun chocolat qui ne rougit pas à l'air ambiant (Méthémoglobinémie).
                            </AlertBox>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses calculées.</AlertBox>
                            )}

                            <Section title="1. Antidote : NAC (Mucomyst)" icon="💧">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DosageCard
                                        title="Dose de Charge (T0)"
                                        value={`${nacLoad}`}
                                        unit="mg"
                                        subtitle="IV LENT (dilué 5%) ou PO."
                                        color="green"
                                    />
                                    <DosageCard
                                        title="Maintenance (q4-6h)"
                                        value={`${nacMaint}`}
                                        unit="mg"
                                        subtitle="Répéter 5 à 7 fois. Indispensable."
                                        color="green"
                                    />
                                </div>
                                <AlertBox type="info" title="Formulation">
                                    Utiliser la solution injectable (200 mg/ml) diluée, ou sachets PO (si pas de vomissements).
                                    <br />Diluer au 1/4 minimum pour éviter phlébite.
                                </AlertBox>
                            </Section>

                            <Section title="2. Contre la Méthémoglobinémie" icon="🌬️">
                                <DosageCard
                                    title="Vitamine C (Ac. Ascorbique)"
                                    value={`${vitC}`}
                                    unit="mg"
                                    subtitle="IV/PO/SC q6h. Réduit la MetHb en Hb."
                                    color="blue"
                                />
                                <CheckList
                                    items={[
                                        "Oxygénothérapie (Cage O2 / Flow-by) : Crucial car l'Hb restante doit être saturée à 100%.",
                                        "Transfusion Sang Total : Si l'anémie/hypoxie est trop sévère malgré le traitement.",
                                        "Manipulations minimales : Le stress augmente la demande en O2."
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
                                    { label: "Paracetamol Toxicity in Cats", type: "external" },
                                    { label: "NAC Dosing Protocol", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

