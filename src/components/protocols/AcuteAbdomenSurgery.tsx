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
    Scissors,
    FlaskConical,
    TestTube,
    Activity
} from "lucide-react";

export const AcuteAbdomenSurgery = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;

    // --- CALCULS ---
    // Glucose Difference Warning
    // "Si Delta Glucose (Sang - Liquide) > 20 mg/dL (1.1 mmol/L) => Septique à 100% chez le chien"

    return (
        <ProtocolLayout title="Abdomen Aigu Chirurgical">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Arbre Décisionnel (Go / No-Go)" icon="✂️">
                                <AlertBox type="critical" title="Chirurgie IMMÉDIATE (Sans délai)">
                                    <ul className="list-disc pl-5">
                                        <li><strong>Péritonite Septique :</strong> Bactéries intracellulaires au culot ou Glucose Liq &lt; Glucose Sang (-20mg/dL).</li>
                                        <li><strong>Volvulus (GDV / Mésentérique) :</strong> Urgence vitale absolue.</li>
                                        <li><strong>Pneumopéritoine :</strong> (Air libre radio) = Perforation viscérale (sauf post-op récent).</li>
                                        <li><strong>Hémorragie INCONTRÔLABLE :</strong> Malgré réanimation volémique (Rare, souvent on stabilise d'abord).</li>
                                    </ul>
                                </AlertBox>
                                <AlertBox type="warning" title="Chirurgie URGENTE (Après Stabilisation)">
                                    <ul className="list-disc pl-5">
                                        <li><strong>Uroabdomen :</strong> D'abord corriger l'Hyperkaliémie ! (Détourner urines sonde/drain si possible).</li>
                                        <li><strong>Péritonite Biliaire :</strong> Stabiliser d'abord.</li>
                                        <li><strong>Obstruction Digestive :</strong> Hydrater avant induction.</li>
                                    </ul>
                                </AlertBox>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="La Décision Chirurgicale" icon="🔦">
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Imagerie Rapide</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li><strong>A-FAST (Echo) :</strong> Liquide libre ? Si oui &rarr; Ponction.</li>
                                        <li><strong>Radio Thorax/Abdo :</strong> Pneumopéritoine (Air libre) ? Hernie diaphragmatique ?</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Biologie</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li><strong>Lactates :</strong> Marqueur d'hypoperfusion ou d'ischémie (Volvulus, Nécrose).</li>
                                        <li><strong>Comparaison Glucose :</strong> Glucose Liquide Abdo &lt; Glucose Sang = Péritonite Septique.</li>
                                        <li><strong>Coagulation :</strong> Avant toute chirurgie majeure (PT/APTT).</li>
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

                            <Section title="1. Analyse Liquide Abdominal (A-FAST)" icon="🧪">
                                <p className="text-sm text-slate-700 mb-2">
                                    Ponction 4 quadrants (A-FAST). Cytologie et Biochimie COMPARÉE (Sang vs Liquide).
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                                        <h4 className="font-bold text-red-900 mb-2">Péritonite Septique</h4>
                                        <ul className="list-disc pl-5 text-sm text-red-800 space-y-1">
                                            <li><strong>Cytologie :</strong> Neutrophiles dégénérés + Bactéries intracellulaires.</li>
                                            <li><strong>Glucose :</strong> Glucose Sang - Glucose Liquide &gt; 20 mg/dL (1.1 mmol/L).</li>
                                            <li><strong>Lactates :</strong> Lactates Liquide &gt; Lactates Sang (&gt; 2 mmol/L de diff).</li>
                                        </ul>
                                    </div>
                                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                                        <h4 className="font-bold text-amber-900 mb-2">Uroabdomen</h4>
                                        <ul className="list-disc pl-5 text-sm text-amber-800 space-y-1">
                                            <li><strong>Créatinine :</strong> Ratio Liq/Sang &gt; 2:1.</li>
                                            <li><strong>Potassium :</strong> Ratio Liq/Sang &gt; 1.4:1.</li>
                                            <li><em>Attention :</em> La créat s'équilibre vite, le K+ reste élevé.</li>
                                        </ul>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                                        <h4 className="font-bold text-green-900 mb-2">Péritonite Biliaire</h4>
                                        <ul className="list-disc pl-5 text-sm text-green-800 space-y-1">
                                            <li><strong>Bilirubine :</strong> Bili Liq &gt; Bili Sang (Souvent x2 ou x3).</li>
                                            <li>Aspect : Liquide jaune-vert ou brun (mucine).</li>
                                        </ul>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <h4 className="font-bold text-slate-900 mb-2">Hémoabdomen</h4>
                                        <ul className="list-disc pl-5 text-sm text-slate-800 space-y-1">
                                            <li><strong>PCV/Hct :</strong> PCV Liq &gt; PCV Sang (parfois) ou similaire.</li>
                                            <li><strong>Coagulation :</strong> Le sang aspiré NE COAGULE PAS (défibriné). S'il coagule = Ponction vaisseau/rate.</li>
                                        </ul>
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Stabilisation Pré-Opératoire" icon="🧪">
                                <CheckList
                                    items={[
                                        "Accès Veineux : 2 gros cathéters (Cephalique ou Jugulaire).",
                                        "Bolus Cristalloïdes : 10-20 ml/kg (sauf si sang, préférer produits sanguins/colloïdes si dispo).",
                                        "Antibiotiques : Amox-Clav ou Céfazoline + Métronidazole (Septique).",
                                        "Analgésie : Opioïdes purs (Méthadone/Fentanyl). Éviter AINS (Rein/Estomac)."
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
                                    { label: "Abdominal Fluid Analysis Guide", type: "external" },
                                    { label: "Surgical Acute Abdomen Decision Tree", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

