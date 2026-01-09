import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const dynamic = "force-static";

type ComingSoonPageProps = {
    searchParams?: Promise<{
        error?: string;
        from?: string;
    }>;
};

// ----- Server Action -----
export async function authenticatePreview(formData: FormData) {
    "use server";

    const password = formData.get("password");
    const from = (formData.get("from") as string | null) || "/";
    const expectedPassword = "Merlin202411";

    if (password === expectedPassword) {
        const cookieStore = await cookies();
        cookieStore.set("vetogo_preview_auth", "1", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 30 * 6, // 6 mois
        });
        redirect(from);
    }

    redirect(`/coming-soon?error=1&from=${encodeURIComponent(from)}`);
}

// ----- Page Component -----
export default async function ComingSoonPage({ searchParams }: ComingSoonPageProps) {
    const params = await searchParams;
    const error = params?.error === "1";
    const from = params?.from || "/";

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl p-8 space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-4 py-2">
                        <span className="text-xl font-bold tracking-tight text-white">
                            VetoGo
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold mt-4">Bientôt disponible</h1>
                    <p className="text-sm text-slate-400">
                        Assistant vétérinaire en cours de développement.
                        <br />
                        Accès restreint aux bêta-testeurs.
                    </p>
                </div>

                {/* Feature List */}
                <div className="space-y-3 text-sm text-slate-300 bg-slate-800/50 p-6 rounded-2xl">
                    <p className="font-semibold text-white mb-3">
                        Au menu de la V1 :
                    </p>
                    <ul className="space-y-3">
                        <li className="flex gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                            <span>Protocoles d'urgence complets (Chien & Chat)</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-blue-400 shrink-0" />
                            <span>Calculateur de doses automatique</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-violet-400 shrink-0" />
                            <span>Recherche intelligente &amp; intuitive</span>
                        </li>
                    </ul>
                </div>

                {/* Password Form */}
                <form action={authenticatePreview} className="space-y-5">
                    <input type="hidden" name="from" value={from} />

                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-slate-200 block"
                        >
                            Mot de passe d'accès
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="off"
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-base text-slate-50 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            placeholder="Entrez le mot de passe..."
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                            <p className="text-sm text-red-400 text-center font-medium">
                                Mot de passe incorrect 🔒
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98]"
                    >
                        Déverrouiller l'accès
                    </button>
                </form>
            </div>
        </div>
    );
}
