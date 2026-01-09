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
    Eye,
    Activity,
    UserCheck, // Nursing
    AlertTriangle
} from "lucide-react";

export const FluidMonitoring = () => {
    return (
        <ProtocolLayout hasExamens={false} title="Surveillance Patient Perfusé">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="La Règle des 4 P" icon="👤">
                                <p className="text-sm text-slate-700 mb-4">
                                    À chaque ronde (toutes les 4h minimum), vérifier :
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                                        <h4 className="font-bold text-blue-900 mb-1">1. Pompe</h4>
                                        <p className="text-sm text-blue-800">
                                            Le débit est-il correct ? Volume restant cohérent ? Alarme ?
                                        </p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                                        <h4 className="font-bold text-green-900 mb-1">2. Patim (Patte)</h4>
                                        <p className="text-sm text-green-800">
                                            Le bandage est-il sec ? Gonflé ? (Signe de passage sous-cutané). Patte froide ? (Trop serré).
                                        </p>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                                        <h4 className="font-bold text-purple-900 mb-1">3. Perméabilité</h4>
                                        <p className="text-sm text-purple-800">
                                            Le cathéter est-il en place ? Pas de pliure tubulure ?
                                        </p>
                                    </div>
                                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                                        <h4 className="font-bold text-orange-900 mb-1">4. Patient</h4>
                                        <p className="text-sm text-orange-800">
                                            État général, Poids, Auscultation (Surcharge ?).
                                        </p>
                                    </div>
                                </div>
                            </Section>

                            <Section title="Signes de Surcharge Volémique" icon="⚠️">
                                <AlertBox type="critical" title="DANGER (Arrêter Perfusion)">
                                    <ul className="list-disc pl-5">
                                        <li><strong>Respiratoire :</strong> Tachypnée, Toux, Jetage nasal séreux (eau), Crépitants à l'auscultation.</li>
                                        <li><strong>Conjonctives :</strong> Chemosis (Oedème de la conjonctive).</li>
                                        <li><strong>Poids :</strong> Gain de poids &gt; 10% rapide.</li>
                                    </ul>
                                </AlertBox>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET CHECKLIST --- */}
                    {tab === "traitements" && (
                        <>
                            <Section title="Grille de Surveillance (q4h)" icon="📉">
                                <CheckList
                                    items={[
                                        "Poids : Pesée q12h-24h (Gold standard hydratation).",
                                        "Cathéter : Flush au NaCl q4h si pas de débit continu. Refaire pansement si souillé.",
                                        "Urines : Production urinaire (1-2 ml/kg/h). Si < 1 ml/kg/h malgré fluides -> Alerte Rein.",
                                        "Mentation : Amélioration espérée en 12-24h."
                                    ]}
                                />
                            </Section>

                            <Section title="Entretien Cathéter" icon="💧">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <p className="text-sm font-semibold text-slate-900">Durée de vie :</p>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 mt-1">
                                        <li>Max 72h (3 jours) idéalement.</li>
                                        <li>Changer IMMÉDIATEMENT si : Douleur, Chaleur, Rougeur (Phlébite), Écoulement.</li>
                                        <li>Astuce : Noter la DATE de pose sur le pansement.</li>
                                    </ul>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "IV Catheter Care Guidelines", type: "external" },
                                    { label: "Fluid Overload Signs", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

