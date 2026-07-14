# Analyse du cahier des charges (site support intervention ICL)

Analyse du fichier `docs/cahier-des-charges.md`, réalisée pour préparer la génération du site. Objectif : lister les points à trancher avant de lancer le développement.

## Points forts

- Grille homogène par écran (objectif, texte, phrase d'ancrage, question, interaction, secours, notes techniques), directement transposable en composants réutilisables.
- Le passage d'un déroulé « un pôle par groupe » à des groupes mélangés est bien tracé : chaque fonction abandonnée est documentée avec sa date de bascule (14 juillet) et sa fonction de remplacement.
- Les verrous transversaux (pas de framework lourd, pas de backend, pas d'iframe ChatGPT, pas de référence au silo) sont explicites et vérifiables dans le code livré.

## Incohérence de minutage à corriger

La somme des « durées indicatives » des 20 écrans effectifs donne **150 minutes**, alors que le document annonce **169 minutes de contenu séquencé** (portées à 180 min / 3h avec marges). Écart : 19 minutes.

Détail du calcul (écrans 1 à 16, 18 à 21) :
`3+5+5+3+5+8+7+10+8+5+10+7+5+5+15+10+8+16+10+5 = 150`

Autre indice du même problème : en cumulant les durées depuis 9h15, la fin de l'écran 15 (travail de groupe) tombe vers 10h56, alors que l'écran 16 est ancré à un horaire fixe de 11h12 — un écart de 16 minutes non expliqué par le budget écran par écran.

**À faire** : recalculer soit les durées par écran, soit le total annoncé, avant de figer le minutage utilisé pour les minuteries JS (écrans 18 et 19 notamment, qui ont des décomptes précis).

## Contenus non finalisés

- Phrases d'ancrage des écrans 2, 3 et 4 — marquées « à formuler avec Nicolas ».
- Citation Magnifica Humanitas (écran 4) — droits de citation à vérifier.
- Extrait vidéo Cynthia Fleury (écran 13) — droits de diffusion à vérifier.
- Tableau des portefeuilles par groupe (écran 15) — explicitement marqué « exemple de répartition » ; les données définitives de Frédérique restent à intégrer dans `data/contenus.json`.

## Décisions techniques non arrêtées

- Écran 20 : outil de collecte pour le QR code « non tranché à ce stade ».
- Écran 15 : disponibilité d'un écran ou d'une tablette secondaire par table « à valider selon le matériel disponible ».
- Numérotation des onglets ChatGPT préparés en amont : les écrans 6, 8/9 et 11 référencent respectivement « conversation 1 », « onglet 3 » et « onglet 4 ». Aucun « onglet 2 » n'apparaît, et l'écran 9 parle de « conversation 2 » en pointant vers l'onglet 3 de l'écran 8. À clarifier pour éviter une confusion le jour J entre la personne qui prépare les onglets et l'animateur.

## Échéance proche

L'effectif (19 participants) est « à confirmer le 15 juillet » — soit le lendemain de la date de cette analyse (14 juillet).

## Prochaine étape recommandée

1. Clore les points ci-dessus avec Nicolas (contenus, minutage, outil écran 20, logistique matériel).
2. Une fois validés, générer le site à partir du cahier des charges : structure HTML/CSS/JS sans framework, `data/contenus.json` pour les contenus modifiables, scroll magnétique, dispositifs de secours par écran, navigation clavier, déploiement GitHub Pages + copie locale, README de documentation — comme prévu dans la section « Prochaine étape » du cahier des charges.
