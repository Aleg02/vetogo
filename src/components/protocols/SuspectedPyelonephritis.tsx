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
    Syringe,
    Pill,
    Thermometer,
    Microscope,
    AlertOctagon
} from "lucide-react";

export const SuspectedPyelonephritis = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. FLUOROQUINOLONES (1er choix empirique ISCAID pour Pyélo)
    // Enrofloxacine (Baytril)
    // Chien : 10 - 20 mg/kg PO q24h
    // Chat : 5 mg/kg PO q24h (Max 5mg/kg risque rétinien)
    const enroMin = w > 0 ? (w * (isDog ? 10 : 5)).toFixed(0) : "--";
    const enroMax = w > 0 ? (w * (isDog ? 20 : 5)).toFixed(0) : "--";

    // Marbofloxacine (Marbocyl)
    // 2.7 - 5.5 mg/kg PO q24h
    const marboMin = w > 0 ? (w * 2.7).toFixed(1) : "--";
    const marboMax = w > 0 ? (w * 5.5).toFixed(1) : "--";

    // Pradofloxacine (Veraflox) - Chat/Chien
    // Chien : 3 - 5 mg/kg
    // Chat : 5 - 7.5 mg/kg
    const pradoMin = w > 0 ? (w * (isDog ? 3 : 5)).toFixed(1) : "--";

    return (
        <ProtocolLayout title="Pyélonéphrite Suspectée">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Signes d'Appel" icon="🌡️">
                                <AlertBox type="critical" title="Urgence Médicale">
                                    Suspicion si : Fièvre, Abattement, Douleur rénale, Leucocytose + Signes urinaires.
                                    <br />
                                    <em>Différent de la cystite simple (animal en forme).</em>
                                </AlertBox>
                                <div className="mt-4">
                                    <CheckList
                                        items={[
                                            "Echographie : Dilatation pyélique ? Rein hyperéchogène ?",
                                            "Culture (Cystocentèse) : OBLIGATOIRE avant antibiotiques.",
                                            "Hémoculture : Si fièvre élevée / sepsis.",
                                            "Bilan sanguin : Créat/Urée (IRA associée ?)."
                                        ]}
                                    />
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Bilan Rénal & Infectieux" icon="📉">
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Imagerie (Echographie)</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li><strong>Pyélectasie :</strong> Dilatation du bassinet (&gt; 4-7 mm sans diurèse).</li>
                                        <li><strong>Parenchyme :</strong> Hyperéchogène ? Perte définition cortico-médullaire ?</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Biologie</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li><strong>Hémogramme :</strong> Leucocytose neutrophilique (Left shift).</li>
                                        <li><strong>Biochimie :</strong> Azotémie ? (IRA associée).</li>
                                        <li><strong>Culture :</strong> OBLIGATOIRE (Cystocentèse ou pyélocentèse si possible).</li>
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

                            <Section title="1. Choix Antibiotique (Empirique)" icon="💊">
                                <div className="space-y-4">
                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                        <h4 className="font-bold text-blue-800 mb-2">Pourquoi les Fluoroquinolones ?</h4>
                                        <p className="text-sm text-blue-700">
                                            ISCAID recommande les FQ car elles pénètrent bien le tissu rénal (contrairement à l'Amox/Clav ou Nitrofurantoine qui se concentrent surtout dans l'urine).
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <DosageCard
                                            title="Enrofloxacine (Baytril)"
                                            value={`${enroMin} - ${enroMax}`}
                                            unit="mg"
                                            subtitle="PO q24h. Attention Chat max 5mg/kg (Cécité)."
                                            color="blue"
                                        />
                                        <DosageCard
                                            title="Marbofloxacine (Marbocyl)"
                                            value={`${marboMin} - ${marboMax}`}
                                            unit="mg"
                                            subtitle="PO q24h. Bonne tolérance rénale."
                                            color="blue"
                                        />
                                    </div>
                                    <DosageCard
                                        title="Pradofloxacine (Veraflox)"
                                        value={pradoMin}
                                        unit="mg"
                                        subtitle="PO q24h. Nouvelle génération."
                                        color="blue"
                                    />
                                </div>
                            </Section>

                            <Section title="2. Durée & Suivi" icon="🦠">
                                <AlertBox type="info" title="Durée : 10 à 14 jours">
                                    Contrairement aux anciennes habitudes (4-6 sem), 2 semaines suffisent souvent.
                                    <br />
                                    <strong>Culture de contrôle</strong> recommandée 1 semaine après arrêt.
                                </AlertBox>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "ISCAID UTI Guidelines 2019", url: "https://iscaid.org/guidelines", type: "external" },
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

