
export type Species = 'canine' | 'feline';

export interface PhysiologicalConstants {
    shock_fluid_rate_ml_kg: number;
    maintenance_formula: string;
    rer_formula: string;
    respiratory_rate_range: number[];
    heart_rate_range: number[];
    blood_volume_ml_kg: number;
}

export interface SpeciesConfig {
    id: string;
    display_name: string;
    physiological_constants: PhysiologicalConstants;
    forbidden_drugs: string[];
}

export interface DosageDetail {
    dose_ml_kg?: number;
    range_ml_kg?: number[];
    dose_mg_kg?: number;
    range_mg_kg?: number[];
    dose_amount_kg?: number;
    unit?: string;
    range?: number[];
    frequency?: string;
    note?: string;
    max_dose_mg_kg?: number | null;
    condition?: string;
    instruction?: string;
    warning_msg?: string;
    route?: string;
}

export interface DrugDosage {
    common?: DosageDetail;
    canine?: DosageDetail;
    feline?: DosageDetail;
    [key: string]: DosageDetail | undefined;
}

export interface SafetyGuardrails {
    warning_msg?: string;
    dilution_hint?: string;
    note?: string;
    contraindications?: string[];
    min_volume_ml?: number | null;
}

export interface DrugItem {
    id: string;
    name: string;
    concentration_label: string;
    concentration_mg_ml: number;
    unit_type?: string;
    is_high_alert: boolean;
    routes: string[];
    dosage: DrugDosage;
    safety_guardrails?: SafetyGuardrails;
}

export interface DrugCategory {
    category_name: string;
    items: DrugItem[];
}

export interface DrugData {
    meta: {
        version: string;
        last_updated: string;
        source: string;
        scope: string;
    };
    species_config: {
        canine: SpeciesConfig;
        feline: SpeciesConfig;
    };
    drugs: DrugCategory[];
}

export const DRUG_DATA: DrugData = {
    "meta": {
        "version": "6.0.0",
        "last_updated": "2024-05-24",
        "source": "Plumb's / ACVECC / RECOVER 2024 / KSVECC Transfusion Guidelines",
        "scope": "Platinum Emergency, Critical Care, Transfusion & Nutrition"
    },
    "species_config": {
        "canine": {
            "id": "canine",
            "display_name": "Chien",
            "physiological_constants": {
                "shock_fluid_rate_ml_kg": 90,
                "maintenance_formula": "132 * (weight ^ 0.75)",
                "rer_formula": "70 * (weight ^ 0.75)",
                "respiratory_rate_range": [10, 30],
                "heart_rate_range": [60, 140],
                "blood_volume_ml_kg": 90
            },
            "forbidden_drugs": []
        },
        "feline": {
            "id": "feline",
            "display_name": "Chat",
            "physiological_constants": {
                "shock_fluid_rate_ml_kg": 55,
                "maintenance_formula": "80 * (weight ^ 0.75)",
                "rer_formula": "70 * (weight ^ 0.75)",
                "respiratory_rate_range": [20, 40],
                "heart_rate_range": [140, 220],
                "blood_volume_ml_kg": 60
            },
            "forbidden_drugs": ["acetaminophen", "paracetamol", "permethrin", "ibuprofen", "azathioprine", "cisplatin", "phosphate_enema"]
        }
    },
    "drugs": [
        {
            "category_name": "TRANSFUSION SANGUINE",
            "items": [
                {
                    "id": "whole_blood",
                    "name": "Sang Total (Whole Blood)",
                    "concentration_label": "N/A",
                    "concentration_mg_ml": 1,
                    "is_high_alert": true,
                    "routes": ["IV (Avec Filtre)"],
                    "dosage": {
                        "common": {
                            "dose_ml_kg": 20.0,
                            "range_ml_kg": [10.0, 22.0],
                            "frequency": "Sur 4 heures",
                            "note": "Règle du pouce: 2 ml/kg augmentent PCV de 1%."
                        }
                    },
                    "safety_guardrails": {
                        "warning_msg": "Monitorer réactions transfusionnelles (température, FC, FR) toutes les 15 min.",
                        "dilution_hint": "Ne JAMAIS administrer avec Ringer Lactate ou solution calcique (coagulation)."
                    }
                },
                {
                    "id": "packed_rbc",
                    "name": "Culot Globulaire (pRBC)",
                    "concentration_label": "N/A",
                    "concentration_mg_ml": 1,
                    "is_high_alert": true,
                    "routes": ["IV (Avec Filtre)"],
                    "dosage": {
                        "common": {
                            "dose_ml_kg": 10.0,
                            "range_ml_kg": [6.0, 15.0],
                            "frequency": "Sur 4 heures",
                            "note": "Règle du pouce: 1 ml/kg augmente PCV de 1%."
                        }
                    },
                    "safety_guardrails": {
                        "dilution_hint": "Diluer avec NaCl 0.9% pour réduire la viscosité si nécessaire."
                    }
                },
                {
                    "id": "fresh_frozen_plasma",
                    "name": "Plasma Frais Congelé (FFP)",
                    "concentration_label": "N/A",
                    "concentration_mg_ml": 1,
                    "is_high_alert": true,
                    "routes": ["IV (Avec Filtre)"],
                    "dosage": {
                        "common": {
                            "dose_ml_kg": 15.0,
                            "range_ml_kg": [10.0, 20.0],
                            "frequency": "Sur 4 heures (plus vite si coagulopathie active)"
                        }
                    },
                    "safety_guardrails": {
                        "note": "Contient facteurs de coagulation (Vit K, Rodenticide, Hémophilie)."
                    }
                }
            ]
        },
        {
            "category_name": "GASTRO & ALLERGIE (2ème ligne)",
            "items": [
                {
                    "id": "ondansetron",
                    "name": "Ondansétron (Zophren)",
                    "concentration_label": "2 mg/mL",
                    "concentration_mg_ml": 2,
                    "is_high_alert": false,
                    "routes": ["IV Lent", "PO"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 0.5,
                            "range_mg_kg": [0.1, 1.0],
                            "frequency": "q8-12h"
                        }
                    },
                    "safety_guardrails": {
                        "note": "Anti-émétique puissant. Peut être utilisé avec Maropitant."
                    }
                },
                {
                    "id": "diphenhydramine",
                    "name": "Diphenhydramine (Benadryl)",
                    "concentration_label": "50 mg/mL",
                    "concentration_mg_ml": 50,
                    "is_high_alert": false,
                    "routes": ["IM", "IV (Lent)", "SC"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 2.0,
                            "range_mg_kg": [1.0, 4.0],
                            "frequency": "q8h / Réaction allergique"
                        }
                    },
                    "safety_guardrails": {
                        "warning_msg": "Sédation possible. IV : diluer et injecter lentement."
                    }
                },
                {
                    "id": "famotidine",
                    "name": "Famotidine",
                    "concentration_label": "10 mg/mL",
                    "concentration_mg_ml": 10,
                    "is_high_alert": false,
                    "routes": ["IV Lent"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 0.5,
                            "range_mg_kg": [0.5, 1.0],
                            "frequency": "q12h"
                        }
                    },
                    "safety_guardrails": {
                        "warning_msg": "Risque hémolyse chez le chat si injection IV trop rapide (rare)."
                    }
                }
            ]
        },
        {
            "category_name": "RÉANIMATION (CPR) - CODE ROUGE",
            "items": [
                {
                    "id": "epinephrine_low_conc",
                    "name": "Adrénaline (Épinéphrine)",
                    "concentration_label": "1:10 000 (0,1 mg/mL)",
                    "concentration_mg_ml": 0.1,
                    "is_high_alert": true,
                    "routes": ["IV", "IO", "IT"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 0.01,
                            "frequency": "Toutes les 3-5 min (1 cycle sur 2)",
                            "max_dose_mg_kg": null
                        },
                        "it_override": {
                            "route": "IT",
                            "dose_mg_kg": 0.02,
                            "instruction": "Doubler la dose, diluer avec NaCl, injecter via sonde longue"
                        }
                    },
                    "safety_guardrails": {
                        "min_volume_ml": 0.1,
                        "dilution_hint": "Si vol < 0.1 ml, diluer 1:9 avec NaCl"
                    }
                },
                {
                    "id": "atropine_sulfate",
                    "name": "Sulfate d'Atropine",
                    "concentration_label": "0,54 mg/mL",
                    "concentration_mg_ml": 0.54,
                    "is_high_alert": false,
                    "routes": ["IV", "IO", "IT", "IM"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 0.04,
                            "frequency": "Dose unique ou répéter 1x"
                        },
                        "cpr_override": {
                            "condition": "Bradycardie vagale / CPR",
                            "dose_mg_kg": 0.04
                        }
                    },
                    "safety_guardrails": {
                        "contraindications": ["Glaucome", "Tachycardie", "Iléus"]
                    }
                },
                {
                    "id": "vasopressin",
                    "name": "Vasopressine",
                    "concentration_label": "20 UI/mL",
                    "concentration_mg_ml": 20,
                    "unit_type": "UI",
                    "is_high_alert": true,
                    "routes": ["IV", "IO"],
                    "dosage": {
                        "common": {
                            "dose_amount_kg": 0.8,
                            "unit": "UI/kg",
                            "frequency": "Dose UNIQUE (remplace l'adrénaline)"
                        }
                    }
                },
                {
                    "id": "sodium_bicarb",
                    "name": "Bicarbonate de Sodium 8.4%",
                    "concentration_label": "1 mEq/mL (8.4%)",
                    "concentration_mg_ml": 84,
                    "unit_type": "mEq",
                    "is_high_alert": true,
                    "routes": ["IV LENT"],
                    "dosage": {
                        "common": {
                            "dose_amount_kg": 1.0,
                            "unit": "mEq/kg",
                            "range": [0.5, 2.0],
                            "frequency": "Si acidose métabolique sévère / CPR > 10min"
                        }
                    },
                    "safety_guardrails": {
                        "note": "Ne pas mélanger avec Calcium (précipite).",
                        "warning_msg": "Risque hypernatrémie et acidose paradoxale IC."
                    }
                }
            ]
        },
        {
            "category_name": "ANESTHÉSIE LOCALE & BLOCS",
            "items": [
                {
                    "id": "lidocaine_local",
                    "name": "Lidocaïne 2% (Bloc Local)",
                    "concentration_label": "20 mg/mL (2%)",
                    "concentration_mg_ml": 20,
                    "is_high_alert": true,
                    "routes": ["SC", "Infiltration", "Perineural"],
                    "dosage": {
                        "canine": {
                            "dose_mg_kg": 4.0,
                            "range_mg_kg": [1.0, 6.0],
                            "note": "Dose TOTALE max par session"
                        },
                        "feline": {
                            "dose_mg_kg": 2.0,
                            "range_mg_kg": [1.0, 3.0],
                            "note": "Dose TOTALE max par session (Toxique!)"
                        }
                    },
                    "safety_guardrails": {
                        "warning_msg": "Ajouter du Bicarbonate (1:9) réduit la douleur à l'injection.",
                        "dilution_hint": "Calculer le volume MAX. Diluer avec NaCl pour augmenter le volume si nécessaire."
                    }
                },
                {
                    "id": "bupivacaine",
                    "name": "Bupivacaïne 0.5%",
                    "concentration_label": "5 mg/mL (0.5%)",
                    "concentration_mg_ml": 5,
                    "is_high_alert": true,
                    "routes": ["Infiltration", "Epidurale", "JAMAIS IV"],
                    "dosage": {
                        "canine": {
                            "dose_mg_kg": 1.5,
                            "range_mg_kg": [1.0, 2.0],
                            "note": "Dose Max Absolue"
                        },
                        "feline": {
                            "dose_mg_kg": 1.0,
                            "range_mg_kg": [0.5, 1.0],
                            "note": "Dose Max Absolue (Cardiotoxique)"
                        }
                    },
                    "safety_guardrails": {
                        "warning_msg": "⛔️ MORTEL EN IV (Arrêt cardiaque réfractaire). Toujours aspirer avant d'injecter.",
                        "contraindications": ["Injection IV"]
                    }
                }
            ]
        },
        {
            "category_name": "ANALGÉSIE OPIOÏDE FORTE",
            "items": [
                {
                    "id": "fentanyl_inj",
                    "name": "Fentanyl (Injectable)",
                    "concentration_label": "0.05 mg/mL (50 µg/mL)",
                    "concentration_mg_ml": 0.05,
                    "is_high_alert": true,
                    "routes": ["IV"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 0.005,
                            "range_mg_kg": [0.002, 0.01],
                            "note": "2-10 µg/kg",
                            "frequency": "Bolus analgésie courte durée"
                        },
                        "induction_override": {
                            "dose_mg_kg": 0.01,
                            "note": "Co-induction: 5-10 µg/kg",
                            "frequency": "Induction"
                        }
                    },
                    "safety_guardrails": {
                        "warning_msg": "Apnée fréquente. Dépression respi sévère.",
                        "note": "Attention : calculs souvent en microgrammes !"
                    }
                },
                {
                    "id": "methadone",
                    "name": "Méthadone",
                    "concentration_label": "10 mg/mL",
                    "concentration_mg_ml": 10,
                    "is_high_alert": true,
                    "routes": ["IV", "IM", "SC"],
                    "dosage": {
                        "canine": {
                            "dose_mg_kg": 0.2,
                            "range_mg_kg": [0.1, 0.4],
                            "frequency": "q4-6h"
                        },
                        "feline": {
                            "dose_mg_kg": 0.2,
                            "range_mg_kg": [0.1, 0.3],
                            "frequency": "q4-6h"
                        }
                    }
                },
                {
                    "id": "buprenorphine",
                    "name": "Buprénorphine",
                    "concentration_label": "0,3 mg/mL (ou 0,6 mg/mL)",
                    "concentration_mg_ml": 0.3,
                    "is_high_alert": true,
                    "routes": ["IV (Lent)", "IM", "SC", "Buccale (chat)"],
                    "dosage": {
                        "canine": {
                            "dose_mg_kg": 0.02,
                            "range_mg_kg": [0.01, 0.02],
                            "frequency": "q4-8h"
                        },
                        "feline": {
                            "dose_mg_kg": 0.02,
                            "range_mg_kg": [0.01, 0.02],
                            "frequency": "q4-8h",
                            "note": "Voie buccale possible chez le chat. Adapter le volume si concentration à 0,6 mg/mL."
                        }
                    },
                    "safety_guardrails": {
                        "warning_msg": "Effet plafond : l’analgésie n’augmente pas au-delà d’un certain seuil. Peut antagoniser les opioïdes purs."
                    }
                },
                {
                    "id": "morphine",
                    "name": "Morphine",
                    "concentration_label": "10 mg/mL",
                    "concentration_mg_ml": 10,
                    "is_high_alert": true,
                    "routes": ["IM", "SC", "IV (Lent!)"],
                    "dosage": {
                        "canine": {
                            "dose_mg_kg": 0.5,
                            "range_mg_kg": [0.2, 1.0],
                            "frequency": "q4h"
                        },
                        "feline": {
                            "dose_mg_kg": 0.2,
                            "range_mg_kg": [0.1, 0.3],
                            "frequency": "q4-6h",
                            "warning_msg": "Attention à la dysphonie/excitation chez le chat"
                        }
                    },
                    "safety_guardrails": {
                        "dilution_hint": "IV: Diluer et donner LENTEMENT (risque libération histamine)",
                        "contraindications": ["Trauma crânien (débat)", "Mastocytome"]
                    }
                }
            ]
        },
        {
            "category_name": "SÉDATION & ANESTHÉSIE",
            "items": [
                {
                    "id": "dexmedetomidine",
                    "name": "Dexmédétomidine (Dexdomitor)",
                    "concentration_label": "0,5 mg/mL",
                    "concentration_mg_ml": 0.5,
                    "is_high_alert": true,
                    "routes": ["IV", "IM"],
                    "dosage": {
                        "canine": {
                            "dose_mg_kg": 0.005,
                            "range_mg_kg": [0.001, 0.01],
                            "frequency": "Titrer à effet"
                        },
                        "feline": {
                            "dose_mg_kg": 0.007,
                            "range_mg_kg": [0.005, 0.04],
                            "frequency": "Souvent combiné (Kitty Magic)"
                        }
                    },
                    "safety_guardrails": {
                        "dilution_hint": "Micro-doses : utiliser seringue insuline ou diluer"
                    }
                },
                {
                    "id": "ketamine",
                    "name": "Kétamine",
                    "concentration_label": "100 mg/mL",
                    "concentration_mg_ml": 100,
                    "is_high_alert": true,
                    "routes": ["IV", "IM"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 5.0,
                            "range_mg_kg": [2.0, 10.0],
                            "note": "Dose induction ou contention chimique"
                        },
                        "analgesia_cri_loading": {
                            "dose_mg_kg": 0.5,
                            "frequency": "Bolus analgésique (sub-anesthésique)"
                        }
                    },
                    "safety_guardrails": {
                        "contraindications": ["Glaucome", "HCM sévère (chat)"]
                    }
                },
                {
                    "id": "propofol",
                    "name": "Propofol",
                    "concentration_label": "10 mg/mL (1%)",
                    "concentration_mg_ml": 10,
                    "is_high_alert": true,
                    "routes": ["IV STRICT"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 4.0,
                            "range_mg_kg": [2.0, 6.0],
                            "frequency": "TITRER À EFFET (lentement)",
                            "note": "Dose plus faible si prémédiqué (ex: 2mg/kg)"
                        }
                    },
                    "safety_guardrails": {
                        "warning_msg": "Apnée fréquente si injection rapide.",
                        "contraindications": ["Pas de conservateur: jeter après 6-24h"]
                    }
                },
                {
                    "id": "midazolam",
                    "name": "Midazolam",
                    "concentration_label": "5 mg/mL",
                    "concentration_mg_ml": 5,
                    "is_high_alert": false,
                    "routes": ["IV", "IM", "IN (Intra-nasal)"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 0.2,
                            "range_mg_kg": [0.1, 0.5],
                            "frequency": "Sédation ou Anti-convulsivant"
                        }
                    }
                }
            ]
        },
        {
            "category_name": "TOXICOLOGIE & ANTIDOTES AVANCÉS",
            "items": [
                {
                    "id": "intralipid",
                    "name": "Émulsion Lipidique 20% (ILE)",
                    "concentration_label": "200 mg/mL (20%)",
                    "concentration_mg_ml": 200,
                    "is_high_alert": true,
                    "routes": ["IV"],
                    "dosage": {
                        "common": {
                            "dose_ml_kg": 1.5,
                            "range_ml_kg": [1.5, 4.0],
                            "frequency": "Bolus sur 1 min",
                            "note": "Suivi d'une CRI 0.25 ml/kg/min"
                        }
                    },
                    "safety_guardrails": {
                        "note": "Antidote vital pour : Anesthésiques locaux (Lidocaïne), Ivermectine, Perméthrine (chat).",
                        "warning_msg": "Aspect laiteux normal. Ne pas mélanger."
                    }
                },
                {
                    "id": "fomepizole",
                    "name": "Fomépizole (4-MP)",
                    "concentration_label": "50 mg/mL (Reconstitué)",
                    "concentration_mg_ml": 50,
                    "is_high_alert": true,
                    "routes": ["IV LENT"],
                    "dosage": {
                        "canine": {
                            "dose_mg_kg": 20.0,
                            "frequency": "Dose de charge (Intox Éthylène Glycol)"
                        },
                        "feline": {
                            "dose_mg_kg": 125.0,
                            "note": "Dose BEAUCOUP plus élevée chez le chat",
                            "frequency": "Dose de charge"
                        }
                    },
                    "safety_guardrails": {
                        "note": "Antidote spécifique Éthylène Glycol (Antigel)."
                    }
                },
                {
                    "id": "glucagon",
                    "name": "Glucagon",
                    "concentration_label": "1 mg/vial (Reconstitué)",
                    "concentration_mg_ml": 1,
                    "is_high_alert": true,
                    "routes": ["IV"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 0.05,
                            "note": "50 µg/kg",
                            "frequency": "Bolus"
                        }
                    },
                    "safety_guardrails": {
                        "note": "Antidote pour surdosage Beta-bloquants / Calcium-bloquants / Insuline."
                    }
                },
                {
                    "id": "naloxone",
                    "name": "Naloxone",
                    "concentration_label": "0,4 mg/mL",
                    "concentration_mg_ml": 0.4,
                    "is_high_alert": false,
                    "routes": ["IV", "IM", "IT"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 0.04,
                            "range_mg_kg": [0.01, 0.04],
                            "frequency": "Titrer à effet"
                        }
                    }
                },
                {
                    "id": "flumazenil",
                    "name": "Flumazénil",
                    "concentration_label": "0,1 mg/mL",
                    "concentration_mg_ml": 0.1,
                    "is_high_alert": false,
                    "routes": ["IV"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 0.01,
                            "frequency": "Unique"
                        }
                    }
                },
                {
                    "id": "atipamezole",
                    "name": "Atipamézole (Antisedan)",
                    "concentration_label": "5 mg/mL",
                    "concentration_mg_ml": 5,
                    "is_high_alert": false,
                    "routes": ["IM"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 0.1,
                            "note": "Vol = Vol Dexdomitor"
                        }
                    },
                    "safety_guardrails": {
                        "contraindications": ["IV (hypotension brutale)"]
                    }
                },
                {
                    "id": "acetylcysteine",
                    "name": "N-acétylcystéine (NAC)",
                    "concentration_label": "200 mg/mL (20%)",
                    "concentration_mg_ml": 200,
                    "is_high_alert": false,
                    "routes": ["IV (Dilué)", "PO"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 140.0,
                            "frequency": "Dose de charge"
                        }
                    },
                    "safety_guardrails": {
                        "dilution_hint": "Diluer au 1/4 minimum. Filtrer."
                    }
                }
            ]
        },
        {
            "category_name": "ÉLECTROLYTES & MÉTABOLIQUE",
            "items": [
                {
                    "id": "calcium_gluconate",
                    "name": "Gluconate de Calcium 10%",
                    "concentration_label": "100 mg/mL (10%)",
                    "concentration_mg_ml": 100,
                    "is_high_alert": true,
                    "routes": ["IV (Lent)"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 100,
                            "range_mg_kg": [50, 150],
                            "frequency": "Sur 10-20 min"
                        }
                    },
                    "safety_guardrails": {
                        "warning_msg": "Arrêter si bradycardie. ECG recommandé."
                    }
                },
                {
                    "id": "magnesium_sulfate",
                    "name": "Sulfate de Magnésium 50%",
                    "concentration_label": "500 mg/mL (50%)",
                    "concentration_mg_ml": 500,
                    "is_high_alert": true,
                    "routes": ["IV LENT"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 30.0,
                            "range_mg_kg": [30.0, 50.0],
                            "frequency": "Sur 15-30 min"
                        },
                        "vtach_override": {
                            "dose_mg_kg": 30.0,
                            "condition": "Torsades de Pointes",
                            "instruction": "Bolus lent sous monitoring ECG"
                        }
                    },
                    "safety_guardrails": {
                        "warning_msg": "Hypotension sévère si injection rapide.",
                        "dilution_hint": "Diluer à 20% ou moins avant injection."
                    }
                },
                {
                    "id": "potassium_phosphate",
                    "name": "Phosphate de Potassium",
                    "concentration_label": "3 mmol/mL (Phos)",
                    "concentration_mg_ml": 425,
                    "unit_type": "mmol",
                    "is_high_alert": true,
                    "routes": ["IV CRI SEULEMENT"],
                    "dosage": {
                        "common": {
                            "dose_amount_kg": 0.03,
                            "unit": "mmol/kg/h",
                            "range": [0.01, 0.06],
                            "frequency": "CRI (6-12h)"
                        }
                    },
                    "safety_guardrails": {
                        "warning_msg": "⛔️ JAMAIS EN BOLUS. Risque d'hypocalcémie sévère et hypotension.",
                        "dilution_hint": "A calculer en Millimoles (mmol) et non en mg!"
                    }
                },
                {
                    "id": "dextrose_50",
                    "name": "Dextrose 50% (Glucose)",
                    "concentration_label": "500 mg/mL (50%)",
                    "concentration_mg_ml": 500,
                    "is_high_alert": true,
                    "routes": ["IV STRICT (Dilué)"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 500,
                            "range_mg_kg": [250, 1000],
                            "note": "0.5 à 1 ml/kg de D50% dilué",
                            "frequency": "Bolus hypoglycémie"
                        }
                    },
                    "safety_guardrails": {
                        "dilution_hint": "TOUJOURS DILUER 1:1 (min) pour faire du 25% ou 1:4 pour du 10%. Nécrotique pur.",
                        "min_volume_ml": null
                    }
                },
                {
                    "id": "insulin_regular",
                    "name": "Insuline Rapide (Humulin R)",
                    "concentration_label": "100 UI/mL",
                    "concentration_mg_ml": 100,
                    "unit_type": "UI",
                    "is_high_alert": true,
                    "routes": ["IV", "IM"],
                    "dosage": {
                        "common": {
                            "dose_amount_kg": 0.1,
                            "unit": "UI/kg",
                            "range": [0.05, 0.2],
                            "frequency": "Protocole Hyperkaliémie / DKA"
                        }
                    },
                    "safety_guardrails": {
                        "warning_msg": "RISQUE HYPOGLYCÉMIE FATALE. Toujours associer Dextrose si utilisé pour Hyperkaliémie.",
                        "dilution_hint": "Utiliser seringue insuline U-100."
                    }
                },
                {
                    "id": "kcl",
                    "name": "Chlorure de Potassium (KCl)",
                    "concentration_label": "2 mEq/mL (15%)",
                    "concentration_mg_ml": 150,
                    "unit_type": "mEq",
                    "is_high_alert": true,
                    "routes": ["IV DILUÉ"],
                    "dosage": {
                        "common": {
                            "dose_amount_kg": 0.5,
                            "unit": "mEq/kg/h (MAX)",
                            "frequency": "CRI SEULEMENT"
                        }
                    },
                    "safety_guardrails": {
                        "warning_msg": "⛔️ JAMAIS EN BOLUS. MORTEL.",
                        "dilution_hint": "Doit être mélangé dans poche de fluide."
                    }
                }
            ]
        },
        {
            "category_name": "URGENCES REPRODUCTIVES",
            "items": [
                {
                    "id": "oxytocin",
                    "name": "Oxytocine",
                    "concentration_label": "10 UI/mL",
                    "concentration_mg_ml": 10,
                    "unit_type": "UI",
                    "is_high_alert": true,
                    "routes": ["IM", "SC", "IV (Micro-doses)"],
                    "dosage": {
                        "canine": {
                            "dose_amount_kg": 0.05,
                            "unit": "UI/kg",
                            "range": [0.5, 2.0],
                            "note": "MAX 2 UI TOTAL / Chien (pas par kg souvent)",
                            "frequency": "Dystocie (si pas d'obstruction)"
                        },
                        "feline": {
                            "dose_amount_kg": 0.05,
                            "unit": "UI/kg",
                            "note": "MAX 0.5 - 1 UI TOTAL / Chat",
                            "frequency": "Dystocie"
                        }
                    },
                    "safety_guardrails": {
                        "warning_msg": "CONTRE-INDIQUÉ si obstruction fœtale (risque rupture utérine). Vérifier calcémie avant.",
                        "note": "Doses souvent empiriques fixes (0.5 à 2 UI par animal)."
                    }
                }
            ]
        },
        {
            "category_name": "NEUROLOGIE & CORTICOÏDES",
            "items": [
                {
                    "id": "diazepam",
                    "name": "Diazépam (Valium)",
                    "concentration_label": "5 mg/mL",
                    "concentration_mg_ml": 5,
                    "is_high_alert": false,
                    "routes": ["IV", "Intra-rectal"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 0.5,
                            "range_mg_kg": [0.5, 1.0],
                            "frequency": "Bolus crise"
                        }
                    }
                },
                {
                    "id": "phenobarbital",
                    "name": "Phénobarbital",
                    "concentration_label": "Variable (ex: 200 mg/mL)",
                    "concentration_mg_ml": 200,
                    "is_high_alert": true,
                    "routes": ["IV", "IM"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 16.0,
                            "range_mg_kg": [10.0, 20.0],
                            "frequency": "Dose de charge"
                        }
                    }
                },
                {
                    "id": "levetiracetam",
                    "name": "Levetiracetam (Keppra)",
                    "concentration_label": "100 mg/mL",
                    "concentration_mg_ml": 100,
                    "is_high_alert": false,
                    "routes": ["IV", "PO"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 30.0,
                            "range_mg_kg": [20.0, 60.0]
                        }
                    },
                    "safety_guardrails": {
                        "dilution_hint": "Diluer 1:9 (10mg/ml) pour injection IV (irritant)"
                    }
                },
                {
                    "id": "mannitol",
                    "name": "Mannitol 20%",
                    "concentration_label": "200 mg/mL (20%)",
                    "concentration_mg_ml": 200,
                    "is_high_alert": true,
                    "routes": ["IV STRICT"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 1000,
                            "range_mg_kg": [500, 2000],
                            "note": "0.5 à 2 g/kg"
                        }
                    },
                    "safety_guardrails": {
                        "warning_msg": "Utiliser un filtre (cristaux). Vérifier hydratation avant."
                    }
                },
                {
                    "id": "dexamethasone_phosphate",
                    "name": "Dexaméthasone (Dexadreson)",
                    "concentration_label": "4 mg/mL",
                    "concentration_mg_ml": 4,
                    "is_high_alert": false,
                    "routes": ["IV", "IM", "SC"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 0.1,
                            "range_mg_kg": [0.05, 0.2]
                        },
                        "shock_override": {
                            "dose_mg_kg": 0.5,
                            "range_mg_kg": [0.5, 2.0],
                            "condition": "Anaphylaxie sévère"
                        }
                    }
                },
                {
                    "id": "methylprednisolone_succinate",
                    "name": "Méthylprednisolone (Solu-Medrol)",
                    "concentration_label": "Reconstitué (ex: 62.5 mg/mL)",
                    "concentration_mg_ml": 62.5,
                    "is_high_alert": false,
                    "routes": ["IV"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 1.0,
                            "range_mg_kg": [1.0, 2.0]
                        },
                        "spinal_override": {
                            "dose_mg_kg": 30.0,
                            "condition": "Protocole Spinal"
                        }
                    }
                }
            ]
        },
        {
            "category_name": "VASOPRESSEURS & CARDIO",
            "items": [
                {
                    "id": "norepinephrine",
                    "name": "Noradrénaline (Levophed)",
                    "concentration_label": "1 mg/mL",
                    "concentration_mg_ml": 1,
                    "is_high_alert": true,
                    "routes": ["IV CRI STRICT"],
                    "dosage": {
                        "common": {
                            "dose_amount_kg": 0.1,
                            "unit": "µg/kg/min",
                            "range": [0.05, 2.0],
                            "frequency": "Perfusion Continue (CRI)"
                        }
                    },
                    "safety_guardrails": {
                        "warning_msg": "Extravasation = Nécrose. Cathéter central recommandé.",
                        "dilution_hint": "Calculer débit pour seringue 50ml."
                    }
                },
                {
                    "id": "dopamine",
                    "name": "Dopamine",
                    "concentration_label": "40 mg/mL",
                    "concentration_mg_ml": 40,
                    "is_high_alert": true,
                    "routes": ["IV CRI STRICT"],
                    "dosage": {
                        "common": {
                            "dose_amount_kg": 5.0,
                            "unit": "µg/kg/min",
                            "range": [2.0, 15.0]
                        }
                    }
                },
                {
                    "id": "dobutamine",
                    "name": "Dobutamine",
                    "concentration_label": "12.5 mg/mL",
                    "concentration_mg_ml": 12.5,
                    "is_high_alert": true,
                    "routes": ["IV CRI"],
                    "dosage": {
                        "common": {
                            "dose_amount_kg": 5,
                            "unit": "µg/kg/min",
                            "range": [2, 20]
                        }
                    }
                },
                {
                    "id": "lidocaine_2",
                    "name": "Lidocaïne 2% (Anti-arythmique)",
                    "concentration_label": "20 mg/mL (2%)",
                    "concentration_mg_ml": 20,
                    "is_high_alert": true,
                    "routes": ["IV", "IO"],
                    "dosage": {
                        "canine": {
                            "dose_mg_kg": 2.0,
                            "range_mg_kg": [2.0, 8.0]
                        },
                        "feline": {
                            "dose_mg_kg": 0.25,
                            "range_mg_kg": [0.25, 1.0],
                            "warning_msg": "Toxicité féline élevée."
                        }
                    }
                },
                {
                    "id": "furosemide",
                    "name": "Furosémide (Dimazon/Lasix)",
                    "concentration_label": "50 mg/mL",
                    "concentration_mg_ml": 50,
                    "is_high_alert": false,
                    "routes": ["IV", "IM", "SC"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 2.0,
                            "range_mg_kg": [1.0, 4.0]
                        }
                    }
                }
            ]
        },
        {
            "category_name": "ANTIBIO & COAGULATION",
            "items": [
                {
                    "id": "maropitant",
                    "name": "Maropitant (Cerenia)",
                    "concentration_label": "10 mg/mL",
                    "concentration_mg_ml": 10,
                    "is_high_alert": false,
                    "routes": ["IV (Lent)", "SC"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 1.0,
                            "frequency": "q24h"
                        }
                    }
                },
                {
                    "id": "metoclopramide",
                    "name": "Métoclopramide",
                    "concentration_label": "5 mg/mL",
                    "concentration_mg_ml": 5,
                    "is_high_alert": false,
                    "routes": ["IV", "IM", "SC"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 0.5,
                            "range_mg_kg": [0.2, 0.5]
                        }
                    },
                    "safety_guardrails": {
                        "contraindications": ["Obstruction GI"]
                    }
                },
                {
                    "id": "apomorphine",
                    "name": "Apomorphine (Emetic)",
                    "concentration_label": "Variable (ex: 5-10 mg/mL)",
                    "concentration_mg_ml": 10,
                    "is_high_alert": false,
                    "routes": ["IV", "SC", "Conjonctival"],
                    "dosage": {
                        "canine": {
                            "dose_mg_kg": 0.03,
                            "range_mg_kg": [0.02, 0.04]
                        },
                        "feline": {
                            "warning_msg": "INEFFICACE CHEZ LE CHAT. Utiliser Xylazine/Dexmed.",
                            "dose_mg_kg": 0
                        }
                    }
                },
                {
                    "id": "ampicillin",
                    "name": "Ampicilline",
                    "concentration_label": "Reconstitué (ex: 100mg/ml)",
                    "concentration_mg_ml": 100,
                    "is_high_alert": false,
                    "routes": ["IV", "IM"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 22.0
                        }
                    }
                },
                {
                    "id": "amoxicillin_clav",
                    "name": "Amox-Clav (Augmentin)",
                    "concentration_label": "Reconstitué (ex: 100mg/ml)",
                    "concentration_mg_ml": 100,
                    "is_high_alert": false,
                    "routes": ["IV"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 20.0
                        }
                    }
                },
                {
                    "id": "cefazolin",
                    "name": "Céfazoline",
                    "concentration_label": "Reconstitué",
                    "concentration_mg_ml": 100,
                    "is_high_alert": false,
                    "routes": ["IV", "IM"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 22.0
                        }
                    }
                },
                {
                    "id": "enrofloxacin",
                    "name": "Enrofloxacine (Baytril)",
                    "concentration_label": "50 mg/mL",
                    "concentration_mg_ml": 50,
                    "is_high_alert": true,
                    "routes": ["IV (Dilué)", "IM", "SC"],
                    "dosage": {
                        "canine": {
                            "dose_mg_kg": 5.0,
                            "range_mg_kg": [5.0, 20.0]
                        },
                        "feline": {
                            "dose_mg_kg": 5.0,
                            "warning_msg": "⛔️ TOXICITÉ RÉTINIENNE (CÉCITÉ) si > 5mg/kg/j"
                        }
                    },
                    "safety_guardrails": {
                        "dilution_hint": "IV: Diluer au 1/3 minimum et injecter sur 30 min (risque convulsif si rapide)"
                    }
                },
                {
                    "id": "metronidazole",
                    "name": "Métronidazole (IV)",
                    "concentration_label": "5 mg/mL (0.5%)",
                    "concentration_mg_ml": 5,
                    "is_high_alert": false,
                    "routes": ["IV Lent"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 10.0,
                            "range_mg_kg": [10.0, 15.0]
                        }
                    }
                },
                {
                    "id": "tranexamic_acid",
                    "name": "Acide Tranexamique",
                    "concentration_label": "100 mg/mL",
                    "concentration_mg_ml": 100,
                    "is_high_alert": false,
                    "routes": ["IV"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 10.0,
                            "range_mg_kg": [10.0, 20.0]
                        }
                    }
                },
                {
                    "id": "vitamin_k1",
                    "name": "Vitamine K1",
                    "concentration_label": "10 mg/mL",
                    "concentration_mg_ml": 10,
                    "is_high_alert": false,
                    "routes": ["SC (Préféré)", "IM (Hématome!)", "PO"],
                    "dosage": {
                        "common": {
                            "dose_mg_kg": 2.5,
                            "range_mg_kg": [2.5, 5.0],
                            "frequency": "Dose de charge intoxication raticide"
                        }
                    },
                    "safety_guardrails": {
                        "warning_msg": "IV risque anaphylaxie sévère -> utiliser SC."
                    }
                }
            ]
        }
    ]
};
