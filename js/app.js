(function () {
  "use strict";

  var DATA = window.CONTENUS;
  var parcours = document.getElementById("parcours");
  var navPoints = document.getElementById("nav-points");

  /* ------------------------------------------------------------------ */
  /* Utilitaires                                                         */
  /* ------------------------------------------------------------------ */

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    attrs = attrs || {};
    for (var key in attrs) {
      if (!Object.prototype.hasOwnProperty.call(attrs, key)) continue;
      var valeur = attrs[key];
      if (key === "class") node.className = valeur;
      else if (key === "html") node.innerHTML = valeur;
      else if (key === "text") node.textContent = valeur;
      else if (key === "niveau") { if (valeur != null) node.setAttribute("data-reveal-level", String(valeur)); }
      else node.setAttribute(key, valeur);
    }
    (children || []).forEach(function (child) {
      if (child) node.appendChild(child);
    });
    return node;
  }

  // Un texte commençant par "⚠️" est un bloc d'attente : contenu à finaliser
  // avant la séance réelle (phrase à valider, décision non tranchée, etc.).
  // Ces blocs sont des notes de préparation, pas du contenu pédagogique :
  // ils restent toujours visibles, hors du système de révélation par niveaux.
  function texte(contenu, extraClass, niveau) {
    var estAttente = typeof contenu === "string" && contenu.indexOf("⚠️") === 0;
    var classes = estAttente ? "bloc-attente" : (extraClass || "");
    return el("p", { class: classes, niveau: niveau }, [document.createTextNode(contenu)]);
  }

  function liste(items, classe, niveaux) {
    var ul = el("ul", { class: classe });
    items.forEach(function (item, i) {
      var n = Array.isArray(niveaux) ? niveaux[i] : niveaux;
      ul.appendChild(el("li", { niveau: n }, [document.createTextNode(item)]));
    });
    return ul;
  }

  function ancrage(t, niveau) {
    if (!t) return null;
    var estAttente = t.indexOf("⚠️") === 0;
    return el("p", { class: estAttente ? "ancrage bloc-attente" : "ancrage", niveau: niveau }, [document.createTextNode(t)]);
  }

  function relances(items, niveau) {
    if (!items || !items.length) return null;
    var ul = el("ul", { class: "relances", niveau: niveau });
    items.forEach(function (r) {
      ul.appendChild(el("li", {}, [document.createTextNode(r)]));
    });
    return ul;
  }

  /* ------------------------------------------------------------------ */
  /* Moteur de révélation progressive par niveaux                        */
  /*                                                                      */
  /* Chaque écran peut marquer ses éléments avec un attribut              */
  /* data-reveal-level="1|2|3" (via le paramètre "niveau" de el()/texte() */
  /* /ancrage()/liste()/relances()). Le titre et le "chrome" (boutons     */
  /* utilitaires, minuteries...) restent sans attribut : toujours         */
  /* visibles. L'état d'un écran (quel niveau est atteint) se lit         */
  /* directement dans le DOM via la classe "visible" — aucune             */
  /* structure de données parallèle à maintenir.                         */
  /* ------------------------------------------------------------------ */

  function niveauxPresents(section) {
    var trouves = [];
    section.querySelectorAll("[data-reveal-level]").forEach(function (elReveal) {
      var n = parseInt(elReveal.getAttribute("data-reveal-level"), 10);
      if (trouves.indexOf(n) === -1) trouves.push(n);
    });
    trouves.sort(function (a, b) { return a - b; });
    return trouves;
  }

  function niveauMaxDe(section) {
    var niveaux = niveauxPresents(section);
    return niveaux.length ? niveaux[niveaux.length - 1] : 0;
  }

  function niveauActuelDe(section) {
    var max = 0;
    section.querySelectorAll("[data-reveal-level].visible").forEach(function (elReveal) {
      var n = parseInt(elReveal.getAttribute("data-reveal-level"), 10);
      if (n > max) max = n;
    });
    return max;
  }

  function appliquerNiveau(section, niveau) {
    section.querySelectorAll("[data-reveal-level]").forEach(function (elReveal) {
      var n = parseInt(elReveal.getAttribute("data-reveal-level"), 10);
      elReveal.classList.toggle("visible", n <= niveau);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Jauge collective (localStorage, avec repli mémoire)                 */
  /* ------------------------------------------------------------------ */

  var Jauge = (function () {
    var CLE = "icl-jauge";
    var valeurMemoire = 0;
    var stockageOk = true;
    try {
      var t = "__test__";
      window.localStorage.setItem(t, t);
      window.localStorage.removeItem(t);
    } catch (e) {
      stockageOk = false;
    }

    function lire() {
      if (!stockageOk) return valeurMemoire;
      var v = parseInt(window.localStorage.getItem(CLE), 10);
      return isNaN(v) ? 0 : v;
    }

    function ecrire(v) {
      v = Math.max(0, Math.min(100, v));
      if (stockageOk) window.localStorage.setItem(CLE, String(v));
      else valeurMemoire = v;
      rafraichir();
    }

    function rafraichir() {
      var v = lire();
      var remplissage = document.getElementById("jauge-remplissage");
      var texteVal = document.getElementById("jauge-valeur-texte");
      if (remplissage) remplissage.style.width = v + "%";
      if (texteVal) texteVal.textContent = v;
    }

    function ajouter(n) {
      ecrire(lire() + n);
    }

    function init() {
      document.querySelectorAll("[data-jauge-ajout]").forEach(function (bouton) {
        bouton.addEventListener("click", function () {
          ajouter(parseInt(bouton.getAttribute("data-jauge-ajout"), 10));
        });
      });
      var resetBtn = document.getElementById("jauge-reset");
      if (resetBtn) {
        var confirmeAvant = false;
        var minuteurConfirm = null;
        resetBtn.addEventListener("click", function () {
          if (confirmeAvant) {
            ecrire(0);
            confirmeAvant = false;
            resetBtn.textContent = "↺";
            clearTimeout(minuteurConfirm);
          } else {
            confirmeAvant = true;
            resetBtn.textContent = "Confirmer ?";
            minuteurConfirm = setTimeout(function () {
              confirmeAvant = false;
              resetBtn.textContent = "↺";
            }, 3000);
          }
        });
      }
      rafraichir();
    }

    return { init: init, rafraichir: rafraichir };
  })();

  /* ------------------------------------------------------------------ */
  /* Composant minuterie réutilisable (écrans 18 et 19)                  */
  /* ------------------------------------------------------------------ */

  function creerMinuterie(secondesInitiales, onFin) {
    var restant = secondesInitiales;
    var intervalle = null;
    var affichage = el("div", { class: "minuterie", "aria-live": "polite" });

    function formater(s) {
      var m = Math.floor(s / 60);
      var sec = s % 60;
      return (m > 0 ? m + ":" + (sec < 10 ? "0" : "") : "") + sec + (m > 0 ? "" : " s");
    }

    function rendre() {
      affichage.textContent = formater(Math.max(0, restant));
    }

    function demarrer() {
      if (intervalle) return;
      intervalle = setInterval(function () {
        restant -= 1;
        rendre();
        if (restant <= 0) {
          arreter();
          if (typeof onFin === "function") onFin();
        }
      }, 1000);
    }

    function arreter() {
      clearInterval(intervalle);
      intervalle = null;
    }

    function reinitialiser(nouvelleValeur) {
      arreter();
      restant = typeof nouvelleValeur === "number" ? nouvelleValeur : secondesInitiales;
      rendre();
    }

    rendre();

    return {
      element: affichage,
      demarrer: demarrer,
      arreter: arreter,
      reinitialiser: reinitialiser
    };
  }

  /* ------------------------------------------------------------------ */
  /* Composant sélecteur de groupe réutilisable (écrans 15, 16, 19)       */
  /* ------------------------------------------------------------------ */

  function creerSelecteurGroupe(onChange, groupeInitial) {
    var conteneur = el("div", { class: "selecteur-groupe", role: "group", "aria-label": "Choix du groupe" });
    var actuel = groupeInitial || 1;
    [1, 2, 3, 4].forEach(function (n) {
      var bouton = el("button", { type: "button", "aria-pressed": n === actuel ? "true" : "false" }, [
        document.createTextNode("Groupe " + n)
      ]);
      bouton.addEventListener("click", function () {
        actuel = n;
        conteneur.querySelectorAll("button").forEach(function (b) {
          b.setAttribute("aria-pressed", "false");
        });
        bouton.setAttribute("aria-pressed", "true");
        onChange(n);
      });
      conteneur.appendChild(bouton);
    });
    return conteneur;
  }

  /* ------------------------------------------------------------------ */
  /* Lien de démonstration (ouverture d'onglet ChatGPT préparé)          */
  /* ------------------------------------------------------------------ */

  function boutonLien(lienId) {
    var lien = DATA.demoLiens[lienId];
    if (!lien) return null;
    var bouton = el("button", { type: "button" }, [document.createTextNode(lien.label)]);
    bouton.addEventListener("click", function () {
      if (lien.configure) {
        alert("Lien à configurer dans data/contenus.js (demoLiens." + lienId + ") avant la séance.");
        return;
      }
      window.open(lien.href, "_blank", "noopener");
    });
    return bouton;
  }

  function boutonCopier(texteACopier, libelle) {
    var bouton = el("button", { type: "button" }, [document.createTextNode(libelle || "Copier")]);
    bouton.addEventListener("click", function () {
      var valeur = typeof texteACopier === "function" ? texteACopier() : texteACopier;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(valeur).then(function () {
          bouton.textContent = "Copié !";
          setTimeout(function () { bouton.textContent = libelle || "Copier"; }, 1500);
        });
      }
    });
    return bouton;
  }

  function boutonSecours(texteSecours) {
    var zone = el("div", { class: "resultat-secours", hidden: "hidden" }, [texte(texteSecours)]);
    var bouton = el("button", { type: "button" }, [document.createTextNode("Afficher le résultat de secours")]);
    bouton.addEventListener("click", function () {
      zone.hidden = !zone.hidden;
    });
    return { bouton: bouton, zone: zone };
  }

  /* ------------------------------------------------------------------ */
  /* Rendu de chaque type d'écran                                         */
  /*                                                                      */
  /* La cartographie pédagogique (niveaux 1/2/3 par écran) est appliquée  */
  /* directement ici via le paramètre "niveau". Certains écrans n'ont pas */
  /* de contenu distinct pour un niveau prévu par la cartographie ; dans  */
  /* ce cas on utilise moins de niveaux plutôt que d'inventer du texte    */
  /* (voir le résumé livré avec ces fichiers pour le détail des écarts).  */
  /* ------------------------------------------------------------------ */

  var rendus = {};

  rendus["accueil"] = function (s) {
    var meta = el("p", { class: "meta", niveau: 1 }, [
      document.createTextNode(DATA.meta.date + " — " + DATA.meta.horaire + " — " + DATA.meta.intervenant)
    ]);
    var corps = el("div", { class: "screen-contenu ecran-accueil" }, [
      el("h1", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      meta,
      ancrage(s.ancrage, 2),
      el("div", { class: "fleche-defilement" }, [document.createTextNode("↓ Commencer")])
    ]);
    return corps;
  };

  rendus["mots-cles"] = function (s) {
    var ul = el("ul", { class: "mots-cles" });
    // Regroupement fixe en 2 lots de 3 mots, tel que défini par la
    // cartographie (équipe/missions/métiers, puis publics/évolution/capacités).
    s.motsCles.forEach(function (mot, i) {
      ul.appendChild(el("li", { niveau: i < 3 ? 1 : 2 }, [document.createTextNode(mot)]));
    });
    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      ul,
      ancrage(s.ancrage, 3)
    ]);
  };

  rendus["deux-blocs"] = function (s) {
    var grille = el("div", { class: "deux-blocs" });
    s.blocs.forEach(function (b, i) {
      grille.appendChild(el("div", { class: "bloc", niveau: i + 1 }, [
        el("h3", {}, [document.createTextNode(b.titre)]),
        liste(b.points)
      ]));
    });
    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      grille,
      ancrage(s.ancrage, 3)
    ]);
  };

  rendus["citation"] = function (s) {
    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      el("blockquote", { class: "citation", niveau: 1 }, [document.createTextNode(s.citation)]),
      texte(s.source, "citation-source", 2)
    ]);
  };

  rendus["mission-collective"] = function (s) {
    var niveaux = s.points.map(function (_, i) {
      if (i === 0) return 1;
      if (i === 1 || i === 2) return 2;
      return 3;
    });
    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      liste(s.points, "mission-liste", niveaux),
      ancrage(s.ancrage, 3)
    ]);
  };

  // Démonstrations IA (écrans 6, 9, 11) : la structure des niveaux dépend
  // du contenu réellement disponible sur l'écran (consigne, dossier
  // documenté, ou ni l'un ni l'autre).
  function ecranDemonstration(s) {
    var actions = el("div", { class: "actions" });
    if (s.consigne) actions.appendChild(boutonCopier(s.consigne, "Copier la consigne"));
    var lienBtn = boutonLien(s.lienId);
    if (lienBtn) actions.appendChild(lienBtn);
    var secours = boutonSecours(s.secours);
    actions.appendChild(secours.bouton);

    var niveauActions = (s.consigne || s.documents) ? 2 : 1;
    var niveauRelance = 2;
    var niveauAncrage = 3;
    actions.setAttribute("data-reveal-level", String(niveauActions));

    var enfants = [el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)])];
    if (s.consigne) enfants.push(el("div", { class: "consigne-box", niveau: 1 }, [document.createTextNode(s.consigne)]));
    if (s.relance) enfants.push(el("p", { class: "question-groupe", niveau: niveauRelance }, [document.createTextNode(s.relance)]));
    var relancesEl = relances(s.relances, niveauRelance);
    if (relancesEl) enfants.push(relancesEl);
    enfants.push(actions);
    enfants.push(secours.zone);
    enfants.push(ancrage(s.ancrage, niveauAncrage));

    return el("div", { class: "screen-contenu" }, enfants);
  }

  rendus["demonstration"] = ecranDemonstration;

  rendus["demonstration-documentee"] = function (s) {
    var grille = el("div", { class: "documents-grille", niveau: 1 });
    s.documents.forEach(function (d) {
      grille.appendChild(el("div", { class: "document-carte" }, [
        el("span", { class: "icone" }, [document.createTextNode(d.icone)]),
        el("span", {}, [document.createTextNode(d.label)])
      ]));
    });
    var base = ecranDemonstration(s);
    // Le dossier documenté (niveau 1) doit apparaître avant la relance et
    // les actions (niveau 2) : on l'insère juste après le titre.
    base.insertBefore(grille, base.children[1] || null);
    return base;
  };

  rendus["debrief"] = function (s) {
    var contributions = el("div", { class: "contributions", niveau: 2 });
    for (var i = 0; i < s.champs; i++) {
      var champCle = "icl-debrief-" + s.id + "-" + i;
      var zone = el("textarea", {
        "aria-label": "Contribution " + (i + 1),
        placeholder: "Contribution " + (i + 1) + "…"
      });
      zone.value = window.sessionStorage.getItem(champCle) || "";
      (function (zoneEl, cle) {
        zoneEl.addEventListener("input", function () {
          window.sessionStorage.setItem(cle, zoneEl.value);
        });
      })(zone, champCle);
      contributions.appendChild(zone);
    }

    var actions = el("div", { class: "actions" });
    var effacer = el("button", { type: "button" }, [document.createTextNode("Effacer / réinitialiser")]);
    effacer.addEventListener("click", function () {
      if (!confirm("Effacer les contributions saisies ?")) return;
      contributions.querySelectorAll("textarea").forEach(function (t, i) {
        t.value = "";
        window.sessionStorage.removeItem("icl-debrief-" + s.id + "-" + i);
      });
    });
    var exemples = el("button", { type: "button" }, [document.createTextNode("Afficher des exemples")]);
    exemples.addEventListener("click", function () {
      contributions.querySelectorAll("textarea").forEach(function (t, i) {
        if (!t.value && s.exemples[i]) t.value = s.exemples[i];
      });
    });
    actions.appendChild(exemples);
    actions.appendChild(effacer);

    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      el("p", { class: "question-groupe", niveau: 1 }, [document.createTextNode(s.question)]),
      relances(s.relances, 2),
      contributions,
      actions,
      ancrage(s.ancrage, 3)
    ]);
  };

  rendus["contexte"] = function (s) {
    var grille = el("div", { class: "contexte-grille" });
    var previsualisation = el("div", { class: "previsualisation", niveau: 3 });
    var valeurs = {};

    function majPreview() {
      var rendu = s.gabarit;
      s.champs.forEach(function (c) {
        var v = valeurs[c.cle] || ("{{" + c.cle + "}}");
        rendu = rendu.split("{{" + c.cle + "}}").join(v);
      });
      previsualisation.textContent = rendu;
    }

    // Regroupement fixe en 2 lots de 3 champs (comprendre la relation,
    // puis cadrer l'action), tel que défini par la cartographie — les
    // six champs ne se révèlent jamais un par un.
    s.champs.forEach(function (c, i) {
      var idChamp = "champ-" + s.id + "-" + c.cle;
      var input = el("textarea", { id: idChamp, rows: "2" });
      input.addEventListener("input", function () {
        valeurs[c.cle] = input.value;
        majPreview();
      });
      grille.appendChild(el("div", { class: "contexte-champ", niveau: i < 3 ? 1 : 2 }, [
        el("label", { for: idChamp }, [document.createTextNode(c.question)]),
        input
      ]));
    });
    majPreview();

    var actions = el("div", { class: "actions", niveau: 3 });
    actions.appendChild(boutonCopier(function () { return previsualisation.textContent; }, "Copier le prompt"));
    var lienBtn = boutonLien(s.lienId);
    if (lienBtn) actions.appendChild(lienBtn);

    var reinit = el("button", { type: "button" }, [document.createTextNode("Réinitialiser")]);
    reinit.addEventListener("click", function () {
      valeurs = {};
      grille.querySelectorAll("textarea").forEach(function (t) { t.value = ""; });
      majPreview();
    });
    actions.appendChild(reinit);

    var prepare = el("button", { type: "button" }, [document.createTextNode("Afficher un prompt préparé")]);
    prepare.addEventListener("click", function () {
      s.champs.forEach(function (c) {
        var v = s.promptPrepare[c.cle] || "";
        valeurs[c.cle] = v;
        var champ = grille.querySelector("#champ-" + s.id + "-" + c.cle);
        if (champ) champ.value = v;
      });
      majPreview();
    });
    actions.appendChild(prepare);

    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      grille,
      previsualisation,
      actions,
      ancrage(s.ancrage, 3)
    ]);
  };

  rendus["methode"] = function (s) {
    var grille = el("div", { class: "methode-etapes" });
    s.etapes.forEach(function (etape, i) {
      grille.appendChild(el("div", { class: "methode-etape", niveau: i < 2 ? 1 : 2 }, [
        el("span", { class: "num" }, [document.createTextNode("Étape " + (i + 1))]),
        document.createTextNode(etape)
      ]));
    });
    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      grille,
      ancrage(s.ancrage, 3)
    ]);
  };

  rendus["verification"] = function (s) {
    // Regroupement en 3 ensembles mémorisables : fiabilité, pertinence
    // relationnelle, responsabilité (ordre des questions adapté en
    // conséquence dans data/contenus.js, texte inchangé).
    var niveaux = s.questions.map(function (_, i) {
      if (i < 2) return 1;
      if (i < 5) return 2;
      return 3;
    });
    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      ancrage(s.ancrage),
      liste(s.questions, "verification-liste", niveaux)
    ]);
  };

  rendus["video"] = function (s) {
    var citationBloc = el("blockquote", { class: "citation" }, [document.createTextNode(s.citation)]);
    var sourceBloc = el("p", { class: "citation-source" }, [document.createTextNode("— " + s.source)]);
    var conteneurVideo = el("div", { class: "video-conteneur" });

    function basculerVersSecours() {
      if (conteneurVideo.dataset.bascule === "1") return;
      conteneurVideo.dataset.bascule = "1";
      conteneurVideo.innerHTML = "";
      conteneurVideo.appendChild(texte("⚠️ Vidéo indisponible : citation affichée seule (résultat de secours)."));
    }

    var video = el("video", { controls: "controls", preload: "metadata" });
    var source = el("source", { src: s.video, type: "video/mp4" });
    video.appendChild(source);
    // Selon les navigateurs, l'échec de chargement peut déclencher "error"
    // sur le <source>, sur le <video>, ou ni l'un ni l'autre (simple passage
    // en networkState "aucune source") : on couvre les trois cas.
    source.addEventListener("error", basculerVersSecours);
    video.addEventListener("error", basculerVersSecours);
    setTimeout(function () {
      if (video.readyState === 0 && video.networkState === 3) basculerVersSecours();
    }, 4000);
    conteneurVideo.appendChild(video);

    var blocOuverture = el("div", { niveau: 1 }, [conteneurVideo, citationBloc, sourceBloc]);

    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      blocOuverture,
      el("p", { class: "question-groupe", niveau: 2 }, [document.createTextNode(s.question)])
    ]);
  };

  rendus["consigne"] = function (s) {
    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      el("div", { class: "consigne-box", niveau: 1 }, [document.createTextNode(s.consigne)]),
      liste(s.questions, "verification-liste", 2),
      ancrage(s.ancrage, 3)
    ]);
  };

  rendus["portefeuilles-activites"] = function (s) {
    var cartes = el("div", { class: "portefeuille-cartes", niveau: 2 });

    function afficherGroupe(numero) {
      cartes.innerHTML = "";
      var groupe = s.groupes.filter(function (g) { return g.numero === numero; })[0];
      groupe.activites.forEach(function (activite, i) {
        cartes.appendChild(el("div", { class: "portefeuille-carte", "data-pole": s.poles[i] }, [
          el("span", { class: "pole" }, [document.createTextNode(s.poles[i])]),
          document.createTextNode(activite)
        ]));
      });
    }

    var selecteur = creerSelecteurGroupe(afficherGroupe, 1);
    selecteur.setAttribute("data-reveal-level", "1");
    afficherGroupe(1);

    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      texte(s.avertissement),
      selecteur,
      cartes
    ]);
  };

  rendus["portefeuille-situations"] = function (s) {
    var listeSituations = el("ul", { class: "situations-liste", niveau: 2 });

    function afficherGroupe(numero) {
      listeSituations.innerHTML = "";
      var groupe = s.groupes.filter(function (g) { return g.numero === numero; })[0];
      groupe.situations.forEach(function (situation) {
        listeSituations.appendChild(el("li", {}, [document.createTextNode(situation)]));
      });
    }

    var selecteur = creerSelecteurGroupe(afficherGroupe, 1);
    selecteur.setAttribute("data-reveal-level", "2");
    afficherGroupe(1);

    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      texte(s.avertissement),
      el("p", { class: "question-groupe", niveau: 1 }, [document.createTextNode(s.question)]),
      selecteur,
      listeSituations,
      relances(s.relances, 2),
      ancrage(s.ancrage, 3)
    ]);
  };

  rendus["interlude"] = function (s) {
    var minuterie = creerMinuterie(s.dureeSecondes);
    var controles = el("div", { class: "minuterie-controles" });
    var demarrerBtn = el("button", { type: "button" }, [document.createTextNode("Démarrer")]);
    var pauseBtn = el("button", { type: "button" }, [document.createTextNode("Pause")]);
    var reinitBtn = el("button", { type: "button" }, [document.createTextNode("Réinitialiser")]);
    demarrerBtn.addEventListener("click", minuterie.demarrer);
    pauseBtn.addEventListener("click", minuterie.arreter);
    reinitBtn.addEventListener("click", function () { minuterie.reinitialiser(); });
    controles.appendChild(demarrerBtn);
    controles.appendChild(pauseBtn);
    controles.appendChild(reinitBtn);

    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      el("div", { class: "consigne-box", niveau: 1 }, [document.createTextNode(s.consigne)]),
      minuterie.element,
      controles,
      ancrage(s.ancrage, 2)
    ]);
  };

  rendus["restitutions"] = function (s) {
    var groupeActuelTexte = el("p", { class: "groupe-actuel" }, [document.createTextNode("Groupe 1")]);
    var etiquette = el("p", { class: "minuterie-etiquette" }, [document.createTextNode(s.temps1Label)]);
    var groupeCourant = 1;
    var phase = 1;

    function phaseSuivante() {
      if (phase === 1) {
        phase = 2;
        etiquette.textContent = s.temps2Label;
        minuterie.reinitialiser(s.temps2Secondes);
        minuterie.demarrer();
      } else {
        groupeCourant = groupeCourant < 4 ? groupeCourant + 1 : 1;
        phase = 1;
        groupeActuelTexte.textContent = "Groupe " + groupeCourant;
        etiquette.textContent = s.temps1Label;
        minuterie.reinitialiser(s.temps1Secondes);
      }
    }

    var minuterie = creerMinuterie(s.temps1Secondes, phaseSuivante);

    var controles = el("div", { class: "minuterie-controles" });
    var demarrerBtn = el("button", { type: "button" }, [document.createTextNode("Démarrer")]);
    var pauseBtn = el("button", { type: "button" }, [document.createTextNode("Pause")]);
    var suivantBtn = el("button", { type: "button" }, [document.createTextNode("Passer au groupe suivant")]);
    demarrerBtn.addEventListener("click", minuterie.demarrer);
    pauseBtn.addEventListener("click", minuterie.arreter);
    suivantBtn.addEventListener("click", function () {
      groupeCourant = groupeCourant < 4 ? groupeCourant + 1 : 1;
      phase = 1;
      groupeActuelTexte.textContent = "Groupe " + groupeCourant;
      etiquette.textContent = s.temps1Label;
      minuterie.reinitialiser(s.temps1Secondes);
    });
    controles.appendChild(demarrerBtn);
    controles.appendChild(pauseBtn);
    controles.appendChild(suivantBtn);

    // Les deux temps (30 s / 90 s) sont déjà pilotés par la minuterie
    // elle-même (bascule automatique en fin de décompte) : seules les
    // relances de débrief, à n'ouvrir que si utile, passent par la
    // touche "Suivant" du système de révélation.
    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      groupeActuelTexte,
      etiquette,
      minuterie.element,
      controles,
      relances(s.relances, 1)
    ]);
  };

  rendus["projection"] = function (s) {
    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      el("p", { class: "question-groupe", niveau: 1 }, [document.createTextNode(s.question)]),
      el("div", { class: "qr-bloc", niveau: 2 }, [document.createTextNode("QR code à intégrer (assets/images/)")]),
      texte(s.avertissement, null, 2),
      texte(s.lienCourtSecours, null, 2)
    ]);
  };

  rendus["conclusion"] = function (s) {
    var ul = el("ul", { class: "mots-cles-finaux", niveau: 1 });
    s.motsCles.forEach(function (mot) {
      ul.appendChild(el("li", {}, [document.createTextNode(mot)]));
    });
    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      ul,
      ancrage(s.ancrage, 2)
    ]);
  };

  /* ------------------------------------------------------------------ */
  /* Construction du parcours                                             */
  /* ------------------------------------------------------------------ */

  function construire() {
    DATA.screens.forEach(function (s) {
      var section = el("section", {
        class: "screen",
        id: s.id,
        "data-numero": s.numero,
        "aria-label": "Écran " + s.numero
      });
      var rendu = rendus[s.type];
      if (rendu) {
        section.appendChild(rendu(s));
      } else {
        section.appendChild(texte("⚠️ Type d'écran non reconnu : " + s.type));
      }
      parcours.appendChild(section);

      var point = el("button", {
        type: "button",
        "aria-label": "Aller à l'écran " + s.numero,
        "aria-current": "false"
      });
      point.addEventListener("click", function () {
        section.scrollIntoView({ behavior: preferenceMouvementReduit() ? "auto" : "smooth" });
      });
      navPoints.appendChild(point);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Navigation : clavier, molette, boutons, Stream Deck                 */
  /*                                                                      */
  /* Trois actions, chacune déclenchable par plusieurs touches            */
  /* équivalentes :                                                       */
  /*  - Suivant  (↓ / → / Espace / Page suivante) : révèle le niveau      */
  /*    suivant de l'écran courant, ou passe à l'écran suivant si tout    */
  /*    est déjà révélé.                                                  */
  /*  - Retour   (↑ / ← / Page précédente) : masque le dernier niveau     */
  /*    révélé, ou revient à l'écran précédent (dans son dernier état     */
  /*    connu) si l'écran est déjà à son état initial.                    */
  /*  - Tout afficher (T) : révèle immédiatement tous les niveaux de      */
  /*    l'écran courant.                                                  */
  /* Un verrou de courte durée empêche qu'un appui répété (molette,       */
  /* rebond matériel, double frappe) ne déclenche plusieurs actions.      */
  /* ------------------------------------------------------------------ */

  function preferenceMouvementReduit() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  function initNavigation() {
    var sections = Array.prototype.slice.call(parcours.querySelectorAll(".screen"));
    var points = Array.prototype.slice.call(navPoints.querySelectorAll("button"));
    var VERROU_MS = 350;
    var verrouille = false;

    function executerAvecVerrou(fn) {
      if (verrouille) return;
      verrouille = true;
      fn();
      setTimeout(function () { verrouille = false; }, VERROU_MS);
    }

    function indexActuel() {
      var milieu = parcours.scrollTop + parcours.clientHeight / 2;
      var index = 0;
      sections.forEach(function (sec, i) {
        if (sec.offsetTop <= milieu) index = i;
      });
      return index;
    }

    function marquerActif() {
      var i = indexActuel();
      points.forEach(function (p, j) {
        p.setAttribute("aria-current", j === i ? "true" : "false");
      });
      // Jauge visible en filigrane à partir de l'écran 5 (numéro 5)
      var jaugeEl = document.getElementById("jauge");
      var numero = sections[i] ? parseInt(sections[i].getAttribute("data-numero"), 10) : 0;
      if (jaugeEl) jaugeEl.hidden = numero < 5;
    }

    function allerA(index) {
      index = Math.max(0, Math.min(index, sections.length - 1));
      sections[index].scrollIntoView({ behavior: preferenceMouvementReduit() ? "auto" : "smooth" });
    }

    function actionSuivant() {
      var i = indexActuel();
      var section = sections[i];
      var niveau = niveauActuelDe(section);
      var max = niveauMaxDe(section);
      if (niveau < max) {
        appliquerNiveau(section, niveau + 1);
        return;
      }
      if (i < sections.length - 1) allerA(i + 1);
    }

    function actionRetour() {
      var i = indexActuel();
      var section = sections[i];
      var niveau = niveauActuelDe(section);
      if (niveau > 0) {
        appliquerNiveau(section, niveau - 1);
        return;
      }
      if (i > 0) allerA(i - 1);
    }

    function actionToutAfficher() {
      var section = sections[indexActuel()];
      appliquerNiveau(section, niveauMaxDe(section));
    }

    parcours.addEventListener("scroll", function () {
      window.requestAnimationFrame(marquerActif);
    });

    document.addEventListener("keydown", function (e) {
      var cible = e.target;
      var champSaisie = cible && (cible.tagName === "TEXTAREA" || cible.tagName === "INPUT" || cible.isContentEditable);
      if (champSaisie) return;
      // Ignore l'auto-répétition d'une touche maintenue enfoncée : un
      // seul appui doit produire un seul pas, jamais un défilement en
      // rafale.
      if (e.repeat) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      var toucheSuivant = e.key === "ArrowDown" || e.key === "ArrowRight" ||
        e.key === " " || e.key === "Spacebar" || e.code === "Space" || e.key === "PageDown";
      var toucheRetour = e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp";
      var toucheToutAfficher = e.key === "t" || e.key === "T";

      if (toucheSuivant) {
        e.preventDefault();
        executerAvecVerrou(actionSuivant);
      } else if (toucheRetour) {
        e.preventDefault();
        executerAvecVerrou(actionRetour);
      } else if (toucheToutAfficher) {
        e.preventDefault();
        executerAvecVerrou(actionToutAfficher);
      } else if (e.key === "Home") {
        e.preventDefault();
        executerAvecVerrou(function () { allerA(0); });
      } else if (e.key === "End") {
        e.preventDefault();
        executerAvecVerrou(function () { allerA(sections.length - 1); });
      }
    });

    // La molette/le trackpad ne pilotent plus le défilement natif
    // directement (trop variable d'un appareil à l'autre, risque de
    // sauter plusieurs écrans) : un geste entier (clic-molette isolé ou
    // fling inertiel qui envoie des dizaines d'événements sur 1-2 s) ne
    // déclenche qu'une seule action Suivant/Retour, quelle que soit sa
    // durée : premier événement du geste = action immédiate, tout
    // événement suivant tant que le geste continue est ignoré, et le
    // geste n'est considéré terminé qu'après un court silence. Le
    // tactile (glissement sur mobile/tablette) n'est pas intercepté et
    // continue de fonctionner nativement via le scroll-snap CSS.
    var gesteMoletteEnCours = false;
    var finGesteMoletteTimer = null;
    parcours.addEventListener("wheel", function (e) {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 4) return;
      if (!gesteMoletteEnCours) {
        gesteMoletteEnCours = true;
        if (e.deltaY > 0) actionSuivant();
        else actionRetour();
      }
      clearTimeout(finGesteMoletteTimer);
      finGesteMoletteTimer = setTimeout(function () {
        gesteMoletteEnCours = false;
      }, 200);
    }, { passive: false });

    var boutonPrecedent = document.getElementById("bouton-precedent");
    var boutonSuivant = document.getElementById("bouton-suivant");
    if (boutonPrecedent) boutonPrecedent.addEventListener("click", function () { executerAvecVerrou(actionRetour); });
    if (boutonSuivant) boutonSuivant.addEventListener("click", function () { executerAvecVerrou(actionSuivant); });

    marquerActif();
  }

  /* ------------------------------------------------------------------ */
  /* Plein écran                                                          */
  /* ------------------------------------------------------------------ */

  function initPleinEcran() {
    var bouton = document.getElementById("bouton-plein-ecran");
    bouton.addEventListener("click", function () {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen().catch(function () {});
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Démarrage                                                            */
  /* ------------------------------------------------------------------ */

  document.addEventListener("DOMContentLoaded", function () {
    construire();
    initNavigation();
    initPleinEcran();
    Jauge.init();
  });
})();
