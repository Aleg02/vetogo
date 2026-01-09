"use client";

import React from "react";
import { motion } from "framer-motion";

// --- SECTIONS & CONTAINERS ---

export const ProtocolContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="space-y-6 animate-fade-in pb-8 pt-2">
        {children}
    </div>
);

export const Section = ({ title, children, icon }: { title: string; children: React.ReactNode; icon?: string }) => (
    <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100/50">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            {icon && <span className="text-xl">{icon}</span>}
            {title}
        </h3>
        <div className="text-slate-600 leading-relaxed">
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
}

export const DosageCard = ({ title, value, unit, subtitle, color = "blue", icon, dosage, dosageRange, concentration }: DosageCardProps) => {
    const { weightKg } = useAppStore();

    const colorStyles = {
        blue: "bg-gradient-to-br from-blue-50 to-indigo-50/50 border-blue-100 text-blue-900 ring-blue-100",
        slate: "bg-gradient-to-br from-slate-50 to-gray-50/50 border-slate-200 text-slate-900 ring-slate-100",
        red: "bg-gradient-to-br from-red-50 to-orange-50/50 border-red-100 text-red-900 ring-red-100",
        purple: "bg-gradient-to-br from-purple-50 to-fuchsia-50/50 border-purple-100 text-purple-900 ring-purple-100",
        green: "bg-gradient-to-br from-green-50 to-emerald-50/50 border-green-100 text-green-900 ring-green-100",
    }[color];

    const accentColor = {
        blue: "text-[#009EF0]",
        slate: "text-slate-700",
        red: "text-red-500",
        purple: "text-purple-600",
        green: "text-green-600",
    }[color];

    // Calculs automatiques
    let calculatedDisplay: React.ReactNode = null;

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
            // Si on a une concentration, on affiche aussi les mL
            let volumeMin = 0;
            let volumeMax = 0;
            if (concentration && concentration > 0) {
                volumeMin = totalDoseMin / concentration;
                volumeMax = totalDoseMax / concentration;
            }

            calculatedDisplay = (
                <div className="mt-3 pt-3 border-t border-black/5 flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase opacity-60">Pour {weightKg} kg :</span>
                    </div>
                    <div>
                        <div className={`text-2xl font-black ${accentColor}`}>
                            {hasRange ? `${totalDoseMin.toFixed(1)} - ${totalDoseMax.toFixed(1)}` : totalDoseMin.toFixed(1)}
                            <span className="text-sm font-bold ml-1 text-slate-500/80">{unit.replace("/kg", "").replace("kg", "")}</span>
                        </div>
                        {concentration && concentration > 0 && (
                            <div className="text-sm font-semibold text-slate-700 mt-1">
                                ou <span className="font-bold bg-white/50 px-1 py-0.5 rounded border border-black/5">
                                    {hasRange ? `${volumeMin.toFixed(2)} - ${volumeMax.toFixed(2)}` : volumeMin.toFixed(2)} mL
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
    }


    return (
        <div className={`relative rounded-3xl p-5 border shadow-sm ring-1 ring-inset ${colorStyles}`}>
            <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-sm uppercase tracking-wide opacity-80">{title}</h4>
                {icon && <span className="text-2xl opacity-90">{icon}</span>}
            </div>

            <div className="flex items-baseline gap-1 mb-2">
                <span className={`text-5xl font-black tracking-tighter ${accentColor}`}>
                    {value}
                </span>
                <span className="text-lg font-bold opacity-70">{unit}</span>
            </div>

            {calculatedDisplay}

            {subtitle && (
                <div className="text-sm font-medium opacity-80 border-t border-black/5 pt-2 mt-2">
                    {subtitle}
                </div>
            )}
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
