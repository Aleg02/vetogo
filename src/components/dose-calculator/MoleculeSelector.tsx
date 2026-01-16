"use client";

import { useMemo, useState } from "react";
import { DRUG_DATA, DrugItem, Species } from "@/data/drug-data";
import { Search, X, ChevronDown } from "lucide-react";

interface MoleculeSelectorProps {
    species: string;
    selectedDrugs: DrugItem[];
    onSelectDrug: (drug: DrugItem) => void;
    onRemoveDrug: (drugId: string) => void;
}

export function MoleculeSelector({ species, selectedDrugs, onSelectDrug }: MoleculeSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const availableDrugs = useMemo(() => {
        // Map French species to English keys used in data
        const speciesKey = species === 'chat' ? 'feline' : 'canine';
        const config = DRUG_DATA.species_config[speciesKey];

        const forbidden = new Set(config?.forbidden_drugs || []);

        // Flatten all categories into a single list of items
        const allItems = DRUG_DATA.drugs.flatMap(cat => cat.items.map(item => ({ ...item, category: cat.category_name })));

        return allItems
            .filter(drug => !forbidden.has(drug.id))
            .filter(drug => drug.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [species, searchQuery]);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleSelect = (drug: DrugItem) => {
        onSelectDrug(drug);
        setIsOpen(false);
        setSearchQuery("");
    };

    return (
        <div className="relative mb-6 mx-auto max-w-lg">
            <label className="block text-sm font-bold text-slate-700 mb-2 px-1">
                Rechercher un médicament
            </label>

            {!isOpen ? (
                <button
                    onClick={toggleOpen}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-4 text-left shadow-sm hover:border-blue-400 focus:outline-none transition-all group"
                >
                    <div className="flex items-center gap-3 text-slate-400 group-hover:text-slate-500">
                        <Search className="h-5 w-5" />
                        <span className="font-medium text-base">Rechercher une molécule...</span>
                    </div>
                </button>
            ) : (
                <div className="absolute inset-x-0 top-0 z-50 overflow-hidden rounded-xl border border-[#009EF0] bg-white shadow-xl ring-4 ring-blue-500/10 animate-in fade-in zoom-in-95 duration-200">
                    <div className="relative border-b border-slate-100 p-2 bg-slate-50/50">
                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#009EF0]" />
                        <input
                            id="drug-search-input"
                            autoFocus
                            type="text"
                            placeholder="Nom du médicament..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg bg-transparent py-3 pl-10 pr-10 text-base font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
                        />
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-slate-200 p-2 rounded-full text-slate-400 transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                        {availableDrugs.length === 0 ? (
                            <div className="p-8 text-center text-slate-500">
                                <p className="font-medium">Aucun résultat</p>
                                <p className="text-xs text-slate-400 mt-1">Essayez un autre terme</p>
                            </div>
                        ) : (
                            <ul className="divide-y divide-slate-100">
                                {availableDrugs.map((drug) => (
                                    <li key={drug.id}>
                                        <button
                                            onClick={() => handleSelect(drug)}
                                            className="flex w-full flex-col px-4 py-3 text-left transition hover:bg-blue-50/80 active:bg-blue-100"
                                        >
                                            <span className="font-bold text-slate-900">{drug.name}</span>
                                            <span className="text-xs font-medium text-slate-500 mt-0.5">{drug.concentration_label} • <span className="text-blue-600/80">{drug.category}</span></span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
