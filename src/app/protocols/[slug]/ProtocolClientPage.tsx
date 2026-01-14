"use client";

import type { Protocol } from "@/data/protocols";
import type { ProtocolSection } from "@/data/protocolDetails";
import { useRouter } from "next/navigation";
import { HypovolemicShock } from "@/components/protocols/HypovolemicShock";
import { Anaphylaxis } from "@/components/protocols/Anaphylaxis";
import { StatusEpilepticus } from "@/components/protocols/StatusEpilepticus";
import { Hypoglycemia } from "@/components/protocols/Hypoglycemia";
import { RespiratoryDistress } from "@/components/protocols/RespiratoryDistress";
import { AcutePain } from "@/components/protocols/AcutePain";
import { Polytrauma } from "@/components/protocols/Polytrauma";
import { Intoxication } from "@/components/protocols/Intoxication";
import { HeatStroke } from "@/components/protocols/HeatStroke";
import { CongestiveHeartFailure } from "@/components/protocols/CongestiveHeartFailure";
import { CPR } from "@/components/protocols/CPR";
import { Vomiting } from "@/components/protocols/Vomiting";
import { Diarrhea } from "@/components/protocols/Diarrhea";
import { AcuteHemorrhage } from "@/components/protocols/AcuteHemorrhage";
import { Sepsis } from "@/components/protocols/Sepsis";
import { UrinaryObstruction } from "@/components/protocols/UrinaryObstruction";
import { AcuteKidneyInjury } from "@/components/protocols/AcuteKidneyInjury";
import { GDV } from "@/components/protocols/GDV";
import { CSection } from "@/components/protocols/CSection";
import { SevereAnemia } from "@/components/protocols/SevereAnemia";
import { ProceduralSedation } from "@/components/protocols/ProceduralSedation";
import { FluidTherapy } from "@/components/protocols/FluidTherapy";
import { Euthanasia } from "@/components/protocols/Euthanasia";
import { Gastroenteritis } from "@/components/protocols/Gastroenteritis";
import { AcutePancreatitis } from "@/components/protocols/AcutePancreatitis";
import { DigestiveForeignBody } from "@/components/protocols/DigestiveForeignBody";
import { Constipation } from "@/components/protocols/Constipation";
import { ParalyticIleus } from "@/components/protocols/ParalyticIleus";
import { UpperGIBleeding } from "@/components/protocols/UpperGIBleeding";
import { AcuteJaundice } from "@/components/protocols/AcuteJaundice";
import { ChronicKidneyDisease } from "@/components/protocols/ChronicKidneyDisease";
import { BacterialCystitis } from "@/components/protocols/BacterialCystitis";
import { SuspectedPyelonephritis } from "@/components/protocols/SuspectedPyelonephritis";
import { AcuteDysuria } from "@/components/protocols/AcuteDysuria";
import { Urolithiasis } from "@/components/protocols/Urolithiasis";
import { Hyperkalemia } from "@/components/protocols/Hyperkalemia";
import { DiabeticKetoacidosis } from "@/components/protocols/DiabeticKetoacidosis";
import { AcuteHyperglycemia } from "@/components/protocols/AcuteHyperglycemia";
import { AcuteHypocalcemia } from "@/components/protocols/AcuteHypocalcemia";
import { Pyometra } from "@/components/protocols/Pyometra";
import { NeonatalResuscitation } from "@/components/protocols/NeonatalResuscitation";
import { Mastitis } from "@/components/protocols/Mastitis";
import { Paraphimosis } from "@/components/protocols/Paraphimosis";
import { Prostatitis } from "@/components/protocols/Prostatitis";
import { FelineAsthma } from "@/components/protocols/FelineAsthma";
import { Pneumonia } from "@/components/protocols/Pneumonia";
import { PleuralEffusion } from "@/components/protocols/PleuralEffusion";
import { NonCardiogenicEdema } from "@/components/protocols/NonCardiogenicEdema";
import { AcuteCough } from "@/components/protocols/AcuteCough";
import { ChronicRespiDistress } from "@/components/protocols/ChronicRespiDistress";
import { AcuteLameness } from "@/components/protocols/AcuteLameness";
import { ClosedFracture } from "@/components/protocols/ClosedFracture";
import { BiteWound } from "@/components/protocols/BiteWound";
import { Burns } from "@/components/protocols/Burns";
import { DiaphragmaticHernia } from "@/components/protocols/DiaphragmaticHernia";
import { Metritis } from "@/components/protocols/Metritis";
import { Fever } from "@/components/protocols/Fever";
import { Abscess } from "@/components/protocols/Abscess";
import { AcuteLiverFailure } from "@/components/protocols/AcuteLiverFailure";
import { ChronicPain } from "@/components/protocols/ChronicPain";
import { PalliativeCare } from "@/components/protocols/PalliativeCare";
import { AcuteAbdomenSurgery } from "@/components/protocols/AcuteAbdomenSurgery";
import { Vestibular } from "@/components/protocols/Vestibular";
import { AcuteParalysis } from "@/components/protocols/AcuteParalysis";
import { SpinalLocalization } from "@/components/protocols/SpinalLocalization";
import { Tremors } from "@/components/protocols/Tremors";
import { AnticoagulantPoisoning } from "@/components/protocols/AnticoagulantPoisoning";
import { XylitolPoisoning } from "@/components/protocols/XylitolPoisoning";
import { NSAIDPoisoning } from "@/components/protocols/NSAIDPoisoning";
import { ParacetamolPoisoning } from "@/components/protocols/ParacetamolPoisoning";
import { ElectrolyteImbalance } from "@/components/protocols/ElectrolyteImbalance";
import { FluidMonitoring } from "@/components/protocols/FluidMonitoring";

// MAPPING: Map slug -> Component
const AVAILABLE_PROTOCOLS: Record<string, React.ComponentType> = {
    "choc-hypovolemique": HypovolemicShock,
    "anaphylaxie": Anaphylaxis,
    "status-epilepticus": StatusEpilepticus,
    "hypoglycemie": Hypoglycemia,
    "detresse-respiratoire": RespiratoryDistress,
    "douleur-aigue": AcutePain,
    "polytraumatisme": Polytrauma,
    "intoxication": Intoxication,
    "coup-de-chaleur": HeatStroke,
    "insuffisance-cardiaque": CongestiveHeartFailure,
    "arret-cardio-respiratoire": CPR,
    "vomissements": Vomiting,
    "diarrhee": Diarrhea,
    "hemorragie-aigue": AcuteHemorrhage,
    "sepsis": Sepsis,
    "obstruction-urinaire": UrinaryObstruction,
    "insuffisance-renale-aigue": AcuteKidneyInjury,
    "dilatation-torsion-estomac": GDV,
    "cesarienne-dystocie": CSection,
    "anemie-aigue": SevereAnemia,
    "sedation-procedurale": ProceduralSedation,
    "fluidotherapie": FluidTherapy,
    "euthanasie": Euthanasia,
    "gastro-enterite": Gastroenteritis,
    "pancreatite-aigue": AcutePancreatitis,
    "corps-etranger-digestif": DigestiveForeignBody,
    "constipation-megacolon": Constipation,
    "ileus-paralytique": ParalyticIleus,
    "hemorragie-digestive-haute": UpperGIBleeding,
    "ictere-aigu": AcuteJaundice,
    "insuffisance-renale-chronique": ChronicKidneyDisease,
    "cystite-aigue": BacterialCystitis,
    "pyelonephrite": SuspectedPyelonephritis,
    "dysurie-aigue": AcuteDysuria,
    "urolithiase-gestion": Urolithiasis,
    "hyperkaliemie": Hyperkalemia,
    "acidocetose-diabetique": DiabeticKetoacidosis,
    "hyperglycemie-hhs": AcuteHyperglycemia,
    "hypocalcemie-eclampsie": AcuteHypocalcemia,
    "pyometre": Pyometra,
    "reanimation-neonatale": NeonatalResuscitation,
    "mammite-mastite": Mastitis,
    "paraphimosis": Paraphimosis,
    "prostatite": Prostatitis,
    "asthme-felin": FelineAsthma,
    "pneumonie": Pneumonia,
    "epanchement-pleural": PleuralEffusion,
    "oedeme-pulmonaire-nc": NonCardiogenicEdema,
    "toux-aigue": AcuteCough,
    "detresse-respi-chronique": ChronicRespiDistress,
    "boiterie-aigue": AcuteLameness,
    "fracture-fermee": ClosedFracture,
    "plaie-morsure": BiteWound,
    "brulure": Burns,
    "hernie-diaphragmatique": DiaphragmaticHernia,
    "abdomen-aigu-chirurgical": AcuteAbdomenSurgery,
    "syndrome-vestibulaire": Vestibular,
    "paralysie-aigue": AcuteParalysis,
    "suspicion-compression-medullaire": SpinalLocalization,
    "tremblements-myoclonies": Tremors,
    "intoxication-anticoagulants": AnticoagulantPoisoning,
    "intoxication-xylitol": XylitolPoisoning,
    "intoxication-ains": NSAIDPoisoning,
    "intoxication-paracetamol": ParacetamolPoisoning,
    "desequilibres-electrolytiques": ElectrolyteImbalance,
    "surveillance-perfusion": FluidMonitoring,

    "metrite-post-partum": Metritis,
    "fievre-indeterminee": Fever,
    "abces-cutane": Abscess,
    "insuffisance-hepatique-aigue": AcuteLiverFailure,
    "douleur-chronique": ChronicPain,
    "soins-palliatifs": PalliativeCare,
};

import { ProtocolLockProvider } from "@/context/ProtocolLockContext";

interface ProtocolClientPageProps {
    slug: string;
    protocol: Protocol | null;
    sections: ProtocolSection[];
    error?: string | null;
    isLocked?: boolean;
}

export default function ProtocolClientPage({
    slug,
    protocol,
    isLocked = false,
}: ProtocolClientPageProps) {
    const router = useRouter();
    const ProtocolComponent = AVAILABLE_PROTOCOLS[slug];

    // If no component mapping found --> 404
    if (!ProtocolComponent || !protocol) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50">
                <h1 className="text-4xl mb-4">😕</h1>
                <h2 className="text-xl font-bold text-slate-800 mb-2">Protocole introuvable</h2>
                <p className="text-slate-500 mb-6 max-w-xs mx-auto">
                    Le protocole "{slug}" n'existe pas ou est en cours de création.
                </p>
                <button
                    onClick={() => router.push("/?mode=search")}
                    className="bg-slate-900 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:scale-105 transition"
                >
                    Retour à la recherche
                </button>
            </main>
        );
    }

    // Render the specific component wrapped in Lock Provider
    return (
        <ProtocolLockProvider isLocked={isLocked}>
            <ProtocolComponent />
        </ProtocolLockProvider>
    );
}
