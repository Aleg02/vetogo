# Architecture de VetoGo

Ce document décrit l’architecture applicative de VetoGo (fork de PediaGo).

## Présentation générale

VetoGo est un assistant de prise en charge pour les urgences vétérinaires (Chiens/Chats). Il fournit des **protocoles** et **calculs de posologie** en fonction de l'espèce et du poids de l'animal.

### Répertoires principaux

| Dossier | Rôle |
|--------|------|
| `src/app` | Pages App Router. `/`, `/protocols/[slug]`, etc. |
| `src/components` | UI: `SpeciesSelector`, `WeightInput`, `CategoryGrid`, `ProtocolCard`, `PremiumAccessDialog`, etc. |
| `src/data` | Données: `protocols.ts` (étendus avec species/category), `drugs.ts`. |
| `src/store` | Zustand (`useAppStore`): `species` ("chien"|"chat") et `weightKg`. |
| `src/lib` | Utilitaires: Supabase, Stripe, Calculations. |

### Schéma simplifié

User -> Home (Select Species -> Input Weight -> Select Category/Search) -> Protocol List -> Protocol Detail.

## Fonctionnement détaillé

### Authentification & Premium
Via Supabase Auth et Stripe (VetoGo+). Droits gérés par `user_entitlements`.

### Chargement des protocoles
`fetchCardsList` récupère les protocoles. Le filtrage se fait par :
1. **Recherche texte** (Fuse.js)
2. **Catégorie** (URL param `?category=...`)
3. **Espèce** (Store `species`)

### Posologie
Basée sur le poids (`weightKg`) et l'espèce (si applicable dans les données).

## Variables d'environnement
Identiques à PediaGo (SUPABASE, STRIPE).