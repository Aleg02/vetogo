"use client";

import Link from "next/link";



import { AnimatePresence, motion } from "framer-motion";

type PremiumAccessDialogProps = {
  open: boolean;
  onClose: () => void;
  title?: string | null;
};

export default function PremiumAccessDialog({ open, onClose, title }: PremiumAccessDialogProps) {
  const headingId = "premium-access-heading";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative z-10 w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/30"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full border border-slate-200 p-1 text-slate-500 transition hover:text-slate-900 hover:bg-slate-50"
              aria-label="Fermer la fenêtre"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" fill="none" strokeWidth={1.8}>
                <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
              </svg>
            </button>
            <div className="flex flex-col gap-5 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-3xl shadow-sm border border-amber-100 transform -rotate-3">
                🔒
              </div>
              <div>
                <p id={headingId} className="text-xl font-bold text-slate-900">
                  Accès réservé aux abonnés
                </p>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  {title ? (
                    <>
                      La fiche <span className="font-bold text-slate-700">{title}</span> est réservée aux abonnés VetoGo+.
                    </>
                  ) : (
                    "Connectez-vous ou créez un compte pour débloquer les fiches premium VetoGo+."
                  )}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row mt-2">
                <Link
                  href="/login"
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
                  onClick={onClose}
                >
                  Se connecter
                </Link>
                <Link
                  href="/subscribe"
                  className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 shadow-lg shadow-slate-900/20"
                  onClick={onClose}
                >
                  Passer Premium
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

