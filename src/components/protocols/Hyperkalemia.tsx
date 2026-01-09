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
    Zap,
    Droplets,
    HeartPulse
} from "lucide-react";

export const Hyperkalemia = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;

    // --- CALCULS ---

    // 1. PROTECTION CARDIAQUE
    // Calcium Gluconate 10% : 0.5 - 1.5 ml/kg IV LENT (10-20 min)
    const caGlucMin = w > 0 ? (w * 0.5).toFixed(1) : "--";
    const caGlucMax = w > 0 ? (w * 1.5).toFixed(1) : "--";

    // 2. REDISTRIBUTION (Shift Intracellulaire)
    // Insuline Rapide (Actrapid/Humulin R) : 0.5 UI/kg IV
    const insulinDose = w > 0 ? (w * 0.5).toFixed(1) : "--";

    // Dextrose (Glucose) pour compenser l'insuline : 2g par UI d'insuline.
    // 1 UI Insuline -> 2g Glucose.
    // Dose Insuline = 0.5 * W.
    // Glucose requis = (0.5 * W) * 2 = W grammes.
    // Volume G50% (0.5g/ml) = W / 0.5 = 2 * W ml.
    // Ou règle simple : 2g Glucose / UI.
    // Let's compute exact grams needed for the dose.
    const glucoseGrams = w > 0 ? ((w * 0.5) * 2).toFixed(1) : "--";
    const g50Vol = w > 0 ? (((w * 0.5) * 2) / 0.5).toFixed(1) : "--"; // 50% = 0.5g/ml

    // Terbutaline : 0.01 mg/kg IM/IV (Optionnel)
    const terbuDose = w > 0 ? (w * 0.01).toFixed(2) : "--";

    return (
        <ProtocolLayout title="Hyperkaliémie Sévère">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Signes de Gravité" icon="📉">
                                <AlertBox type="critical" title="ECG : Bradycardie & Arrêt">
                                    K+ &gt; 6.5-7 : Ondes T pointues.<br />
                                    K+ &gt; 7-8 : QRS large, Perte onde P.<br />
                                    K+ &gt; 8-9 : Fibrillation ventriculaire / Brow-Asystole.
                                </AlertBox>
                                <div className="mt-4">
                                    <CheckList
                                        items={[
                                            "Bradycardie sévère (<60 bpm chien, <120 bpm chat).",
                                            "Pouls faible.",
                                            "Faiblesse musculaire flasque.",
                                            "Causes : Obstruction urinaire, Addison, IRA anurique, Rupture vésicale."
                                        ]}
                                    />
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Urgence Diagnostique" icon="🚨">
                            <div className="space-y-4">
                                <AlertBox type="critical" title="ECG Immédiat">
                                    La toxicité cardiaque tue avant la cause sous-jacente.
                                    <br />
                                    Chercher : Ondes T pointues, bradycardie, QRS larges.
                                </AlertBox>
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Causes à Exclure (Le "Pourquoi")</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li><strong>Obstruction Urinaire :</strong> Globe vésical dur ? (Chat mâle).</li>
                                        <li><strong>Rupture Vésicale :</strong> Liquide abdo libre (Créat liquide &gt; Créat sang).</li>
                                        <li><strong>Addison (Hypocorticisme) :</strong> Na/K ratio &lt; 27.</li>
                                        <li><strong>Insuffisance Rénale Aiguë (Anurique) :</strong> Pas d'urine produite.</li>
                                    </ul>
                                </div>
                            </div>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses calculées.</AlertBox>
                            )}

                            <Section title="1. Protection Cardiaque (SI ECG ANORMAL)" icon="💓">
                                <AlertBox type="info" title="Ne baisse pas le K+ !">
                                    Le calcium protège le coeur pendant 20-30 min. Il faut relancer le traitement de fond ensuite.
                                </AlertBox>
                                <DosageCard
                                    title="Gluconate de Calcium 10%"
                                    value={`${caGlucMin} - ${caGlucMax}`}
                                    unit="ml"
                                    subtitle="IV LENT (10 min). Arrêter si bradycardie s'aggrave. Monitorer ECG."
                                    color="red"
                                />
                            </Section>

                            <Section title="2. Redistribution (Baisser le K+ Rapidement)" icon="⚡">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <DosageCard
                                            title="Insuline Rapide (Actrapid)"
                                            value={insulinDose}
                                            unit="UI"
                                            subtitle="IV. Pousse le K+ dans les cellules."
                                            color="purple"
                                        />
                                        <DosageCard
                                            title="Glucose (accompagnement)"
                                            value={glucoseGrams}
                                            unit="g"
                                            subtitle={<span>Soit <strong>{g50Vol} ml</strong> de G50% (Dilué 1:4).<br />Suivi d'une perf G2.5% ou G5% pour éviter hypoglycémie.</span>}
                                            color="blue"
                                        />
                                    </div>
                                    <DosageCard
                                        title="Terbutaline (Bricanyl)"
                                        value={terbuDose}
                                        unit="mg"
                                        subtitle="IM ou IV lent. Agoniste Beta-2 (Shift K+). Utile si accès veineux difficile."
                                        color="slate"
                                    />
                                </div>
                            </Section>

                            <Section title="3. Elimination" icon="💧">
                                <p className="text-sm text-slate-700">
                                    Rétablir la diurèse est le seul moyen d'éliminer définitivement le K+ (sauf dialyse).
                                </p>
                                <ul className="list-disc pl-5 mt-2 text-sm text-slate-700">
                                    <li><strong>Fluides :</strong> NaCl 0.9% ou RL (Le peu de K+ dans le RL n'est PAS dangereux, l'effet dilution/diurèse prédomine).</li>
                                    <li><strong>Déboucher :</strong> Sondage urinaire ou cystocentèse décompressive immédiate.</li>
                                </ul>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "Plumb's Veterinary Drugs", type: "external" },
                                    { label: "Management of Hyperkalemia", url: "https://todaysveterinarypractice.com/emergency-medicine/hyperkalemia-stabilization-treatment/", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

