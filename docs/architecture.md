# Architecture de VetoGo

Ce document décrit l’architecture applicative de **VetoGo** (fork de PediaGo adapté à la médecine vétérinaire).

## 1. Vue d'ensemble

VetoGo est une PWA (Progressive Web App) d'aide à la décision clinique pour les vétérinaires. Elle fournit des protocoles d'urgence et des calculateurs de doses adaptés à l'espèce (**Chien** ou **Chat**) et au poids.

### Stack Technique
- **Frontend** : Next.js 16 (App Router), React 19, TypeScript.
- **Styling** : Tailwind CSS 4, Lucide React (icônes).
- **State Management** : Zustand (Persist storage pour `species` et `weightKg`).
- **Backend / Auth** : Supabase (PostgreSQL, Auth).
- **Paiements** : Stripe (Abonnements VetoGo+).
- **Tests** : Playwright (E2E).

## 2. Structure du projet

| Répertoire | Description |
|------------|-------------|
| `src/app` | Pages (App Router). Routes dynamiques `[slug]` pour les protocoles. |
| `src/components` | Composants UI réutilisables (`ui/`) et composants métier (`protocols/`). |
| `src/data` | Base de données statique : définitions des médicaments (`drugs.ts`) et protocoles (`protocols.ts`). |
| `src/store` | Gestion d'état global (`useAppStore`). |
| `src/lib` | Utilitaires (calculs de doses, formatage, clients Supabase/Stripe). |
| `src/types` | Définitions TypeScript partagées. |
| `docs` | Documentation technique et contextuelle. |

## 3. Flux de Données

### 3.1. Sélection du Contexte (Store)
L'application repose sur deux variables globales persistées :
1.  **`species`** : `"chien" | "chat"` (détermine les protocoles affichés et les règles de calcul).
2.  **`weightKg`** : `number` (base unique pour tous les calculs de dose).

### 3.2. Système de Protocoles
Les protocoles sont définis dans `src/data/protocols.ts`.
Chaque protocole peut être :
- Spécifique à une espèce (ex: calculs différents chien/chat).
- Générique mais avec des overrides de doses.
- Restreint aux abonnés Premium (`accessLevel: "premium"`).

### 3.3. Moteur de Calcul (Dosing)
Les médicaments (`src/data/drugs.ts`) possèdent des règles de calcul (`DosingRule`) :
- **Per kg** : `mg_per_kg * weight`.
- **Fixed** : Dose fixe peu importe le poids.
- **Overrides** : Tableaux de valeurs pré-calculées pour des plages de poids spécifiques (sécurité maximale).

## 4. Services Externes

### Supabase
- **Auth** : Gestion des utilisateurs (Email/Password, OAuth).
- **Database** : Table `user_entitlements` pour gérer les droits d'accès (Premium).

### Stripe
- Gestion des abonnements (Mensuel/Annuel).
- Webhooks pour synchroniser le statut d'abonnement avec Supabase.

## 5. Déploiement
- Hébergement : Vercel (Recommandé) ou tout hébergeur Node.js.
- CI/CD : GitHub Actions (Build & Test).
