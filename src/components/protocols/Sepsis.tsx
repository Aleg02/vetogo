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
    Biohazard,
    Syringe,
    Droplets,
    Activity,
    HeartPulse,
    Thermometer,
    TestTube
} from "lucide-react";

export const Sepsis = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. ANTIBIOTIQUES (Broad Spectrum IV)
    // Ampicilline : 20-30 mg/kg IV q8h
    const ampiMin = w > 0 ? (w * 20).toFixed(0) : "--";
    const ampiMax = w > 0 ? (w * 30).toFixed(0) : "--";
    // Enrofloxacine (Baytril) : 5-10 mg/kg IV q24h (Chat: attention cécité >5mg/kg, plutôt 5mg/kg)
    const enroDose = w > 0 ? (w * 5).toFixed(0) : "--"; // target 5 mg/kg safe
    // Metronidazole : 10-15 mg/kg IV lente q12h
    const metroDose = w > 0 ? (w * 10).toFixed(0) : "--";

    // 2. FLUIDES DE RESUSCITATION
    // Bolus 10-20 ml/kg (Chien) / 5-10 ml/kg (Chat)
    const fluidBolusMin = w > 0 ? (w * (isDog ? 10 : 5)).toFixed(0) : "--";
    const fluidBolusMax = w > 0 ? (w * (isDog ? 20 : 10)).toFixed(0) : "--";

    // 3. VASOPRESSEURS (Noradrenaline)
    // 0.1 - 2 mcg/kg/min.
    // Dilution : 4 mg dans 250ml (= 16 mcg/ml) ou seringue électrique.
    // Calcul débit pour 0.1 mcg/kg/min :
    // (0.1 * Poids * 60) / concentration
    // Affiche juste la dose cible.

    return (
        <ProtocolLayout title="Sepsis & Choc Septique">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="La Golden Hour (Survivng Sepsis)" icon="⏳">
                                <AlertBox type="critical" title="Bundle de 1 heure">
                                    A réaliser DÈS la suspicion (ex: Pyomètre, Péritonite, Pneumonie) :
                                    <ol className="list-decimal pl-4 mt-2">
                                        <li><strong>Lactates :</strong> Mesurer la baseline.</li>
                                        <li><strong>Hémocultures :</strong> Avant antibios (si possible).</li>
                                        <li><strong>Antibiotiques IV :</strong> Large spectre IMMÉDIAT.</li>
                                        <li><strong>Fluides :</strong> Bolus si hypotension/hypoperfusion.</li>
                                    </ol>
                                </AlertBox>
                                <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                                    <h4 className="font-bold text-orange-900 flex items-center gap-2">
                                        <Thermometer size={20} /> Critères SIRS
                                    </h4>
                                    <p className="text-sm text-orange-800 mt-1">
                                        <strong>Chien (2/4) :</strong> T° &lt;37.8 ou &gt;39.4, FC &gt;120, FR &gt;20, Leuco &lt;5k ou &gt;16k.
                                        <br />
                                        <strong>Chat (3/4) :</strong> T° &lt;37.8 ou &gt;39.7, FC &lt;140 ou &gt;225, FR &gt;40, Leuco &lt;5k ou &gt;19k.
                                    </p>
                                </div>
                            </Section>

                            <Section title="Objectifs de Réanimation (6h)" icon="🎯">
                                <CheckList
                                    items={[
                                        "Lactate Clearance : Baisse de > 20% en 2-6h.",
                                        "PAS > 90 mmHg (PAM > 65 mmHg).",
                                        "Reprise diurèse > 1-2 ml/kg/h.",
                                        "Normalisation TRC et Pouls."
                                    ]}
                                />
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <>
                            <Section title="Recherche de Foyer (Source Control)" icon="🔎">
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div className="bg-white p-2 border rounded"><strong>Abdomen :</strong> Echo (Pyomètre, Péritonite, Prostatite).</div>
                                    <div className="bg-white p-2 border rounded"><strong>Thorax :</strong> Radio (Pneumonie, Pyothorax).</div>
                                    <div className="bg-white p-2 border rounded"><strong>Urinaire :</strong> Cystocentèse (PNA).</div>
                                    <div className="bg-white p-2 border rounded"><strong>Peau/Plaies :</strong> Abcès, Morsures.</div>
                                    <div className="bg-white p-2 border rounded"><strong>Coeur :</strong> Endocardite (Souffle ?).</div>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Saisir Poids">
                                    Doses antibiotiques calculées.
                                </AlertBox>
                            )}

                            <Section title="1. Antibiothérapie IV (Empirique)" icon="💊">
                                <div className="space-y-4">
                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                        <h4 className="font-bold text-blue-900 mb-2">Protocole Escalade Standard</h4>
                                        <ul className="text-sm text-blue-800 space-y-1">
                                            <li><strong>Choc Septique :</strong> Ampicilline + Enrofloxacine + Métronidazole.</li>
                                            <li><strong>Abdominal :</strong> Couvrir Gram- (E. Coli) et Anaérobies.</li>
                                            <li><strong>Urinaire :</strong> Enrofloxacine souvent efficace (reins).</li>
                                        </ul>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <DosageCard
                                            title="Ampicilline IV"
                                            value={`${ampiMin} - ${ampiMax}`}
                                            unit="mg"
                                            subtitle="q8h. Bactéricide paroi."
                                            color="blue"
                                        />
                                        <DosageCard
                                            title="Enrofloxacine IV"
                                            value={enroDose}
                                            unit="mg"
                                            subtitle="q24h. Diluer (phlébite). Attention Chat (Aveugle si surdosage)."
                                            color="purple"
                                        />
                                        <DosageCard
                                            title="Métronidazole IV"
                                            value={metroDose}
                                            unit="mg"
                                            subtitle="q12h. Perfusion lente (20 min). Anaérobies."
                                            color="slate"
                                        />
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Support Hémodynamique" icon="💓">
                                <div className="space-y-6">
                                    {/* FLUIDES */}
                                    <div>
                                        <h4 className="font-bold text-blue-600 mb-2 flex items-center gap-2">
                                            <Droplets size={20} /> Remplissage
                                        </h4>
                                        <DosageCard
                                            title="Bolus Cristalloïdes"
                                            value={`${fluidBolusMin} - ${fluidBolusMax}`}
                                            unit="ml"
                                            subtitle="A répéter jusqu'à stabilisation ou signes de surcharge."
                                            color="blue"
                                        />
                                    </div>

                                    {/* VASOPRESSEURS */}
                                    <div>
                                        <h4 className="font-bold text-red-600 mb-2 flex items-center gap-2">
                                            <Activity size={20} /> Noradrénaline (Si échec fluides)
                                        </h4>
                                        <DosageCard
                                            title="Débit CRI"
                                            value="0.1 - 2.0"
                                            unit="mcg/kg/min"
                                            subtitle="Vasopresseur de choix. Augmente PAM sans trop de tachycardie."
                                            color="red"
                                        />
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
                                    { label: "Surviving Sepsis Campaign (Vet)", url: "https://journals.sagepub.com", type: "external" },
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

