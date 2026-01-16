"use client";

import React from "react";
import Link from "next/link";

const CATEGORIES = [
    { label: "Urgences", slug: "Urgences", emoji: "🚨", color: "bg-red-50" },
    { label: "Toxico", slug: "Toxico", emoji: "🧪", color: "bg-green-50" },
    { label: "Trauma", slug: "Trauma", emoji: "🤕", color: "bg-orange-50" },
    { label: "Respiratoire", slug: "Respiratoire", emoji: "🫁", color: "bg-cyan-50" },
    { label: "Neurologie", slug: "Neurologie", emoji: "🧠", color: "bg-purple-50" },
    { label: "Cardio", slug: "Cardio", emoji: "❤️", color: "bg-blue-50" },
    { label: "Urologie", slug: "Urologie", emoji: "💧", color: "bg-sky-50" },
    { label: "Digestif", slug: "Digestif", emoji: "🍖", color: "bg-pink-50" },
    { label: "Repro", slug: "Reproduction", emoji: "🍼", color: "bg-rose-50" },
];

export const CategoryGrid = () => {
    return (
        <div className="grid grid-cols-3 gap-3 p-4">
            {CATEGORIES.slice(0, 6).map((cat) => (
                <Link
                    key={cat.slug}
                    href={`/?category=${cat.slug}`} // Assuming homepage filtering or search page
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border border-transparent hover:border-black/5 hover:shadow-sm transition-all active:scale-95 ${cat.color}`}
                >
                    <div className="relative mb-2 text-4xl">
                        {cat.emoji}
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{cat.label}</span>
                </Link>
            ))}
        </div>
    );
};
