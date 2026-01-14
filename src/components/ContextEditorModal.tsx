"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";

interface ContextEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContextEditorModal({ isOpen, onClose }: ContextEditorModalProps) {
    const { species, weightKg, setSpecies, setWeightKg } = useAppStore();
    const [localWeight, setLocalWeight] = useState(weightKg?.toString() || "");

    const handleSave = () => {
        if (localWeight) setWeightKg(parseFloat(localWeight));
        else setWeightKg(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-xs relative z-10"
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-slate-800">Modifier le patient</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="space-y-5">
                    {/* Species Selection */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => setSpecies("chien")}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${species === 'chien' ? 'border-[#009EF0] bg-[#009EF0] text-white shadow-lg shadow-blue-500/20 scale-[1.02]' : 'border-slate-100 text-slate-400 hover:bg-slate-50 hover:border-slate-200'}`}
                        >
                            <span className="text-4xl mb-2">🐶</span>
                            <span className="text-sm font-bold uppercase tracking-wide">Chien</span>
                        </button>
                        <button
                            onClick={() => setSpecies("chat")}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${species === 'chat' ? 'border-[#009EF0] bg-[#009EF0] text-white shadow-lg shadow-blue-500/20 scale-[1.02]' : 'border-slate-100 text-slate-400 hover:bg-slate-50 hover:border-slate-200'}`}
                        >
                            <span className="text-4xl mb-2">🐱</span>
                            <span className="text-sm font-bold uppercase tracking-wide">Chat</span>
                        </button>
                    </div>

                    {/* Weight Input */}
                    <div className="relative">
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Poids (kg)</label>
                        <input
                            type="number"
                            value={localWeight}
                            onChange={(e) => setLocalWeight(e.target.value)}
                            placeholder="Ex: 15.5"
                            className="w-full text-3xl font-black p-4 rounded-xl border border-slate-200 focus:border-[#009EF0] focus:ring-4 focus:ring-blue-500/10 outline-none text-center text-slate-800 placeholder:text-slate-200"
                            autoFocus
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-900/10 transition-all active:scale-[0.98]"
                    >
                        Valider
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
