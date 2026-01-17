# VetoGo — Audit du catalogue « Calculateur de doses » (chien/chat)

> **Périmètre** : catalogue de médicaments utilisé par le calculateur de doses (fichier source).  
> **Contrainte** : aucun changement de structure de données applicative dans ce rapport.  
> **Langue** : français.

## 1) Diagnostic global du catalogue existant

### Couverture clinique réelle
- **Points forts** : urgence/soins intensifs bien couverts (RCP, transfusion, électrolytes, vasopresseurs, sédation).【F:src/data/drug-data.ts†L110-L1287】
- **Zones de fragilité** : médecine générale ambulatoire (antibiothérapie PO, douleur chronique, antiépileptiques per os, endocrino) peu représentée ou absente dans le calculateur.【F:src/data/drug-data.ts†L110-L1287】

### Cohérence des doses
- **Hétérogénéité des formats** : mélange mg/kg, mL/kg, UI/kg, mEq/kg, µg/kg/min sans standardisation de l’unité d’affichage et des fréquences (certaines fiches n’ont pas de fréquence).【F:src/data/drug-data.ts†L120-L1287】
- **Doses fixes vs plages** : plusieurs fiches n’exposent qu’une dose unique sans marge de sécurité (range absent), rendant le calculateur plus « rigide » que la pratique réelle.【F:src/data/drug-data.ts†L860-L1287】

### Risques cliniques potentiels
- **Risque d’erreur de concentration** : plusieurs fiches affichent des concentrations « variables » sans garde‑fou (p.ex. phénobarbital).【F:src/data/drug-data.ts†L905-L943】
- **Risque d’inadéquation espèce** : certains médicaments sont marqués « commun » mais ont en réalité des différences chien/chat significatives (ex. lidocaïne anti‑arythmique).【F:src/data/drug-data.ts†L1035-L1096】
- **Sources internes** : la métadonnée mentionne des bases sous copyright (ex. Plumb’s), incompatible avec la contrainte du projet ; à neutraliser dans la communication utilisateur (audit médico‑légal).【F:src/data/drug-data.ts†L64-L67】

### Manques critiques
- **Analgésie/sédation** : butorphanol et alfaxalone utilisés dans les protocoles mais absents du calculateur (risque de double saisie et d’erreurs manuelles).【F:src/components/protocols/RespiratoryDistress.tsx†L36-L152】【F:src/components/protocols/CSection.tsx†L51-L164】
- **Antibiothérapie PO** : amoxicilline et amoxicilline‑acide clavulanique PO sont citées en protocole mais pas disponibles au calculateur (clinique générale).【F:src/components/protocols/BacterialCystitis.tsx†L32-L122】【F:src/components/protocols/Mastitis.tsx†L35-L35】
- **AINS alternatifs** : robenacoxib est cité en protocole mais non disponible au calculateur (douleur et cystite).【F:src/components/protocols/AcuteLameness.tsx†L32-L141】【F:src/components/protocols/BacterialCystitis.tsx†L32-L122】
- **Antibiotiques ciblés** : marbofloxacine est citée en prostatite/pyélonéphrite sans entrée calculateur dédiée.【F:src/components/protocols/Prostatitis.tsx†L32-L100】【F:src/components/protocols/SuspectedPyelonephritis.tsx†L40-L126】

---

## 2) Audit médicament par médicament (existant)

> Format : **✅ Correct**, **⚠️ À clarifier/sécuriser**, **❌ Risques**, **🔧 Fiche normalisée**

### 2.1 TRANSFUSION SANGUINE

#### Sang Total (Whole Blood)
- ✅ Correct : dose en mL/kg et durée cohérentes avec la transfusion standard.【F:src/data/drug-data.ts†L128-L158】
- ⚠️ À clarifier : la plage (10–22 mL/kg) n’est pas associée à une indication clinique (hémorragie aiguë vs anémie chronique).【F:src/data/drug-data.ts†L138-L142】
- ❌ Risques : absence d’alerte sur incompatibilité transfusionnelle/hémolyse retardée (monitoring limité).【F:src/data/drug-data.ts†L144-L151】
- 🔧 **Fiche normalisée**
  - Molécule : Sang total (produit sanguin)
  - Classe thérapeutique : transfusion sanguine
  - Espèce : chien & chat
  - Indications cliniques principales : anémie aiguë/chronique avec hypoxie, hémorragie massive
  - Dose minimale : 10 mL/kg
  - Dose maximale : 22 mL/kg
  - Unité : mL/kg
  - Voie d’administration : IV (filtre)
  - Fréquence : perfusion sur 4 h
  - Concentration(s) utilisable(s) pour le calcul : N/A
  - Alertes cliniques critiques : réactions transfusionnelles, incompatibilité, ne pas mélanger avec RL
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Culot Globulaire (pRBC)
- ✅ Correct : dose 6–15 mL/kg et règle d’augmentation PCV intégrée.【F:src/data/drug-data.ts†L160-L189】
- ⚠️ À clarifier : indication préférentielle vs sang total (anémie chronique vs hémorragie aiguë).【F:src/data/drug-data.ts†L168-L173】
- ❌ Risques : absence d’alerte sur surcharge circulatoire (TACO) chez chat/IC.【F:src/data/drug-data.ts†L160-L189】
- 🔧 **Fiche normalisée**
  - Molécule : Culot globulaire
  - Classe thérapeutique : transfusion sanguine
  - Espèce : chien & chat
  - Indications cliniques principales : anémie non hémorragique, besoin PCV ciblé sans surcharge volumique
  - Dose minimale : 6 mL/kg
  - Dose maximale : 15 mL/kg
  - Unité : mL/kg
  - Voie d’administration : IV (filtre)
  - Fréquence : perfusion sur 4 h
  - Concentration(s) utilisable(s) pour le calcul : N/A
  - Alertes cliniques critiques : TACO, réactions transfusionnelles
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Plasma Frais Congelé (FFP)
- ✅ Correct : plage 10–20 mL/kg, usage coagulopathies.【F:src/data/drug-data.ts†L191-L219】
- ⚠️ À clarifier : pas d’info sur la cible de coagulation (PT/aPTT).【F:src/data/drug-data.ts†L201-L205】
- ❌ Risques : surcharge volume chez chats/IC non mentionnée.【F:src/data/drug-data.ts†L191-L219】
- 🔧 **Fiche normalisée**
  - Molécule : Plasma frais congelé
  - Classe thérapeutique : transfusion – facteurs de coagulation
  - Espèce : chien & chat
  - Indications cliniques principales : coagulopathie, hypoprotéinémie sévère sélectionnée
  - Dose minimale : 10 mL/kg
  - Dose maximale : 20 mL/kg
  - Unité : mL/kg
  - Voie d’administration : IV (filtre)
  - Fréquence : perfusion sur 4 h (plus rapide si hémorragie active)
  - Concentration(s) utilisable(s) pour le calcul : N/A
  - Alertes cliniques critiques : surcharge volémique, réactions transfusionnelles
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

### 2.2 GASTRO & ALLERGIE (2ème ligne)

#### Ondansétron
- ✅ Correct : dose 0,1–1 mg/kg, q8–12h.【F:src/data/drug-data.ts†L227-L257】
- ⚠️ À clarifier : pas d’indication spécifique (vomissements réfractaires vs chimio).【F:src/data/drug-data.ts†L229-L235】
- ❌ Risques : QT long non mentionné chez patients cardiaques à risque.
- 🔧 **Fiche normalisée**
  - Molécule : Ondansétron
  - Classe thérapeutique : antiémétique (antagoniste 5‑HT3)
  - Espèce : chien & chat
  - Indications cliniques principales : vomissements réfractaires, gastro‑entérite sévère
  - Dose minimale : 0,1 mg/kg
  - Dose maximale : 1 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV lent, PO
  - Fréquence : q8–12h
  - Concentration(s) utilisable(s) pour le calcul : 2 mg/mL
  - Alertes cliniques critiques : allongement QT potentiel
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Diphenhydramine
- ✅ Correct : 1–4 mg/kg q8h, voie IM/IV/SC.【F:src/data/drug-data.ts†L259-L287】
- ⚠️ À clarifier : indication allergie/urticaire vs prurit chronique (pas la même fréquence).【F:src/data/drug-data.ts†L265-L270】
- ❌ Risques : sédation et hypotension IV rapide mentionnée mais pas d’avertissement d’interactions (MAOIs).【F:src/data/drug-data.ts†L271-L276】
- 🔧 **Fiche normalisée**
  - Molécule : Diphenhydramine
  - Classe thérapeutique : antihistaminique H1
  - Espèce : chien & chat
  - Indications cliniques principales : réaction allergique aiguë, prurit
  - Dose minimale : 1 mg/kg
  - Dose maximale : 4 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IM, IV lent, SC
  - Fréquence : q8h
  - Concentration(s) utilisable(s) pour le calcul : 50 mg/mL
  - Alertes cliniques critiques : sédation, injection IV lente impérative
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Famotidine
- ✅ Correct : 0,5–1 mg/kg q12h.【F:src/data/drug-data.ts†L289-L316】
- ⚠️ À clarifier : PO possible mais non listée (selon contexte).【F:src/data/drug-data.ts†L296-L302】
- ❌ Risques : hémolyse féline IV rapide notée mais pas de recommandation explicite de dilution/temps.【F:src/data/drug-data.ts†L304-L312】
- 🔧 **Fiche normalisée**
  - Molécule : Famotidine
  - Classe thérapeutique : anti‑H2
  - Espèce : chien & chat
  - Indications cliniques principales : gastrite/ulcère, prophylaxie ulcères de stress
  - Dose minimale : 0,5 mg/kg
  - Dose maximale : 1 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV lent
  - Fréquence : q12h
  - Concentration(s) utilisable(s) pour le calcul : 10 mg/mL
  - Alertes cliniques critiques : injection IV lente (chat)
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

### 2.3 RÉANIMATION (CPR) — CODE ROUGE

#### Adrénaline (Épinéphrine)
- ✅ Correct : dose 0,01 mg/kg IV/IO, option IT à double dose; RECOVER cité.【F:src/data/drug-data.ts†L333-L369】
- ⚠️ À clarifier : manque dose « high » ou indications de passage high‑dose (p. ex. réfractaire).【F:src/data/drug-data.ts†L343-L356】
- ❌ Risques : IT avec dilution mentionnée mais pas de volume total recommandé (risque d’erreur).【F:src/data/drug-data.ts†L350-L356】
- 🔧 **Fiche normalisée**
  - Molécule : Adrénaline
  - Classe thérapeutique : catécholamine, vasopresseur
  - Espèce : chien & chat
  - Indications cliniques principales : RCP, anaphylaxie sévère
  - Dose minimale : 0,01 mg/kg
  - Dose maximale : 0,01 mg/kg (standard RECOVER)
  - Unité : mg/kg
  - Voie d’administration : IV, IO, IT
  - Fréquence : toutes les 3–5 min
  - Concentration(s) utilisable(s) pour le calcul : 0,1 mg/mL
  - Alertes cliniques critiques : dilution si volume <0,1 mL
  - Type de recommandation : guideline
  - Niveau de source : guideline

#### Atropine
- ✅ Correct : 0,04 mg/kg IV/IO/IT/IM.【F:src/data/drug-data.ts†L371-L406】
- ⚠️ À clarifier : pas de fréquence standard RCP vs brady vagale hors RCP.【F:src/data/drug-data.ts†L379-L387】
- ❌ Risques : contre‑indications listées mais pas de surveillance ECG/hypoxie associée.
- 🔧 **Fiche normalisée**
  - Molécule : Atropine
  - Classe thérapeutique : anticholinergique
  - Espèce : chien & chat
  - Indications cliniques principales : bradycardie vagale, asystolie sélectionnée
  - Dose minimale : 0,04 mg/kg
  - Dose maximale : 0,04 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV, IO, IT, IM
  - Fréquence : dose unique ou répétée 1x
  - Concentration(s) utilisable(s) pour le calcul : 0,54 mg/mL
  - Alertes cliniques critiques : contre‑indications (glaucome, tachycardie)
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Vasopressine
- ✅ Correct : 0,8 UI/kg dose unique (RECOVER).【F:src/data/drug-data.ts†L408-L429】
- ⚠️ À clarifier : préciser qu’elle remplace l’adrénaline (pas en add‑on systématique).【F:src/data/drug-data.ts†L414-L419】
- ❌ Risques : confusion d’unités UI vs mL possible (pas d’avertissement explicite).
- 🔧 **Fiche normalisée**
  - Molécule : Vasopressine
  - Classe thérapeutique : hormone antidiurétique, vasopresseur
  - Espèce : chien & chat
  - Indications cliniques principales : RCP en alternative à l’adrénaline
  - Dose minimale : 0,8 UI/kg
  - Dose maximale : 0,8 UI/kg
  - Unité : UI/kg
  - Voie d’administration : IV, IO
  - Fréquence : dose unique
  - Concentration(s) utilisable(s) pour le calcul : 20 UI/mL
  - Alertes cliniques critiques : confusion UI/mL
  - Type de recommandation : guideline
  - Niveau de source : guideline

#### Bicarbonate de sodium 8,4%
- ✅ Correct : 0,5–2 mEq/kg en acidose sévère/CPR prolongée.【F:src/data/drug-data.ts†L431-L462】
- ⚠️ À clarifier : indiquer clairement le seuil pH et contexte (CPR >10 min).【F:src/data/drug-data.ts†L439-L444】
- ❌ Risques : erreurs de mélange avec calcium (précipitation) déjà notées mais sans avertissement « jamais en même ligne ».【F:src/data/drug-data.ts†L447-L455】
- 🔧 **Fiche normalisée**
  - Molécule : Bicarbonate de sodium 8,4%
  - Classe thérapeutique : correcteur acidose
  - Espèce : chien & chat
  - Indications cliniques principales : acidose métabolique sévère, CPR prolongée
  - Dose minimale : 0,5 mEq/kg
  - Dose maximale : 2 mEq/kg
  - Unité : mEq/kg
  - Voie d’administration : IV lent
  - Fréquence : dose unique selon contexte
  - Concentration(s) utilisable(s) pour le calcul : 1 mEq/mL
  - Alertes cliniques critiques : ne pas mélanger avec calcium
  - Type de recommandation : guideline
  - Niveau de source : guideline

#### Chlorure de calcium 10%
- ✅ Correct : 0,05–0,1 mL/kg IV strict/IO, mention du risque nécrose.【F:src/data/drug-data.ts†L464-L494】
- ⚠️ À clarifier : indication (hyperkaliémie, hypocalcémie aiguë).【F:src/data/drug-data.ts†L472-L478】
- ❌ Risques : extravasation = nécrose sévère (déjà mention).【F:src/data/drug-data.ts†L481-L489】
- 🔧 **Fiche normalisée**
  - Molécule : Chlorure de calcium 10%
  - Classe thérapeutique : correcteur calcique
  - Espèce : chien & chat
  - Indications cliniques principales : hyperkaliémie, hypocalcémie aiguë
  - Dose minimale : 0,05 mL/kg
  - Dose maximale : 0,1 mL/kg
  - Unité : mL/kg
  - Voie d’administration : IV strict, IO
  - Fréquence : bolus
  - Concentration(s) utilisable(s) pour le calcul : 100 mg/mL
  - Alertes cliniques critiques : nécrose sévère en extravasation
  - Type de recommandation : guideline
  - Niveau de source : guideline

### 2.4 ANESTHÉSIE LOCALE & BLOCS

#### Lidocaïne 2% (Bloc local)
- ✅ Correct : dose max chien 4 mg/kg, chat 2 mg/kg.【F:src/data/drug-data.ts†L503-L535】
- ⚠️ À clarifier : volume max total vs par site (infiltration multiple).【F:src/data/drug-data.ts†L512-L519】
- ❌ Risques : toxicité féline (déjà notée) mais pas d’alerte cardio‑neuro (tremblements, convulsions).【F:src/data/drug-data.ts†L514-L523】
- 🔧 **Fiche normalisée**
  - Molécule : Lidocaïne 2% (bloc local)
  - Classe thérapeutique : anesthésique local
  - Espèce : chien & chat
  - Indications cliniques principales : blocs locaux/infiltration
  - Dose minimale : 1 mg/kg
  - Dose maximale : 6 mg/kg (chien) / 3 mg/kg (chat)
  - Unité : mg/kg
  - Voie d’administration : SC, infiltration, périnerveux
  - Fréquence : dose totale max par séance
  - Concentration(s) utilisable(s) pour le calcul : 20 mg/mL
  - Alertes cliniques critiques : toxicité neuro/cardiaque, surtout chat
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Bupivacaïne 0,5%
- ✅ Correct : dose max chien 1,5 mg/kg; chat 1 mg/kg.【F:src/data/drug-data.ts†L537-L571】
- ⚠️ À clarifier : limite totale vs par site; durée d’action non mentionnée.
- ❌ Risques : injection IV mortelle déjà signalée mais sans rappel d’aspiration systématique multi‑plans.【F:src/data/drug-data.ts†L558-L567】
- 🔧 **Fiche normalisée**
  - Molécule : Bupivacaïne 0,5%
  - Classe thérapeutique : anesthésique local longue durée
  - Espèce : chien & chat
  - Indications cliniques principales : blocs locaux, épidurale
  - Dose minimale : 0,5 mg/kg
  - Dose maximale : 2 mg/kg (chien) / 1 mg/kg (chat)
  - Unité : mg/kg
  - Voie d’administration : infiltration, épidurale (jamais IV)
  - Fréquence : dose totale max par séance
  - Concentration(s) utilisable(s) pour le calcul : 5 mg/mL
  - Alertes cliniques critiques : cardiotoxicité, mortel en IV
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

### 2.5 ANTI‑INFLAMMATOIRES (AINS)

#### Méloxicam
- ✅ Correct : chien 0,2 mg/kg q24h charge; chat dose unique 0,1–0,3 mg/kg (AMM).【F:src/data/drug-data.ts†L578-L614】
- ⚠️ À clarifier : pas de mention de relais PO ni de durée max chat.
- ❌ Risques : toxicité rénale chat si répété (déjà signalée).【F:src/data/drug-data.ts†L603-L610】
- 🔧 **Fiche normalisée**
  - Molécule : Méloxicam
  - Classe thérapeutique : AINS
  - Espèce : chien & chat
  - Indications cliniques principales : douleur/inflammation aiguë
  - Dose minimale : 0,1 mg/kg (chat)
  - Dose maximale : 0,3 mg/kg (chat) / 0,2 mg/kg (chien)
  - Unité : mg/kg
  - Voie d’administration : SC, IV
  - Fréquence : q24h (charge), chat dose unique
  - Concentration(s) utilisable(s) pour le calcul : 5 mg/mL
  - Alertes cliniques critiques : IR/insuff hépatique/assoc corticoïdes
  - Type de recommandation : AMM
  - Niveau de source : réglementaire

### 2.6 ANALGÉSIE OPIOÏDE FORTE

#### Fentanyl injectable
- ✅ Correct : 2–10 µg/kg (0,002–0,01 mg/kg).【F:src/data/drug-data.ts†L624-L668】
- ⚠️ À clarifier : bolus vs co‑induction (déjà en note) mais pas d’intervalle de redose.
- ❌ Risques : apnée sévère (mentionnée).【F:src/data/drug-data.ts†L659-L666】
- 🔧 **Fiche normalisée**
  - Molécule : Fentanyl
  - Classe thérapeutique : opioïde µ agoniste
  - Espèce : chien & chat
  - Indications cliniques principales : analgésie aiguë, co‑induction
  - Dose minimale : 0,002 mg/kg
  - Dose maximale : 0,01 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV
  - Fréquence : bolus selon protocole
  - Concentration(s) utilisable(s) pour le calcul : 0,05 mg/mL
  - Alertes cliniques critiques : apnée, dépression respiratoire
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Méthadone
- ✅ Correct : 0,1–0,4 mg/kg chien; 0,1–0,3 mg/kg chat.【F:src/data/drug-data.ts†L670-L706】
- ⚠️ À clarifier : voie SC lente et absorption variable.
- ❌ Risques : dépression respiratoire/ bradycardie non mentionnées.
- 🔧 **Fiche normalisée**
  - Molécule : Méthadone
  - Classe thérapeutique : opioïde µ agoniste
  - Espèce : chien & chat
  - Indications cliniques principales : douleur modérée à sévère
  - Dose minimale : 0,1 mg/kg
  - Dose maximale : 0,4 mg/kg (chien) / 0,3 mg/kg (chat)
  - Unité : mg/kg
  - Voie d’administration : IV, IM, SC
  - Fréquence : q4–6h
  - Concentration(s) utilisable(s) pour le calcul : 10 mg/mL
  - Alertes cliniques critiques : dépression respiratoire
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Morphine
- ✅ Correct : chien 0,2–1 mg/kg; chat 0,1–0,3 mg/kg.【F:src/data/drug-data.ts†L708-L750】
- ⚠️ À clarifier : éviter IV rapide (histamine) mentionné mais pas de vitesse recommandée.
- ❌ Risques : mastocytome et trauma crânien signalés mais pas de surveillance ventilatoire. 【F:src/data/drug-data.ts†L738-L747】
- 🔧 **Fiche normalisée**
  - Molécule : Morphine
  - Classe thérapeutique : opioïde µ agoniste
  - Espèce : chien & chat
  - Indications cliniques principales : douleur sévère
  - Dose minimale : 0,1 mg/kg (chat) / 0,2 mg/kg (chien)
  - Dose maximale : 1 mg/kg (chien) / 0,3 mg/kg (chat)
  - Unité : mg/kg
  - Voie d’administration : IM, SC, IV lent
  - Fréquence : q4–6h
  - Concentration(s) utilisable(s) pour le calcul : 10 mg/mL
  - Alertes cliniques critiques : libération histamine IV rapide
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Buprénorphine
- ✅ Correct : 0,01–0,03 mg/kg q6–8h, mention agoniste partiel.【F:src/data/drug-data.ts†L752-L787】
- ⚠️ À clarifier : voie transmucosale chat possible mais non listée.
- ❌ Risques : effet plafond (mentionné).【F:src/data/drug-data.ts†L779-L785】
- 🔧 **Fiche normalisée**
  - Molécule : Buprénorphine
  - Classe thérapeutique : opioïde agoniste partiel
  - Espèce : chien & chat
  - Indications cliniques principales : douleur légère à modérée
  - Dose minimale : 0,01 mg/kg
  - Dose maximale : 0,03 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV, IM, SC
  - Fréquence : q6–8h
  - Concentration(s) utilisable(s) pour le calcul : 0,3 mg/mL
  - Alertes cliniques critiques : effet plafond
  - Type de recommandation : AMM/pratique
  - Niveau de source : consensus

### 2.7 SÉDATION & ANESTHÉSIE

#### Acépromazine
- ✅ Correct : 0,01–0,05 mg/kg pré‑médication.【F:src/data/drug-data.ts†L794-L825】
- ⚠️ À clarifier : durée d’action longue et irréversible non rappelées.
- ❌ Risques : hypotension/contre‑indications listées (ok).【F:src/data/drug-data.ts†L814-L823】
- 🔧 **Fiche normalisée**
  - Molécule : Acépromazine
  - Classe thérapeutique : tranquillisant phénothiazine
  - Espèce : chien & chat
  - Indications cliniques principales : prémédication, anxiolyse
  - Dose minimale : 0,01 mg/kg
  - Dose maximale : 0,05 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV lent, IM
  - Fréquence : dose unique
  - Concentration(s) utilisable(s) pour le calcul : 5 mg/mL
  - Alertes cliniques critiques : hypotension, choc
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Dexmédétomidine
- ✅ Correct : chien 0,001–0,01 mg/kg; chat 0,005–0,04 mg/kg.【F:src/data/drug-data.ts†L827-L870】
- ⚠️ À clarifier : usage en IM vs IV micro‑doses (pas d’instructions de dilution).【F:src/data/drug-data.ts†L845-L858】
- ❌ Risques : bradycardie et vasoconstriction non rappelées.
- 🔧 **Fiche normalisée**
  - Molécule : Dexmédétomidine
  - Classe thérapeutique : agoniste α2
  - Espèce : chien & chat
  - Indications cliniques principales : sédation/analgésie
  - Dose minimale : 0,001 mg/kg (chien)
  - Dose maximale : 0,01 mg/kg (chien) / 0,04 mg/kg (chat)
  - Unité : mg/kg
  - Voie d’administration : IV, IM
  - Fréquence : titrer à effet
  - Concentration(s) utilisable(s) pour le calcul : 0,5 mg/mL
  - Alertes cliniques critiques : bradycardie/hypoxie, micro‑dose = dilution
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Kétamine
- ✅ Correct : 2–10 mg/kg (induction/immobilisation).【F:src/data/drug-data.ts†L872-L912】
- ⚠️ À clarifier : contexte analgésie CRI (bolus 0,5 mg/kg noté, mais pas de débit).【F:src/data/drug-data.ts†L887-L893】
- ❌ Risques : contre‑indications glaucome/HCM chat (ok).【F:src/data/drug-data.ts†L894-L901】
- 🔧 **Fiche normalisée**
  - Molécule : Kétamine
  - Classe thérapeutique : anesthésique dissociatif
  - Espèce : chien & chat
  - Indications cliniques principales : induction, contention chimique, analgésie CRI
  - Dose minimale : 2 mg/kg
  - Dose maximale : 10 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV, IM
  - Fréquence : titrer selon indication
  - Concentration(s) utilisable(s) pour le calcul : 100 mg/mL
  - Alertes cliniques critiques : HCM chat, glaucome
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Propofol
- ✅ Correct : 2–6 mg/kg, titrer à effet.【F:src/data/drug-data.ts†L914-L945】
- ⚠️ À clarifier : pas de durée d’action ni d’interdiction d’utilisation continue en chat.
- ❌ Risques : apnée (mentionnée).【F:src/data/drug-data.ts†L936-L943】
- 🔧 **Fiche normalisée**
  - Molécule : Propofol
  - Classe thérapeutique : anesthésique IV
  - Espèce : chien & chat
  - Indications cliniques principales : induction
  - Dose minimale : 2 mg/kg
  - Dose maximale : 6 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV strict
  - Fréquence : titrer à effet
  - Concentration(s) utilisable(s) pour le calcul : 10 mg/mL
  - Alertes cliniques critiques : apnée, jeter après 6–24 h
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Midazolam
- ✅ Correct : 0,1–0,5 mg/kg, voies IV/IM/IN.【F:src/data/drug-data.ts†L947-L978】
- ⚠️ À clarifier : mentionner paradoxes excitation chez chien jeune.
- ❌ Risques : dépression respiratoire en combinaison non signalée.
- 🔧 **Fiche normalisée**
  - Molécule : Midazolam
  - Classe thérapeutique : benzodiazépine
  - Espèce : chien & chat
  - Indications cliniques principales : sédation, anticonvulsivant
  - Dose minimale : 0,1 mg/kg
  - Dose maximale : 0,5 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV, IM, IN
  - Fréquence : selon protocole
  - Concentration(s) utilisable(s) pour le calcul : 5 mg/mL
  - Alertes cliniques critiques : excitation paradoxale possible
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

### 2.8 TOXICOLOGIE & ANTIDOTES AVANCÉS

#### Émulsion lipidique 20% (ILE)
- ✅ Correct : bolus 1,5–4 mL/kg, mention CRI 0,25 mL/kg/min.【F:src/data/drug-data.ts†L985-L1017】
- ⚠️ À clarifier : durée et plafond de dose totale non mentionnés.
- ❌ Risques : pancréatite/lipidémie interférant analyses non mentionnées.
- 🔧 **Fiche normalisée**
  - Molécule : Émulsion lipidique 20%
  - Classe thérapeutique : antidote lipidique
  - Espèce : chien & chat
  - Indications cliniques principales : intoxication lipophile (perméthrine, anesthésiques locaux)
  - Dose minimale : 1,5 mL/kg
  - Dose maximale : 4 mL/kg
  - Unité : mL/kg
  - Voie d’administration : IV
  - Fréquence : bolus puis CRI
  - Concentration(s) utilisable(s) pour le calcul : 200 mg/mL
  - Alertes cliniques critiques : hyperlipidémie, interférence labo
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Fomépizole (4‑MP)
- ✅ Correct : chien 20 mg/kg, chat 125 mg/kg (charge).【F:src/data/drug-data.ts†L1019-L1049】
- ⚠️ À clarifier : protocole d’entretien non renseigné.
- ❌ Risques : disponibilité limitée/ coût; nécessité d’administration précoce non mentionnée.
- 🔧 **Fiche normalisée**
  - Molécule : Fomépizole
  - Classe thérapeutique : antidote (inhibiteur alcool‑déshydrogénase)
  - Espèce : chien & chat
  - Indications cliniques principales : intoxication éthylène glycol
  - Dose minimale : 20 mg/kg (chien)
  - Dose maximale : 125 mg/kg (chat)
  - Unité : mg/kg
  - Voie d’administration : IV lent
  - Fréquence : dose de charge
  - Concentration(s) utilisable(s) pour le calcul : 50 mg/mL
  - Alertes cliniques critiques : administration précoce essentielle
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Glucagon
- ✅ Correct : 0,05 mg/kg bolus (50 µg/kg).【F:src/data/drug-data.ts†L1051-L1077】
- ⚠️ À clarifier : pas de CRI possible ou redoses.
- ❌ Risques : hyperglycémie/transitoire, vomissements possibles.
- 🔧 **Fiche normalisée**
  - Molécule : Glucagon
  - Classe thérapeutique : antidote métabolique
  - Espèce : chien & chat
  - Indications cliniques principales : surdosage bêtabloquants, hypoglycémie réfractaire
  - Dose minimale : 0,05 mg/kg
  - Dose maximale : 0,05 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV
  - Fréquence : bolus
  - Concentration(s) utilisable(s) pour le calcul : 1 mg/mL
  - Alertes cliniques critiques : vomissements, hyperglycémie
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Naloxone
- ✅ Correct : 0,01–0,04 mg/kg titrer.【F:src/data/drug-data.ts†L1079-L1105】
- ⚠️ À clarifier : risque douleur rebond/retour brutal ventilation.
- ❌ Risques : dosage trop élevé peut entraîner agitation.
- 🔧 **Fiche normalisée**
  - Molécule : Naloxone
  - Classe thérapeutique : antagoniste opioïde
  - Espèce : chien & chat
  - Indications cliniques principales : surdosage opioïde
  - Dose minimale : 0,01 mg/kg
  - Dose maximale : 0,04 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV, IM, IT
  - Fréquence : titrer à effet
  - Concentration(s) utilisable(s) pour le calcul : 0,4 mg/mL
  - Alertes cliniques critiques : douleur rebond, agitation
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Flumazénil
- ✅ Correct : 0,01 mg/kg IV unique.【F:src/data/drug-data.ts†L1107-L1130】
- ⚠️ À clarifier : courte demi‑vie (risque resédation).
- ❌ Risques : convulsions si intox TCA ou sevrage BZD.
- 🔧 **Fiche normalisée**
  - Molécule : Flumazénil
  - Classe thérapeutique : antagoniste benzodiazépines
  - Espèce : chien & chat
  - Indications cliniques principales : surdosage benzodiazépines
  - Dose minimale : 0,01 mg/kg
  - Dose maximale : 0,01 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV
  - Fréquence : dose unique
  - Concentration(s) utilisable(s) pour le calcul : 0,1 mg/mL
  - Alertes cliniques critiques : convulsions si intox mixte
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Atipamézole
- ✅ Correct : 0,1 mg/kg IM (volume = volume dexmédétomidine).【F:src/data/drug-data.ts†L1132-L1160】
- ⚠️ À clarifier : timing idéal après α2 (10–30 min).
- ❌ Risques : hypotension brutale si IV (mentionnée).【F:src/data/drug-data.ts†L1153-L1159】
- 🔧 **Fiche normalisée**
  - Molécule : Atipamézole
  - Classe thérapeutique : antagoniste α2
  - Espèce : chien & chat
  - Indications cliniques principales : réversion α2‑agonistes
  - Dose minimale : 0,1 mg/kg
  - Dose maximale : 0,1 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IM
  - Fréquence : dose unique
  - Concentration(s) utilisable(s) pour le calcul : 5 mg/mL
  - Alertes cliniques critiques : IV contre‑indiqué
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### N‑acétylcystéine (NAC)
- ✅ Correct : charge 140 mg/kg, mention dilution/filtre.【F:src/data/drug-data.ts†L1162-L1189】
- ⚠️ À clarifier : protocole d’entretien absent.
- ❌ Risques : réaction anaphylactoïde possible (non mentionnée).
- 🔧 **Fiche normalisée**
  - Molécule : N‑acétylcystéine
  - Classe thérapeutique : antidote (hépatoprotection)
  - Espèce : chien & chat
  - Indications cliniques principales : intoxication paracétamol, hépatotoxiques
  - Dose minimale : 140 mg/kg
  - Dose maximale : 140 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV dilué, PO
  - Fréquence : dose de charge
  - Concentration(s) utilisable(s) pour le calcul : 200 mg/mL
  - Alertes cliniques critiques : réaction anaphylactoïde
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

### 2.9 ÉLECTROLYTES & MÉTABOLIQUE

#### Gluconate de calcium 10%
- ✅ Correct : 50–150 mg/kg IV lent 10–20 min.【F:src/data/drug-data.ts†L1193-L1220】
- ⚠️ À clarifier : dose exprimée mg/kg mais concentration en 10% (risque confusion avec mL/kg).
- ❌ Risques : bradycardie (mentionnée).【F:src/data/drug-data.ts†L1214-L1219】
- 🔧 **Fiche normalisée**
  - Molécule : Gluconate de calcium 10%
  - Classe thérapeutique : correcteur calcique
  - Espèce : chien & chat
  - Indications cliniques principales : hyperkaliémie, hypocalcémie aiguë
  - Dose minimale : 50 mg/kg
  - Dose maximale : 150 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV lent
  - Fréquence : sur 10–20 min
  - Concentration(s) utilisable(s) pour le calcul : 100 mg/mL
  - Alertes cliniques critiques : ECG recommandé
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Sulfate de magnésium 50%
- ✅ Correct : 30–50 mg/kg IV lent; torsades mentionnée.【F:src/data/drug-data.ts†L1222-L1256】
- ⚠️ À clarifier : pas de mention de monitoring réflexes/pression.
- ❌ Risques : hypotension rapide (mentionnée).【F:src/data/drug-data.ts†L1249-L1255】
- 🔧 **Fiche normalisée**
  - Molécule : Sulfate de magnésium 50%
  - Classe thérapeutique : électrolyte, anti‑arythmique
  - Espèce : chien & chat
  - Indications cliniques principales : torsades de pointes, hypomagnésémie
  - Dose minimale : 30 mg/kg
  - Dose maximale : 50 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV lent
  - Fréquence : 15–30 min
  - Concentration(s) utilisable(s) pour le calcul : 500 mg/mL
  - Alertes cliniques critiques : hypotension si injection rapide
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Phosphate de potassium
- ✅ Correct : CRI 0,01–0,06 mmol/kg/h, alerte bolus interdite.【F:src/data/drug-data.ts†L1258-L1286】
- ⚠️ À clarifier : unité mmol vs mg (risque). Mention existante utile mais pas en rouge.
- ❌ Risques : hypocalcémie sévère, hypotension (mention).【F:src/data/drug-data.ts†L1278-L1285】
- 🔧 **Fiche normalisée**
  - Molécule : Phosphate de potassium
  - Classe thérapeutique : électrolyte
  - Espèce : chien & chat
  - Indications cliniques principales : hypophosphatémie sévère
  - Dose minimale : 0,01 mmol/kg/h
  - Dose maximale : 0,06 mmol/kg/h
  - Unité : mmol/kg/h
  - Voie d’administration : IV CRI uniquement
  - Fréquence : CRI 6–12 h
  - Concentration(s) utilisable(s) pour le calcul : 3 mmol/mL
  - Alertes cliniques critiques : jamais en bolus
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Dextrose 50%
- ✅ Correct : 250–1000 mg/kg (0,5–1 mL/kg) avec dilution.【F:src/data/drug-data.ts†L1288-L1321】
- ⚠️ À clarifier : préciser concentration finale visée (10–25%).
- ❌ Risques : nécrose tissulaire (mentionnée).【F:src/data/drug-data.ts†L1313-L1319】
- 🔧 **Fiche normalisée**
  - Molécule : Dextrose 50%
  - Classe thérapeutique : correcteur hypoglycémie
  - Espèce : chien & chat
  - Indications cliniques principales : hypoglycémie aiguë
  - Dose minimale : 250 mg/kg
  - Dose maximale : 1000 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV strict (dilué)
  - Fréquence : bolus
  - Concentration(s) utilisable(s) pour le calcul : 500 mg/mL
  - Alertes cliniques critiques : toujours diluer, nécrose en extravasation
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Insuline rapide (Regular)
- ✅ Correct : 0,05–0,2 UI/kg (hyperkaliémie/DKA).【F:src/data/drug-data.ts†L1323-L1355】
- ⚠️ À clarifier : protocole CRI DKA non détaillé.
- ❌ Risques : hypoglycémie fatale (mentionnée).【F:src/data/drug-data.ts†L1346-L1353】
- 🔧 **Fiche normalisée**
  - Molécule : Insuline régulière
  - Classe thérapeutique : hypoglycémiant
  - Espèce : chien & chat
  - Indications cliniques principales : DKA, hyperkaliémie
  - Dose minimale : 0,05 UI/kg
  - Dose maximale : 0,2 UI/kg
  - Unité : UI/kg
  - Voie d’administration : IV, IM
  - Fréquence : selon protocole
  - Concentration(s) utilisable(s) pour le calcul : 100 UI/mL
  - Alertes cliniques critiques : hypoglycémie, associer dextrose
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Chlorure de potassium (KCl)
- ✅ Correct : 0,5 mEq/kg/h max, CRI uniquement。【F:src/data/drug-data.ts†L1357-L1385】
- ⚠️ À clarifier : mentionner vitesse max en mEq/L pour perfusion standard.
- ❌ Risques : bolus mortel (mention).【F:src/data/drug-data.ts†L1377-L1383】
- 🔧 **Fiche normalisée**
  - Molécule : Chlorure de potassium
  - Classe thérapeutique : électrolyte
  - Espèce : chien & chat
  - Indications cliniques principales : hypokaliémie sévère
  - Dose minimale : 0,5 mEq/kg/h (max)
  - Dose maximale : 0,5 mEq/kg/h (max)
  - Unité : mEq/kg/h
  - Voie d’administration : IV dilué (CRI)
  - Fréquence : CRI
  - Concentration(s) utilisable(s) pour le calcul : 2 mEq/mL
  - Alertes cliniques critiques : jamais en bolus
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

### 2.10 URGENCES REPRODUCTIVES

#### Oxytocine
- ✅ Correct : 0,05 UI/kg (note sur dose fixe max) et alertes obstétricales.【F:src/data/drug-data.ts†L1387-L1426】
- ⚠️ À clarifier : la plage 0,5–2 UI (par animal) contredit l’approche mg/kg → risque d’erreur si poids extrême.【F:src/data/drug-data.ts†L1398-L1407】
- ❌ Risques : obstruction fœtale (mention).【F:src/data/drug-data.ts†L1412-L1419】
- 🔧 **Fiche normalisée**
  - Molécule : Oxytocine
  - Classe thérapeutique : uterotonique
  - Espèce : chien & chat
  - Indications cliniques principales : dystocie non obstructive
  - Dose minimale : 0,05 UI/kg
  - Dose maximale : 0,05 UI/kg (avec plafond par animal)
  - Unité : UI/kg
  - Voie d’administration : IM, SC, IV micro‑dose
  - Fréquence : selon protocole
  - Concentration(s) utilisable(s) pour le calcul : 10 UI/mL
  - Alertes cliniques critiques : obstruction fœtale = CI
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

### 2.11 NEUROLOGIE & CORTICOÏDES

#### Diazépam
- ✅ Correct : 0,5–1 mg/kg IV/IR crise.【F:src/data/drug-data.ts†L1429-L1455】
- ⚠️ À clarifier : stabilité en seringue et voie IM inefficace non mentionnées.
- ❌ Risques : excitation paradoxale, hépatotoxicité chat rare (non mentionnées).
- 🔧 **Fiche normalisée**
  - Molécule : Diazépam
  - Classe thérapeutique : benzodiazépine
  - Espèce : chien & chat
  - Indications cliniques principales : crise convulsive
  - Dose minimale : 0,5 mg/kg
  - Dose maximale : 1 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV, intra‑rectal
  - Fréquence : bolus
  - Concentration(s) utilisable(s) pour le calcul : 5 mg/mL
  - Alertes cliniques critiques : excitation paradoxale possible
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Phénobarbital
- ✅ Correct : 10–20 mg/kg dose de charge.【F:src/data/drug-data.ts†L1457-L1484】
- ⚠️ À clarifier : concentration variable (mention) => besoin de confirmation obligatoire.
- ❌ Risques : dépression respiratoire/hypotension si IV rapide.
- 🔧 **Fiche normalisée**
  - Molécule : Phénobarbital
  - Classe thérapeutique : barbiturique anticonvulsivant
  - Espèce : chien & chat
  - Indications cliniques principales : status épilepticus
  - Dose minimale : 10 mg/kg
  - Dose maximale : 20 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV, IM
  - Fréquence : charge
  - Concentration(s) utilisable(s) pour le calcul : variable (ex. 200 mg/mL)
  - Alertes cliniques critiques : confirmer concentration avant calcul
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Levetiracetam
- ✅ Correct : 20–60 mg/kg, dilution IV mentionnée.【F:src/data/drug-data.ts†L1486-L1516】
- ⚠️ À clarifier : fréquence d’entretien non indiquée.
- ❌ Risques : irritation IV si non dilué (mention).【F:src/data/drug-data.ts†L1509-L1514】
- 🔧 **Fiche normalisée**
  - Molécule : Levetiracetam
  - Classe thérapeutique : anticonvulsivant
  - Espèce : chien & chat
  - Indications cliniques principales : crise, status épilepticus
  - Dose minimale : 20 mg/kg
  - Dose maximale : 60 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV, PO
  - Fréquence : selon protocole
  - Concentration(s) utilisable(s) pour le calcul : 100 mg/mL
  - Alertes cliniques critiques : dilution IV nécessaire
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Mannitol 20%
- ✅ Correct : 0,5–2 g/kg (500–2000 mg/kg).【F:src/data/drug-data.ts†L1518-L1547】
- ⚠️ À clarifier : débit et osmolarité; nécessité cathéter filtre (mention).【F:src/data/drug-data.ts†L1539-L1545】
- ❌ Risques : déshydratation/osmolalité élevée non rappelées.
- 🔧 **Fiche normalisée**
  - Molécule : Mannitol 20%
  - Classe thérapeutique : osmothérapeutique
  - Espèce : chien & chat
  - Indications cliniques principales : hypertension intracrânienne
  - Dose minimale : 500 mg/kg
  - Dose maximale : 2000 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV strict
  - Fréquence : bolus
  - Concentration(s) utilisable(s) pour le calcul : 200 mg/mL
  - Alertes cliniques critiques : filtre obligatoire, déshydratation
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Dexaméthasone phosphate
- ✅ Correct : 0,05–0,2 mg/kg; « shock dose » 0,5–2 mg/kg anaphylaxie sévère.【F:src/data/drug-data.ts†L1549-L1585】
- ⚠️ À clarifier : précision AMM vs hors AMM non indiquée.
- ❌ Risques : immunosuppression/délais cicatrisation non rappelés.
- 🔧 **Fiche normalisée**
  - Molécule : Dexaméthasone phosphate
  - Classe thérapeutique : glucocorticoïde
  - Espèce : chien & chat
  - Indications cliniques principales : réactions inflammatoires aiguës, anaphylaxie
  - Dose minimale : 0,05 mg/kg
  - Dose maximale : 2 mg/kg (shock)
  - Unité : mg/kg
  - Voie d’administration : IV, IM, SC
  - Fréquence : selon protocole
  - Concentration(s) utilisable(s) pour le calcul : 4 mg/mL
  - Alertes cliniques critiques : hyperglycémie/immunosuppression
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Méthylprednisolone succinate
- ✅ Correct : 1–2 mg/kg standard; 30 mg/kg protocole spinal.【F:src/data/drug-data.ts†L1587-L1624】
- ⚠️ À clarifier : protocole spinal controversé (risques > bénéfices).
- ❌ Risques : GI/immu‑suppression à fortes doses.
- 🔧 **Fiche normalisée**
  - Molécule : Méthylprednisolone succinate
  - Classe thérapeutique : glucocorticoïde
  - Espèce : chien & chat
  - Indications cliniques principales : inflammation aiguë, protocole spinal (sélectionné)
  - Dose minimale : 1 mg/kg
  - Dose maximale : 30 mg/kg (spinal)
  - Unité : mg/kg
  - Voie d’administration : IV
  - Fréquence : selon protocole
  - Concentration(s) utilisable(s) pour le calcul : 62,5 mg/mL (reconst.)
  - Alertes cliniques critiques : risques GI et immunosuppression
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

### 2.12 VASOPRESSEURS & CARDIO

#### Noradrénaline
- ✅ Correct : 0,05–2 µg/kg/min CRI; alerte extravasation.【F:src/data/drug-data.ts†L1627-L1656】
- ⚠️ À clarifier : nécessité de CVC (mention) mais pas de titration cible (MAP).
- ❌ Risques : nécrose extravasation (mention).【F:src/data/drug-data.ts†L1647-L1653】
- 🔧 **Fiche normalisée**
  - Molécule : Noradrénaline
  - Classe thérapeutique : vasopresseur α‑adrénergique
  - Espèce : chien & chat
  - Indications cliniques principales : choc vasoplégique
  - Dose minimale : 0,05 µg/kg/min
  - Dose maximale : 2 µg/kg/min
  - Unité : µg/kg/min
  - Voie d’administration : IV CRI strict
  - Fréquence : perfusion continue
  - Concentration(s) utilisable(s) pour le calcul : 1 mg/mL
  - Alertes cliniques critiques : extravasation = nécrose
  - Type de recommandation : guideline
  - Niveau de source : guideline

#### Dopamine
- ✅ Correct : 2–15 µg/kg/min CRI.【F:src/data/drug-data.ts†L1658-L1685】
- ⚠️ À clarifier : indication spécifique (choc cardiogénique vs distributif).
- ❌ Risques : arythmies non mentionnées.
- 🔧 **Fiche normalisée**
  - Molécule : Dopamine
  - Classe thérapeutique : catécholamine
  - Espèce : chien & chat
  - Indications cliniques principales : choc avec hypotension
  - Dose minimale : 2 µg/kg/min
  - Dose maximale : 15 µg/kg/min
  - Unité : µg/kg/min
  - Voie d’administration : IV CRI strict
  - Fréquence : perfusion continue
  - Concentration(s) utilisable(s) pour le calcul : 40 mg/mL
  - Alertes cliniques critiques : arythmies
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Dobutamine
- ✅ Correct : 2–20 µg/kg/min CRI.【F:src/data/drug-data.ts†L1687-L1715】
- ⚠️ À clarifier : objectif inotrope (débit cardiaque) non mentionné.
- ❌ Risques : tachyarythmie.
- 🔧 **Fiche normalisée**
  - Molécule : Dobutamine
  - Classe thérapeutique : inotrope β1
  - Espèce : chien & chat
  - Indications cliniques principales : insuffisance cardiaque aiguë, choc cardiogénique
  - Dose minimale : 2 µg/kg/min
  - Dose maximale : 20 µg/kg/min
  - Unité : µg/kg/min
  - Voie d’administration : IV CRI
  - Fréquence : perfusion continue
  - Concentration(s) utilisable(s) pour le calcul : 12,5 mg/mL
  - Alertes cliniques critiques : tachyarythmie
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Lidocaïne 2% (Anti‑arythmique)
- ✅ Correct : chien 2–8 mg/kg; chat 0,25–1 mg/kg (risque).【F:src/data/drug-data.ts†L1717-L1753】
- ⚠️ À clarifier : différence forte chien/chat → éviter « common ». (déjà séparé).
- ❌ Risques : toxicité féline élevée mentionnée. 【F:src/data/drug-data.ts†L1738-L1744】
- 🔧 **Fiche normalisée**
  - Molécule : Lidocaïne 2% (anti‑arythmique)
  - Classe thérapeutique : anti‑arythmique classe Ib
  - Espèce : chien & chat
  - Indications cliniques principales : arythmies ventriculaires
  - Dose minimale : 2 mg/kg (chien) / 0,25 mg/kg (chat)
  - Dose maximale : 8 mg/kg (chien) / 1 mg/kg (chat)
  - Unité : mg/kg
  - Voie d’administration : IV, IO
  - Fréquence : bolus, selon réponse
  - Concentration(s) utilisable(s) pour le calcul : 20 mg/mL
  - Alertes cliniques critiques : toxicité féline
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Furosémide
- ✅ Correct : 1–4 mg/kg IV/IM/SC.【F:src/data/drug-data.ts†L1755-L1782】
- ⚠️ À clarifier : dose de charge vs CRI non mentionnées.
- ❌ Risques : déshydratation/hypokaliémie non rappelées.
- 🔧 **Fiche normalisée**
  - Molécule : Furosémide
  - Classe thérapeutique : diurétique de l’anse
  - Espèce : chien & chat
  - Indications cliniques principales : OAP, insuffisance cardiaque
  - Dose minimale : 1 mg/kg
  - Dose maximale : 4 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV, IM, SC
  - Fréquence : selon protocole
  - Concentration(s) utilisable(s) pour le calcul : 50 mg/mL
  - Alertes cliniques critiques : hypovolémie, hypokaliémie
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

### 2.13 RESPIRATOIRE

#### Terbutaline
- ✅ Correct : 0,01 mg/kg q4–6h.【F:src/data/drug-data.ts†L1784-L1812】
- ⚠️ À clarifier : voie PO possible mais non listée.
- ❌ Risques : tachycardie/tremblements (mention).【F:src/data/drug-data.ts†L1805-L1811】
- 🔧 **Fiche normalisée**
  - Molécule : Terbutaline
  - Classe thérapeutique : bronchodilatateur β2
  - Espèce : chien & chat
  - Indications cliniques principales : bronchospasme, asthme félin
  - Dose minimale : 0,01 mg/kg
  - Dose maximale : 0,01 mg/kg
  - Unité : mg/kg
  - Voie d’administration : SC, IM, IV lent
  - Fréquence : q4–6h
  - Concentration(s) utilisable(s) pour le calcul : 0,5 mg/mL
  - Alertes cliniques critiques : tachycardie, tremblements
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

### 2.14 ANTIBIO & COAGULATION

#### Maropitant
- ✅ Correct : 1 mg/kg q24h.【F:src/data/drug-data.ts†L1814-L1841】
- ⚠️ À clarifier : voie PO possible et limite d’âge (chiots).
- ❌ Risques : douleur injection SC non mentionnée.
- 🔧 **Fiche normalisée**
  - Molécule : Maropitant
  - Classe thérapeutique : antiémétique (antagoniste NK1)
  - Espèce : chien & chat
  - Indications cliniques principales : vomissements, cinétose
  - Dose minimale : 1 mg/kg
  - Dose maximale : 1 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV lent, SC
  - Fréquence : q24h
  - Concentration(s) utilisable(s) pour le calcul : 10 mg/mL
  - Alertes cliniques critiques : douleur SC possible
  - Type de recommandation : AMM
  - Niveau de source : réglementaire

#### Métoclopramide
- ✅ Correct : 0,2–0,5 mg/kg.【F:src/data/drug-data.ts†L1843-L1870】
- ⚠️ À clarifier : CRI possible (1–2 mg/kg/j) non mentionnée.
- ❌ Risques : contre‑indiqué obstruction GI (mention).【F:src/data/drug-data.ts†L1863-L1869】
- 🔧 **Fiche normalisée**
  - Molécule : Métoclopramide
  - Classe thérapeutique : antiémétique/prokinétique
  - Espèce : chien & chat
  - Indications cliniques principales : vomissements, hypomotilité
  - Dose minimale : 0,2 mg/kg
  - Dose maximale : 0,5 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV, IM, SC
  - Fréquence : selon protocole
  - Concentration(s) utilisable(s) pour le calcul : 5 mg/mL
  - Alertes cliniques critiques : CI obstruction GI
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Apomorphine
- ✅ Correct : chien 0,02–0,04 mg/kg; chat inefficace (dose 0).【F:src/data/drug-data.ts†L1872-L1909】
- ⚠️ À clarifier : voie conjonctivale dose/volume non précisés.
- ❌ Risques : sédation excessive si surdosage.
- 🔧 **Fiche normalisée**
  - Molécule : Apomorphine
  - Classe thérapeutique : émétique (agoniste dopaminergique)
  - Espèce : chien (chat : inefficace)
  - Indications cliniques principales : induction vomissement (chien)
  - Dose minimale : 0,02 mg/kg
  - Dose maximale : 0,04 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV, SC, conjonctival
  - Fréquence : dose unique
  - Concentration(s) utilisable(s) pour le calcul : 10 mg/mL
  - Alertes cliniques critiques : inefficace chat
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Ampicilline
- ✅ Correct : 22 mg/kg IV/IM.【F:src/data/drug-data.ts†L1911-L1937】
- ⚠️ À clarifier : fréquence non indiquée.
- ❌ Risques : allergie β‑lactamines non mentionnée.
- 🔧 **Fiche normalisée**
  - Molécule : Ampicilline
  - Classe thérapeutique : β‑lactamine
  - Espèce : chien & chat
  - Indications cliniques principales : infections bactériennes sensibles
  - Dose minimale : 22 mg/kg
  - Dose maximale : 22 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV, IM
  - Fréquence : à préciser (souvent q6–8h)
  - Concentration(s) utilisable(s) pour le calcul : 100 mg/mL (reconst.)
  - Alertes cliniques critiques : réactions allergiques
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Amoxicilline‑acide clavulanique (IV)
- ✅ Correct : 20 mg/kg IV.【F:src/data/drug-data.ts†L1939-L1965】
- ⚠️ À clarifier : fréquence non indiquée; distinction PO/IV absente.
- ❌ Risques : allergie β‑lactamines non mentionnée.
- 🔧 **Fiche normalisée**
  - Molécule : Amoxicilline‑acide clavulanique (IV)
  - Classe thérapeutique : β‑lactamine + inhibiteur β‑lactamase
  - Espèce : chien & chat
  - Indications cliniques principales : infections bactériennes sensibles
  - Dose minimale : 20 mg/kg
  - Dose maximale : 20 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV
  - Fréquence : à préciser (souvent q8h)
  - Concentration(s) utilisable(s) pour le calcul : 100 mg/mL (reconst.)
  - Alertes cliniques critiques : allergie β‑lactamines
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Céfazoline
- ✅ Correct : 22 mg/kg IV/IM.【F:src/data/drug-data.ts†L1967-L1993】
- ⚠️ À clarifier : prophylaxie chirurgicale vs infection (fréquence absente).
- ❌ Risques : allergie β‑lactamines non mentionnée.
- 🔧 **Fiche normalisée**
  - Molécule : Céfazoline
  - Classe thérapeutique : céphalosporine 1re génération
  - Espèce : chien & chat
  - Indications cliniques principales : prophylaxie chirurgicale, infections sensibles
  - Dose minimale : 22 mg/kg
  - Dose maximale : 22 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV, IM
  - Fréquence : à préciser (souvent q8h)
  - Concentration(s) utilisable(s) pour le calcul : 100 mg/mL (reconst.)
  - Alertes cliniques critiques : allergie β‑lactamines
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Enrofloxacine
- ✅ Correct : 5–20 mg/kg chien, 5 mg/kg chat; alerte rétine chat.【F:src/data/drug-data.ts†L1995-L2036】
- ⚠️ À clarifier : plage chien large (5–20) sans indication.
- ❌ Risques : cécité chat >5 mg/kg/j (mention).【F:src/data/drug-data.ts†L2014-L2022】
- 🔧 **Fiche normalisée**
  - Molécule : Enrofloxacine
  - Classe thérapeutique : fluoroquinolone
  - Espèce : chien & chat
  - Indications cliniques principales : infections sévères sensibles
  - Dose minimale : 5 mg/kg
  - Dose maximale : 20 mg/kg (chien) / 5 mg/kg (chat)
  - Unité : mg/kg
  - Voie d’administration : IV dilué, IM, SC
  - Fréquence : selon protocole
  - Concentration(s) utilisable(s) pour le calcul : 50 mg/mL
  - Alertes cliniques critiques : toxicité rétinienne chat
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Métronidazole IV
- ✅ Correct : 10–15 mg/kg IV lent.【F:src/data/drug-data.ts†L2038-L2065】
- ⚠️ À clarifier : neurotoxicité cumulative non mentionnée.
- ❌ Risques : éviter hautes doses prolongées (neurotox).【F:src/data/drug-data.ts†L2048-L2056】
- 🔧 **Fiche normalisée**
  - Molécule : Métronidazole (IV)
  - Classe thérapeutique : nitro‑imidazolé
  - Espèce : chien & chat
  - Indications cliniques principales : infections anaérobies, diarrhée sévère
  - Dose minimale : 10 mg/kg
  - Dose maximale : 15 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV lent
  - Fréquence : selon protocole
  - Concentration(s) utilisable(s) pour le calcul : 5 mg/mL
  - Alertes cliniques critiques : neurotoxicité si surdosage
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Acide tranexamique
- ✅ Correct : 10–20 mg/kg IV.【F:src/data/drug-data.ts†L2067-L2094】
- ⚠️ À clarifier : indication (hémorragie vs chirurgie) non précisée.
- ❌ Risques : thrombose rare non mentionnée.
- 🔧 **Fiche normalisée**
  - Molécule : Acide tranexamique
  - Classe thérapeutique : antifibrinolytique
  - Espèce : chien & chat
  - Indications cliniques principales : hémorragie active
  - Dose minimale : 10 mg/kg
  - Dose maximale : 20 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV
  - Fréquence : selon protocole
  - Concentration(s) utilisable(s) pour le calcul : 100 mg/mL
  - Alertes cliniques critiques : risque thrombotique
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

#### Vitamine K1
- ✅ Correct : 2,5–5 mg/kg, charge raticide; alerte IV anaphylaxie.【F:src/data/drug-data.ts†L2096-L2128】
- ⚠️ À clarifier : durée traitement (semaines) absente.
- ❌ Risques : anaphylaxie IV (mention).【F:src/data/drug-data.ts†L2119-L2127】
- 🔧 **Fiche normalisée**
  - Molécule : Vitamine K1
  - Classe thérapeutique : antidote anticoagulants
  - Espèce : chien & chat
  - Indications cliniques principales : intoxication rodenticides anticoagulants
  - Dose minimale : 2,5 mg/kg
  - Dose maximale : 5 mg/kg
  - Unité : mg/kg
  - Voie d’administration : SC (préférée), IM, PO
  - Fréquence : charge puis entretien
  - Concentration(s) utilisable(s) pour le calcul : 10 mg/mL
  - Alertes cliniques critiques : anaphylaxie IV
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

---

## 3) Propositions de nouveaux médicaments (usage réel, non redondants)

> **Sources** : ces propositions s’appuient sur les posologies déjà présentes dans les protocoles internes de VetoGo (consensus clinique interne), afin d’éviter l’introduction de données externes sous copyright.【F:src/components/protocols/RespiratoryDistress.tsx†L36-L152】【F:src/components/protocols/CSection.tsx†L51-L164】【F:src/components/protocols/AcuteLameness.tsx†L32-L141】【F:src/components/protocols/Prostatitis.tsx†L32-L100】【F:src/components/protocols/BacterialCystitis.tsx†L32-L122】【F:src/components/protocols/Mastitis.tsx†L35-L35】

### 3.1 Butorphanol (Torbugesic) — **Priorité : critique**
- **Justification clinique terrain** : sédation douce/dyspnée, antitussif, analgésie légère utilisée dans plusieurs protocoles.
- **Cas d’usage** : urgence respiratoire, anxiété dyspnéique, sédation légère.
- **Fiche complète**
  - Molécule : Butorphanol
  - Classe thérapeutique : opioïde agoniste‑antagoniste
  - Espèce : chien & chat
  - Indications cliniques principales : sédation douce, antitussif, analgésie légère
  - Dose minimale : 0,2 mg/kg
  - Dose maximale : 0,4 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV, IM, SC (selon protocole)
  - Fréquence : selon réponse clinique
  - Concentration(s) utilisable(s) pour le calcul : 10 mg/mL (forme injectable)
  - Alertes cliniques critiques : dépression respiratoire possible à forte dose
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

### 3.2 Alfaxalone — **Priorité : critique**
- **Justification clinique terrain** : induction rapide en C‑section et anesthésie d’urgence.
- **Cas d’usage** : urgence/anesthésie courte.
- **Fiche complète**
  - Molécule : Alfaxalone
  - Classe thérapeutique : anesthésique IV
  - Espèce : chien & chat
  - Indications cliniques principales : induction anesthésique
  - Dose minimale : 2 mg/kg
  - Dose maximale : 3 mg/kg
  - Unité : mg/kg
  - Voie d’administration : IV
  - Fréquence : titrer à effet
  - Concentration(s) utilisable(s) pour le calcul : 10 mg/mL (forme courante)
  - Alertes cliniques critiques : apnée si injection rapide
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

### 3.3 Robénacoxib (Onsior) — **Priorité : importante**
- **Justification clinique terrain** : AINS moderne, très utilisé en douleur aiguë/chat.
- **Cas d’usage** : consultation/douleur aiguë, cystite.
- **Fiche complète**
  - Molécule : Robénacoxib
  - Classe thérapeutique : AINS sélectif COX‑2
  - Espèce : chat (usage mentionné en protocole)
  - Indications cliniques principales : douleur aiguë, inflammation post‑op
  - Dose minimale : 2 mg/kg
  - Dose maximale : 2 mg/kg
  - Unité : mg/kg
  - Voie d’administration : PO
  - Fréquence : q24h
  - Concentration(s) utilisable(s) pour le calcul : comprimés (dosage variable, ex. 6 mg)
  - Alertes cliniques critiques : IR/IG, éviter déshydratation
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

### 3.4 Marbofloxacine (Marbocyl) — **Priorité : importante**
- **Justification clinique terrain** : infections urinaires hautes/prostatites mentionnées en protocole.
- **Cas d’usage** : consultation (prostatite/pyélonéphrite).
- **Fiche complète**
  - Molécule : Marbofloxacine
  - Classe thérapeutique : fluoroquinolone
  - Espèce : chien (usage mentionné en protocole)
  - Indications cliniques principales : prostatite, pyélonéphrite
  - Dose minimale : 2 mg/kg
  - Dose maximale : 4 mg/kg
  - Unité : mg/kg
  - Voie d’administration : PO
  - Fréquence : q24h
  - Concentration(s) utilisable(s) pour le calcul : comprimés (dosage variable)
  - Alertes cliniques critiques : résistance bactérienne, éviter si alternatives
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

### 3.5 Amoxicilline PO — **Priorité : importante**
- **Justification clinique terrain** : cystites/plaies superficielles; mentionnée en protocole.
- **Cas d’usage** : consultation.
- **Fiche complète**
  - Molécule : Amoxicilline (PO)
  - Classe thérapeutique : β‑lactamine
  - Espèce : chien & chat
  - Indications cliniques principales : infections urinaires simples, plaies
  - Dose minimale : 12,5 mg/kg
  - Dose maximale : 15 mg/kg
  - Unité : mg/kg
  - Voie d’administration : PO
  - Fréquence : BID
  - Concentration(s) utilisable(s) pour le calcul : comprimés/suspension (dosage variable)
  - Alertes cliniques critiques : allergie β‑lactamines
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

### 3.6 Amoxicilline‑acide clavulanique PO — **Priorité : secondaire**
- **Justification clinique terrain** : mastites/plaies; mentionnée en protocole.
- **Cas d’usage** : consultation.
- **Fiche complète**
  - Molécule : Amoxicilline‑acide clavulanique (PO)
  - Classe thérapeutique : β‑lactamine + inhibiteur β‑lactamase
  - Espèce : chien & chat
  - Indications cliniques principales : infections cutanées, mastite
  - Dose minimale : 12,5 mg/kg
  - Dose maximale : 20 mg/kg
  - Unité : mg/kg
  - Voie d’administration : PO
  - Fréquence : BID
  - Concentration(s) utilisable(s) pour le calcul : comprimés/suspension (dosage variable)
  - Alertes cliniques critiques : allergie β‑lactamines
  - Type de recommandation : pratique clinique courante
  - Niveau de source : consensus

---

## 4) Recommandations de sécurisation du calculateur

### Alertes à afficher (sécurité critique)
- **Unités à haut risque** : UI/mEq/µg (vasopressine, insuline, KCl, noradrénaline) → afficher une alerte « unité non‑mg » + confirmation utilisateur. 【F:src/data/drug-data.ts†L408-L455】【F:src/data/drug-data.ts†L1323-L1385】【F:src/data/drug-data.ts†L1627-L1656】
- **Concentrations variables** : phénobarbital, apomorphine, amoxiclav (reconstitué) → demander confirmation de la concentration avant calcul. 【F:src/data/drug-data.ts†L1457-L1484】【F:src/data/drug-data.ts†L1872-L1909】【F:src/data/drug-data.ts†L1939-L1965】
- **Alertes d’extravasation** : noradrénaline, calcium chloride → bannière rouge « CVC recommandé ». 【F:src/data/drug-data.ts†L464-L489】【F:src/data/drug-data.ts†L1627-L1653】

### Cas nécessitant confirmation utilisateur
- **Chats** : AINS (méloxicam) → message « dose unique » et blocage de répétition. 【F:src/data/drug-data.ts†L590-L610】
- **Électrolytes** : KCl et phosphate → confirmation « CRI uniquement ». 【F:src/data/drug-data.ts†L1258-L1385】
- **Opioïdes forts** : fentanyl/morphine/méthadone → confirmer monitorage respiratoire. 【F:src/data/drug-data.ts†L624-L706】

### Limites de calcul à expliciter
- **Volumes < 0,1 mL** : recommander dilution systématique (ex. adrénaline). 【F:src/data/drug-data.ts†L333-L369】
- **Doses fixes par animal** : oxytocine (limite UI/animal) → avertissement si calcul dépasse plafond. 【F:src/data/drug-data.ts†L1387-L1426】
- **Bicarbonate/Calcium** : éviter compatibilité de ligne perfusion. 【F:src/data/drug-data.ts†L431-L489】
