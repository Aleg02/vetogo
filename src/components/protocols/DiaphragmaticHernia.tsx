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
    Wind,
    Zap,
    ArrowUp,
    Stethoscope
} from "lucide-react";

export const DiaphragmaticHernia = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;

    // --- CALCULS ---

    // Butorphanol (Sédation légère dyspnée)
    const butorphanol = w > 0 ? (w * 0.2).toFixed(2) : "--";

    // Méthadone (Prémédication)
    const methadone = w > 0 ? (w * 0.2).toFixed(2) : "--";

    return (
        <ProtocolLayout title="Hernie Diaphragmatique (Stabilisation)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Triage & Décision Chirurgicale" icon="⚡">
                                <AlertBox type="critical" title="Indication Chirurgie IMMÉDIATE">
                                    Si l'estomac est dans le thorax et dilaté ("Pneumothorax" gastrique).
                                    <br />
                                    <strong>Action :</strong> Décompression à l'aiguille (trocard) ou chirurgie d'urgence absolue car risque d'arrêt respiratoire imminent.
                                </AlertBox>
                                <AlertBox type="warning" title="Cas 'Standard' (Plus fréquent)">
                                    Si l'animal respire (même avec difficulté) et est stable :
                                    <br />
                                    <strong>NE PAS OPÉRER TOUT DE SUITE !</strong>
                                    <br />
                                    Mortalité plus faible si stabilisation 24h (Oxygène, Fluides, Analgésie) avant chirurgie.
                                </AlertBox>

                                <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-xl border border-blue-200 mt-4">
                                    <ArrowUp className="w-8 h-8 text-blue-600" />
                                    <div>
                                        <h4 className="font-bold text-blue-900">Positionnement Vital</h4>
                                        <p className="text-sm text-blue-800">
                                            Surélever l'avant-main (30°) pour que les organes abdominaux retombent vers l'arrière et libèrent les poumons.
                                        </p>
                                    </div>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Confirmation" icon="📸">
                            <div className="space-y-4">
                                <AlertBox type="warning" title="Radiographie Thorax">
                                    <strong>Signes :</strong>
                                    <ul className="list-disc pl-5">
                                        <li>Perte de la silhouette diaphragmatique.</li>
                                        <li>Déplacement cardiaque.</li>
                                        <li>Présence de gaz (estomac/intestin) ou densité tissu mou (foie) dans le thorax.</li>
                                    </ul>
                                </AlertBox>
                                <CheckList
                                    items={[
                                        "Echographie (T-FAST) : Confirme si doute radio (Rate/Foie dans le thorax).",
                                        "Bilan Sanguin : Foie (ALAT/PAL) souvent élevé si incarcéré.",
                                        "Hématocrite : Anémie ? (Hémothorax associé ?)."
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

                            <Section title="1. Stabilisation Pré-Op" icon="🌬️">
                                <CheckList
                                    items={[
                                        "Oxygénothérapie : Masque, Flow-by ou Cage O2. Éviter le stress.",
                                        "Sédation si anxiété/polypnée : Butorphanol (0.2 mg/kg).",
                                        "Thoracocentèse ? : PRUDENCE. Ne ponctionner que si suspicion épanchement massif autour de la hernie ou pneumothorax concomitant. Risque de piquer la rate/foie/intestin hernié."
                                    ]}
                                />
                                <DosageCard
                                    title="Butorphanol"
                                    value={butorphanol}
                                    unit="mg"
                                    subtitle="IV/IM. Pour calmer la dyspnée sans trop déprimer la respiration."
                                    color="slate"
                                />
                            </Section>

                            <Section title="2. Préparation Anesthésique" icon="🩺">
                                <CriticalList
                                    title="Points Critiques Anesthésie"
                                    items={[
                                        "Ventilation Assistée (IPPV) OBLIGATOIRE dès l'induction.",
                                        "La capacité pulmonaire est très réduite : Pré-oxygénation longue (5-10 min).",
                                        "Induction rapide (Propofol/Alfaxan) et intubation immédiate.",
                                        "Surveillance : Capnographie essentielle. Risque oedème ré-expansion pulmonaire post-op."
                                    ]}
                                />
                                <DosageCard
                                    title="Méthadone (Prémédication)"
                                    value={methadone}
                                    unit="mg"
                                    subtitle="IV. Analgésie pure, dépression respi minime si titré."
                                    color="red"
                                />
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "Diaphragmatic Hernia Management", type: "external" },
                                    { label: "Anesthesia for Thoracic Surgery", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

