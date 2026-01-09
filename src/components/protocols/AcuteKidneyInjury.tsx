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
    Droplets,
    AlertTriangle,
    TestTube,
    Timer
} from "lucide-react";

export const AcuteKidneyInjury = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. FLUIDOTHERAPIE
    // Maintien : 2 ml/kg/h (Chien) / 1.5 ml/kg/h (Chat) - Base physiologique
    // + Correction déshydratation sur 4-6h.
    // Ici on donne le débit de maintenance de base "Loisirs".
    const maintRate = w > 0 ? (w * (isDog ? 2 : 1.5)).toFixed(1) : "--";

    // 2. DIURÉTIQUES (Si Oligurie persistante après réhydratation)
    // Furosemide : Bolus 2 mg/kg
    const furoBolus = w > 0 ? (w * 2).toFixed(1) : "--";
    // Furosemide CRI (1 mg/kg/h) après bolus
    const furoCRI = w > 0 ? (w * 1).toFixed(1) : "--";
    // Mannitol 20% : 0.5 g/kg IV lent (sur 20 min)
    const mannitolDose = w > 0 ? (w * 0.5).toFixed(1) : "--"; // g
    const mannitolVol = w > 0 ? (w * 0.5 / 0.2).toFixed(1) : "--"; // ml (20% = 0.2 g/ml)

    // 3. HYPERKALIÉMIE (Voir protocole obstruction)
    // Rappel dose Calcium Gluconate 0.5 ml/kg
    const calcGluco = w > 0 ? (w * 0.5).toFixed(1) : "--";

    return (
        <ProtocolLayout title="Insuffisance Rénale Aiguë (IRA/AKI)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Classification IRIS (Créat à jeun)" icon="📊">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div className="bg-slate-50 p-3 rounded border border-slate-200">
                                        <strong className="block mb-2 text-slate-800">Grades AKI (Chien & Chat)</strong>
                                        <ul className="space-y-1 list-disc pl-4 text-slate-600">
                                            <li><strong>I :</strong> Créat &lt; 16 mg/L (Non azotémique).</li>
                                            <li><strong>II :</strong> Créat 17 - 25 mg/L.</li>
                                            <li><strong>III :</strong> Créat 26 - 50 mg/L.</li>
                                            <li><strong>IV :</strong> Créat &gt; 50 mg/L.</li>
                                            <li><strong>V :</strong> Besoin dialyse / Anurie.</li>
                                        </ul>
                                    </div>
                                    <AlertBox type="info" title="Oligurie vs Anurie">
                                        <strong>Oligurie :</strong> &lt; 1 ml/kg/h.
                                        <br />
                                        <strong>Anurie :</strong> &lt; 0.2 ml/kg/h (Urgence absolue, pronostic sombre).
                                        <br />
                                        Ne PAS forcer les fluides si anurie (OAP immédiat).
                                    </AlertBox>
                                </div>
                            </Section>

                            <Section title="Approche 'Ins and Outs'" icon="🔄">
                                <CheckList
                                    items={[
                                        "Poser une sonde urinaire (obligatoire si AKI sévère).",
                                        "Calculer les besoins : Maintien + Pertes estimées + Output Urinaire.",
                                        "Re-évaluer le débit de perfusion toutes les 4h.",
                                        "Peser l'animal 2x/jour (Gain de poids = Surcharge hydrique)."
                                    ]}
                                />
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <>
                            <Section title="Bilan Complication" icon="🧪">
                                <ul className="space-y-2 text-sm text-slate-700">
                                    <li><strong>Hypertension :</strong> Mesurer PAS. Risque lésions rétiniennes/cérébrales.</li>
                                    <li><strong>Hyperkaliémie :</strong> ECG si K+ &gt; 6.</li>
                                    <li><strong>Leptospirose / Toxiques :</strong> Questionner anamnèse (Raisin, Lys, AINS).</li>
                                    <li><strong>Analyse d'urine :</strong> Densité, Cylindres, Culture (PNA ?).</li>
                                </ul>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Saisir Poids">
                                    Doses diurétiques calculées.
                                </AlertBox>
                            )}

                            <Section title="1. Gestion Volémique" icon="💧">
                                <div className="space-y-6">
                                    {/* FLUIDES */}
                                    <div>
                                        <h4 className="font-bold text-blue-600 mb-2 flex items-center gap-2">
                                            <Droplets size={20} /> Entretien (Base)
                                        </h4>
                                        <DosageCard
                                            title="Débit Maintenance"
                                            value={maintRate}
                                            unit="ml/h"
                                            subtitle="A ajuster selon l'OUTPUT urinaire ('Ins & Outs'). Si anurie : réduire drastiquement."
                                            color="blue"
                                        />
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Forcer la Diurèse (Si Oligurie & Hydraté)" icon="💉">
                                <AlertBox type="critical" title="Attention">
                                    Ne JAMAIS donner de diurétiques à un animal déshydraté.
                                </AlertBox>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* FUROSEMIDE */}
                                    <div>
                                        <h4 className="font-bold text-purple-600 mb-2">Furosémide (Dimazon)</h4>
                                        <DosageCard
                                            title="Bolus IV"
                                            value={furoBolus}
                                            unit="mg"
                                            subtitle="Peut être répété 1x. Si réponse, passer en CRI."
                                            color="purple"
                                        />
                                        <div className="mt-2">
                                            <DosageCard
                                                title="CRI (Perfusion)"
                                                value={furoCRI}
                                                unit="mg/h"
                                                subtitle=" perfusion continue. Arrêter si pas de diurèse."
                                                color="purple"
                                            />
                                        </div>
                                    </div>

                                    {/* MANNITOL */}
                                    <div>
                                        <h4 className="font-bold text-slate-600 mb-2">Mannitol (Si échec Furo)</h4>
                                        <DosageCard
                                            title="Mannitol 20% IV"
                                            value={mannitolDose}
                                            unit="g"
                                            subtitle={
                                                <span>
                                                    Vol (20%) : <strong>{mannitolVol} ml</strong>.
                                                    <br />
                                                    Lent (20 min). CI si OAP ou surcharge.
                                                </span>
                                            }
                                            color="slate"
                                        />
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
                                    { label: "IRIS Kidney Guidelines", url: "http://www.iris-kidney.com", type: "external" },
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

