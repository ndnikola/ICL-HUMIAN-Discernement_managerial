# Diagnostic interactif « Les 5 dérives invisibles de l'IA chez les managers »

Bloc autonome HTML/CSS/JS à intégrer sur humian-formation.fr : `section-diagnostic.html`.

## Note d'intégration

1. **Option recommandée : remplacer la section `#ressources` existante** de `humian-formation.html` par le contenu de `section-diagnostic.html` (le fichier contient déjà la balise `<section id="ressources" class="section-light">`). La navbar (`.navbar-cta`) et le CTA du hero continuent de pointer vers `#ressources` sans modification. C'est l'option la plus simple : un seul copier-coller, aucun lien à toucher.
2. Option alternative : page dédiée `diagnostic.html`. Dupliquer le `<head>` du site (même `<style>` avec les variables `:root`, l'`@import` Google Fonts et les classes `.btn-*`, `.form-*`, `.section-light`, `.hero-quote`), coller le bloc dans le `<body>`, puis faire pointer la nav et le hero vers `diagnostic.html`. Plus lourd à maintenir (styles en double) : à réserver si la page d'accueil devient trop longue.
3. Avec l'option 1, **retirer l'ancien formulaire de téléchargement du guide** et, s'il n'est plus utilisé ailleurs, son gestionnaire `handleFormSubmit()` / `declencherTelechargement()` (ils ciblent des éléments qui n'existeront plus). Le script du diagnostic est encapsulé (IIFE) : il ne crée aucune variable globale et n'entre pas en conflit avec le `APPS_SCRIPT_URL` déjà déclaré par le site.
4. **À compléter dans le bloc `CONFIGURATION` du `<script>` avant mise en ligne :**
   - `PDF_PAR_PROFIL` : URL(s) du PDF de résultat une fois hébergé sur le site (placeholder actuel : `/documents/diagnostic-5-derives-ia-managers.pdf`). Un PDF par profil ou la même URL partout.
   - `ENVOYER_SCORE_ET_PROFIL` : `true` = option (a), envoie aussi `score_total`, `profil_obtenu`, `date` (ignorés par le Sheet tant que l'Apps Script n'est pas étendu) ; `false` = option (b), seulement `prenom`, `nom`, `email`. À trancher avec Nicolas. Réglé sur `true` par défaut.
   - `APPS_SCRIPT_URL` : déjà renseignée avec l'URL réelle du site.
5. Texte de consentement RGPD : ajouter un lien vers la politique de confidentialité du site si elle existe (non fournie ici).
6. Le bloc suppose qu'une section `#contact` existe sur la même page (CTA « Planifier un échange »). Sur une page dédiée, remplacer par `humian-formation.html#contact`.

## Comportement

- Questionnaire libre (12 affirmations, pilules 1 à 5, radios natifs accessibles au clavier), barre de progression, contrôle des réponses manquantes.
- Teaser immédiat : score /60 + nom du profil. Le détail du profil, les 5 dérives (antidotes, micro-rituels), la clôture et le lien PDF ne s'affichent qu'après envoi du formulaire.
- Envoi : `fetch(APPS_SCRIPT_URL, { method: "POST", mode: "no-cors", body: formData })`, identique au pattern existant. En `no-cors` la réponse est opaque : seul un échec réseau est détectable ; dans ce cas un message invite à réessayer.
- Anti-spam : champ honeypot hors écran ; s'il est rempli, rien n'est envoyé.
- Aucune donnée stockée côté navigateur (ni localStorage ni sessionStorage) ; les réponses restent en mémoire JS le temps de la visite. « Refaire le diagnostic » réaffiche directement le résultat complet sans redemander l'email.

## Limite à connaître

Site statique sans backend : le verrouillage est un masquage côté navigateur. Le texte des dérives est présent dans le code source de la page ; seul le lien du PDF n'est injecté qu'après soumission. C'est suffisant pour qualifier des leads, pas pour protéger un contenu.
