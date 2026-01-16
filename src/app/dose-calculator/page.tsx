"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Settings } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { PatientContext } from "@/components/dose-calculator/PatientContext";
import { MoleculeSelector } from "@/components/dose-calculator/MoleculeSelector";
import { DoseResultCard } from "@/components/dose-calculator/DoseResultCard";
import { MedicalDisclaimer } from "@/components/dose-calculator/MedicalDisclaimer";
import { DrugItem, Species } from "@/data/drug-data";

export default function DoseCalculatorPage() {

    const router = useRouter(); // Import needed if not present, check imports

    // Global Store
    const { species, weightKg, setSpecies, setWeightKg } = useAppStore();

    // Local state for UI
    const [isEditing, setIsEditing] = useState(false); // Default to false if data exists?
    const [selectedDrugs, setSelectedDrugs] = useState<DrugItem[]>([]);

    // Effect to open edit mode if no data
    useEffect(() => {
        if (!species || !weightKg) {
            setIsEditing(true);
        }
    }, [species, weightKg]);


    const handleSelectDrug = (drug: DrugItem) => {
        if (!selectedDrugs.find(d => d.id === drug.id)) {
            setSelectedDrugs([drug, ...selectedDrugs]);
        }
    };

    const handleRemoveDrug = (id: string) => {
        setSelectedDrugs(selectedDrugs.filter(d => d.id !== id));
    };

    const canSearch = species && weightKg && !isEditing;

    return (
        <div className="min-h-screen bg-slate-50 pb-32 font-sans">
            {/* Header White with Logo - Mockup Style */}
            <header className="bg-white pt-safe px-4 pb-2 shadow-sm sticky top-0 z-40 border-b border-slate-100">
                <div className="flex items-center justify-between max-w-lg mx-auto py-2">
                    <div className="flex items-center gap-1">
                        <Link href="/" className="text-slate-800 hover:text-[#009EF0] transition-colors p-1 -ml-2">
                            <ArrowLeft className="h-7 w-7" />
                        </Link>
                        <h1 className="font-bold text-2xl text-slate-900 tracking-tight">Calculateur</h1>
                    </div>


                </div>
            </header>

            {/* Sub-header Context Bar */}
            <div className="sticky top-[65px] z-30 max-w-lg mx-auto w-full px-0">
                <PatientContext
                    species={species}
                    weight={weightKg}
                    onSpeciesChange={setSpecies}
                    onWeightChange={setWeightKg}
                    isEditing={isEditing}
                    onEdit={() => setIsEditing(true)}
                />
            </div>

            <main className="pt-2 px-4 max-w-lg mx-auto space-y-4">

                {isEditing ? (
                    <div className="flex justify-center mt-6 animate-in fade-in slide-in-from-bottom-2">
                        <button
                            onClick={() => setIsEditing(false)}
                            disabled={!species || !weightKg}
                            className="w-full bg-[#009EF0] text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-blue-200 hover:bg-[#008AC0] transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Valider
                        </button>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

                        {species && (
                            <MoleculeSelector
                                species={species}
                                selectedDrugs={selectedDrugs}
                                onSelectDrug={handleSelectDrug}
                                onRemoveDrug={handleRemoveDrug}
                            />
                        )}

                        {selectedDrugs.length > 0 ? (
                            <div className="space-y-4 pb-8">
                                {selectedDrugs.map(drug => (
                                    species && weightKg && (
                                        <DoseResultCard
                                            key={drug.id}
                                            drug={drug}
                                            species={species}
                                            weight={weightKg}
                                            onRemove={() => handleRemoveDrug(drug.id)}
                                        />
                                    )
                                ))}

                                <div className="flex justify-center pt-4">
                                    <button
                                        onClick={() => setSelectedDrugs([])}
                                        className="text-sm font-bold text-slate-400 hover:text-red-500 transition-colors px-4 py-2"
                                    >
                                        Tout effacer
                                    </button>
                                </div>
                            </div>
                        ) : (
                            null
                        )}
                    </div>
                )}

                {/* Fallback welcome if editing/empty */}
                {(!species || !weightKg) && !isEditing && (
                    <div className="text-center mt-12 px-8">
                        <p className="text-slate-500 mb-2">👋 Configurez le patient pour commencer.</p>
                    </div>
                )}

                <div className="pb-8">
                    <MedicalDisclaimer />
                </div>
            </main>
        </div>
    );
}
