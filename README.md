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

## Révélation progressive et navigation

Chaque écran affiche son titre immédiatement, puis jusqu'à 3 niveaux de contenu complémentaire (jamais plus), qui apparaissent un par un plutôt que tous en même temps — pour rester synchronisé avec le discours plutôt que de laisser le groupe lire en avance.

**Suivant** (`↓`, `→`, `Espace`, `Page suivante` — toutes équivalentes) : révèle le niveau suivant de l'écran courant ; une fois tout révélé, passe à l'écran suivant (défilement fluide).

**Retour** (`↑`, `←`, `Page précédente` — toutes équivalentes) : masque le dernier niveau révélé ; une fois revenu à l'état initial de l'écran, revient à l'écran précédent dans son dernier état connu (pas de reprise à zéro).

**Tout afficher** (`T`) : révèle immédiatement tous les niveaux de l'écran courant — utile en cas de retard, de problème technique, ou quand les révélations intermédiaires deviennent inutiles face aux échanges du groupe.

La molette/le trackpad restent utilisables mais ne pilotent plus le défilement natif : un geste (clic-molette isolé ou fling prolongé) ne déclenche jamais plus d'une seule action Suivant/Retour, quelle que soit sa durée, pour éviter de sauter plusieurs écrans involontairement. Sur mobile/tablette, le glissement tactile continue de fonctionner nativement (scroll-snap), en dehors de ce système.

Deux petits boutons `‹`/`›` en bas de l'écran donnent un accès tactile/souris aux actions Suivant/Retour (mêmes niveaux respectés, contrairement à la navigation par points). Navigation par points cliquable sur le bord droit de l'écran (accès direct à un écran, sans passer par ses niveaux). Bouton plein écran en haut à gauche.

Un très court verrou (350 ms) protège contre les doubles déclenchements accidentels (rebond clavier, double clic) ; une touche maintenue enfoncée (répétition automatique du système) est ignorée pour ne produire qu'un seul pas. Compatible Stream Deck : configurer une touche « Retour » (`Page précédente` ou `←`), une touche « Suivant » (`Page suivante`, `→` ou `Espace`) et une touche « Tout afficher » (`T`) — aucun contrôle ne dépend d'une position de clic ou de la souris.

Contrastes élevés, focus clavier visible, `prefers-reduced-motion` respecté (transitions et défilement instantanés).

### Écrans dont la cartographie n'a pas pu être appliquée à l'identique

Faute de contenu distinct pour un niveau de la cartographie fournie, ces écrans utilisent 2 niveaux au lieu de 3 (texte inchangé, rien n'a été inventé) :

- **Écran 1 (Accueil)** : pas de champ « sous-titre » séparé du titre — niveau 1 = date/horaire/intervenant (l'horaire, déjà présent en donnée, est désormais affiché), niveau 2 = phrase d'ancrage.
- **Écran 4 (Citation)** : pas de champ « interprétation/transition » — niveau 1 = citation, niveau 2 = source.
- **Écran 13 (Cynthia Fleury)** : pas de champ de synthèse distinct — niveau 1 = vidéo + citation + source, niveau 2 = question.
- **Écran 18 (Interlude)** : le guidage corporel est entièrement oral (pas de contenu affiché à l'écran dans la conception d'origine) — niveau 1 = consigne, niveau 2 = ancrage ; le minuteur reste visible en continu.
- **Écran 19 (Restitutions)** : la bascule entre les deux temps (30 s/90 s) est déjà pilotée par la minuterie interne existante (fin de décompte), pas par les touches de révélation ; seules les relances de débrief sont posées derrière la touche « Suivant » (niveau 1).
- **Écran 20 (Projection)** : aucun dispositif d'affichage des contributions collectées n'est implémenté (nécessiterait une nouvelle fonctionnalité, non inventée ici) — niveau 1 = question, niveau 2 = QR code + consignes de secours.
- **Écran 21 (Conclusion)** : pas de texte de « mise en relation avec les concepts » distinct de l'ancrage — niveau 1 = mots-clés, niveau 2 = ancrage.

Pour les écrans 2, 3, 5, 8, 10 et 12, les contenus existants (mots-clés, points, champs de contexte, questions de vérification) ont été réordonnés/regroupés selon les niveaux de la cartographie fournie — texte inchangé, seul l'ordre visuel a été adapté pour que chaque niveau forme un bloc cohérent.

Choix technique sur le Retour : un écran déjà visité réaffiche son **dernier état connu** (le niveau où il a été laissé), pas systématiquement son état final — les deux options étaient valables selon la consigne, celle-ci évite de « recompléter » artificiellement un écran qu'on a quitté avant la fin.

## Stack technique

HTML/CSS/JS natifs, sans framework ni dépendance externe, aucun backend. Les seules API navigateur utilisées : `localStorage` (jauge collective, avec repli en mémoire si indisponible), `sessionStorage` (contributions saisies en écran 7, effacées à la fin de la séance), `Clipboard API` (boutons copier), `Fullscreen API` (bouton plein écran).
