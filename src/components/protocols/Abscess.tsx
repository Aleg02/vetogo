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
    Scissors,
    Shield,
    Pill,
    Droplets
} from "lucide-react";

export const Abscess = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isCat = species === "chat";

    // --- CALCULS ---

    // 1. ANTIBIOTIQUES
    // Amox-Clav (12.5-20 mg/kg BID)
    const amox = w > 0 ? (w * 15).toFixed(0) : "--";
    // Clindamycine (Stomato/Os/Anaérobies) : 5-11 mg/kg BID
    const clinda = w > 0 ? (w * 10).toFixed(0) : "--";
    // Cefovecin (Convenia) : 8 mg/kg SC (Chat ++ - Abcès de chat)
    const convenia = w > 0 ? (w * 0.1).toFixed(2) : "--";

    // 2. AINS
    const meloxi = w > 0 ? (w * (isCat ? 0.05 : 0.2)).toFixed(1) : "--";

    return (
        <ProtocolLayout title="Abcès & Infection Cutanée">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Principes" icon="🛡️">
                                <AlertBox type="info" title="Le secret, c'est le drainage">
                                    Un abcès est une poche de pus avasculaire.
                                    <br />
                                    <strong>Les antibiotiques NE PÉNÈTRENT PAS</strong> sans drainage chirurgical.
                                    <br />
                                    Incision large + Lavage &gt; Antibiotiques.
                                </AlertBox>
                                {isCat && (
                                    <AlertBox type="warning" title="Spécial Chat (Griffades)">
                                        Pasteurella multocida est fréquente.
                                        <br />
                                        Morsures profondes = Risque inocculation articulaire/osseuse.
                                    </AlertBox>
                                )}
                            </Section>

                            <Section title="Procédure" icon="✂️">
                                <CheckList
                                    items={[
                                        "Tonte large + Désinfection (Bétadine/Chlorhexidine).",
                                        "Incision ventrale (Point le plus bas) pour le drainage par gravité.",
                                        "Exploration (Pince : casser les logettes) + Lavage abondant (NaCl).",
                                        "Drain ? (Penrose) : Si poche vaste ou peau décollée. Retrait en 3-5 jours.",
                                        "Laisse ouvert (Cicatrisation 2nde intention) ou Points lâches pour laisser couler."
                                    ]}
                                />
                            </Section>
                        </>
                    )}
                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Diagnostic" icon="🔬">
                            <CheckList
                                items={[
                                    "Cytologie : Neutrophiles dégénérés + Bactéries (Cocci/Bâtonnets) intracellulaires.",
                                    "Bactériologie : Indiquée si récidive, non-réponse au traitement ou animal immunodéprimé.",
                                    "Sérologie (Chat) : FIV/FeLV à proposer systématiquement sur abcès de bagarre."
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

                            <Section title="1. Antibiotiques" icon="💊">
                                <div className="space-y-4">
                                    <DosageCard
                                        title="Amox-Clav"
                                        value={amox}
                                        unit="mg"
                                        subtitle="PO BID. 1ère intention (Peau/Morsures)."
                                        color="green"
                                    />
                                    <DosageCard
                                        title="Clindamycine"
                                        value={clinda}
                                        unit="mg"
                                        subtitle="PO BID. Excellent pour Anaérobies et Os/Dents."
                                        color="blue"
                                    />
                                    <DosageCard
                                        title="Cefovecin (Convenia)"
                                        value={convenia}
                                        unit="ml"
                                        subtitle="SC Unique (Durée 14j). Pratique pour chats sauvages. (8 mg/kg)."
                                        color="purple"
                                    />
                                </div>
                            </Section>

                            <Section title="2. Douleur & Soins" icon="💧">
                                <DosageCard
                                    title="Meloxicam"
                                    value={meloxi}
                                    unit="mg"
                                    subtitle="PO/SC. Anti-inflammatoire essentiel (Douleur + Oedème)."
                                    color="red"
                                />
                                <AlertBox type="info" title="Soins locaux">
                                    Nettoyage plaie 2x/jour (Eau tiède savonneuse ou NACL) pour empêcher la croûte de se reformer trop vite (enfermant le pus).
                                </AlertBox>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "Wound Management Guidelines", type: "external" },
                                    { label: "Antibiotics for Skin Infections", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

