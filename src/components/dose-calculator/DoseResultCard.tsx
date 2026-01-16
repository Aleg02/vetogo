"use client";

import { useMemo, useState } from "react";
import { DrugItem, Species, DosageDetail } from "@/data/drug-data"; // Fixed Import
import { ChevronDown, ChevronUp, AlertTriangle, Info, Syringe, Trash2 } from "lucide-react";

interface DoseResultCardProps {
    drug: DrugItem;
    species: string;
    weight: number;
    onRemove: () => void;
}

export function DoseResultCard({ drug, species, weight, onRemove }: DoseResultCardProps) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [showDetails, setShowDetails] = useState(false);

    // Logic to determine the correct dosage rule
    const dosageRule = useMemo(() => {
        // Map species (chien/chat) to config keys (canine/feline)
        const speciesKey = species === 'chat' ? 'feline' : 'canine';

        // 1. Check species specific rule
        const speciesRule = drug.dosage[speciesKey];
        if (speciesRule) return speciesRule;

        // 2. Check common rule
        if (drug.dosage.common) return drug.dosage.common;

        // 3. Fallback (should not happen with valid data)
        return null;
    }, [drug, species]);

    const calculation = useMemo(() => {
        if (!dosageRule) return null;

        let doseVal = 0;
        let unit = "mg";
        let vol = 0;
        let formula = "";

        // CASE A: Dose defined in amount/kg (e.g. 0.01 mg/kg)
        if (dosageRule.dose_mg_kg) {
            doseVal = dosageRule.dose_mg_kg;
            const totalDose = doseVal * weight;
            vol = totalDose / drug.concentration_mg_ml;
            formula = `Vol = (${weight} kg × ${doseVal} mg/kg) / ${drug.concentration_mg_ml} mg/mL`;
            unit = "mg";
        }
        // CASE B: Dose defined in unit/kg (e.g. UI/kg or mEq/kg)
        else if (dosageRule.dose_amount_kg) {
            doseVal = dosageRule.dose_amount_kg;
            const totalAmount = doseVal * weight;
            // We assume concentration_mg_ml holds the unit concentration if unit_type is set
            // But looking at data, concentration_mg_ml might be in other units.
            // Let's rely on logic: volume = totalAmount / concentration
            // The data file maps unit-based drugs concentration_mg_ml to their unit value (e.g. 100 UI/ml -> 100)
            vol = totalAmount / drug.concentration_mg_ml;
            formula = `Vol = (${weight} kg × ${doseVal} ${dosageRule.unit || 'U'}/kg) / ${drug.concentration_mg_ml} ${drug.unit_type || 'mg'}/mL`;
            unit = dosageRule.unit || "U";
        }
        // CASE C: Dose defined in ml/kg directly (e.g. blood products)
        else if (dosageRule.dose_ml_kg) {
            vol = dosageRule.dose_ml_kg * weight;
            formula = `Vol = ${weight} kg × ${dosageRule.dose_ml_kg} mL/kg`;
            unit = "ml"; // The dose is volume itself
            doseVal = dosageRule.dose_ml_kg;
        }

        return {
            dosePerKg: doseVal,
            totalDose: doseVal * weight,
            volume: vol,
            unit: unit,
            formula
        };

    }, [dosageRule, weight, drug]);

    if (!calculation || !dosageRule) {
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 mb-4 mx-auto max-w-lg">
                <p className="text-red-600 font-bold">Erreur de données pour ce médicament.</p>
            </div>
        );
    }

    // Warnings
    const showMinVolWarning = calculation.volume < 0.1;
    const showMaxDoseWarning = dosageRule.max_dose_mg_kg && (calculation.dosePerKg > dosageRule.max_dose_mg_kg);

    // Formatting
    const formattedVolume = calculation.volume < 1
        ? calculation.volume.toFixed(2)
        : calculation.volume.toFixed(1);

    const formattedTotalDose = calculation.unit === "ml"
        ? calculation.volume.toFixed(1) // for ml/kg drugs, total dose is volume
        : calculation.totalDose < 0.01
            ? calculation.totalDose.toFixed(4)
            : calculation.totalDose.toFixed(2);


    const doseUnitDisplay = calculation.unit === "ml" ? "mL" : calculation.unit;


    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 border-l-4 border-l-[#009EF0] bg-white shadow-sm mb-4 mx-auto max-w-lg transition-all animate-in fade-in zoom-in-95 group">
            {/* Header */}
            <div className="border-b border-slate-50 bg-white px-5 py-3 flex justify-between items-center cursor-pointer hover:bg-slate-50/50" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex gap-3 items-center">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#009EF0] text-white transform -rotate-12 shadow-sm shadow-blue-200">
                        <Syringe className="h-3.5 w-3.5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-[15px] leading-tight">{drug.name}</h3>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove();
                        }}
                        className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
            </div>

            {/* Main Result */}
            {isExpanded && (
                <div className="animate-in slide-in-from-top-2 duration-200">
                    <div className="p-5 pt-4">

                        <div className="space-y-3 mb-5">
                            <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                                <span className="text-slate-500 font-medium">Dose</span>
                                <span className="font-bold text-slate-900">{calculation.dosePerKg.toString().replace('.', ',')} {doseUnitDisplay}/{calculation.unit === "ml" ? "kg" : "kg"}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                                <span className="text-slate-500 font-medium">Dose calculée</span>
                                <span className="font-bold text-slate-900">{formattedTotalDose.replace('.', ',')} {doseUnitDisplay}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm pb-1">
                                <span className="text-slate-500 font-medium">Concentration</span>
                                <span className="font-bold text-slate-900">{drug.concentration_label}</span>
                            </div>
                        </div>

                        <div className="rounded-xl bg-[#F0F6FA] p-4 text-center border border-[#E1EEF6] shadow-inner mb-4">
                            <div className="flex items-center justify-center gap-2 mb-1 text-[#006090]">
                                <Syringe className="h-4 w-4" />
                                <p className="text-sm font-bold">Volume à injecter</p>
                            </div>
                            <p className="text-4xl font-extrabold text-[#003B5C] tracking-tight">
                                {formattedVolume.replace('.', ',')} <span className="text-xl font-bold text-[#006090]/70 ml-0.5">ml</span>
                            </p>
                        </div>

                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="flex items-center gap-1.5 text-xs font-bold text-[#009EF0] underline underline-offset-2 hover:text-blue-700 transition-colors mb-3"
                        >
                            <Info className="h-3.5 w-3.5" />
                            Voir le détail du calcul
                        </button>

                        {/* Alerts */}
                        {(showMinVolWarning || showMaxDoseWarning || drug.safety_guardrails?.warning_msg) && (
                            <div className="flex flex-col gap-2 animate-in slide-in-from-top-1">
                                {showMaxDoseWarning && (
                                    <div className="flex items-start gap-2 text-xs font-bold text-amber-600">
                                        <AlertTriangle className="h-4 w-4 flex-none fill-amber-100" />
                                        <span>Dose max : {dosageRule.max_dose_mg_kg} mg</span>
                                    </div>
                                )}
                                {showMinVolWarning && (
                                    <div className="flex items-start gap-2 text-xs font-bold text-amber-600">
                                        <AlertTriangle className="h-4 w-4 flex-none fill-amber-100" />
                                        <span> Volume très faible ({formattedVolume.replace('.', ',')} mL). Pensez à diluer. {drug.safety_guardrails?.dilution_hint}</span>
                                    </div>
                                )}
                                {drug.safety_guardrails?.warning_msg && (
                                    <div className="flex items-start gap-2 text-xs font-bold text-amber-600">
                                        <AlertTriangle className="h-4 w-4 flex-none fill-amber-100" />
                                        <span>{drug.safety_guardrails.warning_msg}</span>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>

                    {/* Details Panel */}
                    {showDetails && (
                        <div className="bg-slate-50 px-5 pb-5 pt-2 text-sm text-slate-600 border-t border-slate-100">
                            <div className="rounded-lg bg-white p-3 border border-slate-200 font-mono text-xs mb-3">
                                {calculation.formula}
                            </div>
                            {dosageRule.note && (
                                <p className="mb-2"><span className="font-bold">Note:</span> {dosageRule.note}</p>
                            )}
                            {dosageRule.frequency && (
                                <p><span className="font-bold">Fréquence:</span> {dosageRule.frequency}</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
