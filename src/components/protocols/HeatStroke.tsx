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
    Thermometer,
    Zap,
    Activity,
    Syringe,
    Droplets,
    Wind,
    Ban,
    HeartPulse
} from "lucide-react";

export const HeatStroke = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. FLUIDOTHÉRAPIE (Choc)
    // Chien: 90 ml/kg -> Bolus 20 ml/kg
    // Chat: 60 ml/kg -> Bolus 10 ml/kg
    const bolusIsoMin = w > 0 ? (w * (isDog ? 10 : 10)).toFixed(0) : "--";
    const bolusIsoMax = w > 0 ? (w * (isDog ? 20 : 15)).toFixed(0) : "--";

    // 2. PLASMA (Fresh Frozen Plasma)
    // 10-20 ml/kg (si coagulopathie / DIC)
    // Souvent conditionné en sac 100-200ml.
    const plasmaMin = w > 0 ? (w * 10).toFixed(0) : "--";
    const plasmaMax = w > 0 ? (w * 20).toFixed(0) : "--";

    // 3. GLUCOSE (Si hypoglycémie associée)
    // G30% ou G50% dilué. Voir protocole Hypoglycémie.

    return (
        <ProtocolLayout title="Coup de Chaleur (Heat Stroke)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="La Règle d'Or" icon="🌡️">
                                <AlertBox type="critical" title="STOP Cooling à 39.5°C (103°F)">
                                    <strong>Ne pas refroidir en dessous !</strong>
                                    <br />
                                    Risque majeur d'hypothermie rebond et de frissons (qui augmentent la chaleur).
                                </AlertBox>
                                <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                                    <h4 className="font-bold text-orange-800 mb-2">Refroidissement Actif</h4>
                                    <ul className="list-disc pl-4 text-sm text-orange-700 space-y-1">
                                        <li>Mouiller à l'eau TIÈDE (20-25°C). Pas d'eau glacée !</li>
                                        <li>Ventilateur (Évaporation +++).</li>
                                        <li>Alcohol sur les coussinets (Vasodilatation).</li>
                                        <li><strong>JAMAIS :</strong> Serviettes mouillées sur le corps (Effet sauna).</li>
                                    </ul>
                                </div>
                            </Section>

                            <Section title="Syndrome de Réponse Inflammatoire (SIRS)" icon="🔥">
                                <div className="text-sm text-slate-600 space-y-2">
                                    <p>
                                        Le coup de chaleur n'est pas juste une hyperthermie. C'est une défaillance multiviscérale (MODS) :
                                    </p>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        <div className="bg-white p-2 border rounded"><strong>Rein :</strong> NTA (Nécrose Tubulaire Aiguë)</div>
                                        <div className="bg-white p-2 border rounded"><strong>Foie :</strong> Ischémie / Cytolyse</div>
                                        <div className="bg-white p-2 border rounded"><strong>Intestin :</strong> Translocation bactérienne</div>
                                        <div className="bg-white p-2 border rounded"><strong>Coeur :</strong> Arythmies ventriculaires</div>
                                        <div className="bg-white p-2 border rounded"><strong>Cerveau :</strong> Œdème cérébral</div>
                                        <div className="bg-white p-2 border rounded"><strong>Sang :</strong> CIVD (Coagulopathie)</div>
                                    </div>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <>
                            <Section title="Bilan d'Urgence" icon="🩸">
                                <AlertBox type="warning" title="Frottis Sanguin Immédiat">
                                    Rechercher des <strong>Echinocytes</strong> (Hematies crénelées) et <strong>NRBC</strong> (Erythroblastes).
                                    <br />
                                    Si présents : Signe de gravité +++.
                                </AlertBox>
                                <CheckList
                                    items={[
                                        "PCV / PT (Hémoconcentration sévère ?)",
                                        "Glucose (Hypoglycémie fréquente)",
                                        "Temps de coagulation (PT/aPTT) => CIVD ?",
                                        "Fonction rénale (Créat/Urée + Densité)",
                                        "Plaquettes (Thrombopénie = Consommation)",
                                        "ECG (Arythmies ventriculaires ?)"
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
                                    Saisissez le poids pour les doses de fluides.
                                </AlertBox>
                            )}

                            <Section title="1. Contre-Indications ABSOLUES" icon="🚫">
                                <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start gap-3">
                                    <Ban className="text-red-600 flex-shrink-0" size={24} />
                                    <div className="text-red-800 text-sm">
                                        <strong>PAS D'ANTIPYRÉTIQUES !</strong>
                                        <br />
                                        L'AINS (Meloxicam, Tolfenamic) est TOXIQUE (Rein/Estomac ischémies).
                                        <br />
                                        Le Paracétamol est INEFFICACE (Hyperthermie non pyrogène).
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Réanimation Volémique" icon="💧">
                                <div className="space-y-6">
                                    {/* Fluides */}
                                    <div>
                                        <h4 className="font-bold text-blue-600 mb-2 flex items-center gap-2">
                                            <Droplets size={20} /> Cristalloïdes Isotoniques (RL)
                                        </h4>
                                        <DosageCard
                                            title="Bolus Refroidi (Temp pièce)"
                                            value={`${bolusIsoMin} - ${bolusIsoMax}`}
                                            unit="ml"
                                            subtitle="IV Rapide. Répéter jusqu'à normalisation PCV/PT et Pression."
                                            color="blue"
                                        />
                                    </div>

                                    {/* Plasma */}
                                    <div>
                                        <h4 className="font-bold text-amber-600 mb-2 flex items-center gap-2">
                                            <Droplets size={20} /> Plasma Frais Congelé (PFC)
                                        </h4>
                                        <DosageCard
                                            title="Transfusion Plasma"
                                            value={`${plasmaMin} - ${plasmaMax}`}
                                            unit="ml"
                                            subtitle="À considérer précocement si TP/TCA augmentés ou pétéchies (CIVD)."
                                            color="red"
                                        />
                                    </div>
                                </div>
                            </Section>

                            <Section title="3. Support Organique" icon="🏥">
                                <CheckList
                                    items={[
                                        "Oxygène Flow-by (Besoins métaboliques énormes).",
                                        "Antibiotiques large spectre (Translocation bactérienne) - ex: Amox-Ac.Clav IV.",
                                        "Gastroprotecteurs (Anti-acides, Pansement) : Risque ulcères stress.",
                                        "Mannitol HSS (Si signes neuros persistants après refroidissement)."
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
                                    { label: "ACVECC Practice Guidelines for Heatstroke", url: "https://veccs.org", type: "external" },
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
