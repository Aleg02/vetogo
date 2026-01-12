"use client";

import { useActionState, useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signupAction } from "./actions";
import { initialSignupState, type SignupActionState } from "./state";

// --- Icons (Copied from LoginForm for consistency) ---
function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36 16.8 36 11 30.2 11 23s5.8-13 13-13c3.3 0 6.3 1.2 8.6 3.3l5.7-5.7C34.6 4.1 29.6 2 24 2 12.3 2 3 11.3 3 23s9.3 21 21 21 21-9.3 21-21c0-1.3-.1-2.5-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.4 15.6 18.8 13 24 13c3.3 0 6.3 1.2 8.6 3.3l5.7-5.7C34.6 7.1 29.6 5 24 5 16.2 5 9.6 9.2 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 41c5.2 0 10.1-2 13.7-5.3l-6.3-5.3C29.2 32.8 26.8 34 24 34c-5.2 0-9.6-3.3-11.2-7.8l-6.6 5.1C9.6 38.8 16.2 43 24 43z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3C34.8 31.5 29.9 35 24 35c-5.2 0-9.6-3.3-11.2-7.8l-6.6 5.1C9.6 38.8 16.2 43 24 43c8.7 0 19-6.3 19-20 0-1.3-.1-2.5-.4-3.5z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-black">
      <path fill="currentColor" d="M19.665 17.157c-.33.76-.726 1.45-1.19 2.07-.626.84-1.139 1.42-1.54 1.74-.616.57-1.277.865-1.98.88-.506 0-1.118-.144-1.834-.43-.716-.287-1.374-.43-1.974-.43-.635 0-1.312.144-2.03.43-.717.286-1.301.437-1.753.452-.676.029-1.348-.277-2.016-.92-.43-.377-.962-1.003-1.597-1.88-.684-.94-1.246-2.034-1.686-3.28C1.64 14.42 1.42 13.23 1.42 12.09c0-1.19.257-2.22.77-3.09.402-.7.937-1.257 1.607-1.67.67-.413 1.394-.627 2.173-.642.427 0 .987.166 1.68.498.692.333 1.135.5 1.33.5.146 0 .64-.19 1.48-.57.793-.356 1.463-.504 2.01-.446 1.487.12 2.606.706 3.36 1.76-1.335.81-1.997 1.94-1.988 3.39.01 1.13.42 2.07 1.225 2.82.364.345.77.61 1.217.8-.098.29-.202.57-.312.84zM15.7 4.27c0 .89-.325 1.72-.973 2.48-.783.915-1.73 1.44-2.757 1.36a2.73 2.73 0 01-.02-.33c0-.85.33-1.76.98-2.51.313-.36.71-.66 1.19-.9.48-.24.94-.37 1.38-.39.02.08.03.16.03.25z" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <rect x="2" y="2" width="9" height="9" fill="#f25022" />
      <rect x="13" y="2" width="9" height="9" fill="#7fba00" />
      <rect x="2" y="13" width="9" height="9" fill="#00a4ef" />
      <rect x="13" y="13" width="9" height="9" fill="#ffb900" />
    </svg>
  );
}

// --- Components ---
function SocialButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-start gap-4 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:shadow active:scale-[0.99]"
    >
      <span className="flex items-center justify-center w-6 h-6">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

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
          Création en cours...
        </span>
      ) : (
        label
      )}
    </button>
  );
}

function AuthMessage({ state }: { state: SignupActionState }) {
  if (state.status === "idle") {
    return null;
  }

  const tone =
    state.status === "success"
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : "text-rose-700 bg-rose-50 border-rose-200";

  const message = state.status === "error" ? state.message : "Compte créé avec succès.";

  return (
    <div className={`mt-4 rounded-2xl border px-4 py-3 text-sm font-medium ${tone}`}>
      <p>{message}</p>
    </div>
  );
}

// --- Helper Components ---

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;

  const hasMinLength = password.length >= 8;
  const hasMixed = /[a-zA-Z]/.test(password) && /[0-9!@#\$%\^\&*\)\(+=._-]/.test(password);

  let strength = 0;
  if (password.length > 5) strength++; // Basic
  if (hasMinLength) strength++;
  if (hasMixed && hasMinLength) strength++;

  const labels = ["Faible", "Moyen", "Fort"];
  const colors = ["bg-rose-500", "bg-orange-500", "bg-emerald-500"];
  const width = ["w-1/3", "w-2/3", "w-full"];

  return (
    <div className="mt-2 space-y-1">
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${colors[strength - 1] || 'bg-slate-200'} ${width[strength - 1] || 'w-0'}`}
        />
      </div>
      <p className="text-xs text-slate-500 text-right font-medium">
        {labels[strength - 1] || "Trop court"}
      </p>
    </div>
  );
}

// --- Main Page ---
export default function SignupPage() {
  const router = useRouter();
  const [state, action] = useActionState<SignupActionState, FormData>(
    signupAction,
    initialSignupState
  );

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (state.status === "success") {
      router.push("/mon-compte");
    }
  }, [state.status, router]);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans">
      {/* Header Harmonisé (Style ProtocolLayout) */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between max-w-md mx-auto w-full relative">
          <Link
            href="/"
            className="p-2 -ml-2 text-slate-500 hover:text-slate-800 transition-colors rounded-full hover:bg-slate-100/50"
            aria-label="Retour à l'accueil"
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
          <div className="flex flex-col items-center mb-8 mt-4 md:mt-0">
            <h1 className="text-2xl font-bold text-center text-slate-900 leading-tight">
              Créer un compte
            </h1>
          </div>

          {/* Social Buttons */}
          <div className="space-y-3 mb-8">
            <SocialButton icon={<GoogleIcon />} label="S'inscrire avec Google" onClick={() => { }} />
            <SocialButton icon={<AppleIcon />} label="S'inscrire avec Apple" onClick={() => { }} />
            <SocialButton icon={<MicrosoftIcon />} label="S'inscrire avec Microsoft" onClick={() => { }} />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-sm font-medium text-slate-400 uppercase">ou</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Form */}
          <form action={action} className="space-y-6">
            <div className="space-y-4">
              {/* Email */}
              <div className="relative group">
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Adresse e-mail"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:bg-slate-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>

              {/* Password */}
              <div className="relative group">
                <label htmlFor="password" className="sr-only">Mot de passe</label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={6}
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 pr-12 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:bg-slate-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              <PasswordStrength password={password} />

              {/* Confirm Password */}
              <div className="relative group">
                <label htmlFor="confirmPassword" className="sr-only">Confirmation</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={6}
                  placeholder="Confirmer le mot de passe"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:bg-slate-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>

              {/* Legal Terms Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer group mt-2">
                <div className="relative flex items-center pt-1">
                  <input
                    type="checkbox"
                    name="terms"
                    required
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-slate-300 transition-all checked:border-emerald-500 checked:bg-emerald-500 hover:border-slate-400"
                  />
                  <svg
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-0.5 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="2 6 4.5 9 10 3" />
                  </svg>
                </div>
                <span className="text-sm text-slate-500 leading-snug">
                  J'accepte les <Link href="/cgu" className="font-semibold text-slate-700 underline hover:text-emerald-600">conditions générales d'utilisation</Link> et la politique de confidentialité.
                </span>
              </label>
            </div>

            <AuthMessage state={state} />

            <FormButton label="Créer un compte" />

            <p className="mt-6 text-center text-sm text-slate-500">
              Déjà inscrit ?{" "}
              <Link href="/login" className="font-semibold text-[#009EF0] hover:text-[#007cbd] transition-colors">
                Se connecter
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
