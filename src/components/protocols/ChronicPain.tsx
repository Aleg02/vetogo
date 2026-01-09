"use client";

import React from "react";
import { ProtocolLayout } from "@/components/ProtocolLayout";
import { useAppStore } from "@/store/useAppStore";
import {
    Section,
    DosageCard,
    AlertBox,
    CheckList,
    LinkList,
    ProtocolContainer
} from "@/components/ui/ProtocolUI";
import {
    Activity,
    Syringe,
    Pill,
    Smile
} from "lucide-react";

export const ChronicPain = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isCat = species === "chat";

    // --- CALCULS ---

    // 1. AINS (Base)
    // Meloxicam
    const meloxi = w > 0 ? (w * (isCat ? 0.05 : 0.1)).toFixed(2) : "--"; // Dose entretien faible
    // Firocoxib (Previcox) - Chien
    const firo = w > 0 && !isCat ? (w * 5).toFixed(0) : "Non (Chat)";

    // 2. GABAPENTINE (Neuropathique)
    // 5-10 mg/kg BID-TID
    const gabaMin = w > 0 ? (w * 5).toFixed(0) : "--";
    const gabaMax = w > 0 ? (w * 10).toFixed(0) : "--";

    // 3. AMANTADINE (Wind-up)
    // 3-5 mg/kg q24h
    const amantadine = w > 0 ? (w * 3).toFixed(0) : "--";

    // 4. MONOCLONAUX (Anti-NGF)
    // Librela (Chien) / Solensia (Chat) -> 1 flacon selon poids
    const monoclonal = isCat ? "Solensia (1 flacon/mois)" : "Librela (1 flacon/mois selon poids)";

    return (
        <ProtocolLayout title="Douleur Chronique (Arthrose / Cancer)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Approche Multimodale" icon="😊">
                                <p className="text-sm text-slate-700 mb-4">
                                    La douleur chronique ne se traite pas avec une seule molécule.
                                    Il faut bloquer la douleur à plusieurs niveaux (Transduction, Transmission, Modulation, Perception).
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <AlertBox type="info" title="Le 'Wind-Up'">
                                        Sensibilisation centrale. La douleur appelle la douleur.
                                        <br />
                                        Le traitement DOIT être continu, pas 'au besoin'.
                                        <br />
                                        <strong>Amantadine</strong> ou <strong>Gabapentine</strong> ciblent ce phénomène.
                                    </AlertBox>
                                    <AlertBox type="info" title="Révolution Anti-NGF">
                                        <strong>Librela (Chien) / Solensia (Chat)</strong>
                                        <br />
                                        Anticorps monoclonaux mensuels.
                                        <br />
                                        Pas d'effets secondaires rénaux/hépatiques.
                                        <br />
                                        Excellent pour les gériatriques.
                                    </AlertBox>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Bilan d'Extension" icon="🦴">
                            <CheckList
                                items={[
                                    "Radiographie : Ostéophytes, Sclérose, Gonflement tissus mous.",
                                    "Examen Ortho : Crépitements, Diminution amplitude mouvement (ROM).",
                                    "Score Douleur : CSOM (Client Specific Outcome Measures) - Demander au propriétaire ce que l'animal ne fait plus."
                                ]}
                            />
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses calculées.</AlertBox>
                            )}

                            <Section title="1. Socle Inflammatoire (AINS)" icon="💊">
                                <AlertBox type="warning" title="Contrôle Rénal">
                                    Vérifier Urée/Créat avant AINS au long cours, puis tous les 6 mois.
                                </AlertBox>
                                <DosageCard
                                    title="Meloxicam (Dose Entretien)"
                                    value={meloxi}
                                    unit="mg"
                                    subtitle="PO q24h. Chercher la dose minimale efficace (titration vers le bas)."
                                    color="blue"
                                />
                            </Section>

                            <Section title="2. Neuropathique & Central" icon="🧠">
                                <DosageCard
                                    title="Gabapentine"
                                    value={`${gabaMin} - ${gabaMax}`}
                                    unit="mg"
                                    subtitle="PO BID-TID. Sédation possible au début (passagère)."
                                    color="purple"
                                />
                                <DosageCard
                                    title="Amantadine"
                                    value={amantadine}
                                    unit="mg"
                                    subtitle="PO q24h. Antagoniste NMDA. Cas réfractaires."
                                    color="slate"
                                />
                            </Section>

                            <Section title="3. Biothérapies (Anti-NGF)" icon="💉">
                                <DosageCard
                                    title="Bedinvetmab / Frunevetmab"
                                    value={monoclonal}
                                    unit="SC / mois"
                                    subtitle="Injection mensuelle. Efficacité impressionnante sur l'arthrose."
                                    color="green"

                                />
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "WSAVA Pain Management Guidelines", type: "external" },
                                    { label: "OA Management Protocol", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

