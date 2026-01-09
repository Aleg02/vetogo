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
    Brain,
    Droplets,
    AlertOctagon
} from "lucide-react";

export const AcuteHyperglycemia = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;

    // --- CALCULS ---

    // 1. INSULINE (Dose REDUITE pour HHS)
    // 0.05 UI/kg IM ou IV
    // On commence bas pour éviter chute brutale osmolarité.
    const insulinHHS = w > 0 ? (w * 0.05).toFixed(2) : "--";

    return (
        <ProtocolLayout title="Syndrome Hyperosmolaire (HHS)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Alerte : Oedème Cérébral" icon="🧠">
                                <AlertBox type="critical" title="Danger Mortel">
                                    HHS ≠ DKA. Mortalité élevée (&gt; 35%).
                                    <br />
                                    Glucose &gt; 6 g/L (33 mmol/L) + Osmolarité &gt; 325 mOsm/kg.
                                    <br />
                                    <strong>NE PAS BAISSER LA GLYCÉMIE TROP VITE !</strong>
                                    <br />
                                    Risque d'oedème cérébral si chute &gt; 50-75 mg/dL/h.
                                </AlertBox>
                                <div className="mt-4">
                                    <CheckList
                                        items={[
                                            "Pas de cétones (ou traces).",
                                            "Déshydratation massive (souvent hypernatrémie).",
                                            "Troubles neurologiques fréquents (Coma, Stupeur).",
                                            "Priorité : Remplissage vasculaire progressif."
                                        ]}
                                    />
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Différencier HHS vs DKA" icon="🧪">
                            <div className="space-y-4">
                                <AlertBox type="info" title="Bilan Sanguin & Urinaire">
                                    <ul className="list-disc pl-5">
                                        <li><strong>Cétones Urinaires :</strong> Négatives ou Traces (HHS) vs Positives (DKA).</li>
                                        <li><strong>Osmolarité :</strong> &gt; 320 mOsm/kg (Calcul : 2(Na + K) + Glucose + Urée).</li>
                                        <li><strong>Gaz du Sang :</strong> pH souvent normal contrairement à la DKA (Acidose).</li>
                                    </ul>
                                </AlertBox>
                                <CheckList
                                    items={[
                                        "Ionogramme : Hypernatrémie fréquente (Déshydratation pure).",
                                        "Fonction rénale : Azotémie pré-rénale majeure.",
                                        "Causes sous-jacentes : Pancréatite ? Infection ? Cushing ?"
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

                            <Section title="1. Fluides (La Clé du Traitement)" icon="💧">
                                <p className="text-sm text-slate-700 mb-2">
                                    L'hydratation seule fait baisser la glycémie (dilution + fuite urinaire).
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                                    <li><strong>Type :</strong> NaCl 0.9% (Isotonique).</li>
                                    <li><strong>Débit :</strong> Remplir le déficit sur 12-24h (plus lent que le choc classique si pas d'hypotension majeure).</li>
                                    <li><strong>Objectif :</strong> Stabiliser la volémie AVANT toute insuline (Attendre 4-6h).</li>
                                </ul>
                            </Section>

                            <Section title="2. Insuline (Prudence Extrême)" icon="💉">
                                <AlertBox type="warning" title="Attendre 4-6h de perfusion !">
                                    Ne jamais donner d'insuline à l'arrivée (Risque collapsus & oedème cérébral).
                                    <br />
                                    Si la glycémie baisse de 50 mg/dL/h avec les fluides seuls &rarr; PAS D'INSULINE requise.
                                </AlertBox>
                                <div className="mt-4">
                                    <DosageCard
                                        title="Insuline Rapide (Dose HHS)"
                                        value={insulinHHS}
                                        unit="UI"
                                        subtitle="IM ou IV. Dose réduite (0.05 UI/kg). Objectif baisse lente."
                                        color="purple"
                                    />
                                </div>
                            </Section>

                            <Section title="3. Surveillance" icon="📉">
                                <CheckList
                                    items={[
                                        "Glycémie toutes les heures.",
                                        "Natrémie (Na+) toutes les 4h (Ne doit pas chuter > 0.5-1 mEq/L/h).",
                                        "Signes Neuro : Si détérioration &rarr; Mannitol (Suspicion oedème cérébral)."
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
                                    { label: "HHS vs DKA Guidelines", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

