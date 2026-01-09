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
    Syringe,
    Microscope,
    Wind, // Pour air
    Droplets // Pour fluide
} from "lucide-react";

export const PleuralEffusion = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;

    // Pas de dosages médicamenteux complexes ici, c'est une procédure.
    // Sédation éventuelle (Butorphanol)
    const butorphanol = w > 0 ? (w * 0.2).toFixed(2) : "--";

    return (
        <ProtocolLayout title="Épanchement Pleural / Thoracocentèse">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="La Procédure (Thoracocentèse)" icon="💉">
                                <AlertBox type="critical" title="Urgence Vitale">
                                    Si détresse sévère, drainer AVANT toute radio. L'échographie T-FAST est idéale pour guider.
                                </AlertBox>
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <h4 className="font-bold text-slate-800 mb-2">Liquide (Épanchement)</h4>
                                        <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                            <li><strong>Site :</strong> 7ème - 9ème EIC.</li>
                                            <li><strong>Hauteur :</strong> 1/3 Inférieur (Ventral), jonction chondro-costale.</li>
                                            <li><strong>Aiguille :</strong> Papillon (Butterfly) ou Cathéter.</li>
                                        </ul>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <h4 className="font-bold text-slate-800 mb-2">Air (Pneumothorax)</h4>
                                        <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                            <li><strong>Site :</strong> 7ème - 9ème EIC.</li>
                                            <li><strong>Hauteur :</strong> 1/3 Supérieur (Dorsal).</li>
                                            <li><strong>Technique :</strong> Souvent bilatéral requis.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <AlertBox type="warning" title="Règle d'Or">
                                        Toujours piquer au <strong>BORD CRÂNIAL</strong> de la côte (les vaisseaux/nerfs passent au bord caudal).
                                    </AlertBox>
                                </div>
                            </Section>

                            <Section title="Préparation" icon="🌬️">
                                <CheckList
                                    items={[
                                        "Oxygène : Masque ou flow-by pendant la procédure.",
                                        "Sédation (Si patient stressé mais stable) : Butorphanol 0.2 mg/kg IM/IV.",
                                        "Matériel : Aiguille papillon ou KT 18-22G, Robinet 3 voies, Seringue 20-60ml, Tubes EDTA/Sec.",
                                        "Position : Sternale (le plus sûr) ou Debout. Latérale si impossible."
                                    ]}
                                />
                                <div className="mt-2 text-sm text-slate-500">
                                    Butorphanol dose indicative : {butorphanol} mg.
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <Section title="Imagerie Complémentaire" icon="📉">
                            <CheckList
                                items={[
                                    "Radio Thorax : APRES drainage (pour voir le cœur et les masses cachées par le liquide).",
                                    "Echocardiographie : Cause cardiaque ? (Chat CMH, Chien MVD/DCM).",
                                    "Scanner : Masses médiastinales, Torsion lobe, Corps étranger (Epillet)."
                                ]}
                            />
                        </Section>
                    )}

                    {/* --- ONGLET ANALYSE --- */}
                    {tab === "traitements" && (
                        <>
                            <Section title="Analyse du Liquide" icon="🔬">
                                <div className="space-y-4">
                                    <div className="border-l-4 border-blue-400 pl-4 py-2 bg-blue-50/30">
                                        <h4 className="font-bold text-blue-900">Transsudat (Pur)</h4>
                                        <p className="text-sm text-blue-800">
                                            Clair, comme de l'eau.<br />
                                            Protéines &lt; 2.5 g/dL, Cellules &lt; 1500.<br />
                                            <em>Causes :</em> Hypoalbuminémie sévère.
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-yellow-400 pl-4 py-2 bg-yellow-50/30">
                                        <h4 className="font-bold text-yellow-900">Transsudat Modifié</h4>
                                        <p className="text-sm text-yellow-800">
                                            Trouble, jaune/rosé.<br />
                                            Protéines 2.5-5.0 g/dL.<br />
                                            <em>Causes :</em> ICC (Cardiogénique), Tumeur, Hernie diaphragmatique.
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-red-400 pl-4 py-2 bg-red-50/30">
                                        <h4 className="font-bold text-red-900">Exsudat (Septique/Non-Septique)</h4>
                                        <p className="text-sm text-red-800">
                                            Trouble, riche en cellules (&gt; 5000), Protéines &gt; 3.0.<br />
                                            <em>Causes :</em> Pyothorax (Pus, Neutrophiles dégénérés, Bactéries), FIP (Chat: jaune, filant, riche en globulines).
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-white pl-4 py-2 bg-slate-100 shadow-sm">
                                        <h4 className="font-bold text-slate-900">Chyleux</h4>
                                        <p className="text-sm text-slate-800">
                                            Laiteux (Blanc). Ne sédimente pas.<br />
                                            Lymphocytes matures prédominants.<br />
                                            <em>Confirmer :</em> Triglycérides Fluide &gt; Sérum.
                                        </p>
                                    </div>
                                    <div className="border-l-4 border-rose-600 pl-4 py-2 bg-rose-50 shadow-sm">
                                        <h4 className="font-bold text-rose-900">Hémorragique</h4>
                                        <p className="text-sm text-rose-800">
                                            Ne coagule pas (défibriné).<br />
                                            HT Fluide &gt; 20% HT Sang.<br />
                                            <em>Causes :</em> Trauma, Rodenticides, Tumeur (Hémangiosarcome).
                                        </p>
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
                                    { label: "Thoracocentesis Guidelines", type: "external" },
                                    { label: "Pleural Effusion Analysis", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};

