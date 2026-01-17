"use client";

import React, { useState, useMemo } from "react";
import { useAppStore } from "@/store/useAppStore";
import { AlertTriangle } from "lucide-react";

export default function WeightInput() {
    const { weightKg, setWeightKg } = useAppStore();
    const [draft, setDraft] = useState<string | null>(null);

    const formatWeight = (val: number | null) =>
        val == null ? "" : String(val).replace(".", ",");

    const displayValue = draft ?? formatWeight(weightKg);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setDraft(val);

        const normalized = val.replace(/,/g, ".").trim();

        if (normalized === "") {
            setWeightKg(null);
            return;
        }

        if (/[.,]$/.test(normalized)) return;

        const parsed = Number(normalized);
        if (!Number.isNaN(parsed)) {
            setWeightKg(parsed);
        }
    };

    const handleBlur = () => {
        setDraft(null);
    };

    const warning = useMemo(() => {
        if (!weightKg) return null;
        if (weightKg < 0.5) return "Poids très faible (< 0.5kg). Exotique/Pédiatrie ?";
        if (weightKg > 80) return "Poids très élevé (> 80kg). Erreur de saisie ?";
        return null;
    }, [weightKg]);

    return (
        <div className="w-full">
            <div className="relative">
                <input
                    inputMode="decimal"
                    className="w-full rounded-2xl px-6 py-4 bg-white border border-slate-200 shadow-sm text-left text-lg font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009EF0] focus:border-transparent placeholder:text-slate-400"
                    value={displayValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Poids de l'animal..."
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                    kg
                </span>
            </div>
            {warning && (
                <div className="mt-2 flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 p-2 rounded-lg border border-amber-100 animate-in fade-in slide-in-from-top-1">
                    <AlertTriangle className="h-3.5 w-3.5 flex-none" />
                    <span>{warning}</span>
                </div>
            )}
        </div>
    );
}
