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
    Thermometer,
    Wind,
    HeartPulse
} from "lucide-react";

export const NeonatalResuscitation = () => {
    // Poids souvent très faible (g). On va supposer input en KG dans l'app (ex: 0.2 kg).
    // Si l'utilisateur met 0kg, on affiche "--".
    const { weightKg } = useAppStore();

    const w = weightKg || 0;

    // --- CALCULS (RECOVER Guidelines) ---

    // 1. ADRENALINE (Epinephrine)
    // 0.01 - 0.03 mg/kg IV/IO (Pas 0.1 mg/kg !)
    // Si voie Intratrachéale : 0.05 - 0.1 mg/kg.
    // Dilution souvent requise.
    const adrenalineLow = w > 0 ? (w * 0.01).toFixed(4) : "--";
    const adrenalineHigh = w > 0 ? (w * 0.03).toFixed(4) : "--";

    // 2. GLUCOSE
    // 0.25 - 0.5 g/kg IV/IO
    // Soit 0.5 - 1 ml/kg de G50% dilué 1:4 (pour faire du 10-12.5%).
    // Ou G10% direct : 2.5 - 5 ml/kg.
    // Simplifions : Glucose 12.5% (diluer G50% au 1/4).
    const glucoseVol = w > 0 ? (w * 2).toFixed(1) : "--"; // 2 ml/kg de G12.5% = 0.25g/kg

    // 3. ANTAGONISTES (Si Césarienne / Opioïdes Mère)
    // Naloxone : 0.04 mg/kg IV/IM/SC/Lingual
    const naloxone = w > 0 ? (w * 0.04).toFixed(3) : "--";

    return (
        <ProtocolLayout title="Réanimation Néonatale">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Algorithme ABC" icon="📉">
                                <AlertBox type="critical" title="Pas de ''Swinging'' !">
                                    Ne pas secouer le chiot (risque hémorragie cérébrale).
                                    <br />Mouche-bébé poire ou aspiration douce uniquement.
                                </AlertBox>
                                <div className="mt-4">
                                    <CheckList
                                        items={[
                                            "WARMTH (Chaleur) : Sécher vigoureusement (Serviette chaude).",
                                            "AIRWAY : Dégager voies respi (Poire).",
                                            "BREATHING : Stimuler (Frotter thorax/lombes). Si apnée > 30s -> Oxygène + Ventilation.",
                                            "CIRCULATION : Si FC < 60 bpm -> Massage Cardiaque."
                                        ]}
                                    />
                                </div>
                                <div className="mt-4 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                    <strong className="text-yellow-800">Note Doxapram :</strong> Non recommandé en 1ère intention (augmente consommation O2 cérébrale). Oxygéner d'abord.
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Bilan de Viabilité (Apgar)" icon="👶">
                            <div className="space-y-4">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Score APGAR Modifié</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li><strong>FC :</strong> &gt; 200 (2 pts), &lt; 180 (1 pt), &lt; 160 (0 pt).</li>
                                        <li><strong>Respiration :</strong> Cris/Régulière (2 pts), Irrégulière (1 pt), Apnée (0 pt).</li>
                                        <li><strong>Tonus :</strong> Mouvements actifs (2 pts), Faible (1 pt), Flasque (0 pt).</li>
                                        <li><strong>Muqueuses :</strong> Roses (2 pts), Pâles/Bleues (0 pt).</li>
                                    </ul>
                                    <p className="text-xs text-slate-500 mt-2 italic">
                                        Score &lt; 7 : Soins intensifs requis.
                                    </p>
                                </div>
                                <CheckList
                                    items={[
                                        "Palatoschisis (Fente palatine) : Vérifier toit de la bouche (Aspiration lait).",
                                        "Atrésie Anale : Vérifier présence de l'anus.",
                                        "Nombril : Saignement ? Hernie ?"
                                    ]}
                                />
                            </div>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w) && (
                                <AlertBox type="warning" title="Saisir Poids (kg)">Ex: 0.2 pour 200g.</AlertBox>
                            )}

                            <Section title="1. Support Vital (Si échec stimulation)" icon="🌬️">
                                <div className="space-y-4">
                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                                        <h4 className="font-bold text-blue-900 mb-1">Bradycardie Sévère (&lt; 60 bpm)</h4>
                                        <p className="text-sm text-blue-800 mb-2">
                                            Malgré ventilation efficace &gt; 30 sec.
                                        </p>
                                        <DosageCard
                                            title="Adrénaline (Épinéphrine)"
                                            value={`${adrenalineLow} - ${adrenalineHigh}`}
                                            unit="mg"
                                            subtitle="IV / IO (Veine ombilicale). Si Intratrachéal : doubler/tripler la dose."
                                            color="red"
                                        />
                                    </div>
                                    <DosageCard
                                        title="Naloxone (Antidote Opioïdes)"
                                        value={naloxone}
                                        unit="mg"
                                        subtitle="Si mère a reçu morphine/méthadone. 1 goutte sous la langue ou IV/IM."
                                        color="slate"
                                    />
                                </div>
                            </Section>

                            <Section title="2. Support Métabolique" icon="🌡️">
                                <CheckList items={["Chauffer (T° cible 37°C mais progressive).", "Vérifier Glycémie si faible."]} />
                                <div className="mt-2">
                                    <DosageCard
                                        title="Glucose (Si hypoglycémie)"
                                        value={glucoseVol}
                                        unit="ml (G12.5%)"
                                        subtitle="Astuce : G50% dilué 1:4 avec NaCl. IV ou Intra-Osseux. Ou 1 goutte de G50% sur muqueuse si conscient."
                                        color="blue"
                                    />
                                </div>
                            </Section>

                            <Section title="3. Massage Cardiaque" icon="💓">
                                <ul className="list-disc pl-5 text-sm text-slate-700">
                                    <li><strong>Ratio :</strong> 120 compressions/min.</li>
                                    <li><strong>Technique :</strong> Pince (pouce/index) derrière les coudes.</li>
                                    <li><strong>Ventilation :</strong> 1 insufflation pour 3-4 compressions (si intubé) ou masque.</li>
                                </ul>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "RECOVER Guidelines (Neonatal)", url: "https://recoverinitiative.org/", type: "external" },
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

