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
    Brain,
    Pill
} from "lucide-react";

export const Vestibular = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;

    // --- CALCULS ---

    // 1. MAROPITANT (Cerenia)
    // 1 mg/kg SC/IV ou 2 mg/kg PO
    const cereniaInj = w > 0 ? (w * 1).toFixed(1) : "--";
    const cereniaPO = w > 0 ? (w * 2).toFixed(1) : "--"; // 2mg/kg PO (plus souvent 8mg/kg mal des transports, mais 2mg/kg suffisant vomissements)

    // 2. ONDANSETRON (Zophren)
    // 0.5 mg/kg
    const ondansetron = w > 0 ? (w * 0.5).toFixed(1) : "--";

    return (
        <ProtocolLayout title="Syndrome Vestibulaire Aigu">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="La Question : Central ou Périphérique ?" icon="🧠">
                                <p className="text-sm text-slate-700 mb-4">
                                    C'est LA distinction à faire pour le pronostic.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                                        <h4 className="font-bold text-green-900 mb-2">Périphérique (Bon Pronostic)</h4>
                                        <ul className="list-disc pl-5 text-sm text-green-800 space-y-2">
                                            <li><strong>Nystagmus :</strong> Horizontal ou Rotatoire. Ne change pas de direction avec la tête.</li>
                                            <li><strong>Proprioception :</strong> NORMALE ! (Sauf si l'animal est trop déséquilibré pour tester).</li>
                                            <li><strong>Horner :</strong> Possible (3ème paupière, myosis) du même côté.</li>
                                            <li><strong>Cause :</strong> Idiopathique (Vieux chien), Otite Moyenne.</li>
                                        </ul>
                                    </div>
                                    <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                                        <h4 className="font-bold text-red-900 mb-2">Central (Mauvais Pronostic)</h4>
                                        <ul className="list-disc pl-5 text-sm text-red-800 space-y-2">
                                            <li><strong>Nystagmus :</strong> VERTICAL (Pathognomonique) ou change de sens.</li>
                                            <li><strong>Proprioception :</strong> DÉFICITAIRE (du côté de la lésion ou controlatéral selon niveau).</li>
                                            <li><strong>Mental :</strong> Abattu, Comateux.</li>
                                            <li><strong>Cause :</strong> Tumeur, AVC, Encéphalite.</li>
                                        </ul>
                                    </div>
                                </div>
                                <AlertBox type="warning" title="Le Piège">
                                    Un chien avec un nystagmus horizontal PEUT avoir une atteinte centrale. Mais un nystagmus vertical est TOUJOURS central.
                                </AlertBox>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Exploration de l'Oreille & Cerveau" icon="👂">
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">Otoscopie</h4>
                                    <p className="text-sm text-slate-700">
                                        <strong>Indispensable.</strong> Chercher :
                                        <br />- Rupture tympanique.
                                        <br />- Otite externe sévère (peut s'étendre).
                                        <br />- Polype (Chat).
                                        <br /><em>Attention :</em> Si tympan rompu, éviter nettoyants ototoxiques.
                                    </p>
                                </div>
                                <CheckList
                                    items={[
                                        "T4 / TSH : Hypothyroïdie (Chien âgé, rare cause mais possible).",
                                        "IRM (Cerveau) : Si signes CENTRAUX ou Si aucune amélioration après 72h."
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

                            <Section title="1. Gestion des Nausées (Indispensable)" icon="💊">
                                <p className="text-sm text-slate-700 mb-2">
                                    Le tournis donne la nausée &rarr; Anorexie &rarr; Déshydratation.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DosageCard
                                        title="Maropitant (Cerenia)"
                                        value={`${cereniaInj} mg`}
                                        unit="SC ou IV (Lent)"
                                        subtitle="1 mg/kg q24h. Le plus efficace pour le mal des transports/vestibulaire."
                                        color="blue"
                                    />
                                    <DosageCard
                                        title="Ondansétron (Zophren)"
                                        value={`${ondansetron} mg`}
                                        unit="IV ou PO"
                                        subtitle="0.5 mg/kg q8-12h. Si nausées sévères persistantes."
                                        color="slate"
                                    />
                                </div>
                            </Section>

                            <Section title="2. Soins de Nursing (Si pas d'otite)" icon="📉">
                                <CheckList
                                    items={[
                                        "Idiopathique ('Vieux Chien') : Amélioration en 72h. Guérison 2-3 semaines.",
                                        "Aide à la marche : Harnais de soutien.",
                                        "Alimentation : Surélever les gamelles.",
                                        "Otite ? : Si tympan non visible ou suspicion -> Scanner/IRM + Lavage bulles. Antibiotiques uniquement si otite prouvée."
                                    ]}
                                />
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "Vestibular Diagnostic Algorithm", type: "external" },
                                    { label: "Idiopathic Vestibular Disease", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

