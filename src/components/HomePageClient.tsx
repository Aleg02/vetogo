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

export default function HomePageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session = useSession();
  const { canViewPremium } = useUserEntitlements();

  // Global Store
  const { species } = useAppStore();

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
                className="relative flex items-center justify-center"
                onClick={onLogoClick}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
              >
                <Image src="/logo-light.png" alt="Vetogo" width={170} height={50} priority />
              </motion.button>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <SpeciesSelector />

            <WeightInput />
          </div>
        </header>

        {/* Search Bar */}
        <section className="w-full max-w-[420px] px-6 mt-6">
          <SearchBar
            value={query}
            onChange={setQuery}
            inputRef={searchInputRef}
            onFocus={() => setSearchMode(true)}
          />
        </section>

        {/* Quick Buttons */}
        <section className="w-full max-w-[420px] px-6 mt-4 flex items-center justify-between">
          <button
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
            onClick={() => {
              setSearchMode(true);
              searchModeTrigger.current = "button";
            }}
          >
            <Search className="h-4 w-4" />
            Recherche
          </button>

          <Link
            href="/dose-calculator"
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            <Calculator className="h-4 w-4" />
            Calculateur
          </Link>
        </section>

        {/* CATEGORIES */}
        <section className="w-full max-w-[420px] px-6 mt-6">
          <CategoryGrid />
        </section>

        {/* RESULTS */}
        <section ref={resultsRef} className="w-full max-w-[420px] px-6 mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">
              {categoryParam
                ? `Catégorie : ${categoryParam}`
                : hasQuery
                  ? `Résultats (${hits.length})`
                  : "Protocoles"}
            </h2>
            {searchMode && (
              <button
                onClick={resetHomepage}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600"
              >
                Réinitialiser
              </button>
            )}
          </div>

          {cardsLoading && (
            <div className="mt-6 text-sm text-slate-500">Chargement des protocoles...</div>
          )}

          {cardsError && (
            <div className="mt-6 text-sm text-red-500">
              Erreur lors du chargement : {cardsError}
            </div>
          )}

          {!cardsLoading && !cardsError && hits.length === 0 && (
            <div className="mt-6 text-sm text-slate-500">Aucun résultat trouvé.</div>
          )}

          <div className="mt-4 space-y-4">
            {hits.map((protocol) => (
              <ProtocolCard
                key={protocol.slug}
                item={protocol}
                highlightQuery={trimmedQuery}
                onOpen={(slug) => openProtocol(slug, protocol.accessLevel, protocol.title)}
                isLocked={protocol.accessLevel === "premium" && !canViewPremium}
              />
            ))}
          </div>
        </section>

        <Disclaimer />
      </div>

      <PremiumAccessDialog
        open={authDialogOpen}
        onClose={closePremiumDialog}
        title={pendingPremiumTitle ?? ""}
      />
    </main>
  );
}
