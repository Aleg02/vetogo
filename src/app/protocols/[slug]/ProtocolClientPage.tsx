"use client";

import type { Protocol } from "@/data/protocols";
import type { ProtocolSection } from "@/data/protocolDetails";
import { useRouter } from "next/navigation";
import { HypovolemicShock } from "@/components/protocols/HypovolemicShock";

// MAPPING: Map slug -> Component
const AVAILABLE_PROTOCOLS: Record<string, React.ComponentType> = {
    "choc-hypovolemique": HypovolemicShock,
};

interface ProtocolClientPageProps {
    slug: string;
    protocol: Protocol | null;
    sections: ProtocolSection[];
    error?: string | null;
}

export default function ProtocolClientPage({
    slug,
    protocol,
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

    // Render the specific component
    return <ProtocolComponent />;
}
