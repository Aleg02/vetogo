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
    Search,
    Syringe,
    Pill,
    ShieldCheck,
    AlertTriangle
} from "lucide-react";

export const BacterialCystitis = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. ANALGÉSIE (AINS)
    // Meloxicam : 0.1 mg/kg (Chien) / 0.05-0.1 mg/kg (Chat)
    // Robenacoxib (Onsior) : 2 mg/kg
    const meloxiDose = w > 0 ? (w * (isDog ? 0.1 : 0.05)).toFixed(2) : "--";

    // 2. ANTIBIOTIQUES (1ère intention ISCAID)
    // Amoxicilline : 12.5 - 15 mg/kg BID
    const amoxMin = w > 0 ? (w * 12.5).toFixed(0) : "--";
    const amoxMax = w > 0 ? (w * 15).toFixed(0) : "--";

    // TMS (Trimethoprime-Sulfamide) : 15 - 30 mg/kg BID
    const tmsDose = w > 0 ? (w * 15).toFixed(0) : "--";

    return (
        <ProtocolLayout title="Cystite Aiguë Bactérienne (Sporadique)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Diagnostic" icon="🔍">
                                <AlertBox type="info" title="Définition ISCAID">
                                    Cystite sporadique = &lt; 3 épisodes / an.
                                    <br />
                                    Symptômes (Dysurie, Pollakiurie, Hématurie) confirmés.
                                    <br />
                                    <em>La bactériurie asymptomatique ne se traite pas !</em>
                                </AlertBox>
                                <div className="mt-4">
                                    <CheckList
                                        items={[
                                            "Culot Urinaire : Hématurie, Pyurie, Bactériurie.",
                                            "Densité Urinaire : Souvent normale.",
                                            "Culture (Bactério) : Non obligatoire pour le 1er épisode simple (recommandée si récidive).",
                                            "Ecarter : Calculs (Radio/Echo) si palpation anormale ou récidive."
                                        ]}
                                    />
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Confirmation Diagnostique" icon="🔬">
                            <CheckList
                                items={[
                                    "Culot Urinaire : Indispensable. Rechercher Pyurie (>5 WBC/hpf) et Bactériurie.",
                                    "Culture : Idéalement par Cystocentèse. Pas systématique pour 1er épisode simple, mais recommandée.",
                                    "Imagerie (Echo/Radio) : Pour exclure urolithiase ou tumeur si récidive ou palpation anormale."
                                ]}
                            />
                            <AlertBox type="warning" title="Piège">
                                Une bandelette urinaire positive aux leucocytes chez le chat est souvent un faux positif. Toujours confirmer au microscope.
                            </AlertBox>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses calculées.</AlertBox>
                            )}

                            <Section title="1. Analgésie (Prioritaire)" icon="🛡️">
                                <p className="text-sm text-slate-700 mb-2">
                                    La cystite est douloureuse. L'analgésie seule suffit parfois (Chat idiopathique, Chien en attente culture).
                                </p>
                                <DosageCard
                                    title="AINS (Meloxicam / Robenacoxib)"
                                    value={meloxiDose}
                                    unit="mg"
                                    subtitle="PO q24h. Si reins sains et hydratation OK. Indispensable pour le confort."
                                    color="green"
                                />
                            </Section>

                            <Section title="2. Antibiotiques (3 à 5 jours)" icon="💊">
                                <div className="space-y-4">
                                    <AlertBox type="warning" title="Durée courte !">
                                        Les recommandations actuelles (ISCAID) favorisent <strong>3 à 5 jours</strong> de traitement pour une cystite simple.
                                    </AlertBox>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <DosageCard
                                            title="Amoxicilline (Clamoxyl)"
                                            value={`${amoxMin} - ${amoxMax}`}
                                            unit="mg"
                                            subtitle="PO BID. 1er choix. Excellente concentration urinaire."
                                            color="blue"
                                        />
                                        <DosageCard
                                            title="TMS (Trimethoprime-Sulfa)"
                                            value={tmsDose}
                                            unit="mg"
                                            subtitle="PO BID. Alternative. Attention effets secondaires (KCS, Anémie) si long cours."
                                            color="blue"
                                        />
                                    </div>

                                    <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                                        <h4 className="flex items-center gap-2 font-bold text-red-800 mb-2">
                                            <AlertTriangle size={18} /> A Eviter en 1ère intention
                                        </h4>
                                        <ul className="text-sm text-red-700 list-disc pl-4 space-y-1">
                                            <li>Fluoroquinolones (Marbofloxacine, Enrofloxacine) : A réserver aux pyélonéphrites ou prostatites.</li>
                                            <li>Cefovecin (Convenia) : Sauf si administration orale impossible (Chat difficile).</li>
                                            <li>Amoxicilline-Acide Clavulanique : Souvent inutile (Amox seul suffit pour E. Coli urinaire concentré).</li>
                                        </ul>
                                    </div>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "ISCAID UTI Guidelines 2019", url: "https://iscaid.org/guidelines", type: "external" },
                                    { label: "Plumb's Veterinary Drugs", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

