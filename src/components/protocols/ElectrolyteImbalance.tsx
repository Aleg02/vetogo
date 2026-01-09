"use client";

import React, { useState } from "react";
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
    Calculator,
    Droplets,
    Zap,
    TestTube,
    AlertTriangle
} from "lucide-react";

export const ElectrolyteImbalance = () => {
    const { weightKg, species } = useAppStore();
    const [currentNa, setCurrentNa] = useState<number>(160);
    const [desiredNa, setDesiredNa] = useState<number>(145);

    const w = weightKg || 0;

    // --- CALCULS POTASSIUM (K+) ---
    // KMax Safety Check
    const kMaxRate = w > 0 ? (w * 0.5).toFixed(2) : "--"; // 0.5 mEq/kg/h

    // --- CALCULS SODIUM (Na+) ---
    // Formule Déficit Eau Libre (Free Water Deficit)
    // FW Deficit (L) = 0.6 * Poids * ((Na_Actuel / Na_Cible) - 1)
    const fwDeficit = w > 0 && currentNa > desiredNa
        ? (0.6 * w * ((currentNa / desiredNa) - 1)).toFixed(2)
        : "--";

    const fwDeficitMl = w > 0 && currentNa > desiredNa
        ? (parseFloat(fwDeficit) * 1000).toFixed(0)
        : "--";

    // Temps min pour correction (0.5 mEq/L/h)
    const naDiff = Math.abs(currentNa - desiredNa);
    const minHours = (naDiff / 0.5).toFixed(0);

    return (
        <ProtocolLayout title="Déséquilibres Électrolytiques (K+, Na+)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="La Règle d'Or" icon="⚡">
                                <AlertBox type="critical" title="Ne jamais corriger trop vite !">
                                    Le cerveau s'adapte à l'osmolarité. Une correction brutale cause des lésions irréversibles.
                                    <br />
                                    <strong> sodium : Max 0.5 à 1 mEq/L/heure.</strong>
                                </AlertBox>
                            </Section>

                            <Section title="Hypokaliémie (K+ < 3.5)" icon="📉">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm text-left text-slate-700">
                                        <thead className="bg-slate-100 text-slate-900 font-bold uppercase">
                                            <tr>
                                                <th className="p-3">K+ Sérique (mmol/L)</th>
                                                <th className="p-3">Ajout KCl (mEq) pour 1L (1000ml)</th>
                                                <th className="p-3">Débit Max Fluides (ml/kg/h)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            <tr className="bg-green-50">
                                                <td className="p-3">3.5 - 5.0 (Normal)</td>
                                                <td className="p-3 font-bold">20 mEq</td>
                                                <td className="p-3">25 ml/kg/h</td>
                                            </tr>
                                            <tr className="bg-yellow-50">
                                                <td className="p-3">3.0 - 3.4 (Léger)</td>
                                                <td className="p-3 font-bold">30 mEq</td>
                                                <td className="p-3">17 ml/kg/h</td>
                                            </tr>
                                            <tr className="bg-orange-50">
                                                <td className="p-3">2.5 - 2.9 (Modéré)</td>
                                                <td className="p-3 font-bold">40 mEq</td>
                                                <td className="p-3">12 ml/kg/h</td>
                                            </tr>
                                            <tr className="bg-red-50">
                                                <td className="p-3">2.0 - 2.4 (Sévère)</td>
                                                <td className="p-3 font-bold">60 mEq</td>
                                                <td className="p-3">8 ml/kg/h</td>
                                            </tr>
                                            <tr className="bg-purple-100 text-purple-900">
                                                <td className="p-3">&lt; 2.0 (Critique)</td>
                                                <td className="p-3 font-bold">80 mEq</td>
                                                <td className="p-3">6 ml/kg/h</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p className="text-xs text-slate-500 mt-2 italic">
                                        *Basé sur KCl injectable (2 mEq/ml). BIEN MÉLANGER LA POCHE.
                                        <br />Débit Max calculé pour ne pas dépasser 0.5 mEq/kg/h (KMax).
                                    </p>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Comprendre le Déséquilibre" icon="🧠">
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Hypernatrémie (&gt;160-170)</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li><strong>Cause :</strong> Perte d'eau pure (Diabète insipide, Halètement) ou Gain de sel (Sel de mer, Pâte à modeler).</li>
                                        <li><strong>USG (Densité) :</strong> Si basse (&lt;1.008) + HyperNa = Diabète Insipide probable.</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Troubles du Potassium</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li><strong>HypoK :</strong> Anorexie, Vomissements, CKD (Chat), Acidocétose.</li>
                                        <li><strong>HyperK :</strong> Obstruction urinaire, Addison, IRA, Artefact (Hémolyse Akita/Shiba).</li>
                                    </ul>
                                </div>
                                <AlertBox type="info" title="ECG">
                                    Indispensable pour toutes dyskaliémies sévères.
                                </AlertBox>
                            </div>
                        </Section>
                    )}

                    {/* --- ONGLET CALCULS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w) && (
                                <AlertBox type="warning" title="Saisir Poids">Calculs impossibles.</AlertBox>
                            )}

                            <Section title="Hypernatrémie : Eau Libre" icon="🧮">
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase">Na+ Actuel</label>
                                        <input
                                            type="number"
                                            value={currentNa}
                                            onChange={(e) => setCurrentNa(parseFloat(e.target.value))}
                                            className="w-full p-2 border border-slate-300 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase">Na+ Cible</label>
                                        <input
                                            type="number"
                                            value={desiredNa}
                                            onChange={(e) => setDesiredNa(parseFloat(e.target.value))}
                                            className="w-full p-2 border border-slate-300 rounded-lg"
                                        />
                                    </div>
                                </div>

                                <DosageCard
                                    title="Déficit en Eau Libre"
                                    value={`${fwDeficitMl}`}
                                    unit="ml (Eau pure/G5%)"
                                    subtitle={`Quantité d'eau sans soluté à administrer pour ramener la natrémie de ${currentNa} à ${desiredNa}.`}
                                    color="blue"
                                />

                                <AlertBox type="info" title="Vitesse de Correction">
                                    Pour éviter l'oedème cérébral, corriger sur minimum :
                                    <br />
                                    <strong className="text-lg">{minHours} heures</strong> (soit max 0.5 mEq/h).
                                </AlertBox>
                            </Section>

                            <Section title="Sécurité Potassium" icon="⚠️">
                                <DosageCard
                                    title="KMax (0.5 mEq/kg/h)"
                                    value={`${kMaxRate}`}
                                    unit="mEq/h"
                                    subtitle="Vitesse MAXIMALE de perfusion de K+. Si besoin +, monitoring ECG continu obligatoire."
                                    color="red"
                                />
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "Hyponatremia Correction Guidelines", type: "external" },
                                    { label: "Potassium Supplementation Chart", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

