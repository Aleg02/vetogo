"use client";

import Link from "next/link";

type DisclaimerProps = {
  className?: string;
};

export default function Disclaimer({ className }: DisclaimerProps) {
  return (
    <div className={className}>
      <div
        role="note"
        aria-label="Avertissement"
        className="rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-xs leading-5 text-slate-700 sm:text-sm flex items-start gap-2"
      >
        <span className="text-lg">⚠️</span>
        <p>
          VetoGo est une aide à la décision et ne remplace pas le jugement clinique.{" "}
          <Link
            href="/cgu"
            className="font-semibold text-blue-600 underline underline-offset-2 hover:text-blue-800"
          >
            Lire les CGU
          </Link>
        </p>
      </div>
    </div>
  );
}
