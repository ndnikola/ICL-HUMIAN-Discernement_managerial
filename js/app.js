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
      if (key === "class") node.className = attrs[key];
      else if (key === "html") node.innerHTML = attrs[key];
      else if (key === "text") node.textContent = attrs[key];
      else node.setAttribute(key, attrs[key]);
    }
    (children || []).forEach(function (child) {
      if (child) node.appendChild(child);
    });
    return node;
  }

  // Un texte commençant par "⚠️" est un bloc d'attente : contenu à finaliser
  // avant la séance réelle (phrase à valider, décision non tranchée, etc.).
  function texte(contenu, extraClass) {
    var estAttente = typeof contenu === "string" && contenu.indexOf("⚠️") === 0;
    var classes = estAttente ? "bloc-attente" : (extraClass || "");
    return el("p", { class: classes }, [document.createTextNode(contenu)]);
  }

  function liste(items, classe) {
    var ul = el("ul", { class: classe });
    items.forEach(function (item) {
      ul.appendChild(el("li", {}, [document.createTextNode(item)]));
    });
    return ul;
  }

  function ancrage(t) {
    if (!t) return null;
    var estAttente = t.indexOf("⚠️") === 0;
    return el("p", { class: estAttente ? "ancrage bloc-attente" : "ancrage" }, [document.createTextNode(t)]);
  }

  function relances(items) {
    if (!items || !items.length) return null;
    var ul = el("ul", { class: "relances" });
    items.forEach(function (r) {
      ul.appendChild(el("li", {}, [document.createTextNode(r)]));
    });
    return ul;
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
  /* ------------------------------------------------------------------ */

  var rendus = {};

  rendus["accueil"] = function (s) {
    var corps = el("div", { class: "screen-contenu ecran-accueil" }, [
      el("h1", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      el("p", { class: "meta" }, [document.createTextNode(DATA.meta.date + " — " + DATA.meta.intervenant)]),
      ancrage(s.ancrage),
      el("div", { class: "fleche-defilement" }, [document.createTextNode("↓ Commencer")])
    ]);
    return corps;
  };

  rendus["mots-cles"] = function (s) {
    var ul = el("ul", { class: "mots-cles" });
    s.motsCles.forEach(function (mot) {
      ul.appendChild(el("li", {}, [document.createTextNode(mot)]));
    });
    var corps = el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      ul,
      ancrage(s.ancrage)
    ]);
    // apparition séquencée
    requestAnimationFrame(function () {
      var items = ul.querySelectorAll("li");
      items.forEach(function (li, i) {
        setTimeout(function () { li.classList.add("visible"); }, i * 150);
      });
    });
    return corps;
  };

  rendus["deux-blocs"] = function (s) {
    var grille = el("div", { class: "deux-blocs" });
    s.blocs.forEach(function (b) {
      grille.appendChild(el("div", { class: "bloc" }, [
        el("h3", {}, [document.createTextNode(b.titre)]),
        liste(b.points)
      ]));
    });
    var corps = el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      grille,
      ancrage(s.ancrage)
    ]);
    requestAnimationFrame(function () {
      grille.querySelectorAll(".bloc").forEach(function (bloc, i) {
        setTimeout(function () { bloc.classList.add("visible"); }, i * 200);
      });
    });
    return corps;
  };

  rendus["citation"] = function (s) {
    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      el("blockquote", { class: "citation" }, [document.createTextNode(s.citation)]),
      texte(s.source, "citation-source")
    ]);
  };

  rendus["mission-collective"] = function (s) {
    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      liste(s.points, "mission-liste"),
      ancrage(s.ancrage)
    ]);
  };

  function ecranDemonstration(s) {
    var actions = el("div", { class: "actions" });
    if (s.consigne) actions.appendChild(boutonCopier(s.consigne, "Copier la consigne"));
    var lienBtn = boutonLien(s.lienId);
    if (lienBtn) actions.appendChild(lienBtn);
    var secours = boutonSecours(s.secours);
    actions.appendChild(secours.bouton);

    var enfants = [el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)])];
    if (s.consigne) enfants.push(el("div", { class: "consigne-box" }, [document.createTextNode(s.consigne)]));
    enfants.push(ancrage(s.ancrage));
    if (s.relance) enfants.push(el("p", { class: "question-groupe" }, [document.createTextNode(s.relance)]));
    enfants.push(relances(s.relances));
    enfants.push(actions);
    enfants.push(secours.zone);

    return el("div", { class: "screen-contenu" }, enfants);
  }

  rendus["demonstration"] = ecranDemonstration;

  rendus["demonstration-documentee"] = function (s) {
    var grille = el("div", { class: "documents-grille" });
    s.documents.forEach(function (d) {
      grille.appendChild(el("div", { class: "document-carte" }, [
        el("span", { class: "icone" }, [document.createTextNode(d.icone)]),
        el("span", {}, [document.createTextNode(d.label)])
      ]));
    });
    var base = ecranDemonstration(s);
    base.insertBefore(grille, base.querySelector(".actions"));
    return base;
  };

  rendus["debrief"] = function (s) {
    var contributions = el("div", { class: "contributions" });
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
      ancrage(s.ancrage),
      el("p", { class: "question-groupe" }, [document.createTextNode(s.question)]),
      relances(s.relances),
      contributions,
      actions
    ]);
  };

  rendus["contexte"] = function (s) {
    var grille = el("div", { class: "contexte-grille" });
    var previsualisation = el("div", { class: "previsualisation" });
    var valeurs = {};

    function majPreview() {
      var rendu = s.gabarit;
      s.champs.forEach(function (c) {
        var v = valeurs[c.cle] || ("{{" + c.cle + "}}");
        rendu = rendu.split("{{" + c.cle + "}}").join(v);
      });
      previsualisation.textContent = rendu;
    }

    s.champs.forEach(function (c) {
      var idChamp = "champ-" + s.id + "-" + c.cle;
      var input = el("textarea", { id: idChamp, rows: "2" });
      input.addEventListener("input", function () {
        valeurs[c.cle] = input.value;
        majPreview();
      });
      grille.appendChild(el("div", { class: "contexte-champ" }, [
        el("label", { for: idChamp }, [document.createTextNode(c.question)]),
        input
      ]));
    });
    majPreview();

    var actions = el("div", { class: "actions" });
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
      ancrage(s.ancrage),
      grille,
      previsualisation,
      actions
    ]);
  };

  rendus["methode"] = function (s) {
    var grille = el("div", { class: "methode-etapes" });
    s.etapes.forEach(function (etape, i) {
      grille.appendChild(el("div", { class: "methode-etape" }, [
        el("span", { class: "num" }, [document.createTextNode("Étape " + (i + 1))]),
        document.createTextNode(etape)
      ]));
    });
    var corps = el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      grille,
      ancrage(s.ancrage)
    ]);
    requestAnimationFrame(function () {
      grille.querySelectorAll(".methode-etape").forEach(function (etape, i) {
        setTimeout(function () { etape.classList.add("visible"); }, i * 250);
      });
    });
    return corps;
  };

  rendus["verification"] = function (s) {
    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      ancrage(s.ancrage),
      liste(s.questions, "verification-liste")
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

    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      conteneurVideo,
      citationBloc,
      sourceBloc,
      el("p", { class: "question-groupe" }, [document.createTextNode(s.question)])
    ]);
  };

  rendus["consigne"] = function (s) {
    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      el("div", { class: "consigne-box" }, [document.createTextNode(s.consigne)]),
      ancrage(s.ancrage),
      liste(s.questions, "verification-liste")
    ]);
  };

  rendus["portefeuilles-activites"] = function (s) {
    var cartes = el("div", { class: "portefeuille-cartes" });

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
    afficherGroupe(1);

    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      texte(s.avertissement),
      selecteur,
      cartes
    ]);
  };

  rendus["portefeuille-situations"] = function (s) {
    var listeSituations = el("ul", { class: "situations-liste" });

    function afficherGroupe(numero) {
      listeSituations.innerHTML = "";
      var groupe = s.groupes.filter(function (g) { return g.numero === numero; })[0];
      groupe.situations.forEach(function (situation) {
        listeSituations.appendChild(el("li", {}, [document.createTextNode(situation)]));
      });
    }

    var selecteur = creerSelecteurGroupe(afficherGroupe, 1);
    afficherGroupe(1);

    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      texte(s.avertissement),
      ancrage(s.ancrage),
      el("p", { class: "question-groupe" }, [document.createTextNode(s.question)]),
      selecteur,
      listeSituations,
      relances(s.relances)
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
      el("div", { class: "consigne-box" }, [document.createTextNode(s.consigne)]),
      ancrage(s.ancrage),
      minuterie.element,
      controles
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

    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      groupeActuelTexte,
      etiquette,
      minuterie.element,
      controles,
      relances(s.relances)
    ]);
  };

  rendus["projection"] = function (s) {
    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      el("p", { class: "question-groupe" }, [document.createTextNode(s.question)]),
      el("div", { class: "qr-bloc" }, [document.createTextNode("QR code à intégrer (assets/images/)")]),
      texte(s.avertissement),
      texte(s.lienCourtSecours)
    ]);
  };

  rendus["conclusion"] = function (s) {
    var ul = el("ul", { class: "mots-cles-finaux" });
    s.motsCles.forEach(function (mot) {
      ul.appendChild(el("li", {}, [document.createTextNode(mot)]));
    });
    return el("div", { class: "screen-contenu" }, [
      el("h2", { class: "titre-ecran" }, [document.createTextNode(s.titre)]),
      ul,
      ancrage(s.ancrage)
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
        section.scrollIntoView({ behavior: "smooth" });
      });
      navPoints.appendChild(point);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Navigation clavier + suivi de l'écran actif                         */
  /* ------------------------------------------------------------------ */

  function initNavigation() {
    var sections = Array.prototype.slice.call(parcours.querySelectorAll(".screen"));
    var points = Array.prototype.slice.call(navPoints.querySelectorAll("button"));

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

    parcours.addEventListener("scroll", function () {
      window.requestAnimationFrame(marquerActif);
    });

    document.addEventListener("keydown", function (e) {
      var cible = e.target;
      var champSaisie = cible && (cible.tagName === "TEXTAREA" || cible.tagName === "INPUT");
      if (champSaisie) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        var suivant = Math.min(indexActuel() + 1, sections.length - 1);
        sections[suivant].scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        var precedent = Math.max(indexActuel() - 1, 0);
        sections[precedent].scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "Home") {
        e.preventDefault();
        sections[0].scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "End") {
        e.preventDefault();
        sections[sections.length - 1].scrollIntoView({ behavior: "smooth" });
      }
    });

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
