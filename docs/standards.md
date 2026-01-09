# Standards d’ingénierie VetoGo

Ce document rassemble les règles et conventions à respecter lors du développement de VetoGo (fork vétérinaire de PediaGo).
Il complète `ia-context.md` et s'applique à tout contributeur (Humain ou IA).

## 1. TypeScript & Typage Strict

- **No `any`** : Interdit sauf cas de force majeure (bibliothèque externe mal typée).
- **Types Partagés** : Utiliser `src/types/*.ts`. Ne pas redéfinir `Species` ou `Protocol`.
- **StrictNullChecks** : Toujours gérer le cas où `weightKg` ou `species` est `null`.
- **Zod** : Utiliser Zod pour la validation des entrées utilisateur (formulaires) ou des données API.

## 2. Organisation du Code (Next.js App Router)

### Structure des Dossiers
- `src/app` : Routes uniquement. Logique minimale.
- `src/components/ui` : Composants purement visuels (boutons, cartes).
- `src/components/protocols` : Composants métier (ex: `HypovolemicShock.tsx`).
- `src/lib` : Logique pure (calculs, helpers).
- `src/data` : Données statiques (SSOT - Single Source of Truth).

### Client vs Server Components
- Par défaut : **Server Component**.
- Ajouter `"use client"` uniquement si nécessaire (interactions, hooks, state).
- Les composants "feuilles" (boutons, inputs) sont souvent Client, les pages "racines" sont souvent Server.

## 3. Gestion d'État (State Management)

- **UseAppStore (Zustand)** :
  - Seule source de vérité pour : `species` et `weightKg`.
  - Ne pas stocker ces valeurs dans un `useState` local (sauf formulaire temporaire).
  - La persistance (localStorage) est gérée par le store.

## 4. UI/UX & Design System

- **Framework** : Tailwind CSS 4.
- **Icônes** : `lucide-react`.
- **Langue** : Français intégral (IHM). Pas de "Submit", mais "Valider".
- **Responsive** : Mobile-First. Tester systématiquement en largeur 375px (iPhone SE).
- **Accessibilité** : Contrastes élevés (contexte d'urgence).

## 5. Sécurité & Responsabilité Médicale

### Règles de Calcul
- **Précision** : Pas d'arrondi hasardeux sur les faibles volumes (< 1 ml).
- **Overrides** : Si un médicament a un dosage complexe (ex: paliers), ne pas le coder en dur dans une fonction mathématique. Utiliser `WEIGHT_OVERRIDES` dans `drugs.ts`.
- **Sources** : Tout nouveau protocole doit avoir une source fiable (ex: *ACVECC 2024*).

### Données
- Pas de stockage de données patient identifiantes (GDPR/RGPD).
- L'utilisateur reste responsable de la vérification finale.

## 6. Workflow de Développement

1.  **Analyser** : Comprendre le besoin (Vet vs Tech).
2.  **Planifier** : Vérifier si des composants existent déjà.
3.  **Implémenter** : Code propre, documenté si complexe.
4.  **Vérifier** : Tester avec des cas limites (Chat 3kg, Chien 80kg).
5.  **Revue** : Ne jamais merger de code cassant le build (`npm run build`).


