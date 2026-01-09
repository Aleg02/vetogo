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
    Syringe,
    Thermometer,
    Stethoscope,
    HeartPulse,
    Truck,
    ScanLine
} from "lucide-react";

export const Polytrauma = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. FLUIDOTHÉRAPIE DE CHOC (Isotonique - Ringer Lactate)
    // Chien: 90 ml/kg (Total) -> Bolus 1/4 = 20-30 ml/kg
    // Chat: 50-60 ml/kg (Total) -> Bolus 1/4 = 10-15 ml/kg
    const bolusIsoMin = w > 0 ? (w * (isDog ? 20 : 10)).toFixed(0) : "--";
    const bolusIsoMax = w > 0 ? (w * (isDog ? 30 : 15)).toFixed(0) : "--";

    // 2. SALÉ HYPERTONIQUE 7.5% (Choc hémorragique / TCC)
    // Dose : 3-5 ml/kg IV en 15 min
    const hypertonicVolMin = w > 0 ? (w * 3).toFixed(1) : "--";
    const hypertonicVolMax = w > 0 ? (w * 5).toFixed(1) : "--";

    // 3. OPIOIDES (Methadone / Fentanyl) - Voir Protocole Douleur
    // Methadone classique
    const methadoneDose = w > 0 ? (w * 0.2).toFixed(2) : "--";

    return (
        <ProtocolLayout title="Polytraumatisé (A-CRASH-PLAN)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Triage Primaire (A-B-C)" icon="🚨">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                                        <strong className="text-red-800 block mb-1">A - Airway</strong>
                                        <p className="text-sm text-red-700">Voies dégagées ? Intubation nécessaire ? Oxygène immédiat.</p>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                        <strong className="text-blue-800 block mb-1">B - Breathing</strong>
                                        <p className="text-sm text-blue-700">Dyspnée ? Pneumothorax ? Auscultation + POCUS.</p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                        <strong className="text-green-800 block mb-1">C - Circulation</strong>
                                        <p className="text-sm text-green-700">Choc ? Paleur ? TRC ? Pouls ? Hémorragie externe ?</p>
                                    </div>
                                </div>
                            </Section>

                            <Section title="Mnémotechnique A CRASH PLAN" icon="📝">
                                <CheckList
                                    items={[
                                        "A - Airway (Voies Aériennes)",
                                        "C - Cardio (Choc, Hémorragie)",
                                        "R - Respi (Pneumothx, Hernie)",
                                        "A - Abdomen (Hémoabdomen, Rupture Vessie)",
                                        "S - Spine (Rachis - Immobiliser !)",
                                        "H - Head (Conscience, Pupilles - TCC)",
                                        "P - Pelvis (Fractures bassin)",
                                        "L - Limbs (Fractures membres)",
                                        "A - Arteries (Pouls, Pression)",
                                        "N - Nerves (Examen neuro complet stable)"
                                    ]}
                                />
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <>
                            <Section title="Imagerie d'Urgence (POCUS)" icon="📺">
                                <div className="space-y-4">
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <h4 className="font-bold text-slate-700 flex items-center gap-2">
                                            <ScanLine size={18} /> A-FAST (Abdomen)
                                        </h4>
                                        <p className="text-sm text-slate-600 mt-1">
                                            Recherche liquide libre (anécho) dans 4 quadrants :
                                            <br /> 1. Diaphragmatique-Hépatique (DH)
                                            <br /> 2. Spléno-Rénal (SR)
                                            <br /> 3. Cysto-Colique (CC)
                                            <br /> 4. Hépato-Rénal (HR)
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <h4 className="font-bold text-slate-700 flex items-center gap-2">
                                            <ScanLine size={18} /> T-FAST (Thorax)
                                        </h4>
                                        <p className="text-sm text-slate-600 mt-1">
                                            Sites CTS (Chest Tube Site) : Pneumothorax ?
                                            <br />
                                            Sites PCS (Pericardial Site) : Tamponnade ?
                                        </p>
                                    </div>
                                    <AlertBox type="warning" title="Radio Corps Entier ?">
                                        <strong>NON !</strong> Pas avant stabilisation. Le stress et le positionnement peuvent tuer un patient instable (Fracture vertébrale, Dyspnée).
                                    </AlertBox>
                                </div>
                            </Section>

                            <Section title="Biologie Minimale" icon="🩸">
                                <CheckList
                                    items={[
                                        "PCV / PT (Hémorragie active ?)",
                                        "Lactates (Perfusion tissulaire)",
                                        "Glycémie (Choc, Sepsis)",
                                        "Ionogramme / Créat (Rupture urinaire ?)"
                                    ]}
                                />
                                <p className="text-xs text-slate-500 mt-2">Attention : Si hémorragie aiguë, PCV peut être normal initialement (contraction splénique).</p>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Attention">
                                    Saisissez le poids pour les doses de réanimation.
                                </AlertBox>
                            )}

                            <Section title="1. Choc Hypovolémique" icon="💧">
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-bold text-blue-600 mb-2 flex items-center gap-2">
                                            <Syringe size={20} /> Bolus Cristalloïdes IV
                                        </h4>
                                        <DosageCard
                                            title="Ringer Lactate / NaCl 0.9%"
                                            value={`${bolusIsoMin} - ${bolusIsoMax}`}
                                            unit="ml"
                                            subtitle={
                                                <span>
                                                    <strong>IV Rapide.</strong> (1/4 dose choc).
                                                    <br />
                                                    Réévaluer après chaque bolus (FC, TRC, Pression, Mentation). Max 3-4 bolus.
                                                </span>
                                            }
                                            color="blue"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-indigo-600 mb-2 flex items-center gap-2">
                                            <Activity size={20} /> Salé Hypertonique 7.5%
                                        </h4>
                                        <DosageCard
                                            title="Petit Volume (TCC / Hémorragie)"
                                            value={`${hypertonicVolMin} - ${hypertonicVolMax}`}
                                            unit="ml"
                                            subtitle="IV sur 15 min. Très efficace pour restaurer volémie sans œdème cérébral."
                                            color="purple"
                                        />
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Analgésie (Essentielle)" icon="💊">
                                <AlertBox type="info" title="L'analgésie fait partie de la réanimation">
                                    La douleur aggrave le choc (tachycardie, vasoconstriction).
                                    <br />
                                    Ne pas utiliser d'AINS (Meloxicam) si instable (Rein/Estomac).
                                    <br />
                                    Privilégier les Opioïdes purs.
                                </AlertBox>
                                <DosageCard
                                    title="Méthadone"
                                    value={methadoneDose}
                                    unit="mg"
                                    subtitle="0.2 mg/kg IV/IM. Titrer selon effet."
                                    color="red"
                                />
                                <div className="mt-2 text-center">
                                    <span className="text-sm text-blue-600 underline cursor-pointer">Voir Protocole Douleur Aiguë</span>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "ACVECC Veterinary Committee on Trauma", url: "https://veccs.org", type: "external" },
                                    { label: "AFAST/TFAST Consensus", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};
