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
    Pill,
    Zap,
    Baby
} from "lucide-react";

export const AcuteHypocalcemia = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;

    // --- CALCULS ---

    // 1. URGENCE (Tétanie / Eclampsie)
    // Gluconate de Calcium 10% : 0.5 - 1.5 ml/kg IV LENT (10-20 min)
    const caGlucMin = w > 0 ? (w * 0.5).toFixed(1) : "--";
    const caGlucMax = w > 0 ? (w * 1.5).toFixed(1) : "--";

    // 2. ENTRETIEN ORAL
    // Calcium (Carbonate) : 25 - 50 mg/kg/jour (Calcium Élément)
    // Tums (Ex: 500mg CaCO3 = 200mg Ca Élément).
    const caOralMin = w > 0 ? (w * 25).toFixed(0) : "--";
    const caOralMax = w > 0 ? (w * 50).toFixed(0) : "--";

    return (
        <ProtocolLayout title="Hypocalcémie Aiguë (Éclampsie)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Signes Cliniques" icon="📉">
                                <AlertBox type="critical" title="Tétanie Puerperale">
                                    Souvent 1-3 semaines post-partum (Pic lactation). Petite chienne.
                                    <br />
                                    Rigidité, Tremblements, Halètement, Hyperthermie.
                                </AlertBox>
                                <div className="mt-4">
                                    <CheckList
                                        items={[
                                            "Arrêt immédiat de la tétée (Séparer les chiots 24h).",
                                            "Hyperthermie maligne possible (Refroidir si > 40°C).",
                                            "Hypoglycémie associée fréquente (Vérifier glycémie).",
                                            "ECG indispensable pendant le traitement calcique."
                                        ]}
                                    />
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Confirmation Diagnostique" icon="📉">
                            <div className="space-y-4">
                                <AlertBox type="warning" title="Calcium Ionisé (iCa)">
                                    Le seul vrai reflet du calcium actif.
                                    <br />
                                    Le Calcium Total (tCa) est dépendant de l'albumine (Faux bas si hypoalbuminémie).
                                </AlertBox>
                                <CheckList
                                    items={[
                                        "Magnésium : L'hypomagnésémie empêche la remontée du calcium (Réfractaire).",
                                        "Albumine : Pour interpréter le calcium total.",
                                        "Glucose : Hypoglycémie concomitante fréquente (Eclampsie, Sepsis)."
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

                            <Section title="1. Urgence (Crise Tétanique)" icon="⚡">
                                <AlertBox type="warning" title="Administration LENTE">
                                    Si bradycardie ou arythmie &rarr; STOP.
                                </AlertBox>
                                <div className="mt-4">
                                    <DosageCard
                                        title="Gluconate de Calcium 10%"
                                        value={`${caGlucMin} - ${caGlucMax}`}
                                        unit="ml"
                                        subtitle="IV STRICT. LENT (10-20 min). Dilution 1:1 possible avec NaCl."
                                        color="red"
                                    />
                                </div>
                            </Section>

                            <Section title="2. Relais Oral" icon="💊">
                                <p className="text-sm text-slate-700 mb-2">
                                    A débuter dès que l'animal déglutit. Continuer jusqu'au sevrage.
                                </p>
                                <DosageCard
                                    title="Calcium Élément (Oral)"
                                    value={`${caOralMin} - ${caOralMax}`}
                                    unit="mg / jour"
                                    subtitle="En 3-4 prises. Ex: Carbonate de Calcium."
                                    color="green"
                                />
                                <div className="mt-2 bg-blue-50 p-3 rounded border border-blue-100 text-sm text-blue-800">
                                    <strong>Vitamine D (Calcitriol) ?</strong> Uniquement si hypocalcémie réfractaire ou Hypoparathyroïdie primaire. Pas systématique pour éclampsie.
                                </div>
                            </Section>

                            <Section title="3. Gestion Lactation" icon="🍼">
                                <ul className="list-disc pl-5 text-sm text-slate-700">
                                    <li>Retirer les chiots 12-24h.</li>
                                    <li>Nourrir les chiots au lait maternisé.</li>
                                    <li>Reprise tétée progressive avec supplémentation orale Mère.</li>
                                    <li>Si récidive &rarr; Sevrage définitif.</li>
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
                                    { label: "Management of Eclampsia", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

