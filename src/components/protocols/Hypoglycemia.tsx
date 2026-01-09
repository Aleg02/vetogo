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
    Zap,
    Activity,
    AlertTriangle,
    Syringe,
    Droplets,
    Search,
    Thermometer,
    Brain
} from "lucide-react";

export const Hypoglycemia = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isSpeciesSelected = species === "chien" || species === "chat";

    // --- CALCULS ---

    // 1. BOLUS IMPÉRATIF (0.5 - 1 ml/kg de G50% dilué)
    // Dose cible dextro : 0.25 - 0.5 g/kg.
    // G50% = 0.5 g/ml. Donc 0.5 - 1 ml/kg de G50.
    // MAIS: Doit être dilué à 10-25% pour éviter phlébite.
    // Calcul simplifié VetoGo : "Prendre X ml de G50, diluer autant de NaCl, et injecter IV lent".

    const g50DoseMin = w > 0 ? (w * 0.5).toFixed(1) : "--";
    const g50DoseMax = w > 0 ? (w * 1.0).toFixed(1) : "--";

    // 2. CRI (Perfusion Continue)
    // Base: 2.5% ou 5% dextro.
    // Formule VetoGo (Sac 250ml) :
    // Pour 2.5%: Retirer 12.5 ml du sac, ajouter 12.5 ml G50.
    // Pour 5%: Retirer 25 ml du sac, ajouter 25 ml G50.
    // Cette partie est "recette de cuisine" standard, pas dépendante du poids mais du volume du sac.

    return (
        <ProtocolLayout title="Hypoglycémie Aiguë">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="La Minute VetoGo" icon="⚡">
                                <AlertBox type="critical" title="Seuil d'Urgence">
                                    Glycémie &lt; 0.6 g/L (60 mg/dL) ou &lt; 3.3 mmol/L.
                                    <br />
                                    <strong>Risque majeur : Lésions cérébrales irréversibles (Neuroglycopénie).</strong>
                                </AlertBox>
                                <div className="mt-4 text-slate-600">
                                    <p>
                                        L'objectif n'est PAS de normaliser la glycémie instantanément (risque rebond insulinique si insulinome), mais de faire disparaître les signes neuros.
                                    </p>
                                </div>
                            </Section>

                            <Section title="Signes Cliniques (Neuroglycopénie)" icon="🧠">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-2 font-bold text-slate-700 mb-1">
                                            <Zap size={18} className="text-amber-500" /> Initial
                                        </div>
                                        <p className="text-sm text-slate-500">Faiblesse, Ataxie, Tremblements, Faim.</p>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-2 font-bold text-slate-700 mb-1">
                                            <AlertTriangle size={18} className="text-rose-500" /> Sévère
                                        </div>
                                        <p className="text-sm text-slate-500">Convulsions, Coma, Cécité corticale.</p>
                                    </div>
                                </div>
                            </Section>

                            <Section title="Causes Fréquentes (Différentiels)" icon="🔍">
                                <CheckList
                                    items={[
                                        "Surdosage Insuline (Diabétique)",
                                        "Insulinome (Tumeur pancréatique)",
                                        "Sepsis sévère (Consommation)",
                                        "Toy Breed Puppy (Manque réserves)",
                                        "Xylitol (Toxique)",
                                        "Addison (Hypocorticisme)",
                                        "Insuffisance Hépatique"
                                    ]}
                                />
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <>
                            <Section title="Diagnostic Immédiat" icon="🩸">
                                <AlertBox type="info" title="Règle de Whipple">
                                    1. Signes neuros compatibles.
                                    <br />
                                    2. Glycémie basse avérée.
                                    <br />
                                    3. Résolution des signes après apport de glucose.
                                </AlertBox>
                            </Section>
                            <Section title="Bilan Complémentaire (Si stable)" icon="📋">
                                <CheckList
                                    items={[
                                        "Insuline / Glucose ratio (si suspicion Insulinome)",
                                        "Fonction hépatique (Acides biliaires, ALAT/PAL)",
                                        "Ionogramme (Na/K pour Addison)",
                                        "Échographie abdo (Tumeur pancréas, foie)"
                                    ]}
                                />
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Attention">
                                    Saisissez le poids pour les doses de bolus.
                                </AlertBox>
                            )}

                            <Section title="1. Urgence Absolue (Crise)" icon="🚀">
                                <div className="space-y-6">
                                    {/* BOLUS G30 ou G50 dilué */}
                                    <div>
                                        <h4 className="font-bold text-rose-600 mb-2 flex items-center gap-2">
                                            <Syringe size={20} /> Bolus Glucose IV
                                        </h4>
                                        <DosageCard
                                            title="Bolus Glucose 30%"
                                            value="0.5-1 ml/kg"
                                            unit="IV Lent"
                                            subtitle="Diluer 1:1 avec NaCl (pour faire 15%)"
                                            color="red"
                                            dosageRange={[0.5, 1]}
                                        />
                                        <DosageCard
                                            title="Volume de Glucose 50% (G50)"
                                            value={`${g50DoseMin} - ${g50DoseMax}`}
                                            unit="ml"
                                            subtitle={
                                                <span>
                                                    ⚠️ <strong>DILUTION OBLIGATOIRE (min 1:1)</strong>
                                                    <br />
                                                    1. Prélever {g50DoseMax} ml de G50.
                                                    <br />
                                                    2. Ajouter {g50DoseMax} ml de NaCl/Eau.
                                                    <br />
                                                    3. Injecter LENTEMENT (5-10 min) à effet.
                                                </span>
                                            }
                                            color="red"
                                        />
                                        <div className="mt-3 text-sm text-slate-500 italic">
                                            Si pas d'accès veineux : Frotter sucre/miel sur muqueuses (attention morsure).
                                        </div>
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Maintenance (CRI Dextrose)" icon="💧">
                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4">
                                    <h4 className="font-bold text-blue-800 mb-2">Recette Dextrose 2.5%</h4>
                                    <ul className="text-sm text-blue-700 space-y-1 list-disc pl-4">
                                        <li>Sac 100 ml : Retirer 5 ml de fluide, ajouter 5 ml G50.</li>
                                        <li>Sac 250 ml : Retirer 12.5 ml de fluide, ajouter 12.5 ml G50.</li>
                                        <li>Sac 500 ml : Retirer 25 ml de fluide, ajouter 25 ml G50.</li>
                                    </ul>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                    <h4 className="font-bold text-blue-800 mb-2">Recette Dextrose 5%</h4>
                                    <ul className="text-sm text-blue-700 space-y-1 list-disc pl-4">
                                        <li>Sac 100 ml : Retirer 10 ml de fluide, ajouter 10 ml G50.</li>
                                        <li>Sac 250 ml : Retirer 25 ml de fluide, ajouter 25 ml G50.</li>
                                        <li>Sac 500 ml : Retirer 50 ml de fluide, ajouter 50 ml G50.</li>
                                    </ul>
                                </div>
                                <AlertBox type="warning" title="Stop Glucocorticoïdes">
                                    Contre-indiqués en 1ère intention (sauf si Addison suspecté) car gênent le diagnostic ultérieur.
                                </AlertBox>
                            </Section>

                            <Section title="3. Surveillance" icon="👁️">
                                <CheckList
                                    items={[
                                        "Contrôle glycémie q30-60min au début.",
                                        "Repas fréquents riches en protéines/complexes dès que possible.",
                                        "Attention à l'hypokaliémie si apport glucose massif."
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
                                    { label: "Plumb's Veterinary Drugs - Dextrose", type: "external" },
                                    { label: "Management of Acute Hypoglycemia (VETgirl)", url: "https://vetgirlontherun.com", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};
