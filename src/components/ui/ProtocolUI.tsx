"use client";

import React from "react";
import { motion } from "framer-motion";

// --- SECTIONS & CONTAINERS ---

// --- SECTIONS & CONTAINERS ---

export const ProtocolContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="space-y-4 animate-fade-in pb-8 pt-2">
        {children}
    </div>
);

export const Section = ({ title, children, icon }: { title: string; children: React.ReactNode; icon?: string }) => (
    <section className="bg-white rounded-lg p-5 shadow-sm border border-slate-200">
        <h3 className="text-base font-bold text-ink mb-4 flex items-center gap-2 uppercase tracking-wide opacity-80">
            {icon && <span className="text-xl">{icon}</span>}
            {title}
        </h3>
        <div className="text-slate-600 leading-relaxed text-sm">
            {children}
        </div>
    </section>
);

// --- CARDS & DOSAGES ---

import { useAppStore } from "@/store/useAppStore";

interface DosageCardProps {
    title: string;
    value: string;
    unit: string;
    subtitle?: React.ReactNode;
    color?: "blue" | "slate" | "red" | "purple" | "green";
    icon?: string;
    dosage?: number; // Dosage en mg/kg (ou autre unité/kg)
    dosageRange?: [number, number]; // Plage de dosage
    concentration?: number; // Concentration en mg/mL
    route?: string; // Voie d'administration (IV, IM...)
    onShowAlternatives?: () => void; // Action pour afficher les alternatives
    intentionLabel?: string; // Override du label d'intention (ex: "Antibiotique", "Hémostatique")
}

export const DosageCard = ({ title, value, unit, subtitle, color = "blue", icon, dosage, dosageRange, concentration, route = "IV", onShowAlternatives, intentionLabel }: DosageCardProps) => {
    const { weightKg } = useAppStore();

    // Map colors to Intentions (approximate for now until data update)
    const baseIntention = {
        blue: { label: "1ère Intention", style: "bg-emerald-50 text-emerald-700 border-emerald-100", dot: "bg-emerald-500" },
        green: { label: "1ère Intention", style: "bg-emerald-50 text-emerald-700 border-emerald-100", dot: "bg-emerald-500" },
        purple: { label: "Alternative", style: "bg-blue-50 text-blue-700 border-blue-100", dot: "bg-blue-500" },
        red: { label: "Urgence / Escalade", style: "bg-amber-50 text-amber-800 border-amber-100", dot: "bg-amber-500" },
        slate: { label: "Info", style: "bg-slate-50 text-slate-600 border-slate-100", dot: "bg-slate-400" },
    }[color] || { label: "Traitement", style: "bg-slate-50 text-slate-600 border-slate-100", dot: "bg-slate-400" };

    const intention = {
        ...baseIntention,
        label: intentionLabel || baseIntention.label
    };

    // Calculs automatiques
    let doseDisplay: React.ReactNode = (
        <span className="text-slate-400 text-sm font-medium italic">Saisir poids...</span>
    );
    let volumeDisplay: React.ReactNode = null;
    let isLegacyMode = false;

    if (weightKg && weightKg > 0) {
        let totalDoseMin = 0;
        let totalDoseMax = 0;
        const hasRange = !!dosageRange;

        if (hasRange && dosageRange) {
            totalDoseMin = dosageRange[0] * weightKg;
            totalDoseMax = dosageRange[1] * weightKg;
        } else if (dosage) {
            totalDoseMin = dosage * weightKg;
            totalDoseMax = totalDoseMin;
        }

        if (totalDoseMin > 0) {
            // Display Dose
            const unitClean = unit.split("/")[0]; // "mg/kg" -> "mg" roughly
            doseDisplay = (
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-ink tracking-tight">
                        {hasRange ? `${totalDoseMin.toFixed(1)}-${totalDoseMax.toFixed(1)}` : totalDoseMin.toFixed(1)}
                    </span>
                    <span className="text-lg font-bold text-slate-500">{unitClean}</span>
                </div>
            );

            // Calculate Volume
            if (concentration && concentration > 0) {
                const volMin = totalDoseMin / concentration;
                const volMax = totalDoseMax / concentration;
                volumeDisplay = (
                    <div className="flex items-center gap-2 mt-1 p-2 bg-blue-50/50 rounded-lg border border-blue-100/50">
                        <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">Volume :</span>
                        <span className="font-bold text-blue-700">
                            {hasRange ? `${volMin.toFixed(2)} - ${volMax.toFixed(2)}` : volMin.toFixed(2)} mL
                        </span>
                    </div>
                );
            }
        } else {
            // Fallback Legacy: Value is presumed to be the calculated result (old way)
            isLegacyMode = true;
            doseDisplay = (
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-ink tracking-tight">
                        {value}
                    </span>
                    <span className="text-lg font-bold text-slate-500">{unit.replace("/kg", "")}</span>
                </div>
            );
        }
    }

    return (
        <div className="bg-white rounded-lg p-0 shadow-sm border border-slate-200 overflow-hidden relative group transition-shadow hover:shadow-md">
            {/* Header: Intention & Title */}
            <div className={`px-4 py-2 border-b border-slate-50 flex justify-between items-center ${intention.style} bg-opacity-30`}>
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${intention.dot}`} />
                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">{intention.label}</span>
                </div>
                {/* Icon (optional) */}
                {icon && <span className="opacity-50 text-lg">{icon}</span>}
            </div>

            <div className="p-4">
                {/* Title */}
                <h4 className="font-bold text-lg text-ink leading-tight mb-3">{title}</h4>

                <div className="flex gap-4 items-start">
                    {/* Main Dose Area (Left) */}
                    <div className="flex-1">
                        {/* Formula (Small) - Only show if NOT in legacy mode (otherwise value IS the result) */}
                        {!isLegacyMode && (
                            <div className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
                                <span>Formule:</span>
                                <span className="bg-slate-100 px-1.5 rounded text-slate-600 font-mono">{value} {unit}</span>
                            </div>
                        )}

                        {/* Calculated Dose (Big) */}
                        {doseDisplay}

                        {/* Volume (if available) */}
                        {volumeDisplay}
                    </div>

                    {/* Meta / Route (Right) */}
                    <div className="flex flex-col items-end gap-1">
                        <span className="px-2 py-1 rounded bg-slate-100 text-slate-600 text-xs font-bold uppercase">{route}</span>
                        {concentration && (
                            <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                                Conc. {concentration} mg/mL
                            </span>
                        )}
                    </div>
                </div>

                {/* Subtitle / Notes */}
                {subtitle && (
                    <div className="mt-3 text-sm text-slate-600 border-l-2 border-slate-200 pl-3 italic">
                        {subtitle}
                    </div>
                )}

                {/* Footer Actions (Conditional) */}
                {onShowAlternatives && (
                    <div className="mt-4 pt-3 border-t border-slate-50 flex justify-end">
                        <button
                            onClick={onShowAlternatives}
                            className="text-xs font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100"
                        >
                            Voir alternatives →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- ALERTS & LISTS ---

export const AlertBox = ({ type = "info", title, children }: { type?: "info" | "warning" | "critical"; title?: string; children: React.ReactNode }) => {
    const styles = {
        info: "bg-blue-50/50 border-blue-100 text-blue-800",
        warning: "bg-amber-50/50 border-amber-100 text-amber-900",
        critical: "bg-rose-50/50 border-rose-100 text-rose-900",
    }[type];

    const icon = {
        info: "ℹ️",
        warning: "⚠️",
        critical: "🚫",
    }[type];

    return (
        <div className={`p-4 rounded-2xl border ${styles} flex gap-3`}>
            <span className="text-xl shrink-0">{icon}</span>
            <div className="text-sm">
                {title && <strong className="block mb-1">{title}</strong>}
                {children}
            </div>
        </div>
    );
};

export const CheckList = ({ items }: { items: string[] }) => (
    <ul className="space-y-3">
        {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-700">
                <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">
                    ✓
                </div>
                <span>{item}</span>
            </li>
        ))}
    </ul>
);

export const CriticalList = ({ items, title }: { items: string[]; title?: string }) => (
    <div className="space-y-3">
        {title && <div className="font-bold text-rose-900 mb-2">{title}</div>}
        <ul className="space-y-3">
            {items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-rose-800 bg-rose-50/50 p-2 rounded-lg border border-rose-100/50">
                    <span className="text-rose-500 font-bold text-lg leading-none">×</span>
                    <span className="font-medium text-sm">{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

export const LinkList = ({ links }: { links: { label: string; url?: string; type?: "protocol" | "external" }[] }) => (
    <div className="grid gap-2">
        {links.map((link, idx) => {
            // Logic: Use provided URL, or generate Google Search URL
            const isProtocol = link.type === "protocol";
            const targetUrl = link.url ? link.url : `https://www.google.com/search?q=${encodeURIComponent(link.label + " veterinary guidelines")}`;

            // Always clickable now
            const isClickable = true;

            return (
                <a
                    key={idx}
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-md cursor-pointer active:scale-[0.98]"
                >
                    <div className="flex items-center gap-3">
                        <span className="text-xl p-2 bg-white rounded-xl shadow-sm">
                            {isProtocol ? "📄" : "🔗"}
                        </span>
                        <div className="flex flex-col">
                            <span className="font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                                {link.label}
                            </span>
                            {!link.url && (
                                <span className="text-xs text-blue-400 font-medium font-italic flex items-center gap-1">
                                    Rechercher sur Google ↗
                                </span>
                            )}
                        </div>
                    </div>
                    <span className="text-slate-300 group-hover:text-blue-400">→</span>
                </a>
            );
        })}
    </div>
);
