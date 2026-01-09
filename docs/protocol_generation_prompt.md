# Prompt pour la création de Protocoles VetoGo

Utilisez ce prompt pour générer de nouveaux protocoles via une IA (ChatGPT, Claude, etc.).
Remplacez `[NOM DU PROTOCOLE]` et `[DONNÉES MÉDICALES]` par vos informations.

---

## CONTEXTE
Tu es un expert développeur React spécialisé dans l'application vétérinaire "VetoGo".
Ta mission est de créer un nouveau composant VetoGo pour le protocole : **[NOM DU PROTOCOLE]**.

## ENTRÉES (DONNÉES MÉDICALES)
[INSÉRER ICI LE CONTENU DU PROTOCOLE : TEXTE, DOSES, TABLEAUX...]

## STANDARDS TECHNIQUES
Tu dois respecter **strictement** les conventions suivantes pour que le code s'intègre parfaitement dans l'architecture existante.

### 1. Structure du Fichier
- **Path** : `src/components/protocols/[NomPascalCase].tsx`
- **Wrappers** :
  - Utilise `ProtocolLayout` (importé de `@/components/ProtocolLayout`).
  - Utilise `ProtocolContainer` (importé de `@/components/ui/ProtocolUI`) à l'intérieur du layout.
- **State** :
  - Récupère `weightKg` et `species` via `useAppStore` (import `@/store/useAppStore`).
  - `species` vaut `"chien"` | `"chat"` | `null`.
  - `weightKg` vaut `number` | `null`.

### 2. Organisation de l'UI (Tabs)
Le `ProtocolLayout` fournit une render prop `(tab)`. Tu dois gérer 4 onglets :
1.  **"general"** : Définition, Signes cliniques, Physiopathologie.
2.  **"examens"** : Biologie, Imagerie, Valeurs normales.
3.  **"traitements"** : Algorithme, Médicaments, Perfusions.
4.  **"liens"** : Sources, Bibliographie.

### 3. Composants UI (Impératif)
Utilise UNIQUEMENT les composants de `@/components/ui/ProtocolUI` :
- `<Section title="..." icon="...">` : Pour chaque bloc de contenu.
- `<DosageCard title="..." value="..." unit="..." color="...">` : Pour afficher une dose calculée importante (ex: Bolus).
- `<AlertBox type="info|warning|critical">` : Pour les points d'attention.
- `<CheckList items={[...]}>` : Pour les listes de symptômes ou d'actions.
- `<CriticalList items={[...]}>` : Pour les contre-indications ou "Stop points".
- `<LinkList links={[...]}>` : Pour l'onglet liens.

### 4. Logique de Calcul
- Si `weightKg` est présent, calcule les doses. Sinon affiche `"--"`.
- Si le protocole diffère entre Chien et Chat, utilise les booléens `isDog` / `isCat`.
- **Exemple** :
  ```tsx
  const { weightKg, species } = useAppStore();
  const w = weightKg || 0;
  // Calcul safe
  const dose = w > 0 ? (w * 0.5).toFixed(1) : "--";
  ```

### 5. Style & Visuel
- Utilise `lucide-react` pour les icônes.
- Inspire-toi du design de `HypovolemicShock.tsx` :
  - Cartes avec dégradés pour les chiffres clés.
  - Sections aérées.
  - Couleurs "Medical" (Slate, Blue, Rose, Amber).

---

## EXEMPLE DE SORTIE ATTENDUE (SQUELETTE)

```tsx
"use client";

import React from "react";
import { ProtocolLayout } from "@/components/ProtocolLayout";
import { useAppStore } from "@/store/useAppStore";
import { Section, DosageCard, AlertBox, ProtocolContainer } from "@/components/ui/ProtocolUI";
import { Activity } from "lucide-react";

export const [NomProtocol] = () => {
  const { weightKg, species } = useAppStore();
  const w = weightKg || 0;

  return (
    <ProtocolLayout title="[Titre]">
      {(tab) => (
        <ProtocolContainer>
          {tab === "general" && (
            <Section title="Général" icon="📖">
               ...
            </Section>
          )}
          {/* Autres onglets... */}
        </ProtocolContainer>
      )}
    </ProtocolLayout>
  );
};
```

Génère maintenant le code complet pour le protocole décrit dans les entrées.
