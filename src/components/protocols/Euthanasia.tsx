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
    Heart,
    Syringe,
    Ghost,
    Moon,
    ShieldCheck
} from "lucide-react";

export const Euthanasia = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";

    // --- CALCULS ---

    // 1. SÉDATION (Confort avant tout)
    // Zoletil (Telazol) + Medetomidine : IM. Le plus pratique.
    // Zoletil : 5-10 mg/kg ? Souvent on dose en ml. 0.1 ml/kg.
    // Medetomidine : 0.05 - 0.1 mg/kg.
    // Standard clinique (Mélange) : 
    // Chien : 0.05 ml/kg Zoletil + 0.05 ml/kg Medetomidine (mélangés).
    // Chat : 0.1 ml/kg Zoletil (seul ou mix).

    // Induction IV (Si cathéter posé avec proprio) : Propofol (4-6 mg/kg).
    const propofolDose = w > 0 ? (w * 4).toFixed(1) : "--";

    // 2. EUTHANASIE (Pentobarbital 18% ou 20%)
    // Standard : 1 ml / 3-5 kg (IV) ou 1 ml / Kg (Intra-Rénale/Card).
    // Doléthal/Euthasol (approx 180-200mg/ml).
    // Dose sécu IV : 150 mg/kg. => ~1 ml / 1.5 - 2 kg pour être sûr ?
    // La notice dit souvent 1ml / 3-5 kg. 
    // Pratique courante "Sécurité" : 1 ml / 2-3 kg.
    const pentoIV = w > 0 ? (w / 3).toFixed(1) : "--";
    const pentoIC = w > 0 ? (w / 1).toFixed(1) : "--"; // Dose massive pour IR/IC

    return (
        <ProtocolLayout title="Euthanasie (Protocole Technique)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Philosophie 'Confort First'" icon="❤️">
                                <AlertBox type="info" title="Sédation Systématique">
                                    Aucune euthanasie ne devrait être réalisée sans sédation profonde préalable, sauf urgence vitale extrême (agonie immédiate).
                                    <br />
                                    <strong>L'animal doit dormir avant la dernière injection.</strong>
                                </AlertBox>
                                <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                                        <Moon size={20} /> Le Parcours Idéal
                                    </h4>
                                    <ul className="text-sm text-slate-800 list-decimal pl-4 mt-2 space-y-1">
                                        <li><strong>Accueil :</strong> Salle calme, lumière tamisée.</li>
                                        <li><strong>Sédation :</strong> IM discrète (Chat : Contenir dans serviette). Laisser le temps (10-15 min) avec les maîtres.</li>
                                        <li><strong>Induction :</strong> Vérifier perte conscience (Réflexe cornéen).</li>
                                        <li><strong>Injection Finale :</strong> IV ou Organe (Si inconscient).</li>
                                    </ul>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses calculées.</AlertBox>
                            )}

                            <Section title="1. Sédation / Anesthésie" icon="💉">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-bold text-blue-600 mb-2">Option IM (Pas de cathéter requis immédiatement)</h4>
                                        <p className="text-sm text-slate-700 mb-1">Mélange Zoletil (Tiletamine) + Medetomidine.</p>
                                        <DosageCard
                                            title="Volume Mélange (Est. 0.05-0.1 ml/kg)"
                                            value={w > 0 ? (w * 0.1).toFixed(1) : "--"}
                                            unit="ml"
                                            subtitle="IM. Attendre 10-15 min le sommeil profond."
                                            color="blue"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-blue-600 mb-2">Option IV (Si cathéter posé)</h4>
                                        <DosageCard
                                            title="Propofol (Induction)"
                                            value={propofolDose}
                                            unit="mg"
                                            subtitle="IV lent. Jusqu'à perte de conscience totale."
                                            color="blue"
                                        />
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Injection Létale (Pentobarbital)" icon="👻">
                                <AlertBox type="critical" title="Vérifier inconscience AVANT">
                                    Si voie Intra-Cardiaque ou Intra-Rénale : Animal doit être en PLAN CHIRURGICAL (Inerte).
                                </AlertBox>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                    <DosageCard
                                        title="Voie Veineuse (IV)"
                                        value={pentoIV}
                                        unit="ml"
                                        subtitle="Rapide. Arrêt en 30-60 sec. (Est. 1ml/3kg)"
                                        color="slate"
                                    />
                                    <DosageCard
                                        title="Voie IC / IR / IP"
                                        value={pentoIC}
                                        unit="ml"
                                        subtitle="Uniquement sur animal DORMANT. Dose massive (1ml/kg)."
                                        color="slate"
                                    />
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET POST-MORTEM --- */}
                    {tab === "examens" && ( // Using Examens tab for Post-Mortem check
                        <Section title="Confirmation du Décès" icon="🛡️">
                            <CheckList
                                items={[
                                    "Absence de bruits cardiaques (Auscultation > 1 min).",
                                    "Arrêt respiratoire.",
                                    "Absence de réflexe cornéen.",
                                    "Relâchement sphincters (Possible).",
                                    "Avertir les propriétaires : 'Il est parti'."
                                ]}
                            />
                        </Section>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "AVMA Guidelines for Euthanasia (2020)", type: "external" },
                                    { label: "AAHA End-of-Life Care", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

