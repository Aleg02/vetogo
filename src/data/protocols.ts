export type Protocol = {
  slug: string;
  title: string;
  version?: string;
  tags?: string[];
  icon: string;
  accentColor: string;
  accessLevel: "free" | "premium";
  sources?: { label: string; url?: string; type?: "external" | "protocol" }[];
  species?: "chien" | "chat" | "both";
  category?: "Cardio" | "Toxico" | "Perfusion" | "Parasites" | "Trauma" | "Fièvre" | "Neurologie" | "Respiratoire" | "Digestif" | "Urologie" | "Metabolique" | "Reproduction" | "Autre";
};

export const PROTOCOLS: Protocol[] = [
  {
    slug: "choc-hypovolemique",
    title: "Choc hypovolémique",
    version: "V1.0",
    tags: ["urgence", "choc", "perfusion"],
    icon: "🩸",
    accentColor: "#ef4444",
    accessLevel: "free",
    species: "both",
    category: "Perfusion",
    sources: [
      { label: "ACVECC Guidelines", url: "https://www.acvecc.org" },
      { label: "VECCS Recommandations", url: "https://veccs.org", type: "external" },
    ],
  },
  {
    slug: "anaphylaxie",
    title: "Anaphylaxie",
    version: "2024",
    tags: ["urgence", "allergie", "choc", "respiratoire"],
    icon: "⚡",
    accentColor: "#be185d", // Pink-700
    accessLevel: "free",
    species: "both",
    category: "Toxico", // ou Autre / Urgence si catégorie existe
    sources: [
      { label: "AAHA Fluid Therapy 2024", url: "https://www.aaha.org/aaha-guidelines/fluid-therapy/fluid-therapy-guidelines/", type: "external" },
      { label: "Plumb's Veterinary Drugs", url: "https://plumbs.com/", type: "external" },
    ],
  },
  {
    slug: "status-epilepticus",
    title: "Crise Convulsive / Status",
    version: "2024",
    tags: ["urgence", "neuro", "crise"],
    icon: "🧠",
    accentColor: "#7e22ce", // Purple-700
    accessLevel: "free",
    species: "both",
    category: "Neurologie",
    sources: [
      { label: "ACVIM Consensus 2024", url: "https://www.acvim.org/consensus-statements", type: "external" },
    ],
  },
  {
    slug: "hypoglycemie",
    title: "Hypoglycémie Aiguë",
    version: "2024",
    tags: ["urgence", "metabolisme", "glucose"],
    icon: "🍬",
    accentColor: "#f59e0b", // Amber-500
    accessLevel: "free",
    species: "both",
    category: "Autre",
    sources: [
      { label: "Plumb's", url: "https://plumbs.com/", type: "external" },
    ],
  },
  {
    slug: "detresse-respiratoire",
    title: "Détresse Respiratoire",
    version: "2024",
    tags: ["urgence", "respiratoire", "oap"],
    icon: "💨",
    accentColor: "#0ea5e9", // Sky-500
    accessLevel: "free",
    species: "both",
    category: "Respiratoire",
    sources: [
      { label: "BSAVA Emergency", url: "https://www.bsava.com/", type: "external" },
    ],
  },
  {
    slug: "douleur-aigue",
    title: "Douleur Aiguë Sévère",
    version: "2024",
    tags: ["urgence", "analgesie", "douleur"],
    icon: "💊",
    accentColor: "#dc2626", // Red-600
    accessLevel: "free",
    species: "both",
    category: "Trauma", // ou Autre
    sources: [
      { label: "Wound Management Guidelines", url: "https://wsava.org/global-guidelines/", type: "external" },
    ],
  },
  {
    slug: "polytraumatisme",
    title: "Polytraumatisé",
    version: "2024",
    tags: ["urgence", "choc", "fast", "triage"],
    icon: "🚑",
    accentColor: "#b91c1c", // Red-700
    accessLevel: "free",
    species: "both",
    category: "Trauma",
    sources: [
      { label: "ACVECC Trauma Guidelines", url: "https://www.acvecc.org", type: "external" },
    ],
  },
  {
    slug: "intoxication",
    title: "Intoxication Suspectée",
    version: "2024",
    tags: ["urgence", "toxique", "vomissement"],
    icon: "☠️",
    accentColor: "#4b5563", // Gray-600
    accessLevel: "free",
    species: "both",
    category: "Toxico",
    sources: [
      { label: "Antibiotics for Skin Infections", url: "https://iscaid.org/guidelines", type: "external" },
    ],
  },
  {
    slug: "coup-de-chaleur",
    title: "Coup de Chaleur",
    version: "2024",
    tags: ["urgence", "thermique", "sirs"],
    icon: "☀️",
    accentColor: "#ea580c", // Orange-600
    accessLevel: "free",
    species: "both",
    category: "Fièvre",
    sources: [
      { label: "ACVECC Heatstroke" },
    ],
  },
  {
    slug: "insuffisance-cardiaque",
    title: "Insuffisance Cardiaque Congestive",
    version: "2024",
    tags: ["urgence", "cardio", "oap"],
    icon: "💔",
    accentColor: "#ec4899", // Pink-500
    accessLevel: "free",
    species: "both",
    category: "Cardio",
    sources: [
      { label: "ACVIM Consensus", url: "https://www.acvim.org/consensus-statements", type: "external" },
    ],
  },
  {
    slug: "arret-cardio-respiratoire",
    title: "Arrêt Cardio-Respiratoire (RCP)",
    version: "2024",
    tags: ["urgence", "reanimation", "cpr", "recover"],
    icon: "💓",
    accentColor: "#000000", // Black/Slate-900 usually, but let's use a dark grey or red
    accessLevel: "free",
    species: "both",
    category: "Cardio",
    sources: [
      { label: "RECOVER GUIDELINES 2024" },
    ],
  },
  {
    slug: "vomissements",
    title: "Vomissements Aigus Sévères",
    version: "2024",
    tags: ["digestif", "urgence", "pancreatite"],
    icon: "🤮",
    accentColor: "#84cc16", // Lime-500
    accessLevel: "free",
    species: "both",
    category: "Digestif",
    sources: [
      { label: "ACVIM Consensus", url: "https://www.acvim.org/consensus-statements", type: "external" },
    ],
  },
  {
    slug: "diarrhee",
    title: "Diarrhée Aiguë",
    version: "2024",
    tags: ["digestif", "ahds", "parvo"],
    icon: "💩",
    accentColor: "#854d0e", // Yellow-800 (Brownish)
    accessLevel: "free",
    species: "both",
    category: "Digestif",
    sources: [
      { label: "ACVIM / ENOVAT" },
    ],
  },
  {
    slug: "hemorragie-aigue",
    title: "Hémorragie Aiguë",
    version: "2024",
    tags: ["urgence", "trauma", "choc", "transfusion"],
    icon: "🩸",
    accentColor: "#dc2626", // Red-600
    accessLevel: "free",
    species: "both",
    category: "Trauma",
    sources: [
      { label: "VECCS Guidelines" },
    ],
  },
  {
    slug: "sepsis",
    title: "Sepsis Suspecté",
    version: "2024",
    tags: ["urgence", "infection", "choc", "antibiotiques"],
    icon: "🦠",
    accentColor: "#7c3aed", // Violet-600
    accessLevel: "free",
    species: "both",
    category: "Fièvre",
    sources: [
      { label: "Surviving Sepsis Campaign" },
    ],
  },
  {
    slug: "obstruction-urinaire",
    title: "Obstruction Urinaire (Globe)",
    version: "2024",
    tags: ["urologie", "chat-bouche", "hyperkaliemie", "urgence"],
    icon: "🐈",
    accentColor: "#ea580c", // Orange-600
    accessLevel: "free",
    species: "both",
    category: "Autre",
    sources: [
      { label: "ACVECC Guidelines", url: "https://www.acvecc.org", type: "external" },
    ],
  },
  {
    slug: "insuffisance-renale-aigue",
    title: "Insuffisance Rénale Aiguë",
    version: "2024",
    tags: ["nephrologie", "aki", "iris", "oligurie"],
    icon: "💧",
    accentColor: "#3b82f6", // Blue-500
    accessLevel: "free",
    species: "both",
    category: "Autre",
    sources: [
      { label: "IRIS Kidney Guidelines" },
    ],
  },
  {
    slug: "dilatation-torsion-estomac",
    title: "Dilatation-Torsion Estomac (GDV)",
    version: "2024",
    tags: ["urgence", "chirurgie", "choc", "digestif"],
    icon: "🥣",
    accentColor: "#be123c", // Rose-700
    accessLevel: "free",
    species: "chien",
    category: "Digestif",
    sources: [
      { label: "ACVS Guidelines", url: "https://www.acvs.org/small-animal/", type: "external" },
    ],
  },
  {
    slug: "cesarienne-dystocie",
    title: "Césarienne / Dystocie",
    version: "2024",
    tags: ["reproduction", "neonatologie", "urgence", "chirurgie"],
    icon: "🍼",
    accentColor: "#ec4899", // Pink-500
    accessLevel: "free",
    species: "both",
    category: "Autre",
    sources: [
      { label: "RECOVER Guidelines", url: "https://recoverinitiative.org/", type: "external" },
    ],
  },
  {
    slug: "anemie-aigue",
    title: "Anémie Aiguë (IMHA)",
    version: "2024",
    tags: ["hematologie", "imha", "transfusion", "corticoïdes"],
    icon: "🛡️",
    accentColor: "#dc2626", // Red-600
    accessLevel: "free",
    species: "both",
    category: "Autre",
    sources: [
      { label: "ACVIM Consensus", url: "https://www.acvim.org/consensus-statements", type: "external" },
    ],
  },
  {
    slug: "sedation-procedurale",
    title: "Sédation Procédurale",
    version: "2024",
    tags: ["anesthesie", "sedation", "urgence", "douleur"],
    icon: "💤",
    accentColor: "#6366f1", // Indigo-500
    accessLevel: "free",
    species: "both",
    category: "Autre",
    sources: [
      { label: "BSAVA Anaesthesia" },
    ],
  },
  {
    slug: "fluidotherapie",
    title: "Fluidothérapie & Calculs",
    version: "2024",
    tags: ["perfusion", "maintenance", "deshydratation", "calcul"],
    icon: "💧",
    accentColor: "#3b82f6", // Blue-500
    accessLevel: "free",
    species: "both",
    category: "Perfusion",
    sources: [
      { label: "AAHA Fluid Therapy" },
    ],
  },
  {
    slug: "euthanasie",
    title: "Euthanasie (Technique)",
    version: "2024",
    tags: ["fin-de-vie", "procedure", "sedation", "pentobarbital"],
    icon: "🕊️",
    accentColor: "#64748b", // Slate-500 (Respectful grey)
    accessLevel: "free",
    species: "both",
    category: "Autre",
    sources: [
      { label: "AVMA Guidelines" },
    ],
  },
  {
    slug: "gastro-enterite",
    title: "Gastro-Entérite Aiguë",
    version: "2024",
    tags: ["digestif", "vomissement", "diarrhee", "nutrition"],
    icon: "🤢",
    accentColor: "#84cc16", // Lime-500
    accessLevel: "free",
    species: "both",
    category: "Digestif",
    sources: [
      { label: "BSAVA Gastro" },
    ],
  },
  {
    slug: "pancreatite-aigue",
    title: "Pancréatite Aiguë",
    version: "2024",
    tags: ["pancreas", "douleur", "vomissement", "nutrition"],
    icon: "🔥",
    accentColor: "#ea580c", // Orange-600
    accessLevel: "free",
    species: "both",
    category: "Digestif",
    sources: [
      { label: "ACVIM Consensus", url: "https://www.acvim.org/consensus-statements", type: "external" },
    ],
  },
  {
    slug: "corps-etranger-digestif",
    title: "Corps Étranger Digestif",
    version: "2024",
    tags: ["chirurgie", "obstruction", "digestif", "urgence"],
    icon: "🧦",
    accentColor: "#dc2626", // Red-600
    accessLevel: "free",
    species: "both",
    category: "Digestif",
    sources: [
      { label: "ACVS Guidelines", url: "https://www.acvs.org/small-animal/", type: "external" },
    ],
  },
  {
    slug: "constipation-megacolon",
    title: "Constipation & Mégacôlon",
    version: "2024",
    tags: ["digestif", "chat", "lavement", "obstruction"],
    icon: "💩",
    accentColor: "#a16207", // Yellow-800 (Brownish)
    accessLevel: "free",
    species: "both",
    category: "Digestif",
    sources: [
      { label: "ISFM Guidelines" },
    ],
  },
  {
    slug: "ileus-paralytique",
    title: "Iléus Paralytique",
    version: "2024",
    tags: ["chirurgie", "transit", "post-op", "cri"],
    icon: "🐌",
    accentColor: "#67e8f9", // Cyan-300
    accessLevel: "free",
    species: "both",
    category: "Digestif",
    sources: [
      { label: "ACVS Guidelines", url: "https://www.acvs.org/small-animal/", type: "external" },
    ],
  },
  {
    slug: "hemorragie-digestive-haute",
    title: "Hémorragie Digestive Haute",
    version: "2024",
    tags: ["urgence", "sang", "ulcere", "anemie"],
    icon: "🩸",
    accentColor: "#991b1b", // Red-800
    accessLevel: "free",
    species: "both",
    category: "Digestif",
    sources: [
      { label: "ACVIM Consensus", url: "https://www.acvim.org/consensus-statements", type: "external" },
    ],
  },
  {
    slug: "ictere-aigu",
    title: "Ictère Aigu",
    version: "2024",
    tags: ["foie", "jaunisse", "lipidose", "urgence"],
    icon: "🍋",
    accentColor: "#facc15", // Yellow-400
    accessLevel: "free",
    species: "both",
    category: "Digestif",
    sources: [
      { label: "WSAVA Liver", url: "https://wsava.org/global-guidelines/liver-diseases/", type: "external" },
    ],
  },
  {
    slug: "insuffisance-renale-chronique",
    title: "IRC Décompensée",
    version: "2024",
    tags: ["rein", "uremie", "chat", "senior"],
    icon: "📉",
    accentColor: "#fb923c", // Orange-400
    accessLevel: "free",
    species: "both",
    category: "Urologie",
    sources: [
      { label: "IRIS Guidelines", url: "http://www.iris-kidney.com/guidelines/", type: "external" },
    ],
  },
  {
    slug: "cystite-aigue",
    title: "Cystite Aiguë (UTI)",
    version: "2019",
    tags: ["urine", "infection", "amoxicilline", "vessie"],
    icon: "🦠",
    accentColor: "#ec4899", // Pink-500
    accessLevel: "free",
    species: "both",
    category: "Urologie",
    sources: [
      { label: "ISCAID Guidelines", url: "https://iscaid.org/guidelines", type: "external" },
    ],
  },
  {
    slug: "pyelonephrite",
    title: "Pyélonéphrite",
    version: "2019",
    tags: ["rein", "infection", "fievre", "antibio"],
    icon: "🌡️",
    accentColor: "#dc2626", // Red-600
    accessLevel: "free",
    species: "both",
    category: "Urologie",
    sources: [
      { label: "ISCAID Guidelines", url: "https://iscaid.org/guidelines", type: "external" },
    ],
  },
  {
    slug: "dysurie-aigue",
    title: "Dysurie Aiguë (Spasme)",
    version: "2024",
    tags: ["urine", "spasme", "prazosine", "retention"],
    icon: "⏸️",
    accentColor: "#a855f7", // Purple-500
    accessLevel: "free",
    species: "both",
    category: "Urologie",
    sources: [
      { label: "Plumbs Veterinary Drugs", url: "https://plumbs.com/", type: "external" },
    ],
  },
  {
    slug: "urolithiase-gestion",
    title: "Urolithiases",
    version: "2024",
    tags: ["cristaux", "struvite", "oxalate", "calculs"],
    icon: "💎",
    accentColor: "#64748b", // Slate-500
    accessLevel: "free",
    species: "both",
    category: "Urologie",
    sources: [
      { label: "ACVIM Consensus", url: "https://www.acvim.org/consensus-statements", type: "external" },
    ],
  },
  {
    slug: "hyperkaliemie",
    title: "Hyperkaliémie",
    version: "2024",
    tags: ["coeur", "urgence", "potassium", "bradycardie"],
    icon: "⚡",
    accentColor: "#ef4444", // Red-500
    accessLevel: "free",
    species: "both",
    category: "Metabolique",
    sources: [
      { label: "TVP Emergency", url: "https://todaysveterinarypractice.com/category/emergency-critical-care/", type: "external" },
    ],
  },
  {
    slug: "acidocetose-diabetique",
    title: "Acidocétose (DKA)",
    version: "2024",
    tags: ["diabete", "insuline", "cetonurie", "urgence"],
    icon: "🧪",
    accentColor: "#f97316", // Orange-500
    accessLevel: "free",
    species: "both",
    category: "Metabolique",
    sources: [
      { label: "AAHA Diabetes", url: "https://www.aaha.org/aaha-guidelines/diabetes-management/diabetes-management-guidelines/", type: "external" },
    ],
  },
  {
    slug: "hyperglycemie-hhs",
    title: "Hyperglycémie (HHS)",
    version: "2024",
    tags: ["diabete", "glucose", "coma", "urgence"],
    icon: "🧠",
    accentColor: "#8b5cf6", // Violet-500
    accessLevel: "free",
    species: "both",
    category: "Metabolique",
    sources: [
      { label: "TVP Emergency", url: "https://todaysveterinarypractice.com/category/emergency-critical-care/", type: "external" },
    ],
  },
  {
    slug: "hypocalcemie-eclampsie",
    title: "Hypocalcémie (Eclampsie)",
    version: "2024",
    tags: ["calcium", "tetanie", "chiot", "lactation"],
    icon: "⚡",
    accentColor: "#f472b6", // Pink-400
    accessLevel: "free",
    species: "both",
    category: "Metabolique",
    sources: [
      { label: "Plumbs Vet Drugs", url: "https://plumbs.com/", type: "external" },
    ],
  },
  {
    slug: "pyometre",
    title: "Pyomètre",
    version: "2024",
    tags: ["uterus", "infection", "chirurgie", "alizin"],
    icon: "✂️",
    accentColor: "#be123c", // Rose-700
    accessLevel: "free",
    species: "both",
    category: "Reproduction",
    sources: [
      { label: "VetEducation", url: "https://veteducation.com/", type: "external" },
    ],
  },
  {
    slug: "reanimation-neonatale",
    title: "Réanimation Néonatale",
    version: "2024",
    tags: ["chiot", "chaton", "cpr", "naissance"],
    icon: "👶",
    accentColor: "#38bdf8", // Sky-400
    accessLevel: "free",
    species: "both",
    category: "Reproduction",
    sources: [
      { label: "RECOVER Guidelines", url: "https://recoverinitiative.org/", type: "external" },
    ],
  },
  {
    slug: "mammite-mastite",
    title: "Mammite (Mastite)",
    version: "2024",
    tags: ["lait", "infection", "chiot", "antibio"],
    icon: "🌡️",
    accentColor: "#fb7185", // Rose-400
    accessLevel: "free",
    species: "both",
    category: "Reproduction",
    sources: [
      { label: "Plumbs Vet Drugs", url: "https://plumbs.com/", type: "external" },
    ],
  },
  {
    slug: "paraphimosis",
    title: "Paraphimosis",
    version: "2024",
    tags: ["penis", "urgence", "sucre", "oedeme"],
    icon: "🍦",
    accentColor: "#3b82f6", // Blue-500
    accessLevel: "free",
    species: "chien",
    category: "Reproduction",
    sources: [
      { label: "VetStream", url: "https://www.vetstream.com/", type: "external" },
    ],
  },
  {
    slug: "prostatite",
    title: "Prostatite",
    version: "2024",
    tags: ["prostate", "infection", "enrofloxacine", "castration"],
    icon: "📉",
    accentColor: "#475569", // Slate-600
    accessLevel: "free",
    species: "chien",
    category: "Reproduction",
    sources: [
      { label: "Clinician's Brief", url: "https://www.cliniciansbrief.com/", type: "external" },
    ],
  },
  {
    slug: "asthme-felin",
    title: "Asthme Félin (Crise)",
    version: "2024",
    tags: ["chat", "respiratoire", "ventoline", "corticoide"],
    icon: "🌬️",
    accentColor: "#a855f7", // Purple-500
    accessLevel: "free",
    species: "chat",
    category: "Respiratoire",
    sources: [
      { label: "TVP Emergency", url: "https://todaysveterinarypractice.com/category/emergency-critical-care/", type: "external" },
    ],
  },
  {
    slug: "pneumonie",
    title: "Pneumonie",
    version: "2024",
    tags: ["poumon", "aspiration", "antibiotique", "toux"],
    icon: "🩺",
    accentColor: "#f87171", // Red-400
    accessLevel: "free",
    species: "both",
    category: "Respiratoire",
    sources: [
      { label: "ISCAID Guidelines", url: "https://iscaid.org/guidelines", type: "external" },
    ],
  },
  {
    slug: "epanchement-pleural",
    title: "Épanchement Pleural",
    version: "2024",
    tags: ["thorax", "drainage", "liquide", "respiratoire"],
    icon: "💧",
    accentColor: "#0ea5e9", // Sky-500
    accessLevel: "free",
    species: "both",
    category: "Respiratoire",
    sources: [
      { label: "Textbook of Vet Int Med", url: "https://search.worldcat.org/title/textbook-of-veterinary-internal-medicine/oclc/1004505041", type: "external" },
    ],
  },
  {
    slug: "oedeme-pulmonaire-nc",
    title: "Œdème Pulmonaire (NC)",
    version: "2024",
    tags: ["poumon", "electrocution", "noyade", "respiratoire"],
    icon: "⚡",
    accentColor: "#f59e0b", // Amber-500
    accessLevel: "free",
    species: "both",
    category: "Respiratoire",
    sources: [
      { label: "VetStream", url: "https://www.vetstream.com/", type: "external" },
    ],
  },
  {
    slug: "toux-aigue",
    title: "Toux Aiguë (Antitussifs)",
    version: "2024",
    tags: ["toux", "sirop", "codeine", "tracheite"],
    icon: "🌬️",
    accentColor: "#64748b", // Slate-500
    accessLevel: "free",
    species: "both",
    category: "Respiratoire",
    sources: [
      { label: "Plumb", url: "https://plumbs.com/", type: "external" },
    ],
  },
  {
    slug: "detresse-respi-chronique",
    title: "Détresse Respi Chronique (BPCO/Fibrose)",
    version: "2024",
    tags: ["fibrose", "westie", "sildenafil", "bpco"],
    icon: "🫁",
    accentColor: "#78716c", // Stone-500
    accessLevel: "free",
    species: "chien",
    category: "Respiratoire",
    sources: [
      { label: "Textbook of Vet Int Med", url: "https://search.worldcat.org/title/textbook-of-veterinary-internal-medicine/oclc/1004505041", type: "external" },
    ],
  },
  {
    slug: "boiterie-aigue",
    title: "Boiterie Aiguë",
    version: "2024",
    tags: ["os", "fracture", "panosteite", "douleur"],
    icon: "🦴",
    accentColor: "#f97316", // Orange-500
    accessLevel: "free",
    species: "both",
    category: "Trauma",
    sources: [
      { label: "WSAVA Pain Mgmt", url: "https://wsava.org/global-guidelines/global-pain-council-guidelines/", type: "external" },
    ],
  },
  {
    slug: "fracture-fermee",
    title: "Fracture Fermée",
    version: "2024",
    tags: ["os", "immobilisation", "robert-jones", "trauma"],
    icon: "🦴",
    accentColor: "#3b82f6", // Blue-500
    accessLevel: "free",
    species: "both",
    category: "Trauma",
    sources: [
      { label: "AO Vet", url: "https://www.aofoundation.org/vet", type: "external" },
    ],
  },
  {
    slug: "plaie-morsure",
    title: "Plaie / Morsure",
    version: "2024",
    tags: ["peau", "infection", "drain", "lavage"],
    icon: "✂️",
    accentColor: "#ef4444", // Red-500
    accessLevel: "free",
    species: "both",
    category: "Trauma",
    sources: [
      { label: "VetStream", url: "https://www.vetstream.com/", type: "external" },
    ],
  },
  {
    slug: "brulure",
    title: "Brûlure",
    version: "2024",
    tags: ["peau", "feu", "chimique", "parkland"],
    icon: "🔥",
    accentColor: "#dc2626", // Red-600
    accessLevel: "free",
    species: "both",
    category: "Trauma",
    sources: [
      { label: "Rule of Nines", url: "https://www.merckvetmanual.com/emergency-medicine-and-critical-care/burns/burns-in-animals", type: "external" },
    ],
  },
  {
    slug: "hernie-diaphragmatique",
    title: "Hernie Diaphragmatique",
    version: "2024",
    tags: ["respiratoire", "trauma", "chirurgie", "choc"],
    icon: "🫁",
    accentColor: "#7c3aed", // Violet-600
    accessLevel: "free",
    species: "both",
    category: "Trauma",
    sources: [
      { label: "ACVS", url: "https://www.acvs.org/small-animal/", type: "external" },
    ],
  },
  {
    slug: "abdomen-aigu-chirurgical",
    title: "Abdomen Aigu Chirurgical",
    version: "2024",
    tags: ["chirurgie", "peritonite", "sepsis", "uroabdomen"],
    icon: "🔪",
    accentColor: "#be123c", // Rose-700
    accessLevel: "free",
    species: "both",
    category: "Trauma",
    sources: [
      { label: "Textbook of Vet Int Med", url: "https://search.worldcat.org/title/textbook-of-veterinary-internal-medicine/oclc/1004505041", type: "external" },
    ],
  },
  {
    slug: "syndrome-vestibulaire",
    title: "Syndrome Vestibulaire",
    version: "2024",
    tags: ["neurologie", "tete-penchee", "nystagmus", "cerenia"],
    icon: "🌀",
    accentColor: "#8b5cf6", // Violet-500
    accessLevel: "free",
    species: "both",
    category: "Neurologie",
    sources: [
      { label: "Neuro Vet", url: "https://www.acvim.org/specialties/neurology", type: "external" },
    ],
  },
  {
    slug: "paralysie-aigue",
    title: "Paralysie Aiguë (IVDD)",
    version: "2024",
    tags: ["hernie", "dos", "paralysie", "scanner"],
    icon: "♿",
    accentColor: "#a855f7", // Purple-500
    accessLevel: "free",
    species: "chien",
    category: "Neurologie",
    sources: [
      { label: "ACVIM Consensus", url: "https://www.acvim.org/consensus-statements", type: "external" },
    ],
  },
  {
    slug: "suspicion-compression-medullaire",
    title: "Compression Médullaire (Diag)",
    version: "2024",
    tags: ["neurologie", "localisation", "fce", "tumeur"],
    icon: "📍",
    accentColor: "#64748b", // Slate-500
    accessLevel: "free",
    species: "both",
    category: "Neurologie",
    sources: [
      { label: "Neuro Localization", url: "https://www.vetfolio.com/learn/article/neurologic-localization", type: "external" },
    ],
  },
  {
    slug: "tremblements-myoclonies",
    title: "Tremblements / Intox",
    version: "2024",
    tags: ["permethrine", "metaldehyde", "tremblement", "lipides"],
    icon: "〰️",
    accentColor: "#16a34a", // Green-600
    accessLevel: "free",
    species: "both",
    category: "Neurologie",
    sources: [
      { label: "Clinician's Brief", url: "https://www.cliniciansbrief.com/", type: "external" },
    ],
  },
  {
    slug: "intoxication-anticoagulants",
    title: "Anticoagulants (Rats)",
    version: "2024",
    tags: ["vitamine-k", "poison", "sang", "hemorragie"],
    icon: "🐀",
    accentColor: "#dc2626", // Red-600
    accessLevel: "free",
    species: "both",
    category: "Toxico",
    sources: [
      { label: "Plumb's", url: "https://plumbs.com/", type: "external" },
    ],
  },
  {
    slug: "intoxication-xylitol",
    title: "Intoxication Xylitol",
    version: "2024",
    tags: ["sucre", "hypoglycemie", "foie", "insuline"],
    icon: "🍬",
    accentColor: "#e11d48", // Rose-600
    accessLevel: "free",
    species: "chien",
    category: "Toxico",
    sources: [
      { label: "ASPCA Poison", url: "https://www.aspca.org/pet-care/animal-poison-control", type: "external" },
    ],
  },
  {
    slug: "intoxication-ains",
    title: "Intoxication AINS (Ibuprofène)",
    version: "2024",
    tags: ["ibuprofene", "rein", "ulcere", "misoprostol"],
    icon: "💊",
    accentColor: "#f97316", // Orange-500
    accessLevel: "free",
    species: "both",
    category: "Toxico",
    sources: [
      { label: "VET Girl", url: "https://vetgirlontherun.com/", type: "external" },
    ],
  },
  {
    slug: "intoxication-paracetamol",
    title: "Paracétamol (Chat)",
    version: "2024",
    tags: ["chat", "anemie", "oedeme", "nac"],
    icon: "🐈",
    accentColor: "#000000", // Black/Dark
    accessLevel: "free",
    species: "chat",
    category: "Toxico",
    sources: [
      { label: "ISFM", url: "https://icatcare.org/veterinary/isfm/", type: "external" },
    ],
  },
  {
    slug: "desequilibres-electrolytiques",
    title: "Électrolytes (K+, Na+)",
    version: "2024",
    tags: ["potassium", "sodium", "perfusion", "calcul"],
    icon: "🧪",
    accentColor: "#eab308", // Yellow-500
    accessLevel: "free",
    species: "both",
    category: "Perfusion",
    sources: [
      { label: "Fluid Therapy", url: "https://www.aaha.org/aaha-guidelines/fluid-therapy/fluid-therapy-guidelines/", type: "external" },
    ],
  },
  {
    slug: "surveillance-perfusion",
    title: "Surveillance Perfusion",
    version: "2024",
    tags: ["nursing", "catheter", "surcharge", "pompe"],
    icon: "👁️",
    accentColor: "#3b82f6", // Blue-500
    accessLevel: "free",
    species: "both",
    category: "Perfusion",
    sources: [
      { label: "Nursing Guidelines", url: "https://www.aaha.org/", type: "external" },
    ],
  },
  {
    slug: "metrite-post-partum",
    title: "Métrite Post-Partum",
    version: "2024",
    tags: ["reproduction", "sepsis", "chiot", "naissance"],
    icon: "🍼",
    accentColor: "#be185d", // Pink-700
    accessLevel: "free",
    species: "both",
    category: "Reproduction",
    sources: [
      { label: "Theriogenology", url: "https://www.theriogenology.org/", type: "external" },
    ],
  },
  {
    slug: "fievre-indeterminee",
    title: "Fièvre (FOI)",
    version: "2024",
    tags: ["hyperthermie", "infection", "diagnostic"],
    icon: "🌡️",
    accentColor: "#dc2626", // Red-600
    accessLevel: "free",
    species: "both",
    category: "Autre", // ou Médecine Interne
    sources: [
      { label: "ACVIM", url: "https://www.acvim.org/", type: "external" },
    ],
  },
  {
    slug: "abces-cutane",
    title: "Abcès / Infection Peau",
    version: "2024",
    tags: ["plaie", "morsure", "chat", "pus"],
    icon: "🩹",
    accentColor: "#16a34a", // Green-600
    accessLevel: "free",
    species: "both",
    category: "Autre",
    sources: [
      { label: "Wound Care", url: "https://wsava.org/global-guidelines/", type: "external" },
    ],
  },
  {
    slug: "insuffisance-hepatique-aigue",
    title: "Insuffisance Hépatique Aiguë",
    version: "2024",
    tags: ["foie", "ictere", "coagulation", "neuro"],
    icon: "☣️",
    accentColor: "#d97706", // Amber-600
    accessLevel: "free",
    species: "both",
    category: "Metabolique", // ou Toxico
    sources: [
      { label: "Internal Medicine", url: "https://www.acvim.org/", type: "external" },
    ],
  },
  {
    slug: "douleur-chronique",
    title: "Douleur Chronique / Arthrose",
    version: "2024",
    tags: ["oa", "cancer", "palliative", "librela"],
    icon: "🦴",
    accentColor: "#4f46e5", // Indigo-600
    accessLevel: "free",
    species: "both",
    category: "Autre",
    sources: [
      { label: "Pain Management", url: "https://wsava.org/global-guidelines/global-pain-council-guidelines/", type: "external" },
    ],
  },
  {
    slug: "soins-palliatifs",
    title: "Soins Palliatifs",
    version: "2024",
    tags: ["fin-vie", "euthanasie", "confort", "qol"],
    icon: "💜",
    accentColor: "#9333ea", // Purple-600
    accessLevel: "free",
    species: "both",
    category: "Autre",
    sources: [
      { label: "Hospice Care", url: "https://www.iaahpc.org/", type: "external" },
    ],
  },
];
