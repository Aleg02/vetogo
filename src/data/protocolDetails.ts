export type ProtocolSection = {
  title: string;
  bullets: string[];
};

export const PROTOCOL_DETAILS: Record<string, ProtocolSection[]> = {
  "choc-hypovolemique": [
    { title: "Voir le protocole interactif", bullets: ["Ce protocole utilise la nouvelle interface interactive."] }
  ]
};
