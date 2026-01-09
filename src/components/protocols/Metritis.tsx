"use client";

import React from "react";
import { ProtocolLayout } from "@/components/ProtocolLayout";
import { useAppStore } from "@/store/useAppStore";
import {
    Section,
    DosageCard,
    AlertBox,
    CheckList,
    LinkList,
    ProtocolContainer
} from "@/components/ui/ProtocolUI";
import {
    Baby,
    Thermometer,
    Pill,
    Syringe,
    Droplets
} from "lucide-react";

export const Metritis = () => {
    const { weightKg } = useAppStore();

    const w = weightKg || 0;

    // --- CALCULS ---

    // 1. OCYTOCINE (Ecbolique)
    // 0.5 - 2 UI par chien (Total par dose, pas par kg !)
    // On donne une fourchette indicative.
    const oxytocin = "0.5 - 2 UI (Total)";

    // 2. ANTIBIOTIQUES (Compatibles Allaitement)
    // Cefalexine (15-30 mg/kg)
    const cefalexine = w > 0 ? (w * 20).toFixed(0) : "--";
    // Amox-Clav (12.5-20 mg/kg)
    const amox = w > 0 ? (w * 15).toFixed(0) : "--";
    // Enrofloxacine (5-10 mg/kg) - ATTENTION SEVRAGE
    const enro = w > 0 ? (w * 5).toFixed(1) : "--";

    // 3. FLUIDES (Choc septique souvent associé)
    const bolus = w > 0 ? (w * 10).toFixed(0) : "--";

    return (
        <ProtocolLayout title="Métrite Post-Partum">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Signes d'Appel" icon="🌡️">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <AlertBox type="critical" title="Urgence Sepsis">
                                        Fièvre &gt; 39.5°C ou Hypothermie.
                                        <br />
                                        Mère qui délaisse les chiots.
                                        <br />
                                        Écoulements vulvaires nauséabonds (Brun/Rouge foncé).
                                    </AlertBox>
                                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                                        <h4 className="font-bold text-orange-900 mb-1">Ne pas confondre avec :</h4>
                                        <ul className="list-disc pl-5 text-sm text-orange-800">
                                            <li>Lochies normales (Vert foncé puis rouge, inodores, jusqu'à 3 sem).</li>
                                            <li>Subinvolution des sites placentaires (Saignements prolongés mais mère en forme).</li>
                                        </ul>
                                    </div>
                                </div>
                            </Section>


                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Diagnostic" icon="📉">
                            <CheckList
                                items={[
                                    "Échographie : Utérus dilaté, liquide, placentas rétentus ?",
                                    "Cytologie vaginale : Neutrophiles dégénérés, bactéries phagocytées.",
                                    "Biologie : Leucocytose avec 'Left Shift' (ou Leucopénie si choc), Hypoglycémie possible."
                                ]}
                            />
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses calculées.</AlertBox>
                            )}

                            <Section title="1. Stabilisation & Vidange" icon="💧">
                                <DosageCard
                                    title="Remplissage (Si Choc)"
                                    value={bolus}
                                    unit="ml"
                                    subtitle="Bolus Cristalloïdes IV. Indispensable si tachycardie/TRC augmenté."
                                    color="blue"
                                />
                                <DosageCard
                                    title="Ocytocine"
                                    value={oxytocin}
                                    unit="UI (Total)"
                                    subtitle="IM q2-4h. Si col ouvert et rétention placentaire < 24-48h. Surveillance utérine."
                                    color="purple"
                                />
                                <AlertBox type="warning" title="Limites Ocytocine">
                                    Inefficace après 48h (Récepteurs saturés/insensibles).
                                    <br />
                                    Si échec ou sepsis sévère &rarr; Ovariohystérectomie (OVH) recommandée.
                                </AlertBox>
                            </Section>

                            <Section title="2. Antibiothérapie" icon="💊">
                                <AlertBox type="info" title="Allaitement">
                                    Si Mère trop malade &rarr; Sevrage et biberonnage des chiots.
                                    <br />
                                    Si Mère stable &rarr; Antibiotiques safe (Bêta-lactamines).
                                </AlertBox>

                                <div className="space-y-4 mt-4">
                                    <DosageCard
                                        title="Amox-Clav"
                                        value={amox}
                                        unit="mg"
                                        subtitle="PO/SC BID. Premier choix (Safe)."
                                        color="green"

                                    />
                                    <DosageCard
                                        title="Céfalexine"
                                        value={cefalexine}
                                        unit="mg"
                                        subtitle="PO BID. Alternative."
                                        color="green"
                                    />
                                    <DosageCard
                                        title="Enrofloxacine"
                                        value={enro}
                                        unit="mg"
                                        subtitle="PO/IV q24h. SEVRAGE OBLIGATOIRE (Risque cartilages chiots)."
                                        color="red"
                                    />
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "Postpartum Metritis Management", type: "external" },
                                    { label: "Drugs in Lactation", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

