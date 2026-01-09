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
    Search,
    Syringe,
    Pill,
    Utensils,
    AlertOctagon
} from "lucide-react";

export const AcuteJaundice = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. VITAMINE K1 (Si TP/TCA augmentés ou suspicion)
    // 1 - 2.5 mg/kg (SC ou PO). Eviter IV (Anaphylaxie).
    const vitKMin = w > 0 ? (w * 1).toFixed(1) : "--";
    const vitKMax = w > 0 ? (w * 2.5).toFixed(1) : "--";

    // 2. URSODIOL (Acide Ursodésoxycholique)
    // 10 - 15 mg/kg/j
    const ursoDose = w > 0 ? (w * 15).toFixed(0) : "--";

    // 3. ANTIOXYDANTS (SAMe / Silybine)
    // Souvent formulations fixes (Denamarin etc.) selon poids.

    return (
        <ProtocolLayout title="Ictère Aigu (Jaunisse)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Algorithme Diagnostique" icon="🔍">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-red-50 p-3 rounded border border-red-200">
                                        <h4 className="font-bold text-red-800">1. Pré-Hépatique</h4>
                                        <p className="text-xs text-red-700 mt-1">
                                            = Hémolyse.
                                            <br />
                                            <strong>PCV &lt; 20%</strong>
                                            <br />
                                            Urine rouge/marron (Hémoglobinurie).
                                        </p>
                                    </div>
                                    <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                                        <h4 className="font-bold text-yellow-800">2. Hépatique</h4>
                                        <p className="text-xs text-yellow-700 mt-1">
                                            = Maladie Foie.
                                            <br />
                                            ALT/ALKP élevés.
                                            <br />
                                            Lipidose, Hépatite, Toxique, Lymphome.
                                        </p>
                                    </div>
                                    <div className="bg-green-50 p-3 rounded border border-green-200">
                                        <h4 className="font-bold text-green-800">3. Post-Hépatique</h4>
                                        <p className="text-xs text-green-700 mt-1">
                                            = Obstruction Biliaire.
                                            <br />
                                            Echo : Voies biliaires dilatées, Mucocèle, Pancréatite.
                                        </p>
                                    </div>
                                </div>
                            </Section>

                            <Section title="La Triade Féline" icon="🛑">
                                {isCat ? (
                                    <AlertBox type="info" title="Spécifique Chat">
                                        Souvent complexe : <strong>Cholangite + IBD + Pancréatite</strong>.
                                        <br />
                                        Nécessite biopsies pour différencier Cholangite Neutrophilique (Antibiotiques) vs Lymphocytaire (Corticoïdes).
                                    </AlertBox>
                                ) : (
                                    <p className="text-sm text-slate-600">
                                        Chez le chien, causes fréquentes : Hémolyse (Babésiose, IMHA), Hépatite aiguë (Lepto, Toxique), Pancréatite obstructive.
                                    </p>
                                )}
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Bilan Hépatique & Plus" icon="🩸">
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Hématologie (Le premier tri)</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li><strong>Hématocrite (PCV) :</strong> Anémie ? (Hémolyse). Régénérative ?</li>
                                        <li><strong>Plaquettes :</strong> Thrombocytopénie (Evans ? CIVD ?).</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Biopesie / Cytologie</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li><strong>Cytoponction (FNA) :</strong> Foie (Lipidose vs Lymphome). Bile (Culture).</li>
                                        <li><strong>Biopsie :</strong> Indispensable pour cholangites félines ou hépatites chroniques chien.</li>
                                    </ul>
                                </div>
                                <CheckList
                                    items={[
                                        "Temps de Coagulation (PT/aPTT) : Toujours avant prélèvements invasifs.",
                                        "Leptospirose (PCR/Sérologie) : Chien avec ictère + insuffisance rénale."
                                    ]}
                                />
                            </div>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses calculées.</AlertBox>
                            )}

                            <Section title="1. Soutien Hépatique" icon="💊">
                                <div className="space-y-4">
                                    <DosageCard
                                        title="Vitamine K1"
                                        value={`${vitKMin} - ${vitKMax}`}
                                        unit="mg"
                                        subtitle="SC (si vomissements) ou PO. Indispensable avant biopsie/sonde si coagulopathie."
                                        color="red"
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <DosageCard
                                            title="Ursodiol"
                                            value={ursoDose}
                                            unit="mg/j"
                                            subtitle="PO. Cholérétique. Protège hépatocytes des sels biliaires toxiques."
                                            color="green"
                                        />
                                        <DosageCard
                                            title="Silybine / SAMe"
                                            value="Selon Produit"
                                            unit="cachet"
                                            subtitle="Dose selon marque (ex: Zentonil/Denamarin). Antioxydant majeur."
                                            color="green"
                                        />
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Nutrition (Urgence Absolue)" icon="🍽️">
                                <AlertBox type="critical" title={isCat ? "Lipidose Hépatique" : "Support Métabolique"}>
                                    {isCat
                                        ? "Le jeûne tue le chat ictérique (Lipidose). Pose de sonde (Oesophagostomie) précoce obligatoire si anorexie > 24h."
                                        : "Nourrir précocement pour soutenir la régénération hépatique et l'immunité."
                                    }
                                </AlertBox>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "ACVIM Liver Disease Consensus", type: "external" },
                                    { label: "WSAVA Liver Guidelines", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

