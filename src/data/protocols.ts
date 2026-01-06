export type Protocol = {
  slug: string;
  title: string;
  version?: string;
  tags?: string[];
  icon: string;
  accentColor: string;
  accessLevel: "free" | "premium";
  sources?: { label: string; url?: string }[];
  species?: "chien" | "chat" | "both";
  category?: "Cardio" | "Toxico" | "Perfusion" | "Parasites" | "Trauma" | "Fièvre" | "Neurologie" | "Respiratoire" | "Digestif" | "Autre";
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
      { label: "VECCS Recommandations", url: "https://veccs.org" },
    ],
  },
];
