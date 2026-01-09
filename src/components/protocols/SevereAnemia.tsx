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
    ShieldAlert,
    Syringe,
    Droplets,
    HeartPulse,
    Microscope,
    Pill
} from "lucide-react";

export const SevereAnemia = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. IMMUNOSUPPRESSION
    // Prednisolone : 2 mg/kg/j (Chien < 25kg / Chat). 
    // Chien > 25 kg : 40 mg/m2 (Souvent approx 1-1.5 mg/kg).
    // On simplifie pour l'urgence : 2 mg/kg.
    const predDose = w > 0 ? (w * 2).toFixed(1) : "--";

    // Dexaméthasone (IV) : 0.2 - 0.3 mg/kg
    const dexaDose = w > 0 ? (w * 0.25).toFixed(2) : "--";

    // Cyclosporine (Atopica) : 5 mg/kg BID (Chien) / 7 mg/kg (Chat)
    const cycloDose = w > 0 ? (w * (isCat ? 7 : 5)).toFixed(0) : "--";

    // 2. THROMBOPROPHYLAXIE (Chien IMHA)
    // Clopidogrel : 2-3 mg/kg PO SID (Après dose charge 10 mg/kg ?)
    // Efficace vs Aspirine.
    const clopiDose = w > 0 ? (w * 2).toFixed(1) : "--";

    // 3. TRANSFUSION (Culot - pRBC)
    // Volume (ml) = Poids x 1.5 x (PCV Cible - PCV Actuel) ?
    // Formule simplifiée urgence : 10-15 ml/kg remontent PCV de ~10%.
    const transfusionVol = w > 0 ? (w * 10).toFixed(0) : "--";

    return (
        <ProtocolLayout title="Anémie Aiguë Sévère (IMHA)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Suspicion IMHA (Hémolyse)" icon="🛡️">
                                <AlertBox type="critical" title="Critères Diagnostiques (ACVIM)">
                                    Il faut au moins 2 signes d'hémolyse immune :
                                    <ul className="list-disc pl-4 mt-2">
                                        <li><strong>Sphérocytes</strong> (Frottis, surtout chien).</li>
                                        <li><strong>Auto-Agglutination</strong> (Test lame saline).</li>
                                        <li><strong>Test de Coombs</strong> positif (Direct).</li>
                                        <li><strong>Hémolyse</strong> (Plasma/Urine orange/rouge).</li>
                                    </ul>
                                </AlertBox>
                                {isDog && (
                                    <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100">
                                        <h4 className="font-bold text-red-900 flex items-center gap-2">
                                            <HeartPulse size={20} /> Risque Thrombo-Embolique (PTE)
                                        </h4>
                                        <p className="text-sm text-red-800 mt-1">
                                            La formation de caillots (Poumons, rate) est la 1ère cause de mortalité précoce chez le chien IMHA.
                                            <br />
                                            <strong>Anticoagulants OBLIGATOIRES</strong> dès le diagnostic.
                                        </p>
                                    </div>
                                )}
                            </Section>

                            <Section title="Quand Transfuser ?" icon="💧">
                                <CheckList
                                    items={[
                                        "Pas de chiffre magique (PCV < 15% ? 12% ?).",
                                        "Signes cliniques prévalent : Tachycardie, Tachypnée, Faiblesse, Lactates élevés.",
                                        "Ne pas attendre l'effondrement.",
                                        "Attention : Le sang transfusé sera aussi détruit (Courte durée de vie)."
                                    ]}
                                />
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <>
                            <Section title="Bilan Initial" icon="🔬">
                                <div className="space-y-4 text-sm text-slate-700">
                                    <div className="bg-white p-3 border rounded">
                                        <strong>1. Frottis Sanguin :</strong> Recherche de Sphérocytes (Petits GR denses sans halo central). Pathognomonique si nombreux.
                                    </div>
                                    <div className="bg-white p-3 border rounded">
                                        <strong>2. Test d'Agglutination sur Lame (SAT) :</strong>
                                        <br />
                                        1 goutte sang + 4 gouttes Saline. Regarder à l'oeil nu et microscope. (Différencier des rouleaux).
                                    </div>
                                    <div className="bg-white p-3 border rounded">
                                        <strong>3. Recherche Cause Primaire (Babesia, Toxique, Tumeur) :</strong>
                                        <br />
                                        PCR Maladies Vectorielles + Echo Abdo + Rx Thorax.
                                        <br />
                                        Si Babésiose confirmée -&gt; Imizol (Pas de corticoïdes immunosuppresseurs si possible).
                                    </div>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Saisir Poids">
                                    Doses immunosuppressives calculées.
                                </AlertBox>
                            )}

                            <Section title="1. Immunosuppression (Le Pilier)" icon="💊">
                                <div className="space-y-6">
                                    {/* CORTICOIDES */}
                                    <div>
                                        <h4 className="font-bold text-blue-600 mb-2">Corticoïdes (1ère ligne)</h4>
                                        <DosageCard
                                            title="Prednisolone"
                                            value={predDose}
                                            unit="mg"
                                            subtitle="PO Sem 1-2. Immunosuppression standard. Attention aux effets secondaires."
                                            color="blue"
                                        />
                                        <div className="mt-2">
                                            <DosageCard
                                                title="Dexaméthasone (IV)"
                                                value={dexaDose}
                                                unit="mg"
                                                subtitle="Si voie orale impossible. Eq Prednisolone x7-10."
                                                color="blue"
                                            />
                                        </div>
                                    </div>

                                    {/* SECONDE LIGNE */}
                                    <div>
                                        <h4 className="font-bold text-purple-600 mb-2">Seconde Ligne (Si sévère / réfractaire)</h4>
                                        <DosageCard
                                            title="Cyclosporine (Atopica)"
                                            value={cycloDose}
                                            unit="mg"
                                            subtitle={isCat ? "BID. Chat : Dose plus élevée requise." : "BID. Chien."}
                                            color="purple"
                                        />
                                        <p className="text-xs text-slate-500 mt-1">Autres options : Mycophénolate, Azathioprine (Chien).</p>
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Support & Prévention" icon="🛡️">
                                {isDog ? (
                                    <div>
                                        <h4 className="font-bold text-red-600 mb-2">Thromboprophylaxie (Chien)</h4>
                                        <DosageCard
                                            title="Clopidogrel (Plavix)"
                                            value={clopiDose}
                                            unit="mg"
                                            subtitle="PO SID. Antiplaquettaire de choix."
                                            color="red"
                                        />
                                        <p className="text-xs text-slate-500 mt-1">Si indispo : Aspirine (moins efficace) ou HBPM (Fragmine).</p>
                                    </div>
                                ) : (
                                    <AlertBox type="info" title="Chat">
                                        Thromboprophylaxie moins systématique sauf si dilatation atriale ou facteurs risques.
                                    </AlertBox>
                                )}

                                <div className="mt-4">
                                    <h4 className="font-bold text-red-600 mb-2 flex items-center gap-2">
                                        <Droplets size={20} /> Transfusion (Culot GR)
                                    </h4>
                                    <DosageCard
                                        title="Volume estimé"
                                        value={transfusionVol}
                                        unit="ml"
                                        subtitle="Pour remonter PCV de ~10%. A lisser sur 4h."
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
                                    { label: "ACVIM Consensus IMHA (2019)", type: "external" },
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

