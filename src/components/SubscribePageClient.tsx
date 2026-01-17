"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useUserEntitlements } from "@/hooks/useUserEntitlements";

type PlanId = "monthly" | "yearly";

const PREMIUM_PLANS: {
  id: PlanId;
  name: string;
  badge: string;
  price: string;
  priceDetail: string;
}[] = [
    {
      id: "monthly",
      name: "Premium mensuel",
      badge: "Le plus flexible",
      price: "4,90 € TTC / mois",
      priceDetail: "Sans engagement, résilier à tout moment.",
    },
    {
      id: "yearly",
      name: "Premium annuel",
      badge: "Le plus économique",
      price: "29,90 € TTC / an",
      priceDetail: "Sans engagement, résilier à tout moment.",
    },
  ];

const PREMIUM_PERKS = [
  "Accès illimité à tous les protocoles",
  "Calculs automatiques poids/âge pour limiter les erreurs de posologie",
  "Accès anticipé aux nouvelles fiches validées par l’équipe médicale",
  "Export PDF des protocoles pour archivage ou partage sécurisé",
  "Assistant IA à venir (Aide au diagnostique, recherche avancée)",
];

export default function SubscribePageClient() {
  const session = useSession();
  const searchParams = useSearchParams();
  const { canViewPremium, subscriptionStatus, loading, refreshEntitlements } =
    useUserEntitlements();

  const [creatingCheckout, setCreatingCheckout] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const statusParam = searchParams.get("status");
  const reason = searchParams.get("reason");
  const blockedSlug = searchParams.get("slug");
  const successMessage = statusParam === "success";
  const cancelMessage = statusParam === "cancel";

  useEffect(() => {
    if (successMessage) {
      refreshEntitlements();
    }
  }, [successMessage, refreshEntitlements]);

  const baseCtaLabel = useMemo(() => {
    if (!session) {
      return "Connectez-vous pour souscrire";
    }
    if (canViewPremium) {
      return "Vous êtes déjà Premium";
    }
    if (creatingCheckout) {
      return "Redirection vers Stripe...";
    }
    return null; // on spécialise ensuite par formule
  }, [session, canViewPremium, creatingCheckout]);

  const getPlanCtaLabel = (planId: PlanId): string => {
    if (baseCtaLabel) return baseCtaLabel;
    return planId === "monthly"
      ? "Choisir l’abonnement mensuel"
      : "Choisir l’abonnement annuel";
  };

  const handleCheckout = async (plan: PlanId) => {
    if (!session) {
      // Pas connecté : on ne lance pas Stripe
      return;
    }

    setError(null);
    setCreatingCheckout(true);

    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ billingPeriod: plan, plan }), // "monthly" ou "yearly"
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(
          payload.error ?? "Impossible de créer la session Stripe."
        );
      }

      const data = await response.json();
      if (data.checkoutUrl) {
        window.location.assign(data.checkoutUrl);
        return;
      }

      throw new Error("Réponse Stripe inattendue.");
    } catch (checkoutError) {
      console.error(checkoutError);
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Erreur inconnue."
      );
      setCreatingCheckout(false);
    }
  };

  const showCheckoutButtons = Boolean(session) && !canViewPremium;

  const loginHref = "/login?redirect=/subscribe";

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      <div className="h-1 w-full bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#22c55e]" />
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-12">
        <Link
          href="/"
          className="text-sm font-medium text-[#2563eb] underline"
        >
          ← Retour à l’accueil
        </Link>

        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Abonnement
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Passer en Premium
          </h1>
          <p className="text-base text-slate-600">
            Débloquez l’ensemble des fiches critiques VetoGo+ et laissez
            l’application calculer les posologies pour vous, avec des outils
            avancés adaptés à l’urgence vétérinaire.
          </p>
        </header>

        {(successMessage || cancelMessage) && (
          <div
            className={`rounded-2xl border px-5 py-4 text-sm ${successMessage
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-amber-200 bg-amber-50 text-amber-900"
              }`}
          >
            {successMessage
              ? "Paiement confirmé par Stripe. Votre accès sera rafraîchi automatiquement sous quelques secondes."
              : "Retour Stripe annulé. Vous pouvez relancer la souscription quand vous le souhaitez."}
          </div>
        )}

        {!session && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Compte requis</p>
            <p className="mt-1">
              Créez un compte ou connectez-vous avant de lancer le paiement
              Stripe afin de rattacher l’abonnement à votre profil.
            </p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold">
              <Link
                className="rounded-full border border-slate-200 px-4 py-2"
                href="/login"
              >
                Se connecter / créer un compte
              </Link>
            </div>
          </div>
        )}

        {reason === "premium" && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
            <p className="font-semibold">Fiche réservée aux abonnés</p>
            <p className="mt-1">
              {blockedSlug
                ? `La fiche « ${blockedSlug} » est incluse dans la formule Premium.`
                : "La ressource demandée fait partie des contenus Premium."}
            </p>
          </div>
        )}

        {/* Cartes d’abonnement */}
        <section className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 shadow-inner shadow-slate-200/50">
          {/* Bandeau Offre de lancement */}
          <div className="mb-6 rounded-2xl border border-violet-200 bg-white px-4 py-3 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Offre de lancement</p>
            <p className="mt-1">
              Profitez d’une période d’essai gratuite de 7 jours pour tester VetoGo+.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {PREMIUM_PLANS.map((plan) => {
              const isActive = subscriptionStatus === "active";
              const isTrial = subscriptionStatus === "trialing";
              const isCurrent = canViewPremium && (isActive || isTrial);
              return (
                <div
                  key={plan.id}
                  className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white px-5 py-6 shadow-sm"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                      {plan.badge}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-slate-900">
                      {plan.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {plan.price}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {plan.priceDetail}
                    </p>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => handleCheckout(plan.id)}
                      disabled={!showCheckoutButtons || creatingCheckout || isCurrent}
                      className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        !showCheckoutButtons || creatingCheckout || isCurrent
                          ? "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400"
                          : "bg-slate-900 text-white hover:bg-slate-800"
                      }`}
                    >
                      {isCurrent ? "Déjà actif" : getPlanCtaLabel(plan.id)}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <section className="rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Ce qui est inclus</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {PREMIUM_PERKS.map((perk) => (
              <li key={perk} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-5 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Besoin d’aide ?</p>
          <p className="mt-1">
            Vous pouvez contacter l’équipe VetoGo à tout moment si vous avez
            besoin d’assistance ou pour modifier votre abonnement.
          </p>
          <Link
            href="mailto:contact@vetogo.app"
            className="mt-3 inline-flex font-semibold text-[#2563eb]"
          >
            contact@vetogo.app
          </Link>
        </section>

        {loading && (
          <p className="text-xs text-slate-500">
            Vérification de votre statut d’abonnement...
          </p>
        )}

        {!session && (
          <div className="text-xs text-slate-500">
            Déjà un compte ?{" "}
            <Link className="font-semibold text-[#2563eb]" href={loginHref}>
              Se connecter
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
