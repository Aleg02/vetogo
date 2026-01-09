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
    Candy,
    Activity,
    Droplets,
    Skull
} from "lucide-react";

export const XylitolPoisoning = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;

    // --- CALCULS ---

    // 1. GLUCOSE BOLUS (Dextrose 50%)
    // 0.5 - 1 ml/kg dilué 1:1 ou 1:2
    const g50Bolus = w > 0 ? (w * 0.5).toFixed(1) : "--";

    // 2. HEPATOPROTECTEURS
    // SAMe : 20 mg/kg
    const same = w > 0 ? (w * 20).toFixed(0) : "--";
    // NAC (N-acetylcysteine) : 140 mg/kg loading -> 70 mg/kg q6h
    const nacLoad = w > 0 ? (w * 140).toFixed(0) : "--";

    return (
        <ProtocolLayout title="Intoxication Xylitol (Chewing-gum / Gâteaux)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Le Double Danger" icon="🍬">
                                <p className="text-sm text-slate-700 mb-4">
                                    Le Xylitol stimule une libération massive d'insuline chez le CHIEN (rare chat).
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <AlertBox type="critical" title="1. Hypoglycémie Sévère">
                                        <strong>Seuil : &gt; 0.1 g/kg</strong>
                                        <br />Début rapide (30-60 min).
                                        <br />Convulsions, coma, mort.
                                    </AlertBox>
                                    <AlertBox type="critical" title="2. Nécrose Hépatique Aiguë">
                                        <strong>Seuil : &gt; 0.5 g/kg</strong>
                                        <br />Début retardé (12h - 72h).
                                        <br />Insuffisance hépatique fulgurante, coagulopathie.
                                    </AlertBox>
                                </div>
                            </Section>

                            <Section title="Pas de Charbon !" icon="💀">
                                <AlertBox type="info" title="Charbon Activé Inutile">
                                    Le Xylitol ne se lie PAS bien au charbon.
                                    <br />Ne pas perdre de temps avec ça. Priorité = Glucose et Décontamination gastrique (Vomir).
                                </AlertBox>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="La Triade Xylitol" icon="📉">
                            <div className="space-y-4">
                                <AlertBox type="critical" title="1. Glucose (Immédiat)">
                                    Hypoglycémie sévère possible dès 30min post-ingestion.
                                    <br />
                                    <strong>Monitoring :</strong> q1h à q2h pendant 12h.
                                </AlertBox>
                                <AlertBox type="warning" title="2. Potassium (Hypokaliémie)">
                                    L'insuline fait rentrer le K+ dans les cellules &rarr; Risque de paralysie respiratoire / Arythmies.
                                </AlertBox>
                                <AlertBox type="info" title="3. Foie (Retardé)">
                                    ALAT / Phosphatases Alcalines & Bilirubine.
                                    <br />
                                    Pic cytolyse possible à 24-48h. Coagulopathie associée (PT/aPTT).
                                </AlertBox>
                            </div>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses calculées.</AlertBox>
                            )}

                            <Section title="1. Gestion Hypoglycémie" icon="📉">
                                <DosageCard
                                    title="Bolus Glucose 50% (G50)"
                                    value={`${g50Bolus}`}
                                    unit="ml (Diluer 1:2)"
                                    subtitle="IV LENT. Si glycémie &lt; 0.6 g/L."
                                    color="red"
                                />
                                <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-200">
                                    <strong className="text-blue-900">Relais Perfusion (CRI) :</strong>
                                    <p className="text-sm text-blue-800 mt-1">
                                        G5% (ou ajout G50 dans NaCl) pour maintenir glycémie &gt; 1 g/L.
                                        <br />Surveiller glycémie toutes les 1-2h.
                                    </p>
                                </div>
                            </Section>

                            <Section title="2. Protection Hépatique (> 0.5 g/kg)" icon="💧">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DosageCard
                                        title="NAC (Mucomyst)"
                                        value={`${nacLoad}`}
                                        unit="mg"
                                        subtitle="Charge IV/PO. Puis 70 mg/kg q6h. Antioxydant majeur."
                                        color="green"
                                    />
                                    <DosageCard
                                        title="SAMe (S-adenosyl...)"
                                        value={`${same}`}
                                        unit="mg"
                                        subtitle="PO q24h. Soutien glutathion."
                                        color="green"
                                    />
                                </div>
                            </Section>

                            <Section title="3. Suivi" icon="📉">
                                <CheckList
                                    items={[
                                        "Glycémie : q1-2h pendant 12-24h.",
                                        "Enzymes Hépatiques (ALT/ALKP) : À l'entrée, puis q24h pendant 72h.",
                                        "Coagulation (PT/PTT) : Si atteinte hépatique suspectée (risque CIVD)."
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
                                    { label: "Xylitol Toxicity Calculator", type: "external" },
                                    { label: "Hepatic Support Guidelines", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

