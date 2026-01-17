"use client";

import { useMemo, useState, useEffect } from "react";
import { DrugItem, Species, DosageDetail } from "@/data/drug-data"; // Fixed Import
import { useMemo, useState } from "react";
import { DrugItem } from "@/data/drug-data"; // Fixed Import
import {
    formatPerKgUnit,
    normalizeUnitLabel,
    validateUnitCompatibility,
} from "@/lib/units";
import { ChevronDown, ChevronUp, AlertTriangle, Info, Syringe, Trash2 } from "lucide-react";

interface DoseResultCardProps {
    drug: DrugItem;
    species: string;
    weight: number;
    onRemove: () => void;
}

type VariantSpecies = "canine" | "feline" | "both";

interface DosageVariant {
    key: string;
    detail: DosageDetail;
    species: VariantSpecies;
    label: string;
}

const formatNumber = (value: number, decimals = 2) => {
    if (Number.isInteger(value)) {
        return value.toString();
    }

    return value.toFixed(decimals).replace(".", ",");
};

export function DoseResultCard({ drug, species, weight, onRemove }: DoseResultCardProps) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [showDetails, setShowDetails] = useState(false);
    const requiresConcentrationConfirmation = useMemo(() => {
        if (drug.requires_concentration_confirmation !== undefined) {
            return drug.requires_concentration_confirmation;
        }
        return /variable/i.test(drug.concentration_label);
    }, [drug]);
    const [hasConfirmedConcentration, setHasConfirmedConcentration] = useState(!requiresConcentrationConfirmation);

    useEffect(() => {
        setHasConfirmedConcentration(!requiresConcentrationConfirmation);
    }, [requiresConcentrationConfirmation, drug.id]);
    const [openDetails, setOpenDetails] = useState<Record<string, boolean>>({});

    const activeSpeciesKey = species === "chat" ? "feline" : "canine";
    const activeSpeciesLabel = species === "chat" ? "Chat" : "Chien";

    const dosageVariants = useMemo(() => {
        const variants = Object.entries(drug.dosage)
            .map(([key, detail]) => {
                if (!detail) return null;

                let variantSpecies: VariantSpecies = "both";

                if (key === "canine") variantSpecies = "canine";
                if (key === "feline") variantSpecies = "feline";

                const labelParts = [] as string[];

                if (detail.condition) {
                    labelParts.push(`Indication: ${detail.condition}`);
                }

                if (detail.route) {
                    labelParts.push(`Route: ${detail.route}`);
                }

                const label = labelParts.length > 0
                    ? labelParts.join(" • ")
                    : key === "common"
                        ? "Posologie standard"
                        : key.replace(/_/g, " ");

                return {
                    key,
                    detail,
                    species: variantSpecies,
                    label,
                } satisfies DosageVariant;
            })
            .filter(Boolean) as DosageVariant[];

        return variants.sort((a, b) => {
            const score = (variant: DosageVariant) => {
                if (variant.species === activeSpeciesKey) return 0;
                if (variant.species === "both") return 1;
                return 2;
            };

            return score(a) - score(b);
        });
    }, [drug.dosage, activeSpeciesKey]);

    const buildCalculation = (detail: DosageDetail) => {
        let doseVal = 0;
        let unit = "mg";
        let vol: number | null = 0;
        let formula = "";
        const canComputeVolume = !requiresConcentrationConfirmation || hasConfirmedConcentration;

        if (detail.dose_mg_kg) {
            doseVal = detail.dose_mg_kg;
            const totalDose = doseVal * weight;
            if (canComputeVolume) {
                vol = totalDose / drug.concentration_mg_ml;
                formula = `Vol = (${weight} kg × ${doseVal} mg/kg) / ${drug.concentration_mg_ml} mg/mL`;
            } else {
                vol = null;
            }
            unit = "mg";
        } else if (detail.dose_amount_kg) {
            doseVal = detail.dose_amount_kg;
            const totalAmount = doseVal * weight;
            // We assume concentration_mg_ml holds the unit concentration if unit_type is set
            // But looking at data, concentration_mg_ml might be in other units.
            // Let's rely on logic: volume = totalAmount / concentration
            // The data file maps unit-based drugs concentration_mg_ml to their unit value (e.g. 100 UI/ml -> 100)
            if (canComputeVolume) {
                vol = totalAmount / drug.concentration_mg_ml;
                formula = `Vol = (${weight} kg × ${doseVal} ${dosageRule.unit || 'U'}/kg) / ${drug.concentration_mg_ml} ${drug.unit_type || 'mg'}/mL`;
            } else {
                vol = null;
            }
            unit = dosageRule.unit || "U";
            vol = totalAmount / drug.concentration_mg_ml;
            const doseUnit = normalizeUnitLabel(dosageRule.unit || drug.unit_type || "U");
            const concentrationUnit = normalizeUnitLabel(drug.unit_type || "mg");
            const unitValidationError = validateUnitCompatibility(
                doseUnit,
                concentrationUnit
            );
            if (unitValidationError) {
                return {
                    error: unitValidationError,
                };
            }
            formula = `Vol = (${weight} kg × ${doseVal} ${formatPerKgUnit(doseUnit)}) / ${drug.concentration_mg_ml} ${concentrationUnit}/mL`;
            unit = doseUnit;
        }

        if (!doseVal) {
            return null;
        }

        return {
            dosePerKg: doseVal,
            totalDose: doseVal * weight,
            volume: vol,
            unit: unit,
            formula,
        };
    };

    const renderRange = (detail: DosageDetail, variantSpecies: VariantSpecies) => {
        if (!detail.range_mg_kg && !detail.range_ml_kg && !detail.range) {
            return null;
        }

        const prefix = variantSpecies === "canine"
            ? "Chien: "
            : variantSpecies === "feline"
                ? "Chat: "
                : "";

        if (detail.range_mg_kg) {
            return {
                min: `${prefix}${formatNumber(detail.range_mg_kg[0])} mg/kg`,
                max: `${prefix}${formatNumber(detail.range_mg_kg[1])} mg/kg`,
            };
        }

        if (detail.range_ml_kg) {
            return {
                min: `${prefix}${formatNumber(detail.range_ml_kg[0])} mL/kg`,
                max: `${prefix}${formatNumber(detail.range_ml_kg[1])} mL/kg`,
            };
        }

        if (detail.range) {
            const unitLabel = detail.unit || "";
            return {
                min: `${prefix}${formatNumber(detail.range[0])} ${unitLabel}`.trim(),
                max: `${prefix}${formatNumber(detail.range[1])} ${unitLabel}`.trim(),
            };
        }

    if (!calculation || !dosageRule || "error" in calculation) {
        const errorMessage =
            calculation && "error" in calculation
                ? calculation.error
                : "Erreur de données pour ce médicament.";
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 mb-4 mx-auto max-w-lg">
                <p className="text-red-600 font-bold">{errorMessage}</p>
            </div>
        );
    }

    // Warnings
    const showMinVolWarning = calculation.volume !== null && calculation.volume < 0.1;
    const showMaxDoseWarning = dosageRule.max_dose_mg_kg && (calculation.dosePerKg > dosageRule.max_dose_mg_kg);
    const showMinVolWarning = calculation.volume < 0.1;
    const showMaxDoseWarning = dosageRule.max_dose_mg_kg !== undefined && dosageRule.max_dose_mg_kg !== null
        ? calculation.dosePerKg >= dosageRule.max_dose_mg_kg
        : false;
    const blockingAlerts = drug.safety_guardrails?.blocking_alerts ?? [];
    const requiresConfirmation = showMinVolWarning || showMaxDoseWarning;

    useEffect(() => {
        if (requiresConfirmation) {
            setIsConfirmed(false);
        }
    }, [requiresConfirmation, calculation.volume, calculation.dosePerKg]);

    // Formatting
    const formattedVolume = calculation.volume !== null
        ? calculation.volume < 1
            ? calculation.volume.toFixed(2)
            : calculation.volume.toFixed(1)
        : "--";

    const formattedTotalDose = calculation.unit === "ml"
        ? calculation.volume.toFixed(1) // for ml/kg drugs, total dose is volume
        : calculation.totalDose < 0.01
            ? calculation.totalDose.toFixed(4)
            : calculation.totalDose.toFixed(2);


    const doseUnitDisplay = calculation.unit === "ml" ? "mL" : normalizeUnitLabel(calculation.unit);
    const dosePerKgUnit = formatPerKgUnit(doseUnitDisplay);


    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 border-l-4 border-l-[#009EF0] bg-white shadow-sm mb-4 mx-auto max-w-lg transition-all animate-in fade-in zoom-in-95 group">
            <div
                className="border-b border-slate-50 bg-white px-5 py-3 flex justify-between items-center cursor-pointer hover:bg-slate-50/50"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex gap-3 items-center">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#009EF0] text-white transform -rotate-12 shadow-sm shadow-blue-200">
                        <Syringe className="h-3.5 w-3.5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 text-[15px] leading-tight">{drug.name}</h3>
                        <p className="text-xs font-semibold text-slate-400">Espèce active : {activeSpeciesLabel}</p>
                    </div>
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
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </div>
            </div>

            {isExpanded && (
                <div className="animate-in slide-in-from-top-2 duration-200">
                    <div className="p-5 pt-4">

                        <div className="space-y-3 mb-5">
                            <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                                <span className="text-slate-500 font-medium">Dose</span>
                                <span className="font-bold text-slate-900">{calculation.dosePerKg.toString().replace('.', ',')} {dosePerKgUnit}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                                <span className="text-slate-500 font-medium">Dose calculée</span>
                                <span className="font-bold text-slate-900">{formattedTotalDose.replace('.', ',')} {doseUnitDisplay}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm pb-1">
                                <span className="text-slate-500 font-medium">Concentration</span>
                                <span className="font-bold text-slate-900">{drug.concentration_label}</span>
                            </div>
                            {drug.usual_concentrations && drug.usual_concentrations.length > 0 && (
                                <div className="text-xs text-slate-500">
                                    <p className="font-semibold text-slate-600">Concentrations usuelles</p>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {drug.usual_concentrations.map((conc) => (
                                            <span key={conc} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                                                {conc}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {drug.concentration_warning && (
                                <div className="flex items-start gap-2 text-xs font-semibold text-amber-700">
                                    <AlertTriangle className="h-4 w-4 flex-none fill-amber-100" />
                                    <span>{drug.concentration_warning}</span>
                                </div>
                            )}
                            {requiresConcentrationConfirmation && (
                                <label className="mt-2 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
                                    <input
                                        type="checkbox"
                                        className="mt-0.5 h-4 w-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                                        checked={hasConfirmedConcentration}
                                        onChange={(event) => setHasConfirmedConcentration(event.target.checked)}
                                    />
                                    <span>Confirmer la concentration avant calcul du volume.</span>
                                </label>
                            )}
                        </div>

                        <div className="rounded-xl bg-[#F0F6FA] p-4 text-center border border-[#E1EEF6] shadow-inner mb-4">
                            <div className="flex items-center justify-center gap-2 mb-1 text-[#006090]">
                                <Syringe className="h-4 w-4" />
                                <p className="text-sm font-bold">Volume à injecter</p>
                            </div>
                            {calculation.volume === null ? (
                                <p className="text-sm font-semibold text-[#006090]">
                                    Confirmer la concentration pour afficher le volume.
                                </p>
                            ) : (
                                <p className="text-4xl font-extrabold text-[#003B5C] tracking-tight">
                                    {formattedVolume.replace('.', ',')} <span className="text-xl font-bold text-[#006090]/70 ml-0.5">ml</span>
                                </p>
                            )}
                        </div>

                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="flex items-center gap-1.5 text-xs font-bold text-[#009EF0] underline underline-offset-2 hover:text-blue-700 transition-colors mb-3"
                        >
                            <Info className="h-3.5 w-3.5" />
                            Voir le détail du calcul
                        </button>

                        {/* Alerts */}
                        {(showMinVolWarning || showMaxDoseWarning || drug.safety_guardrails?.warning_msg || blockingAlerts.length > 0 || requiresConfirmation) && (
                            <div className="flex flex-col gap-3 animate-in slide-in-from-top-1">
                                <div className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                    Alertes cliniques critiques
                                </div>
                                {blockingAlerts.map((alert) => (
                                    <div key={alert} className="flex items-start gap-2 text-xs font-bold text-red-600">
                                        <AlertTriangle className="h-4 w-4 flex-none fill-red-100" />
                                        <span>{alert}</span>
                                    </div>
                                ))}
                                {showMaxDoseWarning && (
                                    <div className="flex items-start gap-2 text-xs font-bold text-amber-600">
                                        <AlertTriangle className="h-4 w-4 flex-none fill-amber-100" />
                                        <span>Dose max absolue atteinte ({dosageRule.max_dose_mg_kg} mg/kg).</span>
                                    </div>
                                );
                            }

                            if (!calculation) {
                                return (
                                    <div key={variant.key} className="rounded-xl border border-red-200 bg-red-50 p-4">
                                        <p className="text-red-600 font-bold">Erreur de données pour cette posologie.</p>
                                    </div>
                                );
                            }

                            const showMinVolWarning = calculation.volume < (drug.safety_guardrails?.min_volume_ml ?? 0.1);
                            const showMaxDoseWarning = variant.detail.max_dose_mg_kg && (calculation.dosePerKg > variant.detail.max_dose_mg_kg);

                            const formattedVolume = calculation.volume < 1
                                ? calculation.volume.toFixed(2)
                                : calculation.volume.toFixed(1);

                            const formattedTotalDose = calculation.unit === "ml"
                                ? calculation.volume.toFixed(1)
                                : calculation.totalDose < 0.01
                                    ? calculation.totalDose.toFixed(4)
                                    : calculation.totalDose.toFixed(2);

                            const doseUnitDisplay = calculation.unit === "ml" ? "mL" : calculation.unit;

                            return (
                                <div key={variant.key} className="rounded-xl border border-slate-200 bg-white shadow-sm">
                                    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{variant.label}</p>
                                            {variant.detail.instruction && (
                                                <p className="text-xs text-slate-500">Instruction : {variant.detail.instruction}</p>
                                            )}
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-wide text-[#009EF0] border border-blue-100 rounded-full px-2 py-1 bg-blue-50">
                                            {speciesBadgeLabel}
                                        </span>
                                    </div>
                                )}
                                {requiresConfirmation && (
                                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
                                        <p className="font-bold">Confirmation utilisateur requise</p>
                                        <p className="mt-1">
                                            Valider explicitement avant administration (volume &lt; 0,1 mL ou dose max absolue atteinte).
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => setIsConfirmed(true)}
                                            disabled={isConfirmed}
                                            className={`mt-2 inline-flex items-center rounded-md px-3 py-1 text-xs font-bold text-white transition-colors ${
                                                isConfirmed ? "bg-emerald-600" : "bg-amber-600 hover:bg-amber-700"
                                            }`}
                                        >
                                            {isConfirmed ? "Confirmation enregistrée" : "Je confirme"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                                    <div className="p-4">
                                        <div className="space-y-3 mb-5">
                                            <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                                                <span className="text-slate-500 font-medium">Dose</span>
                                                <span className="font-bold text-slate-900">{calculation.dosePerKg.toString().replace(".", ",")} {doseUnitDisplay}/kg</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                                                <span className="text-slate-500 font-medium">Dose calculée</span>
                                                <span className="font-bold text-slate-900">{formattedTotalDose.replace(".", ",")} {doseUnitDisplay}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm pb-1">
                                                <span className="text-slate-500 font-medium">Concentration</span>
                                                <span className="font-bold text-slate-900">{drug.concentration_label}</span>
                                            </div>
                                        </div>

                    {/* Details Panel */}
                    {showDetails && (
                        <div className="bg-slate-50 px-5 pb-5 pt-2 text-sm text-slate-600 border-t border-slate-100">
                            {calculation.formula && (
                                <div className="rounded-lg bg-white p-3 border border-slate-200 font-mono text-xs mb-3">
                                    {calculation.formula}
                                </div>
                            )}
                            {dosageRule.note && (
                                <p className="mb-2"><span className="font-bold">Note:</span> {dosageRule.note}</p>
                            )}
                            {dosageRule.frequency && (
                                <p><span className="font-bold">Fréquence:</span> {dosageRule.frequency}</p>
                            )}
                        </div>
                    )}
                                        <div className="rounded-xl bg-[#F0F6FA] p-4 text-center border border-[#E1EEF6] shadow-inner mb-4">
                                            <div className="flex items-center justify-center gap-2 mb-1 text-[#006090]">
                                                <Syringe className="h-4 w-4" />
                                                <p className="text-sm font-bold">Volume à injecter</p>
                                            </div>
                                            <p className="text-4xl font-extrabold text-[#003B5C] tracking-tight">
                                                {formattedVolume.replace(".", ",")} <span className="text-xl font-bold text-[#006090]/70 ml-0.5">ml</span>
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => setOpenDetails((prev) => ({ ...prev, [variant.key]: !prev[variant.key] }))}
                                            className="flex items-center gap-1.5 text-xs font-bold text-[#009EF0] underline underline-offset-2 hover:text-blue-700 transition-colors mb-3"
                                        >
                                            <Info className="h-3.5 w-3.5" />
                                            Voir le détail du calcul
                                        </button>

                                        {(showMinVolWarning || showMaxDoseWarning || drug.safety_guardrails?.warning_msg || variant.detail.warning_msg) && (
                                            <div className="flex flex-col gap-2 animate-in slide-in-from-top-1">
                                                {showMaxDoseWarning && (
                                                    <div className="flex items-start gap-2 text-xs font-bold text-amber-600">
                                                        <AlertTriangle className="h-4 w-4 flex-none fill-amber-100" />
                                                        <span>Dose max : {variant.detail.max_dose_mg_kg} mg/kg</span>
                                                    </div>
                                                )}
                                                {showMinVolWarning && (
                                                    <div className="flex items-start gap-2 text-xs font-bold text-amber-600">
                                                        <AlertTriangle className="h-4 w-4 flex-none fill-amber-100" />
                                                        <span> Volume très faible ({formattedVolume.replace(".", ",")} mL). Pensez à diluer. {drug.safety_guardrails?.dilution_hint}</span>
                                                    </div>
                                                )}
                                                {variant.detail.warning_msg && (
                                                    <div className="flex items-start gap-2 text-xs font-bold text-amber-600">
                                                        <AlertTriangle className="h-4 w-4 flex-none fill-amber-100" />
                                                        <span>{variant.detail.warning_msg}</span>
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

                                        {openDetails[variant.key] && (
                                            <div className="bg-slate-50 px-4 pb-4 pt-2 text-sm text-slate-600 border-t border-slate-100 rounded-lg">
                                                <div className="rounded-lg bg-white p-3 border border-slate-200 font-mono text-xs mb-3">
                                                    {calculation.formula}
                                                </div>
                                                {rangeDisplay && (
                                                    <div className="grid gap-1 mb-3">
                                                        <p><span className="font-bold">Dose minimale :</span> {rangeDisplay.min}</p>
                                                        <p><span className="font-bold">Dose maximale :</span> {rangeDisplay.max}</p>
                                                    </div>
                                                )}
                                                {variant.detail.note && (
                                                    <p className="mb-2"><span className="font-bold">Note:</span> {variant.detail.note}</p>
                                                )}
                                                {variant.detail.frequency && (
                                                    <p><span className="font-bold">Fréquence:</span> {variant.detail.frequency}</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
