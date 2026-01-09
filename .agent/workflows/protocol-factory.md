---
description: Pipeline automatisé pour rechercher, coder et intégrer un nouveau protocole médical dans VetoGo.
---

# Workflow "Protocol Factory" (VetoGo)

Ce workflow automatise la création de nouveaux protocoles vétérinaires. Il suit une logique stricte de "Recherche → Génération → Intégration".

## Étape 1 : Initialisation & Lecture
1.  Lire le fichier `docs/protocol_to_create`.
2.  Pour CHAQUE ligne (Nom du protocole), exécuter les étapes 2, 3 et 4.

## Étape 2 : Recherche Médicale (Expert ACVECC)
**Objectif** : Obtenir les données cliniques structurées.

1.  Utiliser le prompt : `docs/protocol_research_prompt.md`.
2.  Remplacer `[NOM DU PROTOCOLE]` par le protocole courant.
3.  Effectuer une recherche Web (Search Web) ciblée sur les sources vétérinaires (ACVECC, AAHA, Plumb's).
4.  **Sortie attendue** : Un rapport texte complet avec Doses, Signes, Algorithme, Spécificités Chien/Chat.

## Étape 3 : Implémentation du Composant (Dev React)
**Objectif** : Coder le fichier `.tsx`.

1.  Utiliser le prompt : `docs/protocol_generation_prompt.md`.
2.  Fournir en entrée le rapport de l'Étape 2.
3.  Générer le code complet du composant dans `src/components/protocols/[NomPascalCase].tsx`.
4.  **Standards** :
    -   Utiliser `ProtocolLayout` et `ProtocolContainer`.
    -   Utiliser `useAppStore` (species, weightKg).
    -   Utiliser les composants UI (`Section`, `DosageCard`, `AlertBox`...).

## Étape 4 : Intégration Système
**Objectif** : Rendre le protocole accessible dans l'app.

1.  **Enregistrement** : Ajouter l'entrée dans `src/data/protocols.ts` (Slug, Titre, Icone, Tags).
2.  **Routing** : Mapper le slug vers le composant dans `src/app/protocols/[slug]/ProtocolClientPage.tsx`.

## Étape 5 : Vérification
1.  Vérifier que les doses sont sécurisées ("--" si pas de poids).