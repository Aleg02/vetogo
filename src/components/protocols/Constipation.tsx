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
    Ban,
    Syringe,
    Pill,
    Droplets,
    Scissors
} from "lucide-react";

export const Constipation = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. LAVEMENTS (Enema)
    // Eau tiède : 5 - 10 ml/kg
    const enemaVolMin = w > 0 ? (w * 5).toFixed(0) : "--";
    const enemaVolMax = w > 0 ? (w * 10).toFixed(0) : "--";

    // 2. MÉDICAMENTS PO
    // Lactulose : 0.5 ml/kg BID
    const lactuloseDose = w > 0 ? (w * 0.5).toFixed(1) : "--";

    // Cisapride (Chat) : 2.5 - 5 mg/chat BID (Prep magistrale)
    // Pas de dose poids stricte, souvent par chat.

    // PEG 3350 (MiraLax) : 1/8 à 1/4 tsp BID (Chat)

    return (
        <ProtocolLayout title="Constipation / Mégacôlon">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Sécurité Absolue" icon="🚫">
                                <AlertBox type="critical" title="CHAT : PAS DE PHOSPHATES !">
                                    <strong>Ne JAMAIS utiliser de lavements phosphatés (type Fleet/Microlax Humain).</strong>
                                    <br />
                                    Risque d'hyperphosphatémie / Hypocalcémie mortelle.
                                    <br />
                                    Utiliser uniquement : Eau tiède, NaCl, ou Lactulose.
                                </AlertBox>
                                <div className="mt-4 bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                                    <p className="text-sm text-yellow-800">
                                        <strong>Attention :</strong> Toujours vérifier l'absence d'obstruction mécanique (Corps étranger, Tumeur, Hernie périnéale) avant de forcer le transit.
                                    </p>
                                </div>
                            </Section>

                            <Section title="Approche Graduée" icon="📋">
                                <CheckList
                                    items={[
                                        "1. Réhydratation (IV) : Indispensable pour ramollir les selles.",
                                        "2. Lavements : Eau tiède répétés.",
                                        "3. Médical : Lactulose + Cisapride (si Mégacôlon idiopathique).",
                                        "4. Déobstipation : Sous Anesthésie Générale si échec.",
                                        "5. Chirurgie : Colectomie subtotale (Dernier recours Mégacôlon chat)."
                                    ]}
                                />
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Bilan" icon="🔎">
                            <div className="space-y-4">
                                <AlertBox type="info" title="Radiographie Abdominale">
                                    <strong>Indispensable.</strong>
                                    <br />
                                    Evaluer la charge fécale et surtout le diamètre du côlon.
                                    <br />
                                    <span className="text-xs">Chat : Diamètre Côlon / Longueur L5 &gt; 1.48 = Mégacôlon.</span>
                                </AlertBox>
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Toucher Rectal</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        <li>Masse intra-rectale ? (Polype, Adénocarcinome).</li>
                                        <li>Hernie périnéale ?</li>
                                        <li>Prostate (Chien) ? Une grosse prostate écrase le rectum.</li>
                                        <li>Douleur bassin ? (Fracture ancienne).</li>
                                    </ul>
                                </div>
                                <CheckList
                                    items={[
                                        "Bilan Sanguin : Déshydratation (Créat/Urée) ? Hypokaliémie (Ralentit transit) ?",
                                        "T4 (Chat âgé) : L'hypothyroïdie (rare chat) ou hyperthyroïdie peuvent affecter le transit."
                                    ]}
                                />
                            </div>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses lavement calculées.</AlertBox>
                            )}

                            <Section title="1. Lavements Sécurisés" icon="💉">
                                <DosageCard
                                    title="Eau Tiède / NaCl"
                                    value={`${enemaVolMin} - ${enemaVolMax}`}
                                    unit="ml"
                                    subtitle="Volume par lavement. A répéter doucement. Sonde urinaire ou rectale souple."
                                    color="blue"
                                />
                                <p className="text-xs text-slate-500 mt-2">Peut ajouter du Lactulose (5-10 ml) au mélange.</p>
                            </Section>

                            <Section title="2. Gestion Médicale" icon="💊">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DosageCard
                                        title="Lactulose (Laxatif)"
                                        value={lactuloseDose}
                                        unit="ml"
                                        subtitle="PO BID/TID. Ajuster pour avoir selles molles."
                                        color="green"
                                    />
                                    {isCat && (
                                        <DosageCard
                                            title="Cisapride (Prokinétique)"
                                            value="2.5 - 5"
                                            unit="mg/chat"
                                            subtitle="PO BID. Prep magistrale. Uniquement si pas d'obstruction."
                                            color="green"
                                        />
                                    )}
                                </div>
                                {isCat && (
                                    <div className="mt-4 p-3 bg-white border rounded">
                                        <strong>PEG 3350 (MiraLax/Movicol) :</strong>
                                        <br />
                                        Alternative au lactulose. Start 1/8 à 1/4 cuillère à café BID dans la nourriture.
                                    </div>
                                )}
                            </Section>

                            <Section title="3. Déobstipation (AG)" icon="✂️">
                                <p className="text-sm text-slate-700">
                                    Si fécalome "rocheux".
                                    <br />
                                    Nécessite réhydratation préalable.
                                    <br />
                                    Massage abdo doux + Extraction manuelle / Hydpropulsion.
                                </p>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "ISFM Constipation Guidelines", type: "external" },
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

