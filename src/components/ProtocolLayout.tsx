"use client";

import React, { useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PROTOCOLS } from "@/data/protocols";
import { useProtocolLock } from "@/context/ProtocolLockContext";
import { ArrowLeft } from "lucide-react"; // Assuming Lucide is used, or replace with SVG
import ContextEditorModal from "./ContextEditorModal"; // Assuming this exists or imports correct

type Tab = "general" | "examens" | "traitements" | "liens";

interface ProtocolLayoutProps {
    title: string;
    children: (tab: Tab) => React.ReactNode;
    hasExamens?: boolean;
    showDate?: boolean;
}

export const ProtocolLayout = ({ title, children, hasExamens = true }: ProtocolLayoutProps) => {
    const router = useRouter();
    const params = useParams();
    const slug = params?.slug as string;

    // Find current protocol and related data
    const currentProtocol = PROTOCOLS.find(p => p.slug === slug);
    const relatedProtocols = currentProtocol?.relatedProtocols?.map(s => PROTOCOLS.find(p => p.slug === s)).filter(Boolean);

    const { species, weightKg, setSpecies, setWeightKg } = useAppStore();

    // Tab state
    const [activeTab, setActiveTab] = useState<Tab>("traitements");

    // New state for header scroll
    const [isScrolled, setIsScrolled] = useState(false);

    // New state for context modal
    const [isContextModalOpen, setIsContextModalOpen] = useState(false);

    // Soft Paywall Lock
    const { isLocked } = useProtocolLock();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 pb-20 font-sans relative">
            {/* Header Sticky */}
            <header className={`sticky top-0 z-30 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm pt-2 pb-2" : "bg-transparent pt-4 pb-0"}`}>
                <div className="px-4 flex items-center gap-3">
                    <Link href="/" className="p-2 -ml-2 text-slate-500 hover:text-slate-800 transition-colors rounded-full hover:bg-slate-100/50">
                        {/* Lucide ArrowLeft or SVG Fallback */}
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                    </Link>
                    <h1 className={`font-bold text-slate-800 leading-tight transition-all ${isScrolled ? "text-lg" : "text-xl"}`}>
                        {title}
                    </h1>
                </div>

                {/* Patient Context Bar (Sticky under header) */}
                <div className="px-4 mt-2">
                    <div
                        onClick={() => setIsContextModalOpen(true)}
                        className="bg-white rounded-lg border border-slate-200 shadow-sm p-3 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all hover:border-blue-200 group"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-colors ${species ? 'bg-[#e0f2fe] text-[#0284c7]' : 'bg-slate-100 text-slate-400'}`}>
                                {species === "chien" && "🐶"}
                                {species === "chat" && "🐱"}
                                {!species && "?"}
                            </div>
                            <div>
                                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Patient</div>
                                <div className="font-bold text-slate-700 leading-none">
                                    {(species || weightKg) ? (
                                        <span>
                                            {species === "chien" ? "Chien" : species === "chat" ? "Chat" : "Espèce ?"}
                                            <span className="mx-1.5 text-slate-300">|</span>
                                            {weightKg ? `${weightKg} kg` : "Poids ?"}
                                        </span>
                                    ) : (
                                        <span className="text-slate-400 italic font-medium">Toucher pour définir...</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="text-blue-500 bg-blue-50 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide group-hover:bg-blue-100 transition-colors">
                            Modifier
                        </div>
                    </div>
                </div>

                {/* Tabs (Sticky under context) */}
                <div className="mt-4 border-b border-slate-200 px-4 flex gap-6 overflow-x-auto hide-scrollbar">
                    {[
                        { id: "general", label: "Général" },
                        { id: "examens", label: "Examens" },
                        { id: "traitements", label: "Traitements" },
                        { id: "liens", label: "Liens" }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as Tab)}
                            className={`pb-3 text-sm font-bold uppercase tracking-wide whitespace-nowrap transition-all border-b-2 ${activeTab === tab.id
                                    ? "text-[#2CA9BC] border-[#2CA9BC]"
                                    : "text-slate-400 border-transparent hover:text-slate-600"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </header>

            {/* Context Editor Modal */}
            <AnimatePresence>
                {isContextModalOpen && (
                    <ContextEditorModal
                        isOpen={isContextModalOpen}
                        onClose={() => setIsContextModalOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Content Area */}
            <main className="px-4 pt-4 relative">
                {/* Soft Paywall Overlay */}
                {isLocked && (
                    <div className="absolute inset-x-0 top-0 bottom-0 z-20 flex flex-col items-center pt-20 px-6 overflow-hidden">
                        {/* Blur Gradient */}
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[6px] transition-all duration-700" />

                        {/* Lock Content */}
                        <div className="relative z-30 w-full max-w-sm bg-white rounded-3xl shadow-2xl shadow-blue-900/10 p-8 border border-slate-100 text-center animate-fade-in-up">
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm transform -rotate-6">
                                🔒
                            </div>
                            <h3 className="text-xl font-black text-slate-800 mb-2">
                                Protocole Premium
                            </h3>
                            <p className="text-slate-500 mb-8 leading-relaxed">
                                Accédez à ce protocole clinique complet et à plus de 70 fiches d'urgence avec VetoGo+.
                            </p>

                            <Link href="/subscribe" className="block w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 transform transition active:scale-[0.98]">
                                Débloquer VetoGo+
                            </Link>

                            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                <span>Sans engagement</span>
                                <span>•</span>
                                <span>Annulable à tout moment</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Actual Content (Blurred if locked) */}
                <div className={`transition-all duration-500 ${isLocked ? "filter blur-sm opacity-50 pointer-events-none select-none h-[80vh] overflow-hidden" : ""}`}>
                    {children(activeTab)}

                    {/* Related Protocols in Liens tab */}
                    {activeTab === "liens" && relatedProtocols && relatedProtocols.length > 0 && (
                        <section className="mt-8 pt-8 border-t border-slate-200">
                            <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                                🔍 Voir aussi
                            </h3>
                            <div className="grid gap-3">
                                {relatedProtocols.map((p) => p && (
                                    <button
                                        key={p.slug}
                                        onClick={() => router.push(`/protocols/${p.slug}`)}
                                        className="flex items-center gap-3 p-4 rounded-lg bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-primary-light transition-all text-left group"
                                    >
                                        <div className="flex-1">
                                            <div className="font-bold text-ink group-hover:text-primary transition-colors">{p.title}</div>
                                            <div className="text-xs text-mute uppercase font-semibold">{p.category}</div>
                                        </div>
                                        <span className="text-slate-300 group-hover:text-primary">→</span>
                                    </button>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
};
