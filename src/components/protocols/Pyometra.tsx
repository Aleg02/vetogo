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
    Pill,
    Scissors
} from "lucide-react";

export const Pyometra = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";

    // --- CALCULS ---

    // 1. CHIRURGIE (Antibioprophylaxie)
    // Cefazoline (22 mg/kg IV à l'induction, puis q90min)
    const cefazoline = w > 0 ? (w * 22).toFixed(0) : "--";

    // 2. MÉDICAL (Aglepristone - Alizin)
    // Chien : 10 mg/kg SC (J1, J2, J8). (Soit 0.33 ml/kg d'Alizin 30mg/ml)
    // Chat : 10-15 mg/kg SC. (Souvent 10 mg/kg aussi).
    const alizinVol = w > 0 ? (w * 0.33).toFixed(2) : "--";

    // 3. PROSTAGLANDINES (Cloprostenol - Estrumate) - PRUDENCE
    // Chien : 1 µg/kg SC (Microgrammes !). A partir de J3, q24h.
    // Chat : Très risqué, doses faibles (e.g. 0.1 mg/kg dinoprost PO ou doses minimes cloprostenol). Préférer Aglepristone seule.
    const cloprostenol = w > 0 && isDog ? (w * 1).toFixed(1) : "Non recommandé (Chat)";

    // 4. ANTIBIOTIQUES (Empirique)
    // Amox-Clav (12.5-20 mg/kg BID)
    // Enrofloxacine (5-10 mg/kg q24h)
    const amox = w > 0 ? (w * 15).toFixed(0) : "--";
    const enro = w > 0 ? (w * 5).toFixed(1) : "--";

    return (
        <ProtocolLayout title="Pyomètre">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Approche Décisionnelle" icon="✂️">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <AlertBox type="critical" title="Chirurgie (Standard)">
                                        Traitement de choix pour 90% des cas.
                                        <br />
                                        Indispensable si pyomètre "fermé" ou état de choc (Sepsis).
                                        <br />
                                        <strong>Urgence :</strong> Stabiliser (Fluides + Antibios) &rarr; Bloc.
                                    </AlertBox>
                                    <AlertBox type="info" title="Médical (Exception)">
                                        Uniquement si :
                                        <ul className="list-disc pl-4 text-sm mt-1">
                                            <li>Animal Reproducteur de grande valeur.</li>
                                            <li>État général conservé (Pas de sepsis).</li>
                                            <li>Col ouvert (écoulements) préférablement.</li>
                                            <li>Propriétaire prévenu des risques (Récidive, Echec, Rupture).</li>
                                        </ul>
                                    </AlertBox>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Confirmation Rapide" icon="📸">
                            <div className="space-y-4">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Echographie (Gold Standard)</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li>Utérus distendu par du liquide (Anéchogène/Hypoéchogène).</li>
                                        <li>Paroi épaissie.</li>
                                        <li>Taille &gt; Intestin grêle.</li>
                                    </ul>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Radiographie</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li>Masse tubulaire en abdomen caudal (Entre vessie et colon).</li>
                                        <li>Effacement des séreuses (péritonite ?).</li>
                                    </ul>
                                </div>
                                <CheckList
                                    items={[
                                        "Biologie : Leucocytose Neutrophilique massive (Réaction leucémoïde).",
                                        "Rein : Azotémie fréquente (Glomérulonéphrite ou Déshydratation).",
                                        "Urines : Densité basse (E. Coli interfère avec ADH) -> PU/PD."
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

                            <Section title="1. Stabilisation Pré-Op" icon="📉">
                                <DosageCard
                                    title="Perfusion (NaCl 0.9% ou RL)"
                                    value="Choc"
                                    unit="ml/kg"
                                    subtitle="Corriger l'hypovolémie et la déshydratation avant l'anesthésie."
                                    color="blue"
                                />
                                <DosageCard
                                    title="Antibioprophylaxie (Céfazoline)"
                                    value={cefazoline}
                                    unit="mg"
                                    subtitle="IV à l'induction. Répéter toutes les 90 min pendant la chirurgie."
                                    color="purple"
                                />
                            </Section>

                            <Section title="2. Protocole Médical (Si Chirurgie refusée)" icon="💉">
                                <AlertBox type="warning" title="Risque de Rupture Utérine">
                                    Surveillance échographique indispensable.
                                </AlertBox>
                                <div className="space-y-4 mt-2">
                                    <DosageCard
                                        title="Aglepristone (Alizin)"
                                        value={alizinVol}
                                        unit="ml"
                                        subtitle="SC (J1, J2, J8) + J15 si besoin. Antiprogestérone (Ouvre le col)."
                                        color="green"
                                    />
                                    {isDog && (
                                        <DosageCard
                                            title="Cloprostenol (Estrumate)"
                                            value={cloprostenol}
                                            unit="µg (Microgrammes)"
                                            subtitle="SC q24h (J3 à J7). Vidange utérine. Attention effets secondaires (Vomissements, halètement)."
                                            color="red"
                                        />
                                    )}
                                </div>
                            </Section>

                            <Section title="3. Antibiothérapie Continue" icon="💊">
                                <p className="text-sm text-gray-600 mb-2">En attendant antibiogramme (E. Coli fréquent).</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DosageCard
                                        title="Amox-Clavuranate"
                                        value={amox}
                                        unit="mg"
                                        subtitle="PO ou SC/IV BID. 1ère intention."
                                        color="slate"
                                    />
                                    <DosageCard
                                        title="Enrofloxacine"
                                        value={enro}
                                        unit="mg"
                                        subtitle="PO ou SC q24h. Si suspicion Gram- ou Sepsis."
                                        color="slate"
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
                                    { label: "Med vs Surg Management of Pyometra", type: "external" },
                                    { label: "Alizin Dosing Guidelines", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

