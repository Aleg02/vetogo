import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À propos de VetoGo",
  description: "Présentation, objectifs et conditions d'utilisation de VetoGo",
};

const sections = [
  {
    title: "1. Présentation générale",
    content: (
      <>
        <p>
          VetoGo est une application dédiée aux vétérinaires et ASV intervenant en contexte d’urgence. Elle offre
          un accès rapide, structuré et ergonomique aux principaux protocoles d’urgence, avec un calcul automatique des posologies
          adapté à l'espèce (Chien/Chat) et au poids de l'animal.
        </p>
        <p className="mt-3">
          L’outil a été conçu pour améliorer la réactivité, la sécurité et la standardisation de la prise en charge lors de situations
          critiques où chaque seconde compte. Il s’adresse aux vétérinaires urgentistes, généralistes, ASV et étudiants.
        </p>
      </>
    ),
  },
  {
    title: "2. Objectifs de l’application",
    content: (
      <ul className="list-disc space-y-2 pl-6">
        <li>Faciliter l’accès immédiat aux protocoles d’urgence vétérinaire sur mobile.</li>
        <li>Réduire le risque d’erreurs de calcul (posologies mg/kg → ml).</li>
        <li>Standardiser les pratiques grâce aux recommandations officielles (AAHA, ACVECC, etc.).</li>
        <li>Offrir un support opérationnel utilisable en pleine action.</li>
        <li>Garantir une expérience fluide même en clinique de garde.</li>
      </ul>
    ),
  },
  {
    title: "3. Fonctionnement",
    content: (
      <ul className="list-disc space-y-2 pl-6">
        <li>Sélection rapide de l'espèce et du poids.</li>
        <li>Accès instantané aux protocoles pertinents.</li>
        <li>Calcul automatisé des doses et volumes selon les concentraions usuelles.</li>
        <li>Structuration en blocs adaptés aux situations d’urgence (déchocage, anesthésie, etc.).</li>
      </ul>
    ),
  },
  {
    title: "4. Atouts de VetoGo",
    content: (
      <ul className="list-disc space-y-2 pl-6">
        <li>Interface pensée par et pour les praticiens.</li>
        <li>Lisibilité optimisée sur mobile.</li>
        <li>Mises à jour régulières basées sur l'EBM (Evidence-Based Medicine).</li>
        <li>Simplicité d’usage sans navigation complexe.</li>
        <li>Ergonomie d’urgence (mode sombre, gros boutons, alertes visuelles).</li>
      </ul>
    ),
  },
  {
    title: "5. Limites d’utilisation",
    content: (
      <>
        <p>VetoGo est un outil d’aide et ne remplace jamais :</p>
        <ul className="mt-2 list-disc space-y-2 pl-6">
          <li>le jugement clinique du vétérinaire ;</li>
          <li>l’examen physique complet de l'animal ;</li>
          <li>les protocoles internes à la clinique ou au CHV ;</li>
          <li>la responsabilité du praticien prescripteur.</li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Disclaimer — Limitation de responsabilité",
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-slate-900">6.1 Absence de responsabilité médicale</h4>
          <p className="mt-2">
            VetoGo ne fournit ni diagnostic, ni téléconsultation. L’application ne se substitue pas
            à une décision clinique prise par un vétérinaire diplômé.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">6.2 Exactitude des données</h4>
          <p className="mt-2">
            Malgré la rigueur rédactionnelle, VetoGo ne peut garantir l’exhaustivité, l’absence d’erreur ou l’actualisation
            permanente des informations. Le vétérinaire reste responsable de la vérification des posologies et
            de la décision thérapeutique.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">6.3 Usage réservé aux professionnels</h4>
          <p className="mt-2">
            L’application est destinée exclusivement aux professionnels de la santé animale. Toute utilisation en dehors
            de ce cadre engage la responsabilité de l’utilisateur.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">6.4 Limites techniques</h4>
          <p className="mt-2">
            VetoGo ne pourra être tenue responsable en cas de dysfonctionnement technique, d’absence de réseau, ou de données erronées
            saisies par l’utilisateur (ex: erreur de poids).
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "7. Engagement qualité",
    content: (
      <ul className="list-disc space-y-2 pl-6">
        <li>Amélioration continue de l’expérience utilisateur.</li>
        <li>Veille scientifique vétérinaire.</li>
        <li>Mises à jour des contenus selon les consensus (ACVECC/ECVECC).</li>
      </ul>
    ),
  },
  {
    title: "8. Contact",
    content: (
      <p>
        Pour toute remarque, correction ou suggestion :
        <a className="ml-1 font-semibold text-[#2563eb]" href="mailto:contact@vetogo.app">
          contact@vetogo.app
        </a>
      </p>
    ),
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="h-1 w-full bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#22c55e]" />
      <div className="mx-auto w-full max-w-3xl px-6 py-10">
        <Link href="/" className="text-sm font-medium text-[#2563eb] underline">
          ← Retour à l’accueil
        </Link>
        <header className="mt-6 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">VetoGo</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">À propos de VetoGo</h1>
          <p className="text-base text-slate-600">Présentation, objectifs et conditions d’utilisation.</p>
        </header>

        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <section key={section.title} className="space-y-4 rounded-3xl border border-slate-100 bg-slate-50/50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
              <div className="text-sm leading-6 text-slate-700">{section.content}</div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
