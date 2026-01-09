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
    HeartPulse,
    Activity,
    Syringe,
    Wind,
    Stethoscope,
    Cat,
    Dog,
    Pipette
} from "lucide-react";

export const CongestiveHeartFailure = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. FUROSEMIDE (Diurétique)
    // Chien: 2-4 mg/kg IV/IM (Toutes les 1-2h si crise sévère)
    // Chat: 1-2 mg/kg IV/IM (Toutes les 1-2h)
    const furoMin = w > 0 ? (w * (isDog ? 2 : 1)).toFixed(2) : "--";
    const furoMax = w > 0 ? (w * (isDog ? 4 : 2)).toFixed(2) : "--";
    const furoVolMax = w > 0 ? (w * (isDog ? 4 : 2) / 50).toFixed(2) : "--"; // Conc 50mg/ml (Dimazon) 

    // CRI Furosemide (Chien) : 1 mg/kg/h
    const furoCRI = w > 0 ? (w * 1).toFixed(1) : "--"; // mg/h

    // 2. PIMOBENDANE (Vetmedin) - Inodilatateur
    // Chien/Chat : 0.25 - 0.3 mg/kg PO
    // Vetmedin IV (Solution 0.75 mg/ml) : 0.15 mg/kg IV
    const pimoPO = w > 0 ? (w * 0.25).toFixed(2) : "--";
    const pimoIV = w > 0 ? (w * 0.15).toFixed(2) : "--";
    const pimoIVVol = w > 0 ? (w * 0.15 / 0.75).toFixed(2) : "--";

    // 3. SÉDATION (Butorphanol)
    // 0.2 mg/kg
    const butorphanol = w > 0 ? (w * 0.2).toFixed(2) : "--";

    return (
        <ProtocolLayout title="Insuffisance Cardiaque (ICCongestive)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Gestion de Crise (ACVIM C/D)" icon="💔">
                                <AlertBox type="critical" title="Urgence Vitale - FOMP">
                                    Mnémotechnique <strong>FOMP</strong> :
                                    <br />
                                    <strong>F</strong> - Furosémide (Diurétique)
                                    <br />
                                    <strong>O</strong> - Oxygène (Indispensable)
                                    <br />
                                    <strong>M</strong> - Minimiser le Stress (Sédation légère)
                                    <br />
                                    <strong>P</strong> - Pimobendane (Inodilatateur)
                                </AlertBox>
                                {isCat && (
                                    <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                                        <strong className="text-orange-900 flex items-center gap-2">
                                            <Cat size={20} /> Particularité Chat
                                        </strong>
                                        <p className="text-sm text-orange-800 mt-1">
                                            L'épanchement pleural est fréquent (IC Gauche ET/OU Droite).
                                            <br />
                                            Si bruits cardiaques étouffés ou dyspnée paradoxale : <strong>Thoracocentèse immédiate</strong> (avant radio).
                                        </p>
                                    </div>
                                )}
                            </Section>

                            <Section title="Signes d'Appel" icon="🩺">
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div className="bg-slate-50 p-3 border rounded shadow-sm">
                                        <strong>Chien (MVD/DCM)</strong>
                                        <ul className="list-disc pl-4 text-slate-600 mt-1">
                                            <li>Souffle fort (Apex G)</li>
                                            <li>Crépitants (OAP)</li>
                                            <li>Tachycardie sinusale</li>
                                            <li>Toux / Intolérance</li>
                                        </ul>
                                    </div>
                                    <div className="bg-slate-50 p-3 border rounded shadow-sm">
                                        <strong>Chat (CMH/RCM)</strong>
                                        <ul className="list-disc pl-4 text-slate-600 mt-1">
                                            <li>Souffle (parfois absent !)</li>
                                            <li>Galop (B3/B4)</li>
                                            <li>Hypothermie (Thrombo-embolie ?)</li>
                                            <li>Respiration gueule ouverte</li>
                                        </ul>
                                    </div>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <>
                            <Section title="Imagerie & Biologie" icon="📺">
                                <div className="space-y-4">
                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                        <h4 className="font-bold text-blue-800 flex items-center gap-2">
                                            <Activity size={18} /> POCUS Thorax (T-FAST)
                                        </h4>
                                        <p className="text-sm text-blue-700 mt-1">
                                            <strong>Lignes B</strong> (Queues de comètes) &gt; 3 par site = OAP.
                                            <br />
                                            <strong>Epanchement Pleural</strong> (Anecho) = Thoracocentèse.
                                            <br />
                                            <strong>Ratio AG/Ao</strong> (Echo court axe) &gt; 1.6 (Chien) / &gt; 1.5 (Chat).
                                        </p>
                                    </div>

                                    <CheckList
                                        items={[
                                            "Radio Thorax (UNIQUEMENT APRES STABILISATION)",
                                            "ProBNP (Snap test) : Distingue Dyspnée Cardiaque vs Respi",
                                            "Pression Artérielle : Hypotension (Choc Cardio) vs Hypertension ?",
                                            "Ionogramme / Créat (Avant furosémide haute dose si possible)"
                                        ]}
                                    />
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Attention">
                                    Saisissez le poids et l'espèce pour les doses.
                                </AlertBox>
                            )}

                            <Section title="1. Oxygénation & Sédation" icon="🌬️">
                                <CheckList items={["Cage à oxygène ou Flow-by.", "Ne pas contraindre l'animal (Masque stressant)."]} />
                                <div className="mt-4">
                                    <h4 className="font-bold text-purple-600 mb-2 flex items-center gap-2">
                                        <Syringe size={20} /> Butorphanol (Sédation)
                                    </h4>
                                    <DosageCard
                                        title="Butorphanol IM/IV"
                                        value={butorphanol}
                                        unit="mg"
                                        subtitle="0.2 mg/kg. Réduit l'anxiété respiratoire (Air Hunger)."
                                        color="purple"
                                    />
                                </div>
                            </Section>

                            <Section title="2. Furosémide (Diurétique)" icon="💧">
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-bold text-blue-600 mb-2 flex items-center gap-2">
                                            <Syringe size={20} /> Bolus I
                                        </h4>
                                        <DosageCard
                                            title={`Furosémide IV/IM (${isDog ? "Chien" : "Chat"})`}
                                            value={`${furoMin} - ${furoMax}`}
                                            unit="mg"
                                            subtitle={
                                                <span>
                                                    Max Vol (50mg/ml): <strong>{furoVolMax} ml</strong>.
                                                    <br />
                                                    Répéter q1h-q2h jusqu'à FR &lt; 40-50 rpm.
                                                </span>
                                            }
                                            color="blue"
                                        />
                                    </div>

                                    {isDog && (
                                        <div>
                                            <h4 className="font-bold text-blue-800 mb-2">Alternative : CRI (Chien)</h4>
                                            <DosageCard
                                                title="Furosémide CRI"
                                                value={furoCRI}
                                                unit="mg/h"
                                                subtitle="1 mg/kg/h. Plus stable hémodynamiquement que bolus répétés."
                                                color="slate"
                                            />
                                        </div>
                                    )}
                                </div>
                            </Section>

                            <Section title="3. Inotrope + (Pimobendane)" icon="⚡">
                                <div className="mb-4">
                                    <h4 className="font-bold text-red-600 mb-2 flex items-center gap-2">
                                        <HeartPulse size={20} /> Pimobendane
                                    </h4>
                                    <DosageCard
                                        title="Vetmedin PO"
                                        value={pimoPO}
                                        unit="mg"
                                        subtitle="Dose standard: 0.25 mg/kg. PO dés que possible."
                                        color="red"
                                    />
                                    <div className="mt-2 text-xs text-red-700 bg-red-50 p-2 rounded border border-red-100">
                                        <strong>Vetmedin IV (Si dispo) :</strong> {pimoIV} mg ({pimoIVVol} ml).
                                    </div>
                                </div>

                                {isCat && (
                                    <AlertBox type="info" title="Chat & Pimobendane ?">
                                        Utilisation Hors AMM mais consensus actuel pour défaillance cardiaque (CMH décompensée ou DCM féline). <br />
                                        Contre-indiqué si obstruction dynamique sévère (SAM) ? Débattu. En urgence vitale OAP, souvent bénéfique.
                                    </AlertBox>
                                )}
                            </Section>

                            <Section title="4. Drainage Thoracique" icon="💉">
                                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                                    <strong className="text-amber-900">Thoracocentèse</strong>
                                    <p className="text-sm mt-1 text-amber-800">
                                        Indiquée si épanchement pleural significatif (surtout Chat).
                                        <br />
                                        Site : 7ème-9ème espace intercostal, jonction tiers inférieur (liquide).
                                        <br />
                                        Aiguille à ailettes (papillon) ou cathéter.
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
                                    { label: "ACVIM Consensus Guidelines (MMVD)", url: "https://www.acvim.org", type: "external" },
                                    { label: "ACVIM Consensus Guidelines (DCM)", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};
