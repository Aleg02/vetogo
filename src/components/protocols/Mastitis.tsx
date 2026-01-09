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
    Pill,
    Baby,
    Thermometer
} from "lucide-react";

export const Mastitis = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;

    // --- CALCULS ---

    // 1. ANTIBIOTIQUES (Compatibles Lactation)
    // Cefalexine (Therios/Rilexine) : 15-30 mg/kg BID
    const cefalexineMin = w > 0 ? (w * 15).toFixed(0) : "--";
    const cefalexineMax = w > 0 ? (w * 30).toFixed(0) : "--";

    // Amox-Clav (Synulox/Clavaseptin) : 12.5-20 mg/kg BID
    const amox = w > 0 ? (w * 15).toFixed(0) : "--";

    // 2. ANALGÉSIE
    // Meloxicam : 0.2 mg/kg IV/SC puis 0.1 mg/kg PO.
    // Passage lait faible, généralement considéré OK sur courte durée, mais prudence.
    // Alternative : Tramadol (2-4 mg/kg) ?
    const meloxi = w > 0 ? (w * 0.2).toFixed(1) : "--";

    return (
        <ProtocolLayout title="Mammite (Mastite)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Évaluation" icon="🌡️">
                                <AlertBox type="critical" title="Mammite Gangreneuse ?">
                                    Peau noire/froide, abcès, état de choc.
                                    <br />
                                    &rarr; <strong>Arrêt total allaitement</strong> + Urgence Chirurgicale (Parage/Mastectomie).
                                </AlertBox>
                                <div className="mt-4">
                                    <CheckList
                                        items={[
                                            "Lait : Aspect (Pus ? Sang ? Grumeaux ?).",
                                            "Mère : Fièvre ? Anorexie ? Comportement envers chiots ?",
                                            "Chiots : Pleurs ? Perte de poids ? (Syndrome lait toxique rare, mais malnutrition fréquente si mère douloureuse)."
                                        ]}
                                    />
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="La Preuve par le Lait" icon="🔬">
                            <div className="space-y-4">
                                <AlertBox type="info" title="Cytologie du Lait">
                                    <strong>Simple et Rapide.</strong>
                                    <br />
                                    Le lait normal contient peu de cellules et beaucoup de gras (Bulles).
                                    <br />
                                    <strong>Mammite :</strong> Neutrophiles dégénérés +++ et Bactéries (Cocci/Bacilles) phagocytées.
                                </AlertBox>
                                <CheckList
                                    items={[
                                        "pH du lait : Devient alcalin (> 7) lors de mammite (Test bandelette urinaire possible).",
                                        "Echographie : Différencier une mammite diffuse (Traitement médical) d'un abcès collecté (Draiange/Chirurgie)."
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

                            <Section title="1. Gestion de l'Allaitement" icon="🍼">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <AlertBox type="info" title="Mammite Simple">
                                        <strong>CONTINUER d'allaiter !</strong>
                                        <br />La vidange de la mamelle est essentielle pour la guérison. Le lait n'est généralement pas toxique (pH gastrique chiot tue bactéries).
                                    </AlertBox>
                                    <AlertBox type="warning" title="Mammite Sévère / Abcédée">
                                        <strong>SEVRAGE local ou total.</strong>
                                        <br />Si antibiotiques passent dans le lait (ex: tétracyclines, chloramphénicol &rarr; INTERDIT).
                                        <br />Si Cefalexine/Amox &rarr; OK.
                                    </AlertBox>
                                </div>
                            </Section>

                            <Section title="2. Antibiothérapie (Probabiliste)" icon="💊">
                                <p className="text-sm text-slate-700 mb-2">
                                    Cibler Staph / E. Coli / Strep. Voie Orale si mère mange.
                                </p>
                                <div className="space-y-4">
                                    <DosageCard
                                        title="Céfalexine"
                                        value={`${cefalexineMin} - ${cefalexineMax}`}
                                        unit="mg"
                                        subtitle="PO BID. Faible passage lacté. Sûr pour les chiots."
                                        color="green"
                                    />
                                    <DosageCard
                                        title="Amox-Clav"
                                        value={amox}
                                        unit="mg"
                                        subtitle="PO BID. Surveillance diarrhée chez les chiots (Probiotiques conseillés)."
                                        color="blue"
                                    />
                                </div>
                            </Section>

                            <Section title="3. Soins Locaux & Douleur" icon="📉">
                                <DosageCard
                                    title="Meloxicam (Metacam)"
                                    value={meloxi}
                                    unit="mg"
                                    subtitle="SC (J0) puis relais PO. Courte durée."
                                    color="red"
                                />
                                <div className="mt-4">
                                    <CheckList
                                        items={[
                                            "Compresses chaudes (Favorise drainage) avant tétée.",
                                            "Compresses froides (Douleur/Oedème) après tétée.",
                                            "Vidange manuelle si les chiots ne tètent pas la mamelle atteinte."
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
                                    { label: "Plumb's Veterinary Drugs", type: "external" },
                                    { label: "Treatment of Mastitis in Dogs", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

