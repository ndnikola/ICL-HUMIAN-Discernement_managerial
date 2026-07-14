# Cahier des charges fonctionnel — Site support intervention ICL, 21 juillet 2026

Support : mini-site HTML monopage, scroll vertical magnétique (scroll-snap), un écran plein écran par section, hébergement GitHub Pages + copie locale complète. Cette structure remplace le déroulé validé précédemment (deux mouvements / Beekast comme seul outil interactif). Durée totale visée : environ 3h (9h15–12h15), 19 participants mélangés entre services (effectif à confirmer le 15 juillet), répartis en 4 groupes stables (trois de 5, un de 4), non organisés par pôle. Les cinq pôles (Career Center, Formation Continue, Taxe d'Apprentissage, Alternance, Événementiel) restent la matière des portefeuilles d'activités et de situations, mais ne structurent plus les groupes eux-mêmes.

---

## Écran 1 — Accueil

**Objectif pédagogique** : planter le décor, donner le ton, marquer le début officiel de la séance.
**Texte visible** : « L'IA au service de l'excellence relationnelle », date, nom de l'intervenant.
**Phrase d'ancrage** : Chaque fois que l'IA allège une tâche, elle ouvre du temps pour mieux comprendre, mieux coopérer et mieux accompagner.
**Question au groupe** : aucune.
**Relances ouvertes** : aucune.
**Média** : visuel sobre en fond, logo si disponible.
**Interaction** : aucune, écran de démarrage.
**Bouton** : indication « début » ou flèche de défilement.
**Lien** : aucun.
**Comportement** : premier écran au chargement, pas de retour en arrière possible via navigation directe pendant l'intro.
**Résultat de secours** : aucun nécessaire, écran statique.
**Durée indicative** : 3 min.
**Notes techniques** : section `#accueil`, chargement immédiat, aucune dépendance externe.

---

## Écran 2 — Un service en perpétuel mouvement

**Objectif pédagogique** : prolonger l'introduction d'Olivia sans refaire la rétrospective déjà présentée, installer une perspective positive.
**Texte visible** : mots-clés courts (équipe, missions, métiers, publics, évolution, nouvelles capacités).
**Phrase d'ancrage** : à formuler avec Nicolas selon le contenu réel de l'intro d'Olivia.
**Question au groupe** : aucune, transition.
**Relances ouvertes** : aucune.
**Média** : aucun ou pictogrammes discrets par mot-clé.
**Interaction** : aucune.
**Bouton** : aucun, défilement standard.
**Lien** : aucun.
**Comportement** : apparition progressive des mots-clés au scroll ou au clic (optionnel, à valider).
**Résultat de secours** : aucun.
**Durée indicative** : 5 min.
**Notes techniques** : contenu chargé depuis `data/contenus.json`, modifiable sans toucher au code.

---

## Écran 3 — Intelligence relationnelle et agilité intellectuelle

**Objectif pédagogique** : poser les deux notions clés qui structurent la matinée.
**Texte visible** : deux colonnes ou deux blocs — Intelligence relationnelle (comprendre les personnes, adapter la communication, créer de la confiance, prendre soin de la relation) / Agilité intellectuelle (apprendre, prendre du recul, croiser les informations, décider dans un environnement changeant).
**Phrase d'ancrage** : à formuler avec Nicolas.
**Question au groupe** : aucune.
**Relances ouvertes** : aucune.
**Média** : aucun.
**Interaction** : apparition progressive des deux blocs (optionnel).
**Bouton** : aucun.
**Lien** : aucun.
**Comportement** : lecture séquencée si activée en JS, sinon affichage simultané.
**Résultat de secours** : aucun.
**Durée indicative** : 5 min.
**Notes techniques** : deux `<div>` en grid, animation CSS légère (fade-in) sans bibliothèque externe.

---

## Écran 4 — Cadre institutionnel (Magnifica Humanitas)

**Objectif pédagogique** : ancrer la séance dans une perspective institutionnelle sur l'humain, la responsabilité, la dignité à l'ère de l'IA.
**Texte visible** : une citation courte, une référence précise, une phrase de mise en perspective. Pas de long paragraphe.
**Phrase d'ancrage** : à extraire de Magnifica Humanitas, à valider avec Nicolas (vérifier les droits de citation).
**Question au groupe** : aucune.
**Relances ouvertes** : aucune.
**Média** : aucun ou logo institutionnel si autorisé.
**Interaction** : aucune.
**Bouton** : aucun.
**Lien** : aucun.
**Comportement** : écran de transition, sobre.
**Résultat de secours** : aucun.
**Durée indicative** : 3 min.
**Notes techniques** : texte en `blockquote`, vérifier la citation avant intégration (respect des droits).

---

## Écran 5 — Mission collective

**Objectif pédagogique** : installer la logique collective de la matinée, sans classement entre pôles.
**Texte visible** : objectif commun, absence de classement, critères de réussite, complémentarité des expertises, valeur relationnelle.
**Phrase d'ancrage** : à formuler, en cohérence avec le verrou « aucune référence au silo ».
**Question au groupe** : aucune à ce stade, présentation du principe de la jauge.
**Relances ouvertes** : aucune.
**Média** : aucun.
**Interaction** : première apparition de la jauge collective (à 0/100), sans interaction encore active.
**Bouton** : aucun.
**Lien** : aucun.
**Comportement** : la jauge reste visible en filigrane sur les écrans suivants qui comportent une contribution (à définir).
**Résultat de secours** : si `localStorage` indisponible, jauge en mémoire JS simple, réinitialisée au rechargement.
**Durée indicative** : 5 min.
**Notes techniques** : composant jauge réutilisable, valeur stockée dans `localStorage`, fonctions `+1`, `+5`, `+10`, remise à zéro protégée (double clic ou confirmation).

---

## Écran 6 — Démonstration IA : niveau 1 (Demander)

**Objectif pédagogique** : montrer le résultat d'une demande minimale, sans contexte.
**Texte visible** : consigne affichée — « Rédige un mail à un étudiant dont le dossier est incomplet. »
**Phrase d'ancrage** : à définir, du type : une demande sans contexte donne une réponse générique.
**Question au groupe** : aucune, observation collective.
**Relances ouvertes** : Que remarquez-vous dans cette réponse ?
**Média** : aucun.
**Interaction** : champ affichant la consigne, éventuellement modifiable par dictée.
**Bouton** : copier / ouvrir la conversation 1 (onglet ChatGPT dédié) / afficher le résultat de secours.
**Lien** : conversation ChatGPT « demande minimale », préparée en amont, ouverte dans un onglet séparé (pas d'iframe).
**Comportement** : le clic sur « ouvrir la conversation 1 » ouvre un nouvel onglet ; le site reste actif dans l'onglet principal.
**Résultat de secours** : capture d'écran ou texte de la réponse déjà obtenue, affichable en un clic si la connexion est indisponible.
**Durée indicative** : 8 min.
**Notes techniques** : lien `target="_blank"`, bouton copier via `navigator.clipboard`, résultat de secours stocké en texte statique dans le JSON de contenu.

---

## Écran 7 — Débrief niveau 1

**Objectif pédagogique** : faire émerger collectivement ce qui manquait à la demande initiale.
**Texte visible** : question principale affichée en grand.
**Phrase d'ancrage** : une réponse fluide n'est pas forcément une réponse juste.
**Question au groupe** : De quoi l'IA aurait-elle besoin pour produire une réponse réellement adaptée ?
**Relances ouvertes** : Qui est l'interlocuteur ? Que sait-on de sa situation ? Quel ton attend-on ?
**Média** : aucun.
**Interaction** : zones de saisie remplies par dictée (Wispr Flow) ou clavier, une par contribution du groupe.
**Bouton** : effacer / réinitialiser.
**Lien** : aucun.
**Comportement** : sauvegarde locale temporaire des contributions saisies (persistance pendant la séance uniquement).
**Résultat de secours** : champ pré-rempli avec des exemples de contributions type, activable par bouton si le groupe reste silencieux.
**Durée indicative** : 7 min.
**Notes techniques** : plusieurs `<textarea>`, sauvegarde en `sessionStorage` (pas besoin de persistance au-delà de la séance), bouton réinitialiser avec confirmation légère.

---

## Écran 8 — Construction du contexte (Contextualiser)

**Objectif pédagogique** : faire vivre concrètement la construction d'un prompt contextualisé, à partir des réponses du groupe.
**Texte visible** : six champs — Qui est l'interlocuteur ? Quelle est sa situation ? Quel résultat attendons-nous ? Quelles sont les contraintes ? Quelle tonalité souhaitons-nous ? Quelle prochaine étape proposer ?
**Phrase d'ancrage** : le contexte transforme une demande en une intention.
**Question au groupe** : les six questions ci-dessus, posées une à une.
**Relances ouvertes** : à adapter selon les réponses en direct.
**Média** : aucun.
**Interaction** : six champs de saisie remplis en direct (dictée ou clavier), assemblage automatique dans une zone de prévisualisation du prompt final.
**Bouton** : copier le prompt / ouvrir ChatGPT / réinitialiser / afficher un prompt préparé / sauvegarder la version produite.
**Lien** : conversation ChatGPT « demande contextualisée » (onglet 3), ouverte au moment voulu.
**Comportement** : la zone de prévisualisation se met à jour en temps réel à chaque champ rempli (JS `input` event listener), le gabarit du prompt est fixe, seuls les champs varient.
**Résultat de secours** : prompt entièrement pré-rempli affichable en un clic si la dictée ou la saisie collective prend trop de temps.
**Durée indicative** : 10 min.
**Notes techniques** : gabarit de prompt en template literal JS, six `<input>` ou `<textarea>` liés à la zone de prévisualisation, bouton copier via `navigator.clipboard`.

---

## Écran 9 — Démonstration IA : niveau 2 (Contextualiser)

**Objectif pédagogique** : montrer et comparer l'effet du contexte sur la qualité de la réponse.
**Texte visible** : rappel du prompt contextualisé produit à l'écran précédent.
**Phrase d'ancrage** : le cadre humain change la nature de la réponse, pas seulement sa forme.
**Question au groupe** : Quelle différence observez-vous avec la première réponse ?
**Relances ouvertes** : Qu'est-ce qui a changé dans le fond ? Dans la forme ? Dans la justesse ?
**Média** : aucun.
**Interaction** : affichage côte à côte ou successif des deux réponses (niveau 1 et niveau 2), si techniquement simple, sinon défilement entre les deux onglets ChatGPT.
**Bouton** : ouvrir la conversation 2 / afficher le résultat de secours.
**Lien** : conversation ChatGPT « demande contextualisée » (onglet 3).
**Comportement** : identique à l'écran 6 sur le plan technique.
**Résultat de secours** : capture d'écran de la réponse contextualisée déjà obtenue.
**Durée indicative** : 8 min.
**Notes techniques** : réutiliser le composant « démonstration » de l'écran 6, avec contenu différent.

---

## Écran 10 — Méthode complète

**Objectif pédagogique** : formaliser la méthode en quatre étapes issue des deux démonstrations précédentes.
**Texte visible** : Demander, Contextualiser, Documenter, Vérifier — apparition progressive.
**Phrase d'ancrage** : une IA utile repose sur un contexte clair, des sources pertinentes et une vérification humaine.
**Question au groupe** : aucune, écran de synthèse.
**Relances ouvertes** : aucune.
**Média** : aucun.
**Interaction** : apparition séquencée des quatre étapes au clic ou au scroll interne.
**Bouton** : aucun.
**Lien** : aucun.
**Comportement** : écran pivot, sert de repère visuel pour la suite (l'étape « Documenter » et « Vérifier » restent à traiter aux écrans suivants).
**Résultat de secours** : aucun.
**Durée indicative** : 5 min.
**Notes techniques** : quatre blocs avec animation d'apparition séquentielle en CSS/JS simple.

---

## Écran 11 — Démonstration complexe (Documenter)

**Objectif pédagogique** : montrer l'apport d'un dossier documenté sur la qualité et la fiabilité de la réponse.
**Texte visible** : présentation visuelle du dossier fictif (échange de mails, procédure, compte rendu, tableau de suivi, document en anglais, deux versions d'un document).
**Phrase d'ancrage** : documenter, c'est donner à l'IA une mémoire qu'elle n'a pas.
**Question au groupe** : aucune à ce stade, observation.
**Relances ouvertes** : Qu'apporte ce dossier que le contexte seul n'apportait pas ?
**Média** : miniatures ou icônes des documents fictifs.
**Interaction** : affichage des miniatures, clic pour zoom éventuel.
**Bouton** : ouvrir la conversation documentée / ouvrir le dossier source / copier le prompt complexe / afficher le résultat de secours.
**Lien** : conversation ChatGPT « dossier documenté » (onglet 4).
**Comportement** : identique aux écrans 6 et 9, avec dossier fictif en pièce jointe préparée en amont.
**Résultat de secours** : capture d'écran de la réponse obtenue avec le dossier documenté.
**Durée indicative** : 10 min.
**Notes techniques** : miniatures stockées dans `assets/images/`, documents fictifs dans `assets/documents/`, aucun document réel ou confidentiel.

---

## Écran 12 — Vérification humaine

**Objectif pédagogique** : rappeler que la décision reste humaine, éviter toute lecture de délégation automatique du jugement.
**Texte visible** : six questions de vérification.
**Phrase d'ancrage** : la vérification n'est pas une option, c'est la dernière étape de la méthode.
**Question au groupe** : Les faits sont-ils exacts ? La réponse tient-elle compte du contexte ? Les données sont-elles appropriées ? Le ton convient-il à l'interlocuteur ? La décision reste-t-elle sous responsabilité humaine ? Quel impact cette réponse peut-elle produire ?
**Relances ouvertes** : à adapter selon les réactions du groupe.
**Média** : aucun.
**Interaction** : aucune saisie nécessaire, échange oral.
**Bouton** : aucun.
**Lien** : aucun.
**Comportement** : écran de synthèse et de bascule vers le travail en pôles.
**Résultat de secours** : aucun.
**Durée indicative** : 7 min.
**Notes techniques** : liste statique, aucune dépendance.

---

## Écran 13 — Cynthia Fleury

**Objectif pédagogique** : ouvrir une respiration réflexive avant le passage au travail en pôles, relier information et compréhension.
**Texte visible** : citation centrale — La transmission ne se réduit jamais à l'information.
**Phrase d'ancrage** : idem citation.
**Question au groupe** : Quelle qualité humaine mérite davantage d'être cultivée lorsque l'accès à l'information devient presque immédiat ?
**Relances ouvertes** : aucune prévue, question ouverte suffisante.
**Média** : extrait vidéo local, 45 secondes à 1 min 15, maximum 1 min 30. Sous-titre ou citation affichée à l'écran, source mentionnée.
**Interaction** : bouton lecture / pause.
**Bouton** : lecture / pause.
**Lien** : aucun, vidéo hébergée localement dans `assets/videos/`.
**Comportement** : lecture au clic, pas de lecture automatique, contrôle total du point de départ.
**Résultat de secours** : citation affichée seule si la vidéo ne peut pas être lue.
**Durée indicative** : 5 min.
**Notes techniques** : balise `<video>` HTML5, fichier local, vérifier les droits de diffusion de l'extrait avant intégration.

---

## Écran 14 — Travail des portefeuilles (Défi 1, consignes)

*Fonction précédente : lancer un travail où chaque groupe traite les activités de son propre pôle. Fonction abandonnée le 14 juillet : les 19 participants sont mélangés en 4 groupes (trois de 5, un de 4), donc plus un pôle par groupe.*

**Objectif pédagogique** : lancer le travail en 4 groupes stables et mélangés, chacun recevant un portefeuille de 5 cartes (une par pôle).
**Texte visible** : consigne — « Vous disposez de cinq situations issues des cinq pôles. Prenez d'abord connaissance de l'ensemble du portefeuille, puis choisissez la situation qui vous semble offrir le meilleur équilibre entre utilité de l'IA, maîtrise des risques et bénéfice relationnel. Les personnes qui connaissent directement l'activité pourront éclairer le contexte, tandis que l'ensemble du groupe construira la proposition. »
**Phrase d'ancrage** : à formuler en cohérence avec le verrou « aucune référence au silo » : parler de complémentarité, de coordination, de continuité du parcours.
**Question au groupe** : les quatre questions de production — quelle partie de l'activité l'IA pourrait-elle préparer, simplifier ou accélérer ? quel contexte lui fournir ? quelle vérification et décision resteraient humaines ? comment le temps dégagé améliore-t-il la relation ?
**Relances ouvertes** : aucune sur cet écran, réservées au travail de groupe.
**Média** : aucun.
**Interaction** : aucune sur cet écran, sert d'introduction au travail de groupe ; le portefeuille détaillé est affiché à l'écran 15.
**Bouton** : aucun.
**Lien** : aucun.
**Comportement** : écran affiché pendant le lancement du travail, puis mis en veille (le groupe travaille hors écran).
**Résultat de secours** : aucun.
**Durée indicative** : 5 min.
**Notes techniques** : texte statique, aucune dépendance.

---

## Écran 15 — Portefeuilles d'activités (4 groupes x 5 pôles)

*Fonction précédente : afficher une carte par pôle consultée par le groupe correspondant. Fonction relogée : afficher les 20 cartes organisées en 4 portefeuilles distincts, un par groupe, chaque portefeuille couvrant les cinq pôles avec des activités différentes.*

**Objectif pédagogique** : donner à chaque groupe mélangé une base concrète d'activités et d'outils sur laquelle travailler, une par pôle.
**Texte visible** : le portefeuille du groupe concerné — Career Center, Formation Continue, Taxe d'Apprentissage, Alternance, Événementiel — avec une activité par pôle et les outils associés (JobTeaser, Assessfirst, AGORA, MyFormaSup, Hyperplanning, Eudonet, Soltéa, etc.), issus des données de Frédérique. Exemple de répartition :

| Groupe | Career Center | Formation continue | Taxe d'apprentissage | Alternance | Événementiel |
|---|---|---|---|---|---|
| Groupe 1 | Mail étudiant | Bilan pédagogique | Préparation campagne | Contrat incomplet | Planification salle |
| Groupe 2 | Préparation entretien | Relation OPCO | Mailing entreprises | Rythme mal compris | Gestion des prestataires |
| Groupe 3 | Convention de stage | Synthèse Qualiopi | Phoning | Suivi CFA | Traitement des demandes |
| Groupe 4 | Job dating | Conception sur mesure | Analyse fichier | Risque de rupture | Accueil grand événement |

**Phrase d'ancrage** : aucune nécessaire, écran de référence.
**Question au groupe** : aucune.
**Relances ouvertes** : aucune.
**Média** : icône ou couleur par pôle.
**Interaction** : sélecteur de groupe (1 à 4) pour afficher le bon portefeuille selon la table, ou affichage simultané en grille si un seul écran partagé.
**Bouton** : sélection du numéro de groupe.
**Lien** : aucun.
**Comportement** : écran de référence consultable pendant le travail de groupe, potentiellement affiché sur un poste secondaire par table si les tables ont accès à un écran ou une tablette (à valider selon le matériel disponible).
**Résultat de secours** : version imprimée des quatre portefeuilles en cas de problème d'affichage (à évaluer selon les tables).
**Durée indicative** : 15 min (temps de travail en groupe, écran en fond).
**Notes techniques** : contenu structuré en JSON par groupe et par pôle (20 entrées), couleur et icône par pôle définies dans les variables CSS, sélecteur de groupe simple en JS.

---

## Écran 16 — Portefeuille de situations relationnelles (Défi 2)

*Fonction précédente : faire émerger une situation vécue par le pôle du groupe, avec un cas de secours dédié au pôle Alternance si le groupe ne trouvait rien. Fonction abandonnée le 14 juillet : groupes mélangés, plus de rattachement à un métier unique. Relogée en portefeuille de six situations organisées par type de public, quatre distribuées aux groupes ; l'ancien écran 17 (cas de secours Alternance) est supprimé, son contenu est repris et généralisé dans la situation « Alternance fragilisée » ci-dessous.*

**Objectif pédagogique** : faire choisir à chaque groupe mélangé une situation relationnelle demandant discernement, adaptation ou courage, indépendamment de sa composition.
**Texte visible** : les quatre situations attribuées au groupe, parmi les six du portefeuille — étudiant inquiet, entreprise pressée, alternance fragilisée, événement sous tension, message techniquement juste mais relationnellement insuffisant, demande hors périmètre immédiat.
**Phrase d'ancrage** : l'IA peut préparer un échange, elle ne peut pas le porter à notre place.
**Question au groupe** : Dans quelle situation la qualité de la relation peut-elle le plus changer l'issue de l'échange ?
**Relances ouvertes** : Quelle est la demande exprimée ? Quel besoin se trouve derrière ? Qu'est-ce qui pourrait fragiliser la confiance ? Que faut-il reconnaître, clarifier, assumer ? Que peut préparer l'IA ? Quelle phrase d'ouverture, quelle prochaine étape ?
**Média** : aucun.
**Interaction** : sélecteur de groupe (1 à 4) affichant les situations attribuées ; le groupe choisit une situation parmi celles reçues.
**Bouton** : sélection du numéro de groupe.
**Lien** : aucun.
**Comportement** : la personne du métier concerné joue un rôle d'éclaireur (plausibilité, contraintes, vocabulaire), sans être seule détentrice de la réponse ; le reste du groupe apporte un regard extérieur.
**Résultat de secours** : aucun nécessaire, le portefeuille lui-même couvre l'ensemble des cas.
**Durée indicative** : 10 min (11h12–11h22, choix et préparation).
**Notes techniques** : les six situations et leur répartition par groupe stockées dans `data/contenus.json`, sélecteur de groupe réutilisant le même composant que l'écran 15.

---

*Écran 17 supprimé : son contenu (cas de secours Alternance) est fusionné dans le portefeuille de l'écran 16, sous la situation « Alternance fragilisée ». La numérotation des écrans suivants est conservée sans renumérotation pour ne pas complexifier le suivi ; le parcours final compte donc 20 écrans effectifs.*

---

## Écran 18 — Interlude corporel et cognitif

**Objectif pédagogique** : restaurer la disponibilité mentale du groupe sans quitter la salle, remplacer la pause formelle.
**Texte visible** : consigne sobre — Nous allons maintenant restaurer notre disponibilité mentale sans quitter la salle.
**Phrase d'ancrage** : une IA peut suggérer un exercice. Elle ne peut ni respirer à notre place, ni percevoir notre tension, ni mobiliser notre corps pour retrouver de la disponibilité.
**Question au groupe** : aucune.
**Relances ouvertes** : aucune.
**Média** : aucun.
**Interaction** : aucune, séquence guidée à l'oral par l'animateur (relâchement des épaules, mobilité douce, respiration lente, recentrage attentionnel, silence bref).
**Bouton** : minuterie optionnelle affichée à l'écran.
**Lien** : aucun.
**Comportement** : ton strictement professionnel, aucune formulation relevant du développement personnel ou de la méditation.
**Résultat de secours** : aucun nécessaire.
**Durée indicative** : 8 min.
**Notes techniques** : minuterie simple en JS si affichée, sinon écran statique.

---

## Écran 19 — Restitutions des 4 groupes (Défi 2)

*Fonction précédente : rounds de simulation génériques par pôle. Fonction précisée le 14 juillet : quatre restitutions de 4 minutes (débrief compris), en deux temps chacune, sur la situation choisie à l'écran 16.*

**Objectif pédagogique** : faire vivre la situation choisie par chaque groupe à l'écran 16, en jeu de rôle ou présentation de stratégie, au choix du groupe.
**Texte visible** : structure des deux temps — Temps 1 (30 secondes) : les interlocuteurs, l'enjeu, le risque principal. Temps 2 (90 secondes) : ce que l'IA pourrait préparer, la posture humaine retenue, la formulation ou la conduite de l'échange, la prochaine étape proposée.
**Phrase d'ancrage** : aucune imposée, l'écran reste un support minimal.
**Question au groupe** : aucune, l'écran sert de support de lancement et de minuterie, pas de verbatim imposé.
**Relances ouvertes** : Qu'avez-vous cherché à préserver dans cette relation ? Où avez-vous dû prendre position ? Quelle information seule n'aurait pas suffi ? À quel moment l'adaptation devient-elle décisive ? Quelle partie auriez-vous pu préparer avec l'IA ? Quelle responsabilité ne pouvait pas lui être confiée ? La prochaine étape est-elle assez claire et fiable ?
**Média** : aucun.
**Interaction** : minuterie par groupe (30 s puis 90 s), passage au groupe suivant.
**Bouton** : passage au groupe suivant (1 à 4).
**Lien** : aucun.
**Comportement** : le groupe choisit librement de jouer la scène ou de présenter sa stratégie ; l'écran ne doit pas fonctionner comme un prompteur intégral.
**Résultat de secours** : aucun.
**Durée indicative** : 16 min (11h22–11h38, quatre groupes de 4 min chacun, débrief compris).
**Notes techniques** : contenu minimal en dur ou JSON, minuterie réutilisable (même composant que l'écran 18), double décompte 30 s / 90 s.

---

## Écran 20 — Projection à cinq ans

**Objectif pédagogique** : conclure sur une note émotionnelle et collective, faire émerger une vision partagée du service.
**Texte visible** : question centrale affichée en grand.
**Phrase d'ancrage** : aucune imposée, la conclusion vient des réponses du groupe.
**Question au groupe** : Dans cinq ans, quelle phrase aimeriez-vous entendre de la part d'un étudiant, d'une entreprise ou d'un partenaire au sujet de votre service ?
**Relances ouvertes** : aucune, question suffisamment ouverte.
**Média** : QR code vers l'outil de collecte, non tranché à ce stade.
**Interaction** : affichage progressif des réponses collectées, éventuellement sous forme de nuage de mots ou de liste.
**Bouton** : mode plein écran silencieux pour l'affichage des réponses.
**Lien** : lien vers l'outil interactif choisi (à arrêter), accompagné d'un lien court en cas de problème de QR code.
**Comportement** : les réponses arrivent en direct si l'outil le permet, sinon l'animateur les lit et les saisit manuellement.
**Résultat de secours** : question posée à l'oral, collecte à main levée ou récupération manuelle des réponses par l'animateur.
**Durée indicative** : 10 min.
**Notes techniques** : QR code généré en amont, testé sur plusieurs téléphones, image haute définition stockée dans `assets/images/`, écran de secours avec adresse en toutes lettres.

---

## Écran 21 — Conclusion

**Objectif pédagogique** : clore la matinée en reliant l'ensemble des notions travaillées.
**Texte visible** : intelligence artificielle, intelligence relationnelle, agilité intellectuelle, continuité du parcours, disponibilité, confiance, accompagnement.
**Phrase d'ancrage** : Si l'intelligence artificielle nous aide à dégager du temps, alors ce temps pourra servir à faire naître exactement les mots que vous venez d'afficher.
**Question au groupe** : aucune.
**Relances ouvertes** : aucune.
**Média** : aucun.
**Interaction** : aucune.
**Bouton** : aucun.
**Lien** : aucun.
**Comportement** : dernier écran, pas de retour automatique vers l'accueil.
**Résultat de secours** : aucun.
**Durée indicative** : 5 min.
**Notes techniques** : écran statique, clôture du parcours JS (désactivation du scroll magnétique si souhaité en fin de session).

---

## Récapitulatif des verrous transversaux à respecter dans le prompt de génération

Simplicité de la stack (HTML/CSS/JS sans framework lourd), aucun backend, responsive raisonnable priorisant l'affichage projeté, accessibilité (contraste, taille de police, navigation clavier), aucune dépendance critique externe pour les fonctions essentielles, aucune iframe ChatGPT, une idée principale par écran, équipes stables sans recomposition, aucune référence à un fonctionnement en silo dans le code, les textes, les commentaires ou les contenus, pas de longs verbatims affichés.

## Durée totale indicative

Environ 169 minutes de contenu séquencé, portée à 3h avec les transitions et marges d'animation.

## Prochaine étape

Une fois ce cahier des charges validé écran par écran, transformation en prompt complet pour Claude demandant : code complet en fichiers séparés, instructions de déploiement GitHub Pages, README, contenus modifiables via `data/contenus.json`, version locale fonctionnelle, mode plein écran, navigation clavier, dispositifs de secours intégrés, documentation claire.
