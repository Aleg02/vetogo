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
    ShieldAlert,
    Syringe,
    Pill,
    Droplets,
    Ban
} from "lucide-react";

export const UpperGIBleeding = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. IPP (Omeprazole / Pantoprazole)
    // 1 mg/kg IV/PO q12-24h. (q12h si sévère/gastrinome).
    const ippDose = w > 0 ? (w * 1).toFixed(1) : "--";

    // 2. SUCRALFATE
    // Chien : 1g (>20kg) ou 0.5g (<20kg).
    // Chat : 0.25g.
    let sucralfateDose = "--";
    if (w > 0) {
        if (isCat) sucralfateDose = "0.25 g";
        else sucralfateDose = w > 20 ? "1 g" : "0.5 g";
    }

    // 3. MISOPROSTOL (Cytotec)
    // 3 - 5 mcg/kg PO q8h.
    const misoMin = w > 0 ? (w * 3).toFixed(1) : "--";
    const misoMax = w > 0 ? (w * 5).toFixed(1) : "--";

    return (
        <ProtocolLayout title="Hémorragie Digestive Haute">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Premières Mesures" icon="🛡️">
                                <AlertBox type="critical" title="STOP AINS / CORTICOÏDES">
                                    En cas de méléna ou hématémèse : Arrêt immédiat de tout médicament ulcérogène.
                                </AlertBox>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div className="bg-red-50 p-3 rounded border border-red-200">
                                        <h4 className="font-bold text-red-800">Signes Sévérité</h4>
                                        <ul className="text-sm list-disc pl-4 mt-1 text-red-700">
                                            <li>Tachycardie persistante.</li>
                                            <li>Muqueuses Pâles / TRC augmenté.</li>
                                            <li>PCV &lt; 20-25% (Chien) / &lt; 15-20% (Chat).</li>
                                        </ul>
                                    </div>
                                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                                        <h4 className="font-bold text-blue-800">Causes Fréquentes</h4>
                                        <ul className="text-sm list-disc pl-4 mt-1 text-blue-700">
                                            <li>AINS / Stéroïdes.</li>
                                            <li>Corps étranger.</li>
                                            <li>Insuffisance Rénale / Hépatique.</li>
                                            <li>Thrombocytopénie.</li>
                                        </ul>
                                    </div>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Enquête Étiologique" icon="🩸">
                            <div className="space-y-4">
                                <AlertBox type="info" title="Rapport Urée / Créat">
                                    Si Urée augmentée disproportionnellement à la Créat &rarr; Digestion des protéines sanguines (Saignement GI).
                                </AlertBox>
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Bilan Hémostase</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li><strong>Plaquettes :</strong> Thrombocytopénie sévère ?</li>
                                        <li><strong>Coagulation (PT/aPTT) :</strong> Intoxication rodénticides ? Insuffisance Hépatique ?</li>
                                    </ul>
                                </div>
                                <CheckList
                                    items={[
                                        "Hématocrite/Protéines Totales : Suivi sérié INDISPENSABLE.",
                                        "Imagerie : Recherche tumeur gastrique, corps étranger, ulcère (parfois visible écho pariétale)."
                                    ]}
                                />
                            </div>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses calculées.</AlertBox>
                            )}

                            <Section title="1. Gastro-Protection (IPP)" icon="💉">
                                <DosageCard
                                    title="Oméprazole / Pantoprazole"
                                    value={ippDose}
                                    unit="mg"
                                    subtitle="IV ou PO. q24h (Standard) ou q12h (Sévère). Mieux que les anti-H2."
                                    color="blue"
                                />
                            </Section>

                            <Section title="2. Protection Muqueuse" icon="💊">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DosageCard
                                        title="Sucralfate (Ulcar/Keal)"
                                        value={sucralfateDose}
                                        unit="par prise"
                                        subtitle="PO q8h. Espacer de 2h des autres repas/médicaments. Ecraser dans l'eau."
                                        color="green"
                                    />
                                    <DosageCard
                                        title="Misoprostol (Cytotec)"
                                        value={`${misoMin} - ${misoMax}`}
                                        unit="mcg"
                                        subtitle="PO q8h. Spécifique ulcères AINS. Attention : Abortif (Femmes Enceintes)."
                                        color="green"
                                    />
                                </div>
                            </Section>

                            <Section title="3. Support Hémodynamique" icon="💧">
                                <p className="text-sm text-slate-700 mb-2">
                                    Maintenir perfusion tissulaire (Lactates stables).
                                </p>
                                <AlertBox type="warning" title="Transfusion ?">
                                    Si PCV chute rapidement ou signes de choc malgré fluides.
                                    <br />
                                    Calcul vol : <strong>{(w * 10).toFixed(0)} - {(w * 20).toFixed(0)} ml</strong> Sang Total (Estimatif).
                                </AlertBox>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "ACVIM Consensus GI Bleeding", type: "external" },
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

