"use client";

import React from "react";
import Image from "next/image";
import { useAppStore } from "@/store/useAppStore";

export const SpeciesSelector = () => {
    const { species, setSpecies } = useAppStore();

    return (
        <div className="grid grid-cols-2 gap-4 mb-2 mt-12">
            <button
                onClick={() => setSpecies("chien")}
                className={`flex flex-col items-center justify-end h-28 md:h-36 pb-3 rounded-3xl transition-all duration-300 border-2 ${species === "chien"
                    ? "border-[#009EF0] bg-[#eefaff] shadow-xl scale-105 z-10"
                    : "border-slate-100 bg-white hover:bg-slate-50 grayscale hover:grayscale-0 opacity-70 hover:opacity-100"
                    }`}
            >
                <div className="relative w-20 h-20 md:w-28 md:h-28 drop-shadow-sm mb-auto mt-2">
                    <Image
                        src="/dog2.png"
                        alt="Chien"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                <span className={`font-bold text-lg transition-colors ${species === "chien" ? "text-[#1e3a8a]" : "text-slate-400"}`}>
                    Chien
                </span>
            </button>

            <button
                onClick={() => setSpecies("chat")}
                className={`flex flex-col items-center justify-end h-28 md:h-36 pb-3 rounded-3xl transition-all duration-300 border-2 ${species === "chat"
                    ? "border-[#009EF0] bg-[#ecfdf5] shadow-xl scale-105 z-10"
                    : "border-slate-100 bg-white hover:bg-slate-50 grayscale hover:grayscale-0 opacity-70 hover:opacity-100"
                    }`}
            >
                <div className="relative w-20 h-20 md:w-28 md:h-28 drop-shadow-sm mb-auto mt-auto">
                    <Image
                        src="/cat2.png"
                        alt="Chat"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                <span className={`font-bold text-lg transition-colors ${species === "chat" ? "text-[#065f46]" : "text-slate-400"}`}>
                    Chat
                </span>
            </button>
        </div>
    );
};
