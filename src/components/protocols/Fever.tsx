"use client";

import React from "react";
import { ProtocolLayout } from "@/components/ProtocolLayout";
import { useAppStore } from "@/store/useAppStore";
import {
    Section,
    DosageCard,
    AlertBox,
    CheckList,
    LinkList,
    ProtocolContainer
} from "@/components/ui/ProtocolUI";
import {
    Thermometer,
    Search,
    Pill,
    Bug
} from "lucide-react";

export const Fever = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isCat = species === "chat";

    // --- CALCULS ---

    // 1. AINS (Antipyrétique - SI PAS DE CONTRE-INDICATION)
    // Meloxicam : 0.2 mg/kg (Chien) / 0.1 mg/kg (Chat - Prudence)
    const meloxi = w > 0 ? (w * (isCat ? 0.05 : 0.2)).toFixed(1) : "--";

    return (
        <ProtocolLayout title="Fièvre d'Origine Indéterminée (FOI)">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Définition" icon="🌡️">
                                <AlertBox type="warning" title="Hyperthermie vs Fièvre">
                                    <strong>Fièvre (Pyrexie) :</strong> Augmentation du "set-point" hypothalamique (Réponse inflammatoire).
                                    <br />
                                    <strong>Hyperthermie :</strong> Incapacité à dissiper la chaleur (Coup de chaleur, Stress).
                                    <br />
                                    <em>Ne pas refroidir activement une fièvre (frissons &rarr; augmente T°). Traiter la cause.</em>
                                </AlertBox>
                            </Section>

                            <Section title="Les 4 Grands Coupables" icon="🔍">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                                        <strong className="text-rose-600 block mb-1">1. Infectieux (50%)</strong>
                                        <p className="text-sm text-slate-600">Bactéries (Pyélo, Prostatite, Endocardite, Discospondylite...), Virus, Protozoaires (Piro, Leish...), Fongique.</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                                        <strong className="text-blue-600 block mb-1">2. Immunitaire (20-30%)</strong>
                                        <p className="text-sm text-slate-600">IMHA, IMPA (Polyarthrite), Lupus, Vascularites.</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                                        <strong className="text-purple-600 block mb-1">3. Néoplasique (10-20%)</strong>
                                        <p className="text-sm text-slate-600">Lymphome +++, Leucémies, Tumeurs nécrotiques.</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                                        <strong className="text-slate-600 block mb-1">4. Divers</strong>
                                        <p className="text-sm text-slate-600">Médicaments (Tétracyclines, Sulfamides), Pancreatite, Douleur intense.</p>
                                    </div>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET DIAGNOSTIC --- */}
                    {tab === "examens" && (
                        <Section title="Bilan par Étapes" icon="🔍">
                            <CheckList
                                items={[
                                    "Stade 1 (Base) : NFS, Biochimie, Analyse Urines (+ Culot !), Test FIV/FeLV (Chat), Snap 4Dx (Chien).",
                                    "Stade 2 (Imagerie) : Radio Thorax (3 vues), Echo Abdo complète.",
                                    "Stade 3 (Ponctions) : Ganglions, Rate/Foie (Cytologie), Liquide Articulaire (si douleurs).",
                                    "Stade 4 (Avancé) : Hémocultures (x3), PCR Vectorielles, Sérologies (Lepto, Aspergillus...), Scanner."
                                ]}
                            />
                            <AlertBox type="info" title="Le point aveugle fréquente">
                                La <strong>Prostatite</strong> (Chien mâle intact) et la <strong>Discospondylite</strong> sont souvent ratées. Toucher rectal et Palpation rachidienne !
                            </AlertBox>
                        </Section>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w) && (
                                <AlertBox type="warning" title="Saisir Poids">Doses calculées.</AlertBox>
                            )}

                            <Section title="Approche Thérapeutique" icon="💊">
                                <AlertBox type="critical" title="Antibios à l'aveugle ?">
                                    ÉVITER tant que les prélèvements (Hémoc, Urines) ne sont pas faits.
                                    <br />
                                    Masque le diagnostic et crée des résistances.
                                    <br />
                                    Si état critique &rarr; Doxycycline ou Amox-Clav + Enrofloxacine APRES prélèvements.
                                </AlertBox>

                                <div className="mt-4">
                                    <DosageCard
                                        title="Traitement d'épreuve (Si tout négatif)"
                                        value="Doxycycline"
                                        unit="mg"
                                        subtitle="Souvent efficace sur maladies vectorielles cachées (Ehrlichia, Anaplasma, Mycoplasmes)."
                                        color="green"
                                    />
                                    <DosageCard
                                        title="Meloxicam (Si &gt; 40.5°C)"
                                        value={meloxi}
                                        unit="mg"
                                        subtitle="SC/PO. Pour confort, uniquement si hydraté et reins OK. Attention masquage symptômes."
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
                                    { label: "ACVIM Consensus: Fever of Unknown Origin", type: "external" },
                                    { label: "Vector Borne Diseases Diagnostic Tree", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

