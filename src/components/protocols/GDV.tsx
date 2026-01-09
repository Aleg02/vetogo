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
    Timer,
    Scissors,
    RotateCcw,
    Zap
} from "lucide-react";

export const GDV = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. FLUIDES DE CHOC (Double abord veineux)
    // Chien : Bolus 10-20 ml/kg en 15 min.
    // Jusqu'à 90 ml/kg total, mais par fraction.
    const shockBolus = w > 0 ? (w * 20).toFixed(0) : "--";

    // 2. ANALGÉSIE (Opioïdes purs)
    // Methadone : 0.2 - 0.3 mg/kg IV/IM
    const methadoneDose = w > 0 ? (w * 0.2).toFixed(2) : "--";
    // Fentanyl : 2-5 mcg/kg/h (CRI)
    // Morphine (Si pas d'autre choix) : 0.2 - 0.5 mg/kg.

    // 3. LIDOCAÏNE (Arythmies ventriculaires / VPCs)
    // Bolus : 2 mg/kg IV lent
    const lidoBolus = w > 0 ? (w * 2).toFixed(1) : "--"; // mg
    const lidoVol2 = w > 0 ? (w * 2 / 20).toFixed(2) : "--"; // ml (2% = 20mg/ml)
    // CRI : 25-50 mcg/kg/min

    return (
        <ProtocolLayout title="Dilatation-Torsion d'Estomac (GDV)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Urgence Chirurgicale Absolue" icon="⏱️">
                                <AlertBox type="critical" title="Protocole 'Stabilize & Cut'">
                                    <ol className="list-decimal pl-4 mt-2">
                                        <li><strong>Choc :</strong> 2 cathéters gros calibre (Céphaliques).</li>
                                        <li><strong>Fluides :</strong> Choc bolus agressif.</li>
                                        <li><strong>Décompression :</strong> Trocardage ou Sondage.</li>
                                        <li><strong>Chirurgie :</strong> Gastropexie dès que stable.</li>
                                    </ol>
                                </AlertBox>
                                <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <h4 className="font-bold text-blue-900 flex items-center gap-2">
                                        <RotateCcw size={20} /> Décompression Pré-Op
                                    </h4>
                                    <ul className="text-sm text-blue-800 list-disc pl-4 mt-2 space-y-1">
                                        <li><strong>Sondage Oro-gastrique :</strong> Tube lubrifié, longueur nez-dernière côte. Ne pas forcer (risque rupture oesophage).</li>
                                        <li><strong>Trocardage :</strong> Si sondage impossible. Cathéter gros calibre (14-16G) au point de tympanisme maximum (souvent flanc droit).</li>
                                    </ul>
                                </div>
                            </Section>

                            <Section title="Pronostic : Lactates" icon="📉">
                                <CheckList
                                    items={[
                                        "Lactates > 6 mmol/L : Risque de nécrose gastrique accru.",
                                        "Lactates > 9 mmol/L : Pronostic réservé, mais survie possible.",
                                        "Clearance : Une baisse de 50% des lactates après bolus est de bon pronostic."
                                    ]}
                                />
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <>
                            <Section title="Imagerie : Le 'Double Bubble'" icon="⚡">
                                <p className="text-sm text-slate-700">
                                    <strong>Radio Abdominale Latérale DROITE :</strong>
                                    <br />
                                    Image pathognomonique de "Double Bulle" (Estomac distendu compartimenté par le pli de torsion).
                                    <br />
                                    Ne pas perdre de temps avec d'autres vues si l'animal est instable.
                                </p>
                            </Section>
                            <Section title="ECG : Arythmies" icon="📉">
                                <AlertBox type="warning" title="VPCs (40% des cas)">
                                    Les extrasystoles ventriculaires apparaissent souvent 12-24h post-op, mais parfois dès l'admission.
                                    <br />
                                    Traitement si : Tachycardie &gt; 160, R-on-T, ou hypotension associée.
                                </AlertBox>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Saisir Poids">
                                    Doses choc calculées.
                                </AlertBox>
                            )}

                            <Section title="1. Choc Hypovolémique" icon="💧">
                                <div className="space-y-6">
                                    {/* FLUIDES */}
                                    <div>
                                        <h4 className="font-bold text-blue-600 mb-2 flex items-center gap-2">
                                            <Droplets size={20} /> Remplissage Massif
                                        </h4>
                                        <DosageCard
                                            title="Bolus Cristalloïdes"
                                            value={shockBolus}
                                            unit="ml"
                                            subtitle="En 15 min. Répéter jusqu'à stabilisation (TRC < 2s, Pouls fort)."
                                            color="blue"
                                        />
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Analgésie (Pas d'AINS !)" icon="💉">
                                <AlertBox type="critical" title="CONTRE-INDICATION">
                                    AINS (Meloxicam, etc.) interdits (Choc + Estomac compromis = Ulcère/Rein assuré).
                                </AlertBox>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DosageCard
                                        title="Méthadone"
                                        value={methadoneDose}
                                        unit="mg"
                                        subtitle="IV/IM. Opioïde pur. Analgésie puissante sans trop d'hypotension."
                                        color="purple"
                                    />
                                </div>
                            </Section>

                            <Section title="3. Anti-Arythmiques" icon="📉">
                                <div>
                                    <h4 className="font-bold text-red-600 mb-2 flex items-center gap-2">
                                        <Activity size={20} /> Lidocaïne (Si VPCs sévères)
                                    </h4>
                                    <DosageCard
                                        title="Lidocaïne 2% IV (Bolus)"
                                        value={lidoBolus}
                                        unit="mg"
                                        subtitle={
                                            <span>
                                                Vol (20mg/ml) : <strong>{lidoVol2} ml</strong>.
                                                <br />
                                                Lent (1 min). Puis CRI 25-50 mcg/kg/min.
                                            </span>
                                        }
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
                                    { label: "ACVS - Gastric Dilatation-Volvulus", type: "external" },
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

