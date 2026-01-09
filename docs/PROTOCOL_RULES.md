# Règles de Création des Protocoles VetoGo

Ce document recense les contraintes techniques strictes pour éviter les erreurs de build récurrentes lors de l'ajout de nouveaux protocoles.

## 1. Composants UI & Props

### `DosageCard`
*   **Couleurs AUTORISÉES uniquement :**
    *   ✅ `blue` (Standard, Info)
    *   ✅ `purple` (Médicament secondaire, spécial)
    *   ✅ `red` (Urgence, Danger, Dose critique)
    *   ✅ `slate` (Défaut, Neutre)
*   ❌ **INTERDITS :** `green`, `amber`, `yellow`, `orange`, `indigo`, `rose`.

### `AlertBox`
*   Types : `info`, `warning`, `critical`, `tip`.

## 2. Données & Types (`protocols.ts`)

### Catégories Autorisées
La propriété `category` doit être LITTÉRALEMENT l'une des valeurs suivantes (Case Sensitive) :
*   `Cardio`
*   `Toxico`
*   `Perfusion`
*   `Parasites`
*   `Trauma`
*   `Fièvre` (Utilisé pour Sepsis/Infection)
*   `Neurologie`
*   `Respiratoire`
*   `Digestif`
*   `Autre` (Utilisé pour Urologie/Obstruction si pas de cat spécifique)

*   ❌ **INTERDIT :** `Urgence` (Ce n'est pas une catégorie, c'est un Tag).

## 3. Syntaxe JSX / React

*   **Caractères Spéciaux :**
    *   Le caractère `>` doit TOUJOURS être échappé en `&gt;` ou écrit `{" > "}` dans le texte visible.
    *   Exemple : `PCV &gt; 20%` (Correct) vs `PCV > 20%` (Erreur de build).

## 4. Icônes (`lucide-react`)

*   Toujours vérifier qu'une icône existe avant de l'importer.
*   *Astuce :* `Bacteria` n'existe pas -> Utiliser `Biohazard` ou `Bug`.

## 5. Checklist Pré-Build
Avant de lancer le build, vérifier :
1.  [ ] Couleurs `DosageCard` (pas de green/amber).
2.  [ ] Catégorie dans `protocols.ts` (pas de 'Urgence').
3.  [ ] Pas de `>` bruts dans le TSX.
