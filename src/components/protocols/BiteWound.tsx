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
    Scissors,
    Droplets,
    Pill,
    ShieldAlert
} from "lucide-react";

export const BiteWound = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;

    // --- CALCULS ---

    // 1. ANTIBIOTIQUES (Pasteurella & Anaérobies)
    // Amox-Clav (Clavaseptin/Kesium) : 12.5 - 20 mg/kg BID
    const amoxClav = w > 0 ? (w * 12.5).toFixed(0) : "--";

    // 2. ANALGÉSIE
    // Methadone (Hospitalisé)
    const methadone = w > 0 ? (w * 0.2).toFixed(2) : "--";
    // Buprenorphine (Ambulatoire Chat)
    const bupre = w > 0 ? (w * 0.02).toFixed(3) : "--";

    return (
        <ProtocolLayout title="Plaie Traumatique / Morsure">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Principes Clés (Iceberg)" icon="🛡️">
                                <AlertBox type="critical" title="L'Effet Iceberg">
                                    Les lésions cutanées (crocs) sont minimes par rapport aux décollements sous-cutanés (Dead Space) et déchirures musculaires.
                                    <br />
                                    <strong>Exploration obligatoire</strong> (sous sédation/AG) avec une sonde cannelée ou au doigt ganté.
                                </AlertBox>
                                <div className="mt-4">
                                    <CheckList
                                        items={[
                                            "Lavage haute pression : 19G + Seringue 35ml. NaCl ou Ringer (ou Eau robinet).",
                                            "Débridement : Enlever tout tissu nécrotique/gris/noir.",
                                            "Drainage : Si espace mort > Quelques cm. Drain de Penrose (Sortie ventrale !).",
                                            "Fermeture : Uniquement si propre (< 6-8h). Sinon cicatrisation seconde intention initialement."
                                        ]}
                                    />
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Exploration & Imagerie" icon="🔍">
                            <CheckList
                                items={[
                                    "Sondage (Sous sédation) : Explorer TOUS les trajets avec une sonde cannelée.",
                                    "Radiographie : Rechercher gaz sous-cutanés (emphysème) = signe d'effraction thoracique ou trachéale ?",
                                    "Radiographie : Rechercher fractures sous-jacentes (morsures au thorax/membres).",
                                    "Echographie : Si morsure abdominale (Hernie traumatique ? Perforation ?)."
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

                            <Section title="1. Antibiothérapie Prophylactique" icon="💊">
                                <p className="text-sm text-slate-700 mb-2">
                                    Indispensable pour morsures (Pasteurella, Staphylococcus, Anaérobies).
                                </p>
                                <DosageCard
                                    title="Amoxicilline-Acide Clavulanique"
                                    value={amoxClav}
                                    unit="mg"
                                    subtitle="PO q12h. Gold Standard morsures."
                                    color="blue"
                                />
                                <p className="text-xs text-slate-500 mt-2">
                                    Alternative (Allergie Péni) : Doxycycline ou Clindamycine (Attention Clinda bactériostatique).
                                </p>
                            </Section>

                            <Section title="2. Lavage & Soins Locaux" icon="💧">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Protocole Lavage</h4>
                                    <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-2">
                                        <li><strong>Volume :</strong> 500ml à 1L minimum. "The solution to pollution is dilution".</li>
                                        <li><strong>Pression :</strong> Idéale 7-8 PSI. (Seringue 30-50ml + Aiguille Rose 18G/19G).</li>
                                        <li><strong>Antiseptique :</strong> Clorhexidine diluée 0.05% (Couleur bleu pâle) ou Bétadine diluée (Thé léger).</li>
                                        <li><strong>PAS D'EAU OXYGÉNÉE (H2O2)</strong> : Cytotoxique pour les fibroblastes.</li>
                                    </ol>
                                </div>
                            </Section>

                            <Section title="3. Pansements (Moist Wound Healing)" icon="✂️">
                                <CheckList
                                    items={[
                                        "Phase Débridement (Sale) : Miel Manuka ou Hydrogel hypertonique.",
                                        "Phase Granulation (Propre) : Hydrocolloïde ou Tulle gras.",
                                        "Bannir le 'Wet-to-Dry' (Gaze sèche arrachée) : Trop douloureux et traumatique.",
                                        "Changement pansement : Quotidien si exsudat ++, sinon tous les 2-3 jours."
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
                                    { label: "Management of Bite Wounds (VetStream)", type: "external" },
                                    { label: "Wound Management Guidelines", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

