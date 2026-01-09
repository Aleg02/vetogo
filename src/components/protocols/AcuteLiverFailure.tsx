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
    Activity,
    Pill,
    Droplets,
    Brain
} from "lucide-react";

export const AcuteLiverFailure = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;

    // --- CALCULS ---

    // 1. SOUTIEN HEPATIQUE
    // NAC : Charge 140 mg/kg
    const nacLoad = w > 0 ? (w * 140).toFixed(0) : "--";
    // SAMe : 20 mg/kg
    const same = w > 0 ? (w * 20).toFixed(0) : "--";

    // 2. ENCEPHALOPATHIE HEPATIQUE
    // Lactulose : 0.5 ml/kg q8h (dose effet laxatif léger)
    const lactulose = w > 0 ? (w * 0.5).toFixed(1) : "--";
    // Metronidazole (antibio amoniac) : 7.5 mg/kg BID (Petite dose car métabo hépatique !)
    const metro = w > 0 ? (w * 7.5).toFixed(0) : "--";

    // 3. COAGULOPATHIE
    // Vitamine K1 : 1-2 mg/kg
    const vitk1 = w > 0 ? (w * 1.5).toFixed(1) : "--";

    return (
        <ProtocolLayout title="Insuffisance Hépatique Aiguë (IHA)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Triade Clinique" icon="📉">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                                        <strong className="text-yellow-800">1. Ictère</strong>
                                        <p className="text-xs text-yellow-700">Bilirubine &gt; 35-50 µmol/L.</p>
                                    </div>
                                    <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                                        <strong className="text-red-800">2. Coagulopathie</strong>
                                        <p className="text-xs text-red-700">Défaut facteurs coag (PT/PTT augmentés), Saignements spontanés.</p>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                                        <strong className="text-purple-800">3. Encéphalopathie</strong>
                                        <p className="text-xs text-purple-700">Ammoniac élevé (NH3). Convulsions, Stupeur, Head pressing.</p>
                                    </div>
                                </div>
                                <AlertBox type="critical" title="Causes Toxiques ?">
                                    Toujours exclure : Xylitol, Sago Palm, Amanite phalloïde, Paracétamol, AINS, Algues bleues.
                                    <br />
                                    Infectieux : Leptospirose (Chien) !
                                </AlertBox>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Bilan Biologique" icon="📉">
                            <div className="space-y-4">
                                <div className="bg-white p-3 rounded-lg border border-slate-200">
                                    <strong className="block text-slate-700 mb-1">Biochimie</strong>
                                    <ul className="list-disc pl-5 text-sm text-slate-600">
                                        <li>ALT/ALKP : Souvent très élevées (&gt;10x).</li>
                                        <li>Bilirubine : Augmentée (Marqueur pronostic).</li>
                                        <li>Albumine/Glucose/Urée : Diminués si insuffisance terminale.</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-3 rounded-lg border border-slate-200">
                                    <strong className="block text-slate-700 mb-1">Coagulation & Autre</strong>
                                    <ul className="list-disc pl-5 text-sm text-slate-600">
                                        <li>PT/PTT : Allongés (Carence facteurs vit-K dépendants).</li>
                                        <li>Ammoniac : Élevé (Encéphalopathie).</li>
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

                            <Section title="1. Antioxydants & Soutien" icon="💊">
                                <div className="space-y-4">
                                    <DosageCard
                                        title="NAC (N-acétylcystéine)"
                                        value={nacLoad}
                                        unit="mg"
                                        subtitle="Charge IV diluée. Puis 70 mg/kg q6h. Glutathion donor."
                                        color="green"
                                    />
                                    <DosageCard
                                        title="SAMe / Silybine"
                                        value={same}
                                        unit="mg"
                                        subtitle="PO q24h. Hepatoprotecteur majeur."
                                        color="green"
                                    />
                                    <DosageCard
                                        title="Vitamine K1"
                                        value={vitk1}
                                        unit="mg"
                                        subtitle="SC q12h. Si PT augmenté ou prévention initiale."
                                        color="slate"
                                    />
                                </div>
                            </Section>

                            <Section title="2. Encéphalopathie Hépatique" icon="🧠">
                                <DosageCard
                                    title="Lactulose"
                                    value={lactulose}
                                    unit="ml"
                                    subtitle="PO/Lavement q6-8h. Objectif : Selles molles (piège l'ammoniac)."
                                    color="blue"
                                />
                                <DosageCard
                                    title="Métronidazole"
                                    value={metro}
                                    unit="mg"
                                    subtitle="PO/IV BID. Réduit flore productrice d'ammoniac. DOSE RÉDUITE (Neurotoxique)."
                                    color="red"
                                />
                                <AlertBox type="warning" title="Attention Protéines">
                                    Régime Hyperdigestible hépatique recommandé dès la reprise de l'alimentation.
                                </AlertBox>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "Acute Liver Failure management", type: "external" },
                                    { label: "Hepatic Encephalopathy Protocol", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

