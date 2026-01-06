"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 👇 utilitaire: on est côté client ?
const isClient = typeof window !== "undefined";

export type Species = "chien" | "chat" | null;

type AppState = {
  weightKg: number | null;
  setWeightKg: (v: number | null) => void;

  species: Species;
  setSpecies: (v: Species) => void;

  /** @deprecated Kept for legacy PediaGo protocols compatibility */
  ageLabel: string | null;
  setAgeLabel: (v: string | null) => void;
};

const INITIAL_STATE: Pick<AppState, "weightKg" | "species" | "ageLabel"> = {
  weightKg: null,
  species: null, // Par défaut, pas d'espèce sélectionnée
  ageLabel: null,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      setWeightKg: (v) => set({ weightKg: v }),
      setSpecies: (v) => set({ species: v }),
      setAgeLabel: (v) => set({ ageLabel: v }),
    }),
    {
      name: "vetogo-store",
      /**
       * ⚠️ IMPORTANT :
       * - côté client → on utilise localStorage
       * - côté serveur → on laisse `storage` undefined pour désactiver la rehydratation SSR
       */
      storage: isClient
        ? createJSONStorage(() => window.localStorage)
        : undefined,
    }
  )
);
