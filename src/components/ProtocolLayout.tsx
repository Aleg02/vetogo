"use client";

import React, { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PROTOCOLS } from "@/data/protocols";

type Tab = "general" | "examens" | "traitements" | "liens";

interface ProtocolLayoutProps {
    title: string;
    children: (tab: Tab) => React.ReactNode;
    hasExamens?: boolean;
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

    // Edit mode state for context
    const [isEditing, setIsEditing] = useState(false);
    const [localWeight, setLocalWeight] = useState(weightKg?.toString() || "");

    const handleSaveContext = () => {
        if (localWeight) setWeightKg(parseFloat(localWeight));
        else setWeightKg(null);
        setIsEditing(false);
    };

    const allTabs: { id: Tab; label: string; icon: string; color: string }[] = [
        { id: "general", label: "Général", icon: "📋", color: "text-blue-600" },
        { id: "examens", label: "Examens", icon: "🩺", color: "text-purple-600" },
        { id: "traitements", label: "Traitements", icon: "💉", color: "text-red-600" },
        { id: "liens", label: "Liens", icon: "🔗", color: "text-slate-600" },
    ];

    const tabs = allTabs.filter(t => t.id !== "examens" || hasExamens);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center font-sans text-slate-900">
            <div className="w-full max-w-md bg-white min-h-screen shadow-2xl flex flex-col ring-1 ring-black/5">

                {/* Sticky Glass Header */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
                    <div className="px-4 py-3 flex items-center justify-between">
                        <button
                            onClick={() => router.back()}
                            className="p-2 -ml-2 text-slate-500 hover:text-slate-800 transition-colors rounded-full hover:bg-slate-100/50"
                            aria-label="Retour"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                        </button>

                        {/* LOGO ALWAYS VISIBLE */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                            <Link href="/">
                                <Image
                                    src="/vetogologo.png"
                                    alt="VetoGo"
                                    width={80}
                                    height={24}
                                    className="h-6 w-auto opacity-90 transition hover:opacity-100"
                                />
                            </Link>
                        </div>

                        <div className="w-8" /> {/* Spacer */}
                    </div>

                    {/* Protocol Title (Sub-header) */}
                    <div className="px-5 pb-3">
                        <h1 className="text-xl font-bold text-slate-800 leading-tight text-center">{title}</h1>
                    </div>

                    {/* Interactive Context Bar */}
                    <div className="mx-4 mb-3">
                        <AnimatePresence mode="wait">
                            {!isEditing ? (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    onClick={() => {
                                        setLocalWeight(weightKg?.toString() || "");
                                        setIsEditing(true);
                                    }}
                                    className="bg-slate-900 text-white rounded-2xl px-4 py-3 shadow-lg shadow-slate-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-between group"
                                >
                                    {/* Species Display */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl pt-1">{species === "chat" ? "🐱" : "🐶"}</span>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold group-hover:text-blue-300 transition-colors">Patient</span>
                                            <span className="font-bold text-base capitalize">{species || "Sélectionner"}</span>
                                        </div>
                                    </div>

                                    {/* Weight Display */}
                                    <div className="flex items-center gap-3 text-right border-l border-white/10 pl-3">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold group-hover:text-blue-300 transition-colors">Poids</span>
                                            <span className="font-bold text-lg text-[#009EF0]">{weightKg ? `${weightKg} kg` : "--"}</span>
                                        </div>
                                        <span className="text-slate-500 text-xs">✏️</span>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white border-2 border-[#009EF0] rounded-2xl p-4 shadow-xl"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Modifier le contexte</span>
                                        <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-red-500 text-sm">Annuler</button>
                                    </div>

                                    <div className="flex gap-4 mb-4">
                                        <button
                                            onClick={() => setSpecies("chien")}
                                            className={`flex-1 flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all ${species === 'chien' ? 'border-[#009EF0] bg-blue-50 text-blue-700' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}
                                        >
                                            <span className="text-2xl mb-1">🐶</span>
                                            <span className="text-xs font-bold">Chien</span>
                                        </button>
                                        <button
                                            onClick={() => setSpecies("chat")}
                                            className={`flex-1 flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all ${species === 'chat' ? 'border-[#009EF0] bg-blue-50 text-blue-700' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}
                                        >
                                            <span className="text-2xl mb-1">🐱</span>
                                            <span className="text-xs font-bold">Chat</span>
                                        </button>
                                    </div>

                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <input
                                                type="number"
                                                value={localWeight}
                                                onChange={(e) => setLocalWeight(e.target.value)}
                                                placeholder="Poids..."
                                                className="w-full text-lg font-bold p-3 rounded-xl border border-slate-200 focus:border-[#009EF0] focus:ring-2 focus:ring-blue-100 outline-none text-center"
                                                autoFocus
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">kg</span>
                                        </div>
                                        <button
                                            onClick={handleSaveContext}
                                            className="bg-[#009EF0] text-white px-5 rounded-xl font-bold shadow-lg shadow-blue-200 hover:shadow-xl active:scale-95 transition-all"
                                        >
                                            OK
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Navigation Tabs */}
                    <nav className="flex px-2 space-x-1 overflow-x-auto no-scrollbar scroll-smooth">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-300 relative ${isActive ? 'bg-white shadow-sm' : 'hover:bg-slate-100/50'}`}
                                >
                                    <span className={`text-xl mb-1 transition-transform duration-300 ${isActive ? 'scale-110' : 'grayscale opacity-60'}`}>{tab.icon}</span>
                                    <span className={`text-[10px] font-bold uppercase tracking-wide ${isActive ? tab.color : 'text-slate-400'}`}>{tab.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabIndicator"
                                            className={`absolute bottom-0 w-8 h-1 rounded-t-full ${tab.id === 'traitements' ? 'bg-red-500' : tab.id === 'general' ? 'bg-blue-500' : tab.id === 'examens' ? 'bg-purple-500' : 'bg-slate-500'}`}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto bg-slate-50/50">
                    <div className="p-4 safe-area-bottom pb-24">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.2 }}
                            >
                                {children(activeTab)}

                                {/* Automated "Voir aussi" / Related Protocols Section in Liens tab */}
                                {activeTab === "liens" && relatedProtocols && relatedProtocols.length > 0 && (
                                    <section className="mt-8 pt-8 border-t border-slate-200">
                                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                            🔍 Voir aussi
                                        </h3>
                                        <div className="grid gap-3">
                                            {relatedProtocols.map((p) => p && (
                                                <button
                                                    key={p.slug}
                                                    onClick={() => router.push(`/ protocols / ${p.slug} `)}
                                                    className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-left group"
                                                >
                                                    <span className="text-2xl p-2 bg-slate-50 rounded-xl">{p.icon}</span>
                                                    <div className="flex-1">
                                                        <div className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{p.title}</div>
                                                        <div className="text-xs text-slate-500 uppercase font-semibold">{p.category}</div>
                                                    </div>
                                                    <span className="text-slate-300 group-hover:text-blue-400">→</span>
                                                </button>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    );
};
