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
    Stethoscope,
    Syringe,
    Pill,
    Droplets,
    Wind
} from "lucide-react";

export const Pneumonia = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;

    // --- CALCULS ---

    // 1. ANTIBIOTIQUES (Empirique Sévère)

    // Ampicilline/Amoxicilline IV : 20-30 mg/kg q8h
    const amoxiIV = w > 0 ? (w * 20).toFixed(0) : "--";

    // Enrofloxacine : 10-15 mg/kg q24h PO/IV (Attention Chat : max 5mg/kg)
    const enroDog = w > 0 ? (w * 10).toFixed(1) : "--";
    const enroCat = w > 0 ? (w * 5).toFixed(1) : "--";

    // Doxycycline (Mild/Bordetella) : 5 mg/kg BID ou 10 mg/kg SID
    const doxy = w > 0 ? (w * 10).toFixed(0) : "--";

    // 2. NEBULISATION (Gentamicine 6-8mg/kg dans 4-10ml Saline) ???
    // Généralement Saline seule pour humidifier. Gentamicine réservée culture.

    return (
        <ProtocolLayout title="Pneumonie (Aspiration / Infectieuse)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Approche Clinique" icon="🩺">
                                <AlertBox type="info" title="Aspiration vs Infectieuse">
                                    <strong>Aspiration :</strong> Antécédent vomissement, mégaoesophage, anesthésie. Souvent polymicrobien + acidité.
                                    <br />
                                    <strong>Infectieuse :</strong> Contagion, jeune, toux. (Bordetella, Influenza, Mycoplasmes).
                                </AlertBox>
                                <div className="mt-4">
                                    <CheckList
                                        items={[
                                            "Oxygénothérapie : Si SaO2 < 94% ou détresse.",
                                            "Hydratation : Fluidifier les sécrétions (IV + Nébulisation).",
                                            "Coupage : Percussions thoraciques douces après nébulisation (sauf traumatisme/coagulopathie).",
                                            "Promouvoir la toux (Pas d'antitussifs ! Sauf si épuisement extrême)."
                                        ]}
                                    />
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Confirmation & Suivi" icon="📉">
                            <div className="space-y-4">
                                <AlertBox type="critical" title="Lavage Broncho-Alvéolaire (LBA)">
                                    Le Gold Standard pour l'antibiogramme.
                                    <br />
                                    Souvent difficile sur animal hypoxique (risque anesthésique).
                                    <br />
                                    Alternative : Lavage Transtrachéal (Chien vigile).
                                </AlertBox>
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Radiographie</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li><strong>Patron Alvéolaire :</strong> Bronchogrammes aériques (Signe classique).</li>
                                        <li><strong>Distribution :</strong> Cranioventrale (Aspiration) vs Diffuse (Virale/Hématogène).</li>
                                    </ul>
                                </div>
                            </div>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses calculées.</AlertBox>
                            )}

                            <Section title="1. Antibiothérapie" icon="💊">
                                <p className="text-sm text-slate-700 mb-2">Choisir selon sévérité. LBA idéal avant antibios.</p>

                                <div className="space-y-4">
                                    <div className="border border-blue-100 rounded-xl p-4 bg-blue-50/50">
                                        <h4 className="font-bold text-blue-900 mb-2">Cas Léger / Ambulatoire</h4>
                                        <DosageCard
                                            title="Doxycycline (Tétracycline)"
                                            value={doxy}
                                            unit="mg"
                                            subtitle="PO q24h. Cible Mycoplasmes & Bordetella."
                                            color="blue"
                                        />
                                        <p className="text-xs text-blue-700 mt-2">Ou Amoxicilline-Acide Clavulanique.</p>
                                    </div>

                                    <div className="border border-red-100 rounded-xl p-4 bg-red-50/50">
                                        <h4 className="font-bold text-red-900 mb-2">Cas Sévère / Hospitalisé (Association)</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <DosageCard
                                                title="Ampicilline / Amox"
                                                value={amoxiIV}
                                                unit="mg"
                                                subtitle="IV q8h. Spectre Gram+ & Anaérobies."
                                                color="red"
                                            />
                                            <DosageCard
                                                title="Enrofloxacine"
                                                value={species === "chat" ? enroCat : enroDog}
                                                unit="mg"
                                                subtitle={species === "chat" ? "PO/IV q24h. MAX 5mg/kg (Rétine)." : "PO/IV q24h. Gram- (E. Coli, Klebsiella)."}
                                                color="red"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Soins de Support" icon="🌬️">
                                <CheckList
                                    items={[
                                        "Nébulisation : Saline stérile (NaCl 0.9%) q4-6h pendant 10-15 min.",
                                        "Coupage : Tapotements thoraciques PENDANT ou après nébulisation.",
                                        "Marche : Faire marcher l'animal stimule la toux et l'expectoration.",
                                        "Hydratation IV : Cruciale pour mucocilliaire."
                                    ]}
                                />
                                <div className="mt-4">
                                    <AlertBox type="warning" title="Contre-indications">
                                        Pas de diurétiques (assèchent les sécrétions). Pas d'antitussifs (il faut évacuer le pus).
                                    </AlertBox>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "ISCAID Respiratory Guidelines", type: "external" },
                                    { label: "Management of Aspiration Pneumonia", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

