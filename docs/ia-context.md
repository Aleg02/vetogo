# Contexte et directives pour l'intelligence artificielle – VetoGo

Ce document sert de **base permanente** pour toute IA de développement travaillant sur VetoGo. Il définit le contexte vétérinaire, les règles de sécurité et les standards techniques.

## 1. Contexte du Projet

VetoGo est une application mobile (PWA) d'aide à la décision pour les vétérinaires urgentistes.
Elle remplace les "calculs de tête" ou l'usage de fichiers Excel par une interface sécurisée et validée.

### Domaines Clés
- **Espèces** : Chien et Chat exclusivement.
- **Poids** : La variable centrale (3 kg à 80 kg).
- **Public** : Vétérinaires, ASV (Auxiliaires Spécialisés), Étudiants.

## 2. Règles d'Or (Sécurité Médicale)

1.  **Distinction d'Espèce** :
    - Ne jamais supposer qu'un médicament est safe pour le Chat s'il l'est pour le Chien (ex: paracétamol = mortel chat).
    - Toujours vérifier le flag `species` dans la logique.

2.  **Calculs de Doses** :
    - Utiliser le `weightKg` du store.
    - Pour les molécules à marge thérapeutique étroite, privilégier les **Overrides** (tableaux de valeurs fixes) plutôt que le calcul dynamique.

3.  **Vocabulaire** :
    - Utiliser "Patient" ou "Animal".
    - Ne jamais utiliser "Enfant", "Pédiatrie", "Médecin".
    - Termes corrects : "Propriétaire" (pas "Parents"), "Clinique" (pas "Hôpital" sauf CHV).

## 3. Architecture Technique (Resumé)

- **Frontend** : Next.js 16 (App Router), Tailwind 4.
- **State** : `useAppStore` → `species` ("chien"|"chat"), `weightKg` (number).
- **Data** : `src/data/protocols.ts` et `src/data/drugs.ts`.

## 4. Instructions pour l'IA

Lors de la réponse à une tâche :

1.  **Analyser le contexte** : S'agit-il d'une fonctionnalité spécifique à une espèce ?
2.  **Vérifier l'existant** : Ne pas recréer de composants UI si `src/components/ui` contient déjà ce qu'il faut (ex: `DosageCard`, `Section`).
3.  **Code** : Fournir du code TypeScript strict.
4.  **UX** : Privilégier la rapidité de lecture (Situation d'urgence).

## 5. Checklist de Validation

Avant de proposer du code :
- [ ] Le code prend-il en compte l'espèce sélectionnée ?
- [ ] Les textes sont-ils en français ?
- [ ] Les posologies (si modifiées) citent-elles une source (ACVECC, etc.) ?
- [ ] Le style respecte-t-il la charte Tailwind (Clean, Medical, Modern) ?
