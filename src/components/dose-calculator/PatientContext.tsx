"use client";

import { useEffect, useState } from "react";
import { Species } from "@/data/drug-data";

interface PatientContextProps {
    species: string | null;
    weight: number | null;
    onSpeciesChange: (species: any) => void;
    onWeightChange: (weight: number) => void;
    onEdit: () => void;
    isEditing: boolean;
}

export function PatientContext({
    species,
    weight,
    onSpeciesChange,
    onWeightChange,
    onEdit,
    isEditing,
}: PatientContextProps) {
    const [localWeight, setLocalWeight] = useState<string>(weight ? weight.toString() : "");

    useEffect(() => {
        setLocalWeight(weight ? weight.toString() : "");
    }, [weight]);

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalWeight(e.target.value);
        const val = parseFloat(e.target.value.replace(',', '.'));
        if (!isNaN(val) && val > 0) {
            onWeightChange(val);
        }
    };

    if (!isEditing && species && weight) {
        return (
            <div className="bg-white px-4 py-3 animate-in slide-in-from-top-2 border-b border-slate-100">
                <div className="flex items-center justify-between mx-auto max-w-lg">
                    <div className="flex items-center gap-4">
                        {/* Species Pill */}
                        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 ${species === "chien" ? "bg-blue-50 border-blue-100/50" : "bg-purple-50 border-purple-100/50"}`}>
                            <span className="text-xl leading-none">{species === "chien" ? "🐶" : "🐱"}</span>
                            <span className={`font-bold text-sm ${species === "chien" ? "text-blue-700" : "text-purple-700"}`}>
                                {species === "chien" ? "Chien" : "Chat"}
                            </span>
                        </div>

                        {/* Weight Pill */}
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 border-2 border-slate-200">
                            <span className="text-lg leading-none">⚖️</span>
                            <span className="font-bold text-slate-700 text-sm">
                                {weight.toString().replace('.', ',')} kg
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={onEdit}
                        className="text-xs font-bold text-[#009EF0] hover:text-[#008AC0] bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition-colors"
                    >
                        Modifier
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 shadow-sm border-b border-slate-100 rounded-b-3xl mb-6 mx-auto max-w-lg">
            <h2 className="text-lg font-bold text-slate-900 mb-4 px-1">Coordonnées du patient</h2>
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => onSpeciesChange("chien")}
                    className={`flex-1 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-4 transition-all duration-200 ${species === "chien"
                        ? "border-blue-500 bg-blue-50 text-blue-700 shadow-md transform scale-[1.02]"
                        : "border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                >
                    <span className="text-4xl filter drop-shadow-sm">🐶</span>
                    <span className="font-bold text-sm">Chien</span>
                </button>
                <button
                    onClick={() => onSpeciesChange("chat")}
                    className={`flex-1 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-4 transition-all duration-200 ${species === "chat"
                        ? "border-purple-500 bg-purple-50 text-purple-700 shadow-md transform scale-[1.02]"
                        : "border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                >
                    <span className="text-4xl filter drop-shadow-sm">🐱</span>
                    <span className="font-bold text-sm">Chat</span>
                </button>
            </div>

            <div className="relative">
                <label className="block text-sm font-bold text-slate-700 mb-2 px-1">
                    Poids de l'animal
                </label>
                <div className="relative group">
                    <input
                        type="number"
                        inputMode="decimal"
                        placeholder="Ex: 12.5"
                        value={localWeight}
                        onChange={handleWeightChange}
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-4 text-xl font-bold text-slate-900 placeholder:text-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                        kg
                    </span>
                </div>
            </div>
        </div>
    );
}
