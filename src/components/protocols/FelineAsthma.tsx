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
    Syringe,
    Pill,
    Stethoscope
} from "lucide-react";

export const FelineAsthma = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    // Spécifique Chat
    const isCat = species === "chat";

    // --- CALCULS (Chat) ---

    // 1. TERBUTALINE (Injectable)
    // 0.01 mg/kg SC/IM/IV
    const terbuInj = w > 0 ? (w * 0.01).toFixed(3) : "--";

    // 2. DEXAMETHASONE (Injectable)
    // 0.2 - 0.4 mg/kg IV/IM (Action rapide)
    const dexaLow = w > 0 ? (w * 0.2).toFixed(2) : "--";
    const dexaHigh = w > 0 ? (w * 0.4).toFixed(2) : "--";

    return (
        <ProtocolLayout title="Asthme Félin (Crise Aiguë)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Gestion de la Crise" icon="🌬️">
                                <AlertBox type="critical" title="Minimal Handling">
                                    Le stress tue. Manipuler avec extrême douceur.
                                    <br />
                                    Oxygène "Flow-By" ou Cage à oxygène d'abord.
                                </AlertBox>
                                {species === "chien" && (
                                    <AlertBox type="warning" title="Attention Espèce">
                                        Ce protocole est spécifique au <strong>CHAT</strong>.
                                    </AlertBox>
                                )}
                                <div className="mt-4">
                                    <CheckList
                                        items={[
                                            "Oxygénothérapie immédiate.",
                                            "Bronchodilatateurs (Salbutamol inhalé ou Terbutaline inj).",
                                            "Corticoïdes action rapide (Dexaméthasone).",
                                            "Sédation légère (Butorphanol/Acépromazine) si panique."
                                        ]}
                                    />
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Diagnostic (Une fois stable)" icon="🔍">
                            <CheckList
                                items={[
                                    "Radiographie : Patron bronchique ('Donuts', 'Rails de train'), Aplatissement diaphragme (Air trapping).",
                                    "LBA (Lavage) : Cytologie riche en Eosinophiles (si asthme) ou Neutrophiles (si bronchite chronique).",
                                    "Exclusion : Parasites pulmonaires (Aelurostrongylus) & Cardio (Echo)."
                                ]}
                            />
                            <AlertBox type="warning" title="Jamais en crise !">
                                Ne jamais coucher un chat en détresse pour une radio. Stabiliser d'abord (Oxygène + TTT).
                            </AlertBox>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses calculées.</AlertBox>
                            )}

                            <Section title="1. Bronchodilatateurs (L'Urgence)" icon="🌬️">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                                        <h4 className="font-bold text-blue-900 mb-2">Salbutamol (Ventoline)</h4>
                                        <p className="text-sm text-blue-800 mb-2">
                                            Spray Inhalateur (Aerokat / Spacer).
                                        </p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-black text-blue-600">1-2 Puffs</span>
                                        </div>
                                        <p className="text-xs text-blue-700 mt-1">
                                            Toutes les 30 min (si grave) à q4h.
                                        </p>
                                    </div>
                                    <DosageCard
                                        title="Terbutaline (Bricanyl)"
                                        value={terbuInj}
                                        unit="mg"
                                        subtitle="SC / IM / IV. Si inhalateur impossible ou inefficace."
                                        color="blue"
                                    />
                                </div>
                            </Section>

                            <Section title="2. Anti-Inflammatoire (Corticoïdes)" icon="💉">
                                <DosageCard
                                    title="Dexaméthasone"
                                    value={`${dexaLow} - ${dexaHigh}`}
                                    unit="mg"
                                    subtitle="IV ou IM. Action rapide. Relais oral (Prednisolone) plus tard."
                                    color="red"
                                />
                                <div className="mt-2 bg-yellow-50 p-3 rounded border border-yellow-100 text-sm text-yellow-800">
                                    <strong>Fluticasone (Flixotide) ?</strong> Inutile en crise aiguë (délai action 1-2 semaines). Pour maintenance uniquement.
                                </div>
                            </Section>

                            <Section title="3. Maintenance (Retour maison)" icon="💊">
                                <CheckList
                                    items={[
                                        "Prednisolone : 1-2 mg/kg/jour PO (dégressif).",
                                        "Fluticasone (Inhalé) : 110-220 µg BID (Long terme).",
                                        "Terbutaline (Orale) : Si besoin."
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
                                    { label: "Plumb's Veterinary Drugs", type: "external" },
                                    { label: "Management of Feline Asthma", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

