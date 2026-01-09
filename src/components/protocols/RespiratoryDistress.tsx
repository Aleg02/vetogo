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
    Wind,
    Zap,
    Activity,
    Syringe,
    Stethoscope,
    Volume2,
    Thermometer,
    CloudRain
} from "lucide-react";

export const RespiratoryDistress = () => {
    const { weightKg, species } = useAppStore();

    const w = weightKg || 0;
    const isDog = species === "chien";
    const isCat = species === "chat";
    const isSpeciesSelected = isDog || isCat;

    // --- CALCULS ---

    // 1. SÉDATION (Butorphanol)
    // Chien/Chat: 0.2 - 0.4 mg/kg (IM/IV)
    const butorphanolMin = w > 0 ? (w * 0.2).toFixed(2) : "--";
    const butorphanolMax = w > 0 ? (w * 0.4).toFixed(2) : "--";
    // Butorphanol 10 mg/ml
    const butorphanolVolMin = w > 0 ? (w * 0.2 / 10).toFixed(2) : "--";
    const butorphanolVolMax = w > 0 ? (w * 0.4 / 10).toFixed(2) : "--";

    // 2. DIURÉTIQUE (Furosémide) - Suspicion OAP
    // Chien: 2-4 mg/kg
    // Chat: 1-2 mg/kg
    const lasixDoseMin = w > 0 ? (w * (isDog ? 2 : 1)).toFixed(1) : "--";
    const lasixDoseMax = w > 0 ? (w * (isDog ? 4 : 2)).toFixed(1) : "--";
    // Furosemide 50 mg/ml (Dimazon)
    const lasixVolMin = w > 0 ? (w * (isDog ? 2 : 1) / 50).toFixed(2) : "--";
    const lasixVolMax = w > 0 ? (w * (isDog ? 4 : 2) / 50).toFixed(2) : "--";

    // 3. BRONCHODILATATEUR (Chat Asthme)
    // Terbutaline 0.01 mg/kg
    const terbutalineDose = w > 0 ? (w * 0.01).toFixed(2) : "--";

    return (
        <ProtocolLayout title="Détresse Respiratoire Aiguë">
            {(tab) => (
                <ProtocolContainer>
                    {/* --- ONGLET GÉNÉRAL --- */}
                    {tab === "general" && (
                        <>
                            <Section title="Règle d'Or" icon="🤫">
                                <AlertBox type="critical" title="Less is More">
                                    <strong>Le STRESS tue.</strong>
                                    <br />
                                    Manipulation minimale. Pas de radio immédiate. Pas de pose de cathéter si lutte.
                                    <br />
                                    Oxygène + Sédation = Priorité absolue.
                                </AlertBox>
                            </Section>

                            <Section title="Signes de Localisation" icon="🔍">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-2 font-bold text-slate-700 mb-1">
                                            <Volume2 size={18} className="text-amber-500" /> Stridor / Cornage
                                        </div>
                                        <p className="text-sm text-slate-500">Obstruction Voies Hautes (Larynx). Hyperthermie fréquente.</p>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-2 font-bold text-slate-700 mb-1">
                                            <CloudRain size={18} className="text-blue-500" /> Crépitants
                                        </div>
                                        <p className="text-sm text-slate-500">Parenchyme (OAP, Pneumonie, Contusions).</p>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-2 font-bold text-slate-700 mb-1">
                                            <Wind size={18} className="text-purple-500" /> Assourdissement
                                        </div>
                                        <p className="text-sm text-slate-500">Espace Pleural (Epanchement, Pneumothorax).</p>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-2 font-bold text-slate-700 mb-1">
                                            <Wind size={18} className="text-green-500" /> Sifflements
                                        </div>
                                        <p className="text-sm text-slate-500">Voies Basses (Asthme félin, Bronchite).</p>
                                    </div>
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET EXAMENS --- */}
                    {tab === "examens" && (
                        <>
                            <Section title="Triage POCUS (Écho Flash)" icon="📺">
                                <CheckList
                                    items={[
                                        "Lignes B (Fusées) ? => OAP ou Contusions.",
                                        "Lignes A (Normal) + Dyspnée ? => Asthme ou Embolie ou Acidose.",
                                        "Signe du Glissement absent ? => Pneumothorax.",
                                        "Liquide anéchogène ? => Épanchement pleural (Thoracocentèse immédiate)."
                                    ]}
                                />
                                <div className="mt-3 p-3 bg-slate-50 text-slate-500 text-sm italic border rounded-lg">
                                    Ne faire que si l'animal tolère. Sinon : Oxygène à l'aveugle + Sédation.
                                </div>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET TRAITEMENTS --- */}
                    {tab === "traitements" && (
                        <>
                            {(!w || !isSpeciesSelected) && (
                                <AlertBox type="warning" title="Attention">
                                    Saisissez le poids pour les doses de sédation.
                                </AlertBox>
                            )}

                            <Section title="1. Oxygénation & Sédation" icon="💤">
                                <div className="space-y-6">
                                    <AlertBox type="info" title="Oxygène">
                                        Flow-by, Cage à oxygène ou Masque selon tolérance.
                                        <br />
                                        Si obstruction sévère (laryngée) : Intubation immédiate.
                                    </AlertBox>

                                    {/* BUTORPHANOL */}
                                    <div>
                                        <h4 className="font-bold text-purple-600 mb-2 flex items-center gap-2">
                                            <Syringe size={20} /> Butorphanol (Sédation Douce)
                                        </h4>
                                        <DosageCard
                                            title="Butorphanol (Torbugesic)"
                                            value={`${butorphanolMin} - ${butorphanolMax}`}
                                            unit="mg"
                                            subtitle={
                                                <span>
                                                    Volume : <strong>{butorphanolVolMin}-{butorphanolVolMax} ml</strong> (10 mg/ml)
                                                    <br />
                                                    IM (moins stressant) ou IV. Répéter toutes les 30-60 min.
                                                </span>
                                            }
                                            color="purple"
                                        />
                                    </div>
                                </div>
                            </Section>

                            <Section title="2. Si OAP (Cardiogénique)" icon="💙">
                                <div>
                                    <h4 className="font-bold text-blue-600 mb-2 flex items-center gap-2">
                                        <Syringe size={20} /> Furosémide (Dimazon)
                                    </h4>
                                    <DosageCard
                                        title="Bolus Diurétique"
                                        value={`${lasixDoseMin} - ${lasixDoseMax}`}
                                        unit="mg"
                                        subtitle={
                                            <span>
                                                Volume : <strong>{lasixVolMin}-{lasixVolMax} ml</strong> (50 mg/ml)
                                                <br />
                                                IV ou IM. Répéter q1-2h jusqu'à amélioration respiratoire.
                                            </span>
                                        }
                                        color="blue"
                                    />
                                    <p className="mt-2 text-xs text-slate-500">
                                        Chat : Doses plus faibles (1-2 mg/kg). Chien : Doses plus fortes (2-4 mg/kg).
                                    </p>
                                </div>
                            </Section>

                            <Section title="3. Si Asthme Félin" icon="🐱">
                                <div>
                                    <h4 className="font-bold text-green-600 mb-2">Terbutaline / Salbutamol</h4>
                                    <p className="text-sm text-slate-700 bg-white p-3 border rounded mb-2">
                                        <strong>Salbutamol (Ventoline) :</strong> 1-2 Puffs via chambre d'inhalation.
                                    </p>
                                    {isCat && (
                                        <p className="text-sm text-slate-700 bg-white p-3 border rounded">
                                            <strong>Terbutaline inj :</strong> {terbutalineDose} mg (SC/IM).
                                        </p>
                                    )}
                                </div>
                            </Section>

                            <Section title="4. Si Épanchement / Pneumothorax" icon="💉">
                                <AlertBox type="critical" title="Thoracocentèse">
                                    Geste salvateur immédiat.
                                    <br />
                                    <strong>Site :</strong> 7e-9e espace intercostal (jonction chondro-costale si liquide, dorsal si air).
                                </AlertBox>
                            </Section>
                        </>
                    )}

                    {/* --- ONGLET LIENS --- */}
                    {tab === "liens" && (
                        <Section title="Références" icon="📚">
                            <LinkList
                                links={[
                                    { label: "BSAVA Manual of Canine and Feline Emergency", type: "external" },
                                    { label: "Veterinary Partner - Respiratory Distress", url: "https://veterinarypartner.vin.com", type: "external" }
                                ]}
                            />
                        </Section>
                    )}
                </ProtocolContainer>
            )}
        </ProtocolLayout>
    );
};
