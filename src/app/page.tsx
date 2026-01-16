"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@supabase/auth-helpers-react";
import Fuse from "fuse.js";

import { PROTOCOLS, type Protocol } from "@/data/protocols";
import { useAppStore } from "@/store/useAppStore";
import { fetchCardsList } from "@/lib/cardsClient";
import { useUserEntitlements } from "@/hooks/useUserEntitlements";

import { Search, Calculator } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import ProtocolCard from "@/components/ProtocolCard";
import Disclaimer from "@/components/Disclaimer";
import PremiumAccessDialog from "@/components/PremiumAccessDialog";
import { SpeciesSelector } from "@/components/SpeciesSelector";
import WeightInput from "@/components/WeightInput";
import { CategoryGrid } from "@/components/CategoryGrid";

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session = useSession();
  const { canViewPremium } = useUserEntitlements();

  // Global Store
  const { species, weightKg, setWeightKg, setSpecies } = useAppStore();

  // Page State
  const categoryParam = searchParams.get("category");
  const [searchMode, setSearchMode] = useState(
    () => searchParams.get("mode") === "search" || !!categoryParam
  );
  const [query, setQuery] = useState("");
  const [protocols, setProtocols] = useState<Protocol[]>(PROTOCOLS);
  const [cardsLoading, setCardsLoading] = useState(true);
  const [cardsError, setCardsError] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const searchModeTrigger = useRef<"button" | null>(null);

  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length > 0;

  // Defaults (optional)
  useEffect(() => {
    // If needed, we could set default species here, but it's better to let user choose
  }, []);

  // Sync SearchMode if category param changes
  useEffect(() => {
    if (categoryParam) {
      setSearchMode(true);
      // Optional: scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [categoryParam]);

  // Focus management
  useEffect(() => {
    if (searchMode && searchModeTrigger.current === "button") {
      const raf = requestAnimationFrame(() => {
        searchInputRef.current?.focus();
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        searchModeTrigger.current = null;
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [searchMode]);

  // Exit search mode cleanup
  useEffect(() => {
    if (!searchMode) {
      searchModeTrigger.current = null;
      searchInputRef.current?.blur();
    }
  }, [searchMode]);

  // Load Data
  useEffect(() => {
    let active = true;
    const loadCards = async () => {
      setCardsLoading(true);
      const { data, error } = await fetchCardsList();
      if (!active) return;
      if (error) {
        console.warn("Supabase cards fetch error", error);
        setCardsError(error.message);
        setCardsLoading(false);
        return;
      }
      if (data && data.length > 0) {
        setProtocols(data);
      } else {
        setProtocols(PROTOCOLS);
      }
      setCardsError(null);
      setCardsLoading(false);
    };
    loadCards();
    return () => {
      active = false;
    };
  }, []);

  // Search & Filter Logic
  const fuse = useMemo(
    () =>
      new Fuse(protocols, {
        keys: ["title", "slug", "keywords"],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [protocols]
  );

  const hits: Protocol[] = useMemo(() => {
    let results = protocols;

    // 1. Text Search
    if (trimmedQuery.length > 0) {
      results = fuse.search(trimmedQuery).map((r) => r.item);
    } else {
      results = [...protocols].sort((a, b) =>
        a.title.localeCompare(b.title, "fr", { sensitivity: "base" })
      );
    }

    // 2. Category Filter
    if (categoryParam) {
      if (categoryParam === "Urgences") {
        results = results.filter((p) => p.tags?.includes("urgence"));
      } else {
        results = results.filter((p) => p.category === categoryParam);
      }
    }

    // 3. Species Filter
    if (species) {
      results = results.filter((p) => !p.species || p.species === "both" || p.species === species);
    }

    return results;
  }, [fuse, trimmedQuery, protocols, categoryParam, species]);

  // Premium / Auth
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [pendingPremiumTitle, setPendingPremiumTitle] = useState<string | null>(null);

  const closePremiumDialog = () => {
    setAuthDialogOpen(false);
    setPendingPremiumTitle(null);
  };

  const openProtocol = (slug: string, accessLevel: Protocol["accessLevel"], title: string) => {
    if (accessLevel === "premium" && !session) {
      setPendingPremiumTitle(title);
      setAuthDialogOpen(true);
      return;
    }
    router.push(`/protocols/${slug}`);
  };

  const resetHomepage = () => {
    router.push("/");
    setQuery("");
    setSearchMode(false);
    searchModeTrigger.current = null;
    searchInputRef.current?.blur();
    searchInputRef.current?.blur();
    // setWeightKg(null); // Removed to persist weight as per request
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Logo click handler (uses your existing reset behavior)
  const onLogoClick = () => {
    resetHomepage();
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Accent Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#009EF0] via-[#27C3DD] to-[#009EF0]" />

      <div className="flex min-h-[calc(100vh-4px)] flex-col items-center">
        {/* HEADER */}
        <header className="w-full max-w-[420px] px-6 pt-6 pb-2">
          <div className="flex justify-center items-center mb-2 relative">
            {/* Logo (clickable + spring animation) */}
            <div className="flex-1 flex justify-center">
              <motion.button
                type="button"
                onClick={onLogoClick}
                aria-label="Retour à l’accueil"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="
                  inline-flex items-center justify-center
                  rounded-2xl
                  focus:outline-none focus-visible:ring-2
                  focus-visible:ring-[#009EF0] focus-visible:ring-offset-2
                "
              >
                <Image
                  src="/vetogologo.png"
                  alt="VetoGo"
                  width={1400}
                  height={560}
                  priority
                  className="
                    w-full
                    h-auto object-contain
                  "
                />
              </motion.button>
            </div>
            {/* Hamburger removed as per request */}
          </div>

          <p className="text-center text-lg font-medium text-slate-500 mb-4 relative z-10">
            Urgences vétérinaires & protocoles
          </p>

          <div className="mt-4 space-y-4 transition-all">
            {/* VetoGo Specific Inputs: Species & Weight */}
            {/* VetoGo Specific Inputs: Species & Weight (Check always visible) */}
            <div className="animate-fade-in-up space-y-4">
              <SpeciesSelector />
              {/* WeightInput container needs to align with SearchBar below */}
              <div className="px-1">
                <WeightInput />
              </div>
            </div>

            <div className={searchMode ? "mt-2" : "mt-6"}>
              <div className="px-1">
                <SearchBar
                  onFocus={() => {
                    searchModeTrigger.current = null;
                    setSearchMode(true);
                  }}
                  onChange={(value) => {
                    setQuery(value);
                    if (value.trim().length === 0 && !categoryParam) {
                      // Only exit search mode if no category param
                    } else {
                      setSearchMode(true);
                    }
                  }}
                  onClear={() => {
                    setQuery("");
                    if (!categoryParam) setSearchMode(false);
                  }}
                  autoFocus={false}
                  value={query}
                  className="mt-1 shadow-sm border-slate-200"
                  inputRef={searchInputRef}
                  placeholder="Rechercher un protocole..."
                />
              </div>

              {/* Categories Grid - Only when NOT in search mode */}
              {!searchMode && (
                <div className="mt-2">
                  <CategoryGrid />

                  {/* Dose Calculator Entry */}
                  <div className="p-4 pt-0">
                    <Link
                      href="/dose-calculator"
                      className="flex items-center gap-4 rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-md transition-all hover:bg-slate-50 hover:border-blue-300 hover:shadow-lg active:scale-95 group"
                    >
                      <div className="relative h-16 w-16 flex-none rounded-xl overflow-hidden shadow-inner border border-slate-100 group-hover:scale-105 transition-transform bg-blue-50 flex items-center justify-center">
                        <Calculator className="h-12 w-12 text-[#009EF0]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-slate-900 leading-tight">Calculateur de dose</h3>
                        <p className="text-sm font-medium text-slate-500 mt-0.5">Calcul automatique des posologies</p>
                      </div>
                      <div className="ml-auto text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <section className="w-full max-w-[420px] flex-1 px-6 pb-14">
          {cardsError && (
            <div className="mt-4 rounded-2xl border border-rose-200/70 bg-rose-50/80 px-4 py-3 text-sm text-rose-700">
              Erreur chargement Supabase. Mode hors ligne.
            </div>
          )}

          {/* Disclaimer on Home */}
          {!searchMode && <Disclaimer className="mt-10" />}

          {/* RESULTS LIST */}
          {searchMode && (
            <div ref={resultsRef} className="mt-6 space-y-4">
              {/* Active Filters Display */}
              {(categoryParam || species || weightKg) && (
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {species && (
                    <span className="px-3 py-1 rounded-full bg-[#eefaff] text-[#009EF0] text-sm font-medium flex items-center gap-1 border border-[#009EF0]/20">
                      {species === "chien" ? "🐶" : "🐱"} {species === "chien" ? "Chien" : "Chat"}
                      <button onClick={() => setSpecies(null)} className="ml-1 hover:text-blue-700">
                        ×
                      </button>
                    </span>
                  )}
                  {categoryParam && (
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium flex items-center gap-1 border border-slate-200">
                      📂 {categoryParam}
                      <button
                        onClick={() => router.push("/")}
                        className="ml-1 hover:text-slate-900"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {weightKg && (
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium flex items-center gap-1 border border-slate-200">
                      ⚖️ {weightKg} kg
                      <button onClick={() => setWeightKg(null)} className="ml-1 hover:text-slate-900">
                        ×
                      </button>
                    </span>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-1 rounded-2xl border border-slate-200/60 bg-white/80 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <span>
                  {hasQuery || categoryParam
                    ? `Résultats (${hits.length})`
                    : `Tous les protocoles (${hits.length})`}
                </span>
                {hasQuery && (
                  <span className="text-[13px] normal-case text-[#009EF0]">« {trimmedQuery} »</span>
                )}
              </div>

              {hits.length > 0 ? (
                hits.map((p, index) => (
                  <div
                    key={p.slug}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}
                  >
                    <ProtocolCard
                      item={p}
                      onOpen={(slug) => openProtocol(slug, p.accessLevel, p.title)}
                      highlightQuery={trimmedQuery}
                      isLocked={p.accessLevel === "premium" && !canViewPremium}
                    />
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-12 text-center">
                  <div className="text-4xl mb-3 opacity-50">🧐</div>
                  <h3 className="text-lg font-bold text-slate-700 mb-1">Aucun résultat trouvé</h3>
                  <p className="text-sm text-slate-500 mb-6 max-w-xs leading-relaxed">
                    Essayez d'autres mots-clés ou parcourez les catégories.
                  </p>

                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => { setQuery(""); setSearchMode(false); }}
                      className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-full shadow-sm hover:bg-slate-50 transition-colors"
                    >
                      Parcourir les catégories
                    </button>
                    <button
                      onClick={() => { setQuery(""); router.push("/?category=Urgences"); }}
                      className="px-4 py-2 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-semibold rounded-full shadow-sm hover:bg-rose-100 transition-colors"
                    >
                      Voir les Urgences
                    </button>
                  </div>
                </div>
              )}

              <div className="text-center pt-6">
                <button
                  type="button"
                  onClick={resetHomepage}
                  className="mt-2 text-sm font-medium text-slate-600 underline underline-offset-4 hover:text-[#009EF0]"
                >
                  Quitter le mode recherche
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Footer Disclaimer in Search Mode */}
        {
          searchMode && (
            <footer className="w-full max-w-[420px] px-6 pb-8">
              <Disclaimer className="mt-0" />
            </footer>
          )
        }
      </div >

      <PremiumAccessDialog open={authDialogOpen} title={pendingPremiumTitle} onClose={closePremiumDialog} />
    </main >
  );
}
