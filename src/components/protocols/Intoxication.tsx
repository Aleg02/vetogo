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
    Skull,
    Droplets,
    Clock,
    Dog,
    Cat
} from "lucide-react";

export const Intoxication = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. EMETISANTS
    // Chien: Apomorphine 0.02-0.04 mg/kg IV/SC
    const apoMin = w > 0 ? (w * 0.02).toFixed(2) : "--";
    const apoMax = w > 0 ? (w * 0.04).toFixed(2) : "--";
    // Apomorphine souvent 10 mg/ml ou solution (variable)
    // On affiche juste la dose mg pour sécurité.

    // Chat: Xylazine 0.44 mg/kg IM
    const xylazineDose = w > 0 ? (w * 0.44).toFixed(2) : "--";
    const xylazineVol = w > 0 ? (w * 0.44 / 20).toFixed(2) : "--"; // Conc 2% (20 mg/ml)

    // Dexmedetomidine (Chat) : 7 mcg/kg IM (0.007 mg/kg)
    const dexmedDose = w > 0 ? (w * 7).toFixed(0) : "--"; // On affiche mcg
    const dexmedVol = w > 0 ? (w * 7 / 500).toFixed(2) : "--"; // Conc 0.5 mg/ml = 500 mcg/ml

    // 2. CHARBON ACTIF
    // 1-2 g/kg
    const charbonMin = w > 0 ? (w * 1).toFixed(0) : "--";
    const charbonMax = w > 0 ? (w * 2).toFixed(0) : "--";

    // 3. EMULSION LIPIDIQUE (ILE 20%)
    // Bolus 1.5 ml/kg
    const lipidBolus = w > 0 ? (w * 1.5).toFixed(1) : "--";
    // CRI 0.25 ml/kg/min sur 30-60 min
    const lipidCRI = w > 0 ? (w * 0.25 * 60).toFixed(0) : "--"; // ml/h

    return (
        <ProtocolLayout title="Intoxication Suspectée">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="La Règle d'Or" icon="⏳">
                                <AlertBox type="critical" title="Agir Vite mais Sûrement">
                                    <strong>Anamnèse Ciblée :</strong> QUOI ? QUAND ? COMBIEN ?
                                    <br />
                                    Le temps est le facteur clé. Faire vomir est utile &lt; 2-4h max (sauf exception).
                                </AlertBox>
                                <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                                    <h4 className="font-bold text-orange-800 mb-2">Contre-indications Volontaires</h4>
                                    <ul className="list-disc pl-4 text-sm text-orange-700 space-y-1">
                                        <li>Animal comateux / Convulsions (Risque Fausse Route).</li>
                                        <li>Ingestion Caustiques / Corrosifs (Brûlure retour).</li>
                                        <li>Ingestion Hydrocarbures / Moussants (Pneumonie aspiration).</li>
                                        <li>Larynx paralysé / Races brachycéphales extrêmes (Prudence).</li>
                                    </ul>
                                </div>
                            </Section>

                            <Section title="Toxiques Fréquents" icon="☠️">
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div className="bg-white p-3 border rounded shadow-sm">
                                        <strong>🍫 Chocolat</strong>
                                        <p className="text-slate-500">Théobromine. Tachycardie, Tremblements.</p>
                                    </div>
                                    <div className="bg-white p-3 border rounded shadow-sm">
                                        <strong>🍇 Raisin</strong>
                                        <p className="text-slate-500">Insuffisance Rénale Aiguë (Chien).</p>
                                    </div>
                                    <div className="bg-white p-3 border rounded shadow-sm">
                                        <strong>💊 Paracétamol</strong>
                                        <p className="text-slate-500">Chat &gt;&gt; Chien. Méthémoglobinémie (Sang chocolat).</p>
                                    </div>
                                    <div className="bg-white p-3 border rounded shadow-sm">
                                        <strong>🐀 Anticoagulants</strong>
                                        <p className="text-slate-500">Hémorragies retardées (J3-J5).</p>
                                    </div>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <>
                            <Section title="Bilan Toxico" icon="🩸">
                                <CheckList
                                    items={[
                                        "Hématocrite / PT (Anémie hémolytique ?)",
                                        "Frottis sanguin (Corps de Heinz - Oignon/Paracétamol)",
                                        "Biochimie rénale (Raisin, Lys, AINS)",
                                        "Biochimie hépatique (Xylitol, Cycas, Champignons)",
                                        "Temps de coagulation (Raticides) - PT/aPTT",
                                        "ECG (Tachycardie, Arythmies)"
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
                                    Saisissez le poids et l'espèce pour les doses d'émétiques.
                                </AlertBox>
                            )}

                            <Section title="1. Décontamination Digestive" icon="🤮">
                                <div className="space-y-6">
                                    {/* Apomorphine (Chien) */}
                                    {(!isCat || !isSpeciesSelected) && (
                                        <div>
                                            <h4 className="font-bold text-green-600 mb-2 flex items-center gap-2">
                                                <Dog size={20} /> Apomorphine (Chien)
                                            </h4>
                                            <DosageCard
                                                title="Apomorphine SC / IV"
                                                value={`${apoMin} - ${apoMax}`}
                                                unit="mg"
                                                subtitle="SC ou IV. Efficace en 2-4 min. Peu d'effets secondaires."
                                                color="blue"
                                            />
                                        </div>
                                    )}

                                    {/* Xylazine / Dexmed (Chat) */}
                                    {(!isDog || !isSpeciesSelected) && (
                                        <div>
                                            <h4 className="font-bold text-slate-600 mb-2 flex items-center gap-2">
                                                <Cat size={20} /> Xylazine / Dexmed (Chat)
                                            </h4>
                                            <DosageCard
                                                title="Xylazine IM"
                                                value={xylazineDose}
                                                unit="mg"
                                                subtitle={<span>Vol (2%): <strong>{xylazineVol} ml</strong>. Réversible par Yohimbine.</span>}
                                                color="slate"
                                            />
                                            <div className="mt-2 text-xs text-slate-500 bg-slate-50 p-2 rounded">
                                                Alt: Dexmedetomidine {dexmedDose} mcg ({dexmedVol} ml).
                                            </div>
                                        </div>
                                    )}

                                    {/* Charbon */}
                                    <div>
                                        <h4 className="font-bold text-black mb-2 flex items-center gap-2">
                                            Charbon Actif
                                        </h4>
                                        <DosageCard
                                            title="Dose PO / Sonde"
                                            value={`${charbonMin} - ${charbonMax}`}
                                            unit="g"
                                            subtitle="Mélanger à de la pâtée. Attention fausse route si conscience altérée."
                                            color="slate"
                                        />
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Antidotes & Supports" icon="🛡️">
                                {/* ILE */}
                                <div className="mb-6">
                                    <h4 className="font-bold text-indigo-600 mb-2 flex items-center gap-2">
                                        <Droplets size={20} /> Émulsion Lipidique (ILE 20%)
                                    </h4>
                                    <DosageCard
                                        title="Bolus Intralipid 20%"
                                        value={lipidBolus}
                                        unit="ml"
                                        subtitle="IV lent (1-2 min). Si toxique liposoluble (Ivermectine, Pyrethrinoïdes, Cannabis)."
                                        color="purple"
                                    />
                                    <div className="mt-2 text-xs text-indigo-700">
                                        Puis CRI : {lipidCRI} ml/h (pendant 30-60 min).
                                    </div>
                                </div>

                                <CriticalList
                                    items={[
                                        "Paracétamol (Chat) => N-acétylcystéine (Mucomyst) bolus + CRI",
                                        "Opiacés => Naloxone",
                                        "Benzodiazépines => Flumazénil",
                                        "Raticides => Vitamine K1 (Jours à Semaines)",
                                        "Ethylene Glycol => Ethanol / 4-MP"
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
                                    { label: "ASPCA Poison Control Center", url: "https://www.aspca.org/pet-care/animal-poison-control", type: "external" },
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
