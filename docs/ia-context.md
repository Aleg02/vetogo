# Contexte et directives pour l'intelligence artificielle – VetoGo

Ce document sert de **base permanente** pour toute IA de développement qui travaille sur VetoGo (anciennement PediaGo). Il décrit l'architecture du projet, les règles d'ingénierie, les pratiques de qualité et les responsabilités réglementaires. Il doit être consulté avant toute intervention automatisée.

## 1. Contexte du projet

VetoGo est une application d’aide à la décision destinée aux vétérinaires et professionnels de santé animale. Elle fournit des **protocoles d’urgences vétérinaires** et des informations cliniques adaptées aux espèces (Chiens, Chats) et au poids de l'animal.

### Architecture technique

- **Frontend :** Next.js 16 (App Router) avec TypeScript et React. Interface stylisée avec Tailwind CSS.
- **Backend :** Supabase (Auth + Postgres).
- **Paiement :** Abonnement premium (**VetoGo +**) via Stripe Checkout.
- **Données métier :**
  - Protocoles dans `src/data/protocols.ts` (étendus avec `species` et `category`).
  - Calculs de doses basés sur le poids (`weightKg`).
- **État global :** Espèce (`species`) et poids (`weightKg`) gérés via Zustand (`useAppStore`). 

## 2. Standards d’ingénierie

1. **TypeScript strict** : Typer explicitement.
2. **App Router** : Limiter `"use client"`.
3. **Logique métier** : Isoler les calculs dans `src/lib`.
4. **État global** : Utiliser `useAppStore` pour l'espèce et le poids.
5. **UI/UX** : Interface en français, claire, professionnelle ("soft medical").
6. **Sécurité et responsabilité** :
   - Ne jamais inventer de données médicales ou posologies.
   - Respecter la distinction Chien/Chat.
   - Ne pas stocker de données identifiantes.

## 3. Format attendu des réponses des IA

1. Résumé de la tâche.
2. Liste des fichiers impactés.
3. Code complet et fonctionnel.

## 4. Règles spécifiques à VetoGo

- **Langue** : Français.
- **Espèces** : Toujours prendre en compte l'espèce (Chien ou Chat) dans la logique de filtrage et d'affichage.
- **Poids** : Seule variable d'entrée pour les calculs (pas d'âge).
- **Protocoles** : Structurés par catégories (Cardio, Toxico, etc.).

## 5. Procédure de réponse recommandée

1. Analyser l'impact (UI, Store, Data).
2. Consulter la doc technique.
3. Proposer une solution complète.
4. Signaler les risques (notamment confusion d'espèces).