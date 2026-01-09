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
    ScanLine,
    Syringe,
    AlertTriangle,
    Stethoscope
} from "lucide-react";

export const DigestiveForeignBody = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. STABILISATION PRE-OP
    // Fluides : Maintenance + Déficit. Souvent Ringer Lactate.

    // 2. ANTIBIOPROPHYLAXIE (30 min avant incision)
    // Cefazoline : 22 mg/kg IV
    const cefazolineDose = w > 0 ? (w * 22).toFixed(0) : "--";

    // 3. ANALGÉSIE
    // Méthadone : 0.2 - 0.4 mg/kg
    const methaDose = w > 0 ? (w * 0.2).toFixed(2) : "--";

    return (
        <ProtocolLayout title="Corps Étranger Digestif">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Etape Clé : Le Diagnostic" icon="📟">
                                <AlertBox type="critical" title="Danger 'Corps Étranger Linéaire'">
                                    <strong>Toujours vérifier sous la langue (surtout Chat).</strong>
                                    <br />
                                    Une ficelle accrochée peut scier l'intestin ("Jours en Accordéon").
                                    <br />
                                    <em>Ne jamais tirer sur la ficelle qui dépasse !</em>
                                </AlertBox>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div className="bg-slate-50 p-3 rounded border border-slate-200">
                                        <h4 className="font-bold text-slate-800">Radio</h4>
                                        <ul className="text-sm list-disc pl-4 mt-1 text-slate-700">
                                            <li>Opacité anormale.</li>
                                            <li>Dilatation gazeuse segmentaire (Jejunum).</li>
                                            <li>Image de "Gravier" (Obstruction partielle).</li>
                                        </ul>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded border border-slate-200">
                                        <h4 className="font-bold text-slate-800">Echo</h4>
                                        <ul className="text-sm list-disc pl-4 mt-1 text-slate-700">
                                            <li>Ombre acoustique forte.</li>
                                            <li>Plicature intestinale (Linéaire).</li>
                                            <li>Liquide libre (Perforé = Péritonite).</li>
                                        </ul>
                                    </div>
                                </div>
                            </Section>

                            <Section title="Décision Thérapeutique" icon="✂️">
                                <CheckList
                                    items={[
                                        "Estomac : Endoscopie possible (si non piquant/tranchant) vs Gastrotomie.",
                                        "Intestin : Chirurgie (Entérotomie vs Entérectomie).",
                                        "Colon : Souvent expulsion naturelle (Sauf os pointus / bloqués).",
                                        "Passage ? : Si petit et asymptomatique &rarr; Suivi radioraphique + Aliments fibreux (Asperges, Poireaux ?)."
                                    ]}
                                />
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Imagerie (Le juge de Paix)" icon="📸">
                            <div className="space-y-4">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Radiographie</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li><strong>Signes d'Obstruction :</strong> Dilatation segmentaire (une anse énorme, les autres normales).</li>
                                        <li><strong>Signe du Gravier :</strong> Accumulation de matériel granuleux juste en amont de l'obstruction.</li>
                                        <li><strong>Pneumopéritoine :</strong> Perforation ? (Urgence absolue).</li>
                                    </ul>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Echographie</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li><strong>Cône d'ombre :</strong> Hyperéchogène avec ombre acoustique (Os, Caillou, Plastique dur).</li>
                                        <li><strong>Accordéon (Plication) :</strong> Corps étranger linéaire (Ficelle, Tissu).</li>
                                        <li><strong>Péristaltisme :</strong> Hyperactif en amont, nul au niveau de l'obstruction.</li>
                                    </ul>
                                </div>
                            </div>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses chirurgicales calculées.</AlertBox>
                            )}

                            <Section title="1. Stabilisation Pré-Opératoire" icon="💧">
                                <p className="text-sm text-slate-700 mb-2">
                                    Ne pas précipiter l'anesthésie si l'animal est en choc ou déshydraté (sauf hémorragie active).
                                    La réanimation liquidienne réduit la mortalité péri-opératoire.
                                </p>
                                <DosageCard
                                    title="Fluidothérapie"
                                    value="Ringer"
                                    unit="IV"
                                    subtitle="Corriger déshydratation et électrolytes (K+) AVANT induction."
                                    color="blue"
                                />
                            </Section>

                            <Section title="2. Médicaments Péri-Op" icon="💉">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DosageCard
                                        title="Céfazoline (Antibioprophylaxie)"
                                        value={cefazolineDose}
                                        unit="mg"
                                        subtitle="IV. 30 min avant incision, puis q90min pendant chirurgie."
                                        color="green"
                                    />
                                    <DosageCard
                                        title="Méthadone (Analgésie)"
                                        value={methaDose}
                                        unit="mg"
                                        subtitle="IV. Pré-médication. Indispensable."
                                        color="red"
                                    />
                                </div>
                            </Section>

                            <Section title="3. Post-Operatoire" icon="🩺">
                                <AlertBox type="warning" title="Surveillance Complications">
                                    <ul className="list-disc pl-4 mt-1">
                                        <li><strong>Déhiscence (Fuite) :</strong> Pic hyperthermie, douleur, abattement 3-5j post-op. &rarr; Echo + Cytologie liquide libre.</li>
                                        <li><strong>Iléus :</strong> Vomissements persistants. &rarr; Métoclopramide (si pas d'obstruction distale).</li>
                                    </ul>
                                </AlertBox>
                                <div className="mt-4">
                                    <h4 className="font-bold text-slate-800">Reprise Alimentaire</h4>
                                    <p className="text-sm text-slate-700">
                                        Dès le réveil (Petites quantités, Humide).
                                        <br />
                                        Le jeûne post-opératoire augmentait le risque de déhiscence dans les études.
                                    </p>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "ACVS Foreign Bodies", type: "external" },
                                    { label: "WSAVA Surgery Guidelines", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

