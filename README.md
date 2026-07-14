# ICL — Support d'intervention « L'IA au service de l'excellence relationnelle »

Mini-site HTML monopage à défilement magnétique (scroll-snap), conçu comme support d'animation pour la matinée du 21 juillet 2026 (9h15–12h15). Chaque écran occupe l'intégralité de la fenêtre ; le défilement passe d'un écran au suivant par ancrage, à la souris, au clavier ou via la navigation par points.

Le cahier des charges fonctionnel complet est dans `ICL_21_juillet_cahier_des_charges (1).md` ; l'analyse des points ouverts est dans `Docs/Analyse.md`.

## Utilisation locale

Aucune installation, aucun serveur requis : ouvrir `index.html` dans un navigateur suffit.

Le contenu (`data/contenus.js`) est chargé via une balise `<script>` classique plutôt que par `fetch()` d'un fichier JSON : cela garantit que la copie locale fonctionne à l'identique, même ouverte directement depuis le disque (`file://`), sans dépendre d'un serveur web local. C'est le seul écart volontaire par rapport à la mention `data/contenus.json` du cahier des charges — la structure du fichier reste un objet JavaScript au format JSON, seule l'enveloppe change.

## Déploiement GitHub Pages

1. Dans les réglages du dépôt GitHub : **Settings → Pages**.
2. Source : déployer depuis la branche `main`, dossier racine (`/`).
3. Le site est ensuite accessible à l'URL fournie par GitHub Pages (aucune configuration supplémentaire, aucun build).

## Structure du projet

```
index.html              structure des 20 écrans (générée par js/app.js)
css/styles.css          mise en page, thème, animations, accessibilité
js/app.js               rendu des écrans, navigation, jauge, minuteries
data/contenus.js         tout le contenu éditable (textes, questions, portefeuilles…)
assets/images/          visuels (logo, QR code…)
assets/videos/          extrait vidéo de l'écran 13
assets/documents/       (non utilisé par défaut, voir assets/documents/README.md)
```

## Modifier le contenu

Tout le texte affiché (titres, phrases d'ancrage, questions, relances, portefeuilles, situations, gabarit de prompt…) est centralisé dans `data/contenus.js`. Modifier ce fichier n'impose pas de toucher à `index.html`, `css/styles.css` ni `js/app.js`.

Les liens vers les conversations ChatGPT préparées en amont (écrans 6, 8, 9, 11) se configurent dans l'objet `demoLiens` : remplacer `"href": "#"` par l'URL réelle et retirer `"configure": true` une fois le lien prêt.

## Blocs d'attente

Certains contenus n'étaient pas encore arrêtés au moment de la construction du site. Ils sont volontairement affichés dans un encadré visuel distinct (bordure en pointillés, fond orangé) préfixé par ⚠️, afin d'être impossibles à manquer en répétition. À traiter avant la séance :

- Phrases d'ancrage des écrans 2, 3, 5 et 14 — à formuler avec Nicolas.
- Citation et référence de Magnifica Humanitas (écran 4) — droits de citation à vérifier.
- Tableau des portefeuilles d'activités (écran 15) — marqué comme exemple, données définitives de Frédérique à intégrer.
- Répartition des situations par groupe (écran 16) — répartition provisoire (round-robin), à valider.
- Outil de collecte / QR code (écran 20) — non tranché.
- Nom de l'intervenant et effectif définitif (écran 1 / métadonnées) — à confirmer.
- Extrait vidéo de Cynthia Fleury (écran 13) — fichier à déposer dans `assets/videos/`, droits de diffusion à vérifier ; en son absence, la citation seule s'affiche automatiquement.
- Liens ChatGPT des écrans 6, 8, 9, 11 et résultats de secours associés — à préparer avant la séance.

Voir aussi `Docs/Analyse.md` pour l'incohérence de minutage relevée entre le budget écran par écran (150 min) et le total annoncé (169 min), à corriger avant de figer les minuteries des écrans 18 et 19.

## Navigation et accessibilité

- Défilement à la souris/au trackpad, ou clavier : `↓`/`Page suivante` et `↑`/`Page précédente` pour changer d'écran, `Origine`/`Fin` pour aller au premier/dernier écran.
- Navigation par points cliquable sur le bord droit de l'écran.
- Bouton plein écran en haut à gauche.
- Contrastes élevés, focus clavier visible, `prefers-reduced-motion` respecté.

## Stack technique

HTML/CSS/JS natifs, sans framework ni dépendance externe, aucun backend. Les seules API navigateur utilisées : `localStorage` (jauge collective, avec repli en mémoire si indisponible), `sessionStorage` (contributions saisies en écran 7, effacées à la fin de la séance), `Clipboard API` (boutons copier), `Fullscreen API` (bouton plein écran).
