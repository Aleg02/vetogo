"use client";

import React, { useState } from "react";
import { useAppStore } from "@/store/useAppStore";

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
        </div>
    );
}
