# VetoGo

Assistant décisionnel pour l’urgence vétérinaire. L’application calcule automatiquement les posologies selon l’espèce (Chien/Chat) et le poids, affiche des protocoles séquentiels (ACVECC/EBM) et sécurise la prise de décision en urgence.

## VetoGo en bref

- **Mission** : Fournir aux vétérinaires et ASV un accès immédiat aux protocoles d’urgence vitale (Déchocage, Toxicologie, Anesthésie, etc.) avec calcul de dose instantané.
- **Stack** : Next.js 16 (App Router) + Tailwind CSS pour le front, Supabase (Auth + Postgres) pour le backend.
- **Cible** : Vétérinaires urgentistes, généralistes de garde, ASV et étudiants.

## Installation & développement

```bash
npm install
npm run dev
```

L’interface est disponible sur [http://localhost:3000](http://localhost:3000).

### Configuration requise (`.env.local`)

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Fonctionnalités Clés

### 🩺 Protocoles Intelligents
- Sélection de l'espèce (Chien 🐶 / Chat 🐱)
- Saisie du poids unique pour toute la session.
- **Calcul automatique** : Toutes les doses (mg/kg) sont converties en volumes (ml) selon les concentrations usuelles.
- **Onglets dynamiques** : Contexte, Examens complémentaires, Traitements, Liens.

### 🔐 Authentification & Sécurité
- **Design Unifié** : Login, Signup, Forgot Password et CGU partagent une charte graphique premium.
- **Sécurité** :
    - Indicateur de force de mot de passe.
    - Acceptation obligatoire des CGU (`/cgu`).
    - Protection globale par mot de passe (Gate) avant lancement public.

### 💳 Abonnement (VetoGo+ Premium)
Intégration complète avec Stripe pour la gestion des abonnements premium.
- `POST /api/stripe/create-checkout-session` : Création de session de paiement.
- `POST /api/stripe/webhook` : Synchronisation des droits d'accès via Webhook sécurisé.

## Structure du projet

- `/src/app` : Routes Next.js (App Router).
- `/src/components/protocols` : Composants métier pour chaque pathologie (ex: `HeatStroke`, `StatusEpilepticus`).
- `/src/data/protocols` : Définitions des métadonnées des protocoles (Slugs, Titres, Icônes).

## Déploiement

Projet optimisé pour **Vercel**.
Les variables d'environnement (Stripe, Supabase, Gate Password) doivent être configurées dans le dashboard Vercel.

---

*VetoGo est une aide à la décision et ne remplace pas le jugement clinique vétérinaire.*
