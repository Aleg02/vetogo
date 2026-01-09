# Prompt VetoGo – Recherche & Structuration de Protocoles Vétérinaires

Utilisez ce prompt pour demander à une IA (ChatGPT, Claude, Perplexity) de rechercher et structurer les données d'un nouveau protocole.
Remplacez `[NOM DU PROTOCOLE]` par le sujet désiré (ex: "Status Epilepticus", "Coup de Chaleur").

---

## CONTEXTE
Je souhaite que tu me génères un protocole vétérinaire complet, fiable et cliniquement validé de prise en charge de **[NOM DU PROTOCOLE]**, destiné à être intégré dans l’application VetoGo.
Le protocole doit adapter les dosages et les traitements selon l’espèce (chien / chat). Il est impératif de mentionner explicitement les formules de calcul des posologies afin que l’application puisse calculer automatiquement les doses en fonction du poids et de l’espèce.

## 🎯 OBJECTIF
Produire un algorithme décisionnel vétérinaire détaillé, opérationnel et directement utilisable en pratique clinique, à destination des vétérinaires et ASV, en conformité stricte avec les recommandations en vigueur (ACVECC, ECVECC, AAHA).

## ⚠️ EXIGENCES CRITIQUES (OBLIGATOIRES)
1.  **Fiabilité** : Aucune information ne doit être inventée.
2.  **Sources** : Toutes les données doivent provenir de sources fiables, reconnues et vérifiables.
3.  **Traçabilité** : Toute affirmation clinique, thérapeutique ou posologique doit être sourcée.
4.  **Concision** : Format "Bullet point" privilégié pour faciliter la lecture sur mobile.

## 🧩 EXIGENCES DE CONTENU

### 1. Algorithme Clinique Structuré
Le protocole doit être clair, hiérarchisé et utilisable en situation réelle :
-   Évaluation initiale & Signes de gravité.
-   Mesures immédiates de stabilisation.
-   Examens complémentaires (recommandés vs optionnels).
-   Traitements (recommandés / contre-indiqués).
-   Conduite à tenir selon la sévérité.

### 2. Posologies et Calculs (POINT CRITIQUE)
Chaque traitement doit impérativement comporter :
-   ✅ **Molécule** – Indication – Voie d’administration.
-   ✅ **Dose exacte** (mg/kg, UI/kg, ml/kg...).
-   ✅ **Fréquence** et Durée.
-   ✅ **Formule de calcul** explicite pour VetoGo :
    -   *Exemple : Volume (ml) = (Poids * Dose (mg/kg)) / Concentration (mg/ml)*.
    -   *Précision : Indiquer si la concentration varie ou si standard (ex: Valium 10mg/2ml).*
-   ✅ **Exemples chiffrés** (Chien 10kg / Chat 4kg).
-   ✅ **Limites** (Dose max).

### 3. Adaptation Chien / Chat
-   Distinguer clairement Chien vs Chat.
-   Préciser les contre-indications spécifiques (ex: médicaments toxiques pour le chat).
-   Ajuster les doses si nécessaire.

## 🧱 STRUCTURE ATTENDUE (COMPATIBLE VETOGO)

Le rendu doit suivre cette structure pour l'intégration dans les 4 onglets de l'application :

### 🔹 Métadonnées
-   Titre du protocole.
-   Définition succincte.
-   Espèces concernées.
-   Tags (urgence, cardio, toxico...).

### 🗂 Onglet 1 – Général
-   **Physiopathologie** synthétique.
-   **Signes cliniques clés** (Format: Titre + Icône suggérée parmi lucide-react).
-   **Signes de gravité** (Critères d'alerte rouge).

### 🧪 Onglet 2 – Examens
-   **Bilan d'urgence** (Lactates, PCV/TP, Glycémie...).
-   **Examens complémentaires** prioritaires.
-   **Valeurs cibles** (ex: PAM > 60 mmHg).

### 💊 Onglet 3 – Traitements (Le Cœur du sujet)
-   **Algorithme thérapeutique** (Étape 1, 2, 3...).
-   **Mesures immédiates** (Oxygène, Accès veineux...).
-   **Tableau des Médicaments** (Nom, Dose, Calcul, Remarque).
-   **Fluides** (Bolus cristalloïdes : Volume ml/kg et durée).
-   **Surveillance** (Paramètres à monitorer).

### 🔗 Onglet 4 – Liens & Références
-   Liste des sources avec URLs directes si possible.
-   Citer : Consensus ACVECC, Guidelines AAHA, Plumb’s, BSAVA.

## 🌳 ARBORESCENCE DÉCISIONNELLE
Fournir une description textuelle ou Mermaid d'un arbre de décision simple :
*   Si [Condition A] → Faire [Action A]
*   Si [Condition B] → Faire [Action B]

---

**Format de réponse attendu** : Markdown structuré.
**Langue** : Français (sauf citations techniques en anglais si nécessaire).
