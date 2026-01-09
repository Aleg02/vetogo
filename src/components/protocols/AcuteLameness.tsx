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
    Bone,
    AlertTriangle,
    Pill,
    Activity
} from "lucide-react";

export const AcuteLameness = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";

    // --- CALCULS ---

    // 1. AINS (Si hydraté et reins OK)
    // Meloxicam Chien : 0.2 mg/kg J1 (Charge) puis 0.1 mg/kg
    // Meloxicam Chat : 0.1 mg/kg PO J1 puis 0.05 mg/kg (Max 3-4j) ou Robenacoxib
    const metacamDogLoad = w > 0 ? (w * 0.2).toFixed(1) : "--";
    const metacamDogMaint = w > 0 ? (w * 0.1).toFixed(1) : "--";
    const onsiorCat = w > 0 ? (w * 2).toFixed(0) : "--"; // ~2mg/kg (Comprimé 6mg pour chat > 2.5kg)

    // 2. OPIOIDES (Douleur sévère / Fracture)
    // Methadone : 0.2 - 0.3 mg/kg
    const methadone = w > 0 ? (w * 0.2).toFixed(2) : "--";
    // Buprenorphine : 0.02 mg/kg
    const buprenorphine = w > 0 ? (w * 0.02).toFixed(3) : "--";

    // 3. GABAPENTINE (Adjuvant)
    // 10 mg/kg
    const gaba = w > 0 ? (w * 10).toFixed(0) : "--";

    return (
        <ProtocolLayout title="Boiterie Aiguë (Triage & Analgésie)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Triage Rapide" icon="⚠️">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                                        <h4 className="font-bold text-red-900 mb-2">URGENCE IMMÉDIATE (RED)</h4>
                                        <ul className="list-disc pl-5 text-sm text-red-800 space-y-1">
                                            <li>Ne pose <strong>JAMAIS</strong> la patte ("Sans appui").</li>
                                            <li>Membre froid / bleu (Thrombo-embolie ?).</li>
                                            <li>Fracture ouverte / Saignement actif.</li>
                                            <li>Douleur extrême (Vocalises, agressivité).</li>
                                        </ul>
                                    </div>
                                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                                        <h4 className="font-bold text-amber-900 mb-2">CONSULTATION (ORANGE)</h4>
                                        <ul className="list-disc pl-5 text-sm text-amber-800 space-y-1">
                                            <li>Pose la patte par intermittence ("Suppression d'appui").</li>
                                            <li>Gonflement localisé.</li>
                                            <li>Traumatisme connu (Chute, Choc).</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <AlertBox type="info" title="Examen Orthopédique simplifié">
                                        1. <strong>Doigts/Coussinets :</strong> Corps étranger ? Griffe incarnée/arrachée ?<br />
                                        2. <strong>Os longs :</strong> Douleur pression (Panostéite jeune, Tumeur vieux) ?<br />
                                        3. <strong>Articulations :</strong> Signe du tiroir (Genou), Signe d'Ortolani (Hanches), Gonflement (Coude/Carpe).<br />
                                        4. <strong>Neuro :</strong> "Root Signature" (Douleur cervicale/lombaire irradiant dans la patte).
                                    </AlertBox>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Examen Orthopédique" icon="📉">
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Membre Antérieur</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700">
                                        <li><strong>Épaule :</strong> Test du Biceps (Extension épaule + Flexion coude). Abduction (Instabilité médiale).</li>
                                        <li><strong>Coude :</strong> Effusion (Latéral olécrâne) ? Campbell test (Rotation).</li>
                                        <li><strong>Carpe :</strong> Hyper-extension (Chute) ?</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Membre Postérieur</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700">
                                        <li><strong>Genou :</strong> Signe du Tiroir (Direct) / Compression Tibiale (Indirect) -&gt; Rupture LCA. Luxation Rotule.</li>
                                        <li><strong>Hanche :</strong> Signe d'Ortolani (Dysplasie jeunes). Extension (Coxarthrose).</li>
                                        <li><strong>Tarse :</strong> Instabilité collatérale ?</li>
                                    </ul>
                                </div>
                                <AlertBox type="warning" title="Neurologie ?">
                                    Toujours vérifier la proprioception ! Une 'boiterie' peut être une parésie radiculaire (Tumeur gaine nerveuse, Hernie discale foraminale).
                                </AlertBox>
                            </div>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses calculées.</AlertBox>
                            )}

                            <Section title="1. Analgésie Premier Choix (AINS)" icon="💊">
                                <AlertBox type="warning" title="Contre-Indications AINS">
                                    Ne PAS donner si : Déshydratation, Choc, Insuffisance rénale/hépatique, Corticoïdes en cours, Vomissements.
                                </AlertBox>

                                {isDog ? (
                                    <div className="mt-4 space-y-4">
                                        <DosageCard
                                            title="Meloxicam (Metacam)"
                                            value={`${metacamDogLoad} mg (J1) puis ${metacamDogMaint}`}
                                            unit="mg"
                                            subtitle="PO. Charge 0.2 mg/kg puis 0.1 mg/kg. Toujours avec repas."
                                            color="blue"
                                        />
                                        <p className="text-xs text-slate-500">Ou Carprofène (4mg/kg), Firocoxib (5mg/kg)...</p>
                                    </div>
                                ) : (
                                    <div className="mt-4 space-y-4">
                                        <DosageCard
                                            title="Robénacoxib (Onsior)"
                                            value={onsiorCat}
                                            unit="mg (approx)"
                                            subtitle="PO. 1-2.4 mg/kg. Comprimés dosés (6mg pour chat > 2.5kg)."
                                            color="blue"
                                        />
                                        <DosageCard
                                            title="Meloxicam (Metacam Chat)"
                                            value="0.1 mg/kg (J1) puis 0.05"
                                            unit="mg/kg"
                                            subtitle="PO. Attention dosage précis seringue."
                                            color="slate"
                                        />
                                    </div>
                                )}
                            </Section>

                            <Section title="2. Analgésie Douleur Sévère (Opioïdes)" icon="📉">
                                <p className="text-sm text-slate-700 mb-2">En hospitalisation ou si AINS contre-indiqués.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DosageCard
                                        title="Méthadone"
                                        value={methadone}
                                        unit="mg"
                                        subtitle="IV/IM q4h. Douleur orthopédique majeure."
                                        color="red"
                                    />
                                    <DosageCard
                                        title="Buprénorphine"
                                        value={buprenorphine}
                                        unit="mg"
                                        subtitle="IV/IM/TM (Chat). Douleur modérée."
                                        color="slate"
                                    />
                                </div>
                            </Section>

                            <Section title="3. Adjuvants" icon="💊">
                                <DosageCard
                                    title="Gabapentine"
                                    value={gaba}
                                    unit="mg"
                                    subtitle="PO q8-12h. Douleur neuropathique ou chronique exacerbée."
                                    color="green"
                                />
                                <div className="mt-4">
                                    <CheckList
                                        items={[
                                            "Repos strict (Cage rest) : Essentiel pour limiter l'inflammation.",
                                            "Glace (Cryothérapie) : 10-15min q6h les 48 premières heures.",
                                            "Pansement Robert-Jones : Immobilisation temporaire (hors fémur/humérus) en attendant chirurgie."
                                        ]}
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
                                    { label: "Lameness Differential Diagnosis", type: "external" },
                                    { label: "Pain Management Guidelines (WSAVA)", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

