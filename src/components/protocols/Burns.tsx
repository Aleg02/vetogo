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
    Flame,
    Droplets,
    ThermometerSnowflake,
    Bandage
} from "lucide-react";

export const Burns = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;

    // --- CALCULS (Parkland Formula) ---
    // Formule : 4 ml/kg/%brûlure (En plus de la maintenance)
    // Calcul pour 10% de surface brûlée (Exemple)
    const parkland10 = w > 0 ? (w * 4 * 10).toFixed(0) : "--";
    const fluidHalf = w > 0 ? (Number(parkland10) / 2).toFixed(0) : "--";

    // Analgésie (Methadone High dose)
    const methadone = w > 0 ? (w * 0.3).toFixed(2) : "--";

    return (
        <ProtocolLayout title="Brûlures (Thermique / Chimique)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Urgence Immédiate" icon="🌡️">
                                <AlertBox type="critical" title="Refroidir (Les 20 premières min)">
                                    Le refroidissement stoppe la progression de la lésion.<br />
                                    <strong>Eau tiède/froide (15-20°C) pendant 20 minutes.</strong><br />
                                    <em>Jamais de glace !</em> (Vasoconstriction = Aggrave la nécrose).
                                </AlertBox>
                                {species === "chat" && (
                                    <AlertBox type="warning" title="Attention Hypothermie">
                                        Le chat refroidit très vite. Refroidir la lésion, mais garder l'animal au chaud.
                                    </AlertBox>
                                )}
                                <div className="mt-4">
                                    <CheckList
                                        items={[
                                            "Brûlure Chimique : Lavage intensif (30 min minimum) à l'eau ou NaCl.",
                                            "Triage : Si > 20% surface corporelle = Pronostic engagé (Choc hypovolémique majeur).",
                                            "Fumées : Vérifier détresse respiratoire (Oedème laryngé/pulmonaire). Oxygène 100%."
                                        ]}
                                    />
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Bilan des Pertes" icon="🧪">
                            <div className="space-y-4">
                                <AlertBox type="critical" title="Protéines & Hémoconcentration">
                                    Fuite plasmatique massive = Hypoprotéinémie + Hématocrite ÉLEVÉ (hémoconcentration).
                                </AlertBox>
                                <CheckList
                                    items={[
                                        "Ionogramme : Hyperkaliémie (lyse cellulaire) puis Hypokaliémie (pertes).",
                                        "Fonction rénale : Risque NTA (Néphropathie Tubulaire Aiguë) par hypovolémie ou myoglobinurie.",
                                        "PCV/TP : À suivre q6-8h."
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

                            <Section title="1. Réanimation Liquidienne (Parkland)" icon="💧">
                                <p className="text-sm text-slate-700 mb-2">
                                    Compense les pertes massives de plasma par la peau brûlée.
                                </p>
                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                                    <h4 className="font-bold text-blue-900 mb-2">Formule de Parkland (Modifiée Vet)</h4>
                                    <p className="text-lg font-semibold text-blue-800">4 ml  x  Poids (kg)  x  %Surface Brûlée</p>
                                    <p className="text-xs text-blue-600 mt-1 mb-3">+ Maintenance journalière (50ml/kg/j).</p>

                                    <div className="bg-white p-3 rounded-lg border border-blue-100">
                                        <strong className="block text-slate-700">Exemple pour 10% de surface :</strong>
                                        <span className="text-2xl font-bold text-blue-600">{parkland10} ml</span> <span className="text-sm text-slate-500">total (H0-H24)</span>
                                        <ul className="list-disc pl-5 mt-2 text-sm text-slate-600">
                                            <li>50% ({fluidHalf} ml) sur les <strong>8 premières heures</strong>.</li>
                                            <li>50% ({fluidHalf} ml) sur les 16 heures suivantes.</li>
                                        </ul>
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Analgésie & Soins Locaux" icon="🩹">
                                <DosageCard
                                    title="Méthadone (High Dose)"
                                    value={methadone}
                                    unit="mg"
                                    subtitle="IV q4h. La douleur est EXTRÊME. Ne pas lésiner."
                                    color="red"
                                />

                                <div className="mt-4 space-y-3">
                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                        <strong className="text-slate-800">Soins Locaux :</strong>
                                        <ul className="list-disc pl-5 text-sm text-slate-700 mt-1">
                                            <li>Tondre largement (Peau saine).</li>
                                            <li>Nettoyer (Bétadine Savon ou Chlorhexidine).</li>
                                            <li><strong>Sulfadiazine Argentique (Flamazine/Silvadene)</strong> : Crème de choix (Antibio large spectre + Hydratant).</li>
                                            <li>Pansement gras (Tulle) + Bandage léger.</li>
                                        </ul>
                                    </div>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "Rule of Nines (Vet)", type: "external" },
                                    { label: "Parkland Formula Calculator", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

