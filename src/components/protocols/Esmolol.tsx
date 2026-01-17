"use client";

import React from "react";
import { ProtocolLayout } from "@/components/ProtocolLayout";
import { useAppStore } from "@/store/useAppStore";
import {
    AlertBox,
    CheckList,
    DosageCard,
    ProtocolContainer,
    Section,
} from "@/components/ui/ProtocolUI";
import { Activity, HeartPulse } from "lucide-react";

export const Esmolol = () => {
    const { weightKg } = useAppStore();

    const w = weightKg || 0;

    const bolusMg = w > 0 ? (w * 0.5).toFixed(2) : "--";
    const bolusMl = w > 0 ? (w * 0.5 / 10).toFixed(2) : "--";

    const criMinMgPerMin = w > 0 ? (w * 0.05).toFixed(2) : "--";
    const criMaxMgPerMin = w > 0 ? (w * 0.2).toFixed(2) : "--";
    const criMinMlPerH = w > 0 ? (w * 0.05 / 10 * 60).toFixed(2) : "--";
    const criMaxMlPerH = w > 0 ? (w * 0.2 / 10 * 60).toFixed(2) : "--";

    return (
        <ProtocolLayout title="Esmolol">
            {(tab) => (
                <ProtocolContainer>
                    {tab === "general" && (
                        <>
                            <Section title="Indications" icon="⚡">
                                <CheckList
                                    items={[
                                        "Tachycardie supraventriculaire (TSV) avec retentissement.",
                                        "Contrôle de la fréquence en hyperadrénergie.",
                                        "Médicament ultra-court : titration rapide possible.",
                                    ]}
                                />
                            </Section>

                            <Section title="Contre-indications" icon="⛔️">
                                <AlertBox type="critical" title="Ne pas administrer">
                                    <strong>ICC</strong> ou <strong>bloc AV</strong> (tous grades) :
                                    risque de décompensation ou d&apos;aggravation du bloc.
                                </AlertBox>
                            </Section>
                        </>
                    )}

                    {tab === "examens" && (
                        <Section title="Surveillance" icon="🩺">
                            <CheckList
                                items={[
                                    "Surveillance PA/FC en continu.",
                                    "ECG continu pendant la titration.",
                                    "Réévaluer la perfusion périphérique et la conscience.",
                                ]}
                            />
                        </Section>
                    )}

                    {tab === "traitements" && (
                        <>
                            <Section title="Schéma Esmolol" icon="💉">
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                                            <Activity size={18} /> Bolus IV (charge)
                                        </h4>
                                        <DosageCard
                                            title="Bolus IV lent"
                                            value="0.5"
                                            unit="mg/kg"
                                            dosage={0.5}
                                            concentration={10}
                                            subtitle={
                                                <span>
                                                    Administrer sur 1 min. Volume estimé : <strong>{bolusMl} mL</strong> (10 mg/mL).
                                                </span>
                                            }
                                            color="blue"
                                        />
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                                            <HeartPulse size={18} /> CRI (perfusion continue)
                                        </h4>
                                        <DosageCard
                                            title="CRI IV titrée"
                                            value="0.05 - 0.2"
                                            unit="mg/kg/min"
                                            dosageRange={[0.05, 0.2]}
                                            concentration={10}
                                            subtitle={
                                                <span>
                                                    Adapter à la réponse clinique. Équivalent : <strong>{criMinMgPerMin}-{criMaxMgPerMin} mg/min</strong>{" "}
                                                    (<strong>{criMinMlPerH}-{criMaxMlPerH} mL/h</strong> à 10 mg/mL).
                                                </span>
                                            }
                                            color="purple"
                                        />
                                    </div>
                                </div>
                            </Section>

                            <AlertBox type="info" title="Surveillance obligatoire">
                                PA/FC en continu, ECG et réévaluation clinique à chaque palier de titration.
                            </AlertBox>
                        </>
                    )}

                    {tab === "liens" && (
                        <Section title="Notes pratiques" icon="📌">
                            <CheckList
                                items={[
                                    "Concentration calculable : 10 mg/mL.",
                                    "Réduire ou arrêter si hypotension ou bradycardie.",
                                    "Préparer une seringue dédiée pour la titration.",
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};
