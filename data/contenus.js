window.CONTENUS = {
  "meta": {
    "titrePrincipal": "L'IA au service de l'excellence relationnelle",
    "date": "21 juillet 2026",
    "intervenant": "⚠️ Nom de l'intervenant à renseigner",
    "horaire": "9h15 – 12h15",
    "effectif": "19 participants (⚠️ effectif à confirmer le 15 juillet)"
  },

  "demoLiens": {
    "conversation1": { "label": "Ouvrir la conversation 1 (demande minimale)", "href": "#", "configure": true },
    "conversation2": { "label": "Ouvrir la conversation 2 (demande contextualisée)", "href": "#", "configure": true },
    "conversation3": { "label": "Ouvrir la conversation contextualisée (onglet 3)", "href": "#", "configure": true },
    "conversation4": { "label": "Ouvrir la conversation documentée (onglet 4)", "href": "#", "configure": true }
  },

  "screens": [
    {
      "id": "ecran-1",
      "numero": 1,
      "type": "accueil",
      "titre": "L'IA au service de l'excellence relationnelle",
      "ancrage": "Chaque fois que l'IA allège une tâche, elle ouvre du temps pour mieux comprendre, mieux coopérer et mieux accompagner.",
      "dureeIndicative": "3 min"
    },
    {
      "id": "ecran-2",
      "numero": 2,
      "type": "mots-cles",
      "titre": "Un service en perpétuel mouvement",
      "motsCles": ["équipe", "missions", "métiers", "publics", "évolution", "nouvelles capacités"],
      "ancrage": "⚠️ Phrase d'ancrage à formuler avec Nicolas, selon le contenu réel de l'intro d'Olivia.",
      "dureeIndicative": "5 min"
    },
    {
      "id": "ecran-3",
      "numero": 3,
      "type": "deux-blocs",
      "titre": "Intelligence relationnelle et agilité intellectuelle",
      "blocs": [
        {
          "titre": "Intelligence relationnelle",
          "points": ["Comprendre les personnes", "Adapter la communication", "Créer de la confiance", "Prendre soin de la relation"]
        },
        {
          "titre": "Agilité intellectuelle",
          "points": ["Apprendre", "Prendre du recul", "Croiser les informations", "Décider dans un environnement changeant"]
        }
      ],
      "ancrage": "⚠️ Phrase d'ancrage à formuler avec Nicolas.",
      "dureeIndicative": "5 min"
    },
    {
      "id": "ecran-4",
      "numero": 4,
      "type": "citation",
      "titre": "Cadre institutionnel",
      "citation": "⚠️ Citation à extraire de Magnifica Humanitas, à valider avec Nicolas (vérifier les droits de citation).",
      "source": "⚠️ Référence précise à compléter",
      "dureeIndicative": "3 min"
    },
    {
      "id": "ecran-5",
      "numero": 5,
      "type": "mission-collective",
      "titre": "Mission collective",
      "points": [
        "Un objectif commun",
        "Aucun classement entre équipes",
        "Des critères de réussite partagés",
        "La complémentarité des expertises",
        "La valeur de la relation"
      ],
      "ancrage": "⚠️ Phrase d'ancrage à formuler, en cohérence avec l'absence de référence au silo.",
      "dureeIndicative": "5 min"
    },
    {
      "id": "ecran-6",
      "numero": 6,
      "type": "demonstration",
      "titre": "Démonstration IA — niveau 1 : Demander",
      "consigne": "Rédige un mail à un étudiant dont le dossier est incomplet.",
      "ancrage": "Une demande sans contexte donne une réponse générique.",
      "relance": "Que remarquez-vous dans cette réponse ?",
      "lienId": "conversation1",
      "secours": "⚠️ Résultat de secours à préparer (capture d'écran ou texte de la réponse déjà obtenue).",
      "dureeIndicative": "8 min"
    },
    {
      "id": "ecran-7",
      "numero": 7,
      "type": "debrief",
      "titre": "Débrief — niveau 1",
      "ancrage": "Une réponse fluide n'est pas forcément une réponse juste.",
      "question": "De quoi l'IA aurait-elle besoin pour produire une réponse réellement adaptée ?",
      "relances": ["Qui est l'interlocuteur ?", "Que sait-on de sa situation ?", "Quel ton attend-on ?"],
      "champs": 3,
      "exemples": [
        "L'étudiant s'appelle Sofia, elle est en dernière année, son dossier de stage manque une pièce.",
        "Le ton doit rester bienveillant, elle a déjà eu un empêchement médical.",
        "L'objectif est qu'elle envoie la pièce manquante avant vendredi."
      ],
      "dureeIndicative": "7 min"
    },
    {
      "id": "ecran-8",
      "numero": 8,
      "type": "contexte",
      "titre": "Construction du contexte",
      "ancrage": "Le contexte transforme une demande en une intention.",
      "champs": [
        { "cle": "interlocuteur", "question": "Qui est l'interlocuteur ?" },
        { "cle": "situation", "question": "Quelle est sa situation ?" },
        { "cle": "tonalite", "question": "Quelle tonalité souhaitons-nous ?" },
        { "cle": "resultat", "question": "Quel résultat attendons-nous ?" },
        { "cle": "contraintes", "question": "Quelles sont les contraintes ?" },
        { "cle": "prochaineEtape", "question": "Quelle prochaine étape proposer ?" }
      ],
      "gabarit": "Rédige un mail à {{interlocuteur}}, dans la situation suivante : {{situation}}. Résultat attendu : {{resultat}}. Contraintes à respecter : {{contraintes}}. Tonalité souhaitée : {{tonalite}}. Termine en proposant cette prochaine étape : {{prochaineEtape}}.",
      "promptPrepare": {
        "interlocuteur": "un étudiant en dernière année dont le dossier de stage est incomplet",
        "situation": "il a eu un empêchement médical récent et n'a pas encore transmis la pièce manquante",
        "resultat": "obtenir la pièce manquante avant vendredi sans le braquer",
        "contraintes": "rester bref, ne pas mentionner de sanction, garder un ton bienveillant",
        "tonalite": "chaleureuse et professionnelle",
        "prochaineEtape": "proposer un rendez-vous de 10 minutes si besoin d'aide pour compléter le dossier"
      },
      "lienId": "conversation3",
      "dureeIndicative": "10 min"
    },
    {
      "id": "ecran-9",
      "numero": 9,
      "type": "demonstration",
      "titre": "Démonstration IA — niveau 2 : Contextualiser",
      "ancrage": "Le cadre humain change la nature de la réponse, pas seulement sa forme.",
      "relance": "Quelle différence observez-vous avec la première réponse ?",
      "relances": ["Qu'est-ce qui a changé dans le fond ?", "Dans la forme ?", "Dans la justesse ?"],
      "lienId": "conversation3",
      "secours": "⚠️ Capture d'écran de la réponse contextualisée à préparer.",
      "dureeIndicative": "8 min"
    },
    {
      "id": "ecran-10",
      "numero": 10,
      "type": "methode",
      "titre": "La méthode complète",
      "etapes": ["Demander", "Contextualiser", "Documenter", "Vérifier"],
      "ancrage": "Une IA utile repose sur un contexte clair, des sources pertinentes et une vérification humaine.",
      "dureeIndicative": "5 min"
    },
    {
      "id": "ecran-11",
      "numero": 11,
      "type": "demonstration-documentee",
      "titre": "Démonstration complexe — Documenter",
      "ancrage": "Documenter, c'est donner à l'IA une mémoire qu'elle n'a pas.",
      "relance": "Qu'apporte ce dossier que le contexte seul n'apportait pas ?",
      "documents": [
        { "icone": "✉️", "label": "Échange de mails" },
        { "icone": "📋", "label": "Procédure" },
        { "icone": "📝", "label": "Compte rendu" },
        { "icone": "📊", "label": "Tableau de suivi" },
        { "icone": "🌐", "label": "Document en anglais" },
        { "icone": "📑", "label": "Deux versions d'un document" }
      ],
      "lienId": "conversation4",
      "secours": "⚠️ Capture d'écran de la réponse obtenue avec le dossier documenté à préparer.",
      "dureeIndicative": "10 min"
    },
    {
      "id": "ecran-12",
      "numero": 12,
      "type": "verification",
      "titre": "Vérification humaine",
      "ancrage": "La vérification n'est pas une option, c'est la dernière étape de la méthode.",
      "questions": [
        "Les faits sont-ils exacts ?",
        "Les données sont-elles appropriées ?",
        "La réponse tient-elle compte du contexte ?",
        "Le ton convient-il à l'interlocuteur ?",
        "Quel impact cette réponse peut-elle produire ?",
        "La décision reste-t-elle sous responsabilité humaine ?"
      ],
      "dureeIndicative": "7 min"
    },
    {
      "id": "ecran-13",
      "numero": 13,
      "type": "video",
      "titre": "Cynthia Fleury",
      "citation": "La transmission ne se réduit jamais à l'information.",
      "source": "Cynthia Fleury",
      "question": "Quelle qualité humaine mérite davantage d'être cultivée lorsque l'accès à l'information devient presque immédiat ?",
      "video": "assets/videos/cynthia-fleury.mp4",
      "dureeIndicative": "5 min"
    },
    {
      "id": "ecran-14",
      "numero": 14,
      "type": "consigne",
      "titre": "Défi 1 — Travail des portefeuilles",
      "consigne": "Vous disposez de cinq situations issues des cinq pôles. Prenez d'abord connaissance de l'ensemble du portefeuille, puis choisissez la situation qui vous semble offrir le meilleur équilibre entre utilité de l'IA, maîtrise des risques et bénéfice relationnel. Les personnes qui connaissent directement l'activité pourront éclairer le contexte, tandis que l'ensemble du groupe construira la proposition.",
      "ancrage": "⚠️ Phrase d'ancrage à formuler : complémentarité, coordination, continuité du parcours — pas de référence au silo.",
      "questions": [
        "Quelle partie de l'activité l'IA pourrait-elle préparer, simplifier ou accélérer ?",
        "Quel contexte lui fournir ?",
        "Quelle vérification et décision resteraient humaines ?",
        "Comment le temps dégagé améliore-t-il la relation ?"
      ],
      "dureeIndicative": "5 min"
    },
    {
      "id": "ecran-15",
      "numero": 15,
      "type": "portefeuilles-activites",
      "titre": "Portefeuilles d'activités",
      "avertissement": "⚠️ Exemple de répartition — données définitives des activités et outils (issues de Frédérique) à intégrer avant la séance.",
      "poles": ["Career Center", "Formation continue", "Taxe d'apprentissage", "Alternance", "Événementiel"],
      "groupes": [
        {
          "numero": 1,
          "activites": ["Mail étudiant", "Bilan pédagogique", "Préparation campagne", "Contrat incomplet", "Planification salle"]
        },
        {
          "numero": 2,
          "activites": ["Préparation entretien", "Relation OPCO", "Mailing entreprises", "Rythme mal compris", "Gestion des prestataires"]
        },
        {
          "numero": 3,
          "activites": ["Convention de stage", "Synthèse Qualiopi", "Phoning", "Suivi CFA", "Traitement des demandes"]
        },
        {
          "numero": 4,
          "activites": ["Job dating", "Conception sur mesure", "Analyse fichier", "Risque de rupture", "Accueil grand événement"]
        }
      ],
      "dureeIndicative": "15 min"
    },
    {
      "id": "ecran-16",
      "numero": 16,
      "type": "portefeuille-situations",
      "titre": "Défi 2 — Portefeuille de situations relationnelles",
      "avertissement": "⚠️ Répartition des situations par groupe provisoire (round-robin) — à valider avant la séance.",
      "ancrage": "L'IA peut préparer un échange, elle ne peut pas le porter à notre place.",
      "question": "Dans quelle situation la qualité de la relation peut-elle le plus changer l'issue de l'échange ?",
      "relances": [
        "Quelle est la demande exprimée ?",
        "Quel besoin se trouve derrière ?",
        "Qu'est-ce qui pourrait fragiliser la confiance ?",
        "Que faut-il reconnaître, clarifier, assumer ?",
        "Que peut préparer l'IA ?",
        "Quelle phrase d'ouverture, quelle prochaine étape ?"
      ],
      "situationsPossibles": [
        "Étudiant inquiet",
        "Entreprise pressée",
        "Alternance fragilisée",
        "Événement sous tension",
        "Message techniquement juste mais relationnellement insuffisant",
        "Demande hors périmètre immédiat"
      ],
      "groupes": [
        { "numero": 1, "situations": ["Étudiant inquiet", "Entreprise pressée", "Alternance fragilisée", "Événement sous tension"] },
        { "numero": 2, "situations": ["Entreprise pressée", "Alternance fragilisée", "Événement sous tension", "Message techniquement juste mais relationnellement insuffisant"] },
        { "numero": 3, "situations": ["Alternance fragilisée", "Événement sous tension", "Message techniquement juste mais relationnellement insuffisant", "Demande hors périmètre immédiat"] },
        { "numero": 4, "situations": ["Événement sous tension", "Message techniquement juste mais relationnellement insuffisant", "Demande hors périmètre immédiat", "Étudiant inquiet"] }
      ],
      "dureeIndicative": "10 min (11h12–11h22)"
    },
    {
      "id": "ecran-18",
      "numero": 18,
      "type": "interlude",
      "titre": "Interlude corporel et cognitif",
      "consigne": "Nous allons maintenant restaurer notre disponibilité mentale sans quitter la salle.",
      "ancrage": "Une IA peut suggérer un exercice. Elle ne peut ni respirer à notre place, ni percevoir notre tension, ni mobiliser notre corps pour retrouver de la disponibilité.",
      "dureeSecondes": 480,
      "dureeIndicative": "8 min"
    },
    {
      "id": "ecran-19",
      "numero": 19,
      "type": "restitutions",
      "titre": "Défi 2 — Restitutions des 4 groupes",
      "temps1Label": "Temps 1 (30 s) : les interlocuteurs, l'enjeu, le risque principal",
      "temps1Secondes": 30,
      "temps2Label": "Temps 2 (90 s) : ce que l'IA pourrait préparer, la posture humaine retenue, la formulation ou la conduite de l'échange, la prochaine étape proposée",
      "temps2Secondes": 90,
      "relances": [
        "Qu'avez-vous cherché à préserver dans cette relation ?",
        "Où avez-vous dû prendre position ?",
        "Quelle information seule n'aurait pas suffi ?",
        "À quel moment l'adaptation devient-elle décisive ?",
        "Quelle partie auriez-vous pu préparer avec l'IA ?",
        "Quelle responsabilité ne pouvait pas lui être confiée ?",
        "La prochaine étape est-elle assez claire et fiable ?"
      ],
      "dureeIndicative": "16 min (11h22–11h38)"
    },
    {
      "id": "ecran-20",
      "numero": 20,
      "type": "projection",
      "titre": "Projection à cinq ans",
      "question": "Dans cinq ans, quelle phrase aimeriez-vous entendre de la part d'un étudiant, d'une entreprise ou d'un partenaire au sujet de votre service ?",
      "avertissement": "⚠️ Outil de collecte (QR code) non tranché à ce stade — à choisir et à générer avant la séance.",
      "lienCourtSecours": "⚠️ Adresse en toutes lettres à préparer en cas de problème de QR code.",
      "dureeIndicative": "10 min"
    },
    {
      "id": "ecran-21",
      "numero": 21,
      "type": "conclusion",
      "titre": "Conclusion",
      "motsCles": ["intelligence artificielle", "intelligence relationnelle", "agilité intellectuelle", "continuité du parcours", "disponibilité", "confiance", "accompagnement"],
      "ancrage": "Si l'intelligence artificielle nous aide à dégager du temps, alors ce temps pourra servir à faire naître exactement les mots que vous venez d'afficher.",
      "dureeIndicative": "5 min"
    }
  ]
}
;
