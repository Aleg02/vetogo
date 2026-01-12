"use client";

import Link from "next/link";
import Image from "next/image";

export default function CguPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {/* Header Harmonisé */}
            <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
                <div className="px-4 py-3 flex items-center justify-between max-w-3xl mx-auto w-full relative">
                    <Link
                        href="/signup"
                        className="p-2 -ml-2 text-slate-500 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100"
                        aria-label="Retour"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>

                    {/* LOGO ALWAYS VISIBLE - Clickable to Home */}
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

            {/* Main Content */}
            <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8">
                {/* Title Section */}
                <div className="text-center mb-10 mt-4 md:mt-8">
                    <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">Mentions Légales</p>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Conditions Générales d'Utilisation
                    </h1>
                    <div className="mt-4 flex justify-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                            Mise à jour : 11 Janvier 2026
                        </span>
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-12">
                    <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-[#009EF0] prose-a:no-underline hover:prose-a:underline">

                        <h3>1. Objet de l’Application</h3>
                        <p>
                            <strong>VetoGo</strong> est une application d’aide à la décision et de support opérationnel destinée exclusivement aux <strong>vétérinaires et professionnels de santé animale</strong>. Elle propose des protocoles d’urgence, un affichage structuré des conduites à tenir et un calcul automatisé des dosages basés sur le poids et l'espèce.
                        </p>
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg my-6 not-prose">
                            <p className="text-sm text-amber-900 font-medium">
                                ⚠️ VetoGo n’est pas un dispositif médical et ne remplace pas le jugement clinique vétérinaire.
                            </p>
                        </div>

                        <h3>2. Champ d’application</h3>
                        <p>
                            Les présentes CGU s’appliquent à toutes les interfaces éditées par VetoGo (web, Android, iOS et futures extensions). Toute utilisation implique l’adhésion pleine et entière aux CGU.
                        </p>

                        <h3>3. Accès et utilisateurs autorisés</h3>
                        <p>
                            L’application est réservée aux vétérinaires, ASV, étudiants vétérinaires sous supervision et à tout personnel formé à l’urgence vétérinaire. Toute utilisation hors de ce cadre engage exclusivement l’utilisateur.
                        </p>

                        <h3>4. Nature des informations fournies</h3>
                        <p>
                            Les contenus proposés sont informatifs, pédagogiques, standardisés et non personnalisés. Ils ne constituent ni prescription médicale, ni avis clinique, ni protocole adapté à un patient spécifique. L’utilisateur doit vérifier la conformité avec les protocoles locaux.
                        </p>

                        <h3>5. Responsabilité médicale et limites</h3>
                        <p>
                            L’Éditeur, les auteurs et les contributeurs ne peuvent être tenus responsables d’erreurs de calcul, d’interprétation ou de données saisies par l’utilisateur. Ce dernier reste entièrement responsable de ses décisions cliniques, de la vérification des doses et du respect des réglementations.
                        </p>

                        <h3>6. Exactitude et mise à jour</h3>
                        <p>
                            Les protocoles sont élaborés à partir de recommandations officielles et de publications scientifiques vétérinaires. VetoGo ne peut toutefois garantir l’absence d’erreur ou l’actualisation permanente des contenus. L’utilisateur vérifie systématiquement la validité des informations.
                        </p>

                        <h3>7. Conditions d’accès</h3>
                        <p>
                            L’accès peut nécessiter une connexion internet, un équipement compatible et éventuellement la création d’un compte. L’Éditeur n’est pas responsable en cas d’interruption, de maintenance ou de dysfonctionnement technique.
                        </p>

                        <h3>8. Obligations de l’utilisateur</h3>
                        <p>
                            L’utilisateur s’engage à utiliser VetoGo dans un cadre professionnel, à saisir des données exactes, à ne pas détourner l’usage prévu et à respecter l’ensemble des lois en vigueur.
                        </p>

                        <h3>9. Propriété intellectuelle</h3>
                        <p>
                            Les contenus, protocoles, algorithmes, interface et identité VetoGo sont la propriété exclusive de VetoGo. Toute reproduction ou adaptation sans autorisation est interdite.
                        </p>

                        <h3>10. Données personnelles</h3>
                        <p>
                            Selon les fonctionnalités, l’application peut nécessiter un compte. Les données collectées sont limitées au strict nécessaire et aucune donnée médicale personnelle de patients n’est collectée. La politique de confidentialité détaillée est disponible séparément.
                        </p>

                        <h3>11. Abonnements et paiements</h3>
                        <p>
                            Certaines fonctionnalités peuvent être payantes. Les modalités d’abonnement, de renouvellement ou de résiliation seront précisées dans la section « Mon compte / Abonnement » et l’utilisateur s’engage à un usage personnel et non transférable.
                        </p>

                        <h3>12. Suspension et résiliation</h3>
                        <p>
                            L’Éditeur peut suspendre ou résilier l’accès en cas d’utilisation frauduleuse, de non-respect des CGU ou d’atteinte à la sécurité du service.
                        </p>

                        <h3>13. Modifications des CGU</h3>
                        <p>
                            VetoGo peut mettre à jour les CGU à tout moment. L’utilisation continue après modification vaut acceptation des nouvelles dispositions.
                        </p>

                        <h3>14. Droit applicable</h3>
                        <p>
                            Les CGU sont régies par le droit français. En cas de litige, seul le tribunal compétent du ressort du siège de VetoGo est compétent.
                        </p>

                        <h3>15. Contact</h3>
                        <p>
                            Pour toute question relative aux CGU ou à l’application : <a href="mailto:contact@vetogo.app">contact@vetogo.app</a>.
                        </p>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                        <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-slate-200 rounded-full text-slate-600 font-medium hover:bg-slate-50 transition-colors">
                            Retour à l'accueil
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
