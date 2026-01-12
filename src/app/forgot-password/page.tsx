"use client";

import { useActionState, useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { forgotPasswordAction, initialForgotPasswordState, type ForgotPasswordState } from "./actions";

// --- Components ---
function FormButton({ label }: { label: string }) {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-slate-950 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-900 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99]"
        >
            {pending ? (
                <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Envoi en cours...
                </span>
            ) : (
                label
            )}
        </button>
    );
}

function StatusMessage({ state }: { state: ForgotPasswordState }) {
    if (state.status === "idle") return null;

    const tone =
        state.status === "success"
            ? "text-emerald-700 bg-emerald-50 border-emerald-200"
            : "text-rose-700 bg-rose-50 border-rose-200";

    return (
        <div className={`mt-6 rounded-2xl border px-4 py-4 text-sm font-medium ${tone}`}>
            <p>{state.message}</p>
        </div>
    );
}

// --- Main Page ---
export default function ForgotPasswordPage() {
    const [state, action] = useActionState<ForgotPasswordState, FormData>(
        forgotPasswordAction,
        initialForgotPasswordState
    );

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans">
            {/* Header Harmonisé (Style ProtocolLayout) */}
            <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
                <div className="px-4 py-3 flex items-center justify-between max-w-md mx-auto w-full relative">
                    <Link
                        href="/login"
                        className="p-2 -ml-2 text-slate-500 hover:text-slate-800 transition-colors rounded-full hover:bg-slate-100/50"
                        aria-label="Retour à la connexion"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>

                    {/* LOGO ALWAYS VISIBLE */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                        <Link href="/">
                            <Image
                                src="/vetogologo.png"
                                alt="VetoGo"
                                width={80}
                                height={24}
                                className="h-6 w-auto opacity-90 transition hover:opacity-100"
                                priority
                            />
                        </Link>
                    </div>

                    <div className="w-8" />
                </div>
            </header>

            {/* Main Content Centered */}
            <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div
                    className={`w-full max-w-md bg-white rounded-3xl shadow-none md:shadow-xl md:border md:border-slate-100 p-0 md:p-10 transform transition-all duration-500 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                >
                    {/* Title */}
                    <div className="flex flex-col items-center mb-6 mt-4 md:mt-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-center text-slate-900 leading-tight">
                            Mot de passe oublié ?
                        </h1>
                        <p className="mt-2 text-center text-sm text-slate-500 max-w-xs">
                            Pas de panique. Saisissez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                        </p>
                    </div>

                    {/* Form */}
                    <form action={action} className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative group">
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="name@example.com"
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:bg-slate-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                />
                            </div>
                        </div>

                        <StatusMessage state={state} />

                        <FormButton label="Envoyer le lien" />

                        <p className="mt-6 text-center text-sm text-slate-500">
                            <Link href="/login" className="font-semibold text-slate-900 hover:text-emerald-600 transition-colors flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                </svg>
                                Retour à la connexion
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
