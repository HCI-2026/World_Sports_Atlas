/*
  map.js
  Runs the home page:
    1. Loads sport photos from Wikipedia and rotates three of them in the banner.
    2. Draws the world map (D3 + world-atlas data, loaded from a CDN).
    3. Zooms into a continent when it is clicked.
    4. Shows a list of sports when you hover a country, and opens the
       side panel with the sport's details when you pick one.
*/

(function () {
  "use strict";

  var WORLD_DATA_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
  var WIKI_API = "https://en.wikipedia.org/w/api.php";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Lookup tables built from data.js ---------- */

  var sportsById = {};
  var sportsByLocation = {};
  var locationByIso = {};
  var countByContinent = {};

  SPORTS.forEach(function (sport) {
    sportsById[sport.id] = sport;
    (sportsByLocation[sport.location] = sportsByLocation[sport.location] || []).push(sport);
    countByContinent[sport.continent] = (countByContinent[sport.continent] || 0) + 1;
  });

  Object.keys(LOCATIONS).forEach(function (key) {
    var loc = LOCATIONS[key];
    loc.key = key;
    loc.continent = sportsByLocation[key][0].continent;
    if (loc.iso) { locationByIso[loc.iso] = loc; }
  });

  /* ---------- Small helpers ---------- */

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* Turns *word* into <em>word</em> after escaping the text. */
  function formatText(text) {
    return escapeHtml(text).replace(/\*([^*]+)\*/g, "<em>$1</em>");
  }

  /* A string becomes a paragraph; a list becomes bullet points. */
  function textOrList(value) {
    if (Array.isArray(value)) {
      return "<ul>" + value.map(function (item) {
        return "<li>" + formatText(item) + "</li>";
      }).join("") + "</ul>";
    }
    return "<p>" + formatText(value) + "</p>";
  }

  function plural(n, word) {
    return n + " " + word + (n === 1 ? "" : "s");
  }

  /* =========================================================
     1. PHOTOS FROM WIKIPEDIA
     ========================================================= */

  /* Photos saved in the site's own images folder (not from Wikipedia). */
  SPORTS.forEach(function (sport) {
    if (sport.imageLocal) {
      sport.image = {
        src: sport.imageLocal.src,
        file: sport.imageLocal.source,
        page: sport.imageLocal.page,
        sourceName: sport.imageLocal.source
      };
    }
  });

  function loadImages() {
    var titles = SPORTS.map(function (s) { return s.imageTitle; });
    var url = WIKI_API +
      "?action=query&format=json&formatversion=2&origin=*&redirects=1" +
      "&prop=pageimages&piprop=thumbnail%7Cname&pithumbsize=960" +
      "&titles=" + titles.map(encodeURIComponent).join("%7C");

    return fetch(url)
      .then(function (response) { return response.json(); })
      .then(function (data) {
        var query = data.query || {};
        var renamed = {};
        (query.normalized || []).concat(query.redirects || []).forEach(function (item) {
          renamed[item.from] = item.to;
        });
        var pages = {};
        (query.pages || []).forEach(function (page) { pages[page.title] = page; });

        SPORTS.forEach(function (sport) {
          var title = sport.imageTitle;
          while (renamed[title]) { title = renamed[title]; }
          var page = pages[title];
          if (!sport.imageLocal && page && page.thumbnail && page.pageimage) {
            sport.image = {
              src: page.thumbnail.source,
              file: page.pageimage.replace(/_/g, " "),
              page: "https://en.wikipedia.org/wiki/File:" + encodeURIComponent(page.pageimage)
            };
          }
        });
      })
      .then(loadCommonsImages)
      .catch(function () {
        /* No photos: the banner and panel fall back to coloured blocks. */
      });
  }

  /*
    Some sports use a chosen photo from Wikimedia Commons instead of the
    Wikipedia article's main image (imageFile).
  */
  var COMMONS_API = "https://commons.wikimedia.org/w/api.php";

  function commonsImage(page) {
    var info = page.imageinfo && page.imageinfo[0];
    if (!info) { return null; }
    return {
      src: info.thumburl || info.url,
      file: page.title.replace(/^File:/, ""),
      page: info.descriptionurl
    };
  }

  function loadCommonsImages() {
    var requests = [];

    var chosen = SPORTS.filter(function (s) { return s.imageFile; });
    if (chosen.length) {
      var url = COMMONS_API + "?action=query&format=json&formatversion=2&origin=*" +
        "&prop=imageinfo&iiprop=url&iiurlwidth=960&titles=" +
        chosen.map(function (s) { return encodeURIComponent("File:" + s.imageFile); }).join("%7C");
      requests.push(fetch(url).then(function (r) { return r.json(); }).then(function (data) {
        var byTitle = {};
        ((data.query && data.query.pages) || []).forEach(function (page) { byTitle[page.title] = page; });
        (data.query && data.query.normalized || []).forEach(function (n) { byTitle[n.from] = byTitle[n.to]; });
        chosen.forEach(function (sport) {
          var page = byTitle["File:" + sport.imageFile];
          var image = page && commonsImage(page);
          if (image) { sport.image = image; }
        });
      }).catch(function () {}));
    }

    return Promise.all(requests);
  }

  /* ---------- Banner slideshow ---------- */

  /*
    Rotates through the photo of every sport. Two layers take turns:
    the next photo loads into the hidden layer, then the layers fade.
  */
  function startHero() {
    var slides = document.querySelectorAll(".hero__slide");
    var credit = document.getElementById("hero-credit");
    var heroSports = SPORTS.filter(function (s) { return s.image; });

    if (!heroSports.length || slides.length < 2) { return; }

    var current = 0;
    var front = 0;

    function setCredit(sport) {
      credit.innerHTML = "Photo: " + escapeHtml(sport.name) +
        ", <a href=\"" + sport.image.page + "\" target=\"_blank\" rel=\"noopener\">" +
        escapeHtml(sport.image.sourceName || "Wikimedia Commons") + "</a>";
    }

    function show(index) {
      var sport = heroSports[index];
      var back = 1 - front;
      var img = new Image();
      img.onload = function () {
        slides[back].style.backgroundImage = "url(\"" + sport.image.src + "\")";
        slides[back].classList.add("is-active");
        slides[front].classList.remove("is-active");
        front = back;
        setCredit(sport);
      };
      img.src = sport.image.src;
    }

    show(0);

    if (!reduceMotion && heroSports.length > 1) {
      setInterval(function () {
        current = (current + 1) % heroSports.length;
        show(current);
      }, 6000);
    }
  }

  /* =========================================================
     2. SIDE PANEL
     ========================================================= */

  /*
    The panel has two modes:
      preview  opens while the mouse is over a sport name, and closes
               again when the mouse moves away.
      pinned   opens when a sport is clicked, and stays open until
               the Close button (or Esc) is used.
    While a sport is pinned, hovering another sport previews it, and
    moving away brings the pinned sport back.
  */
  var panel = document.getElementById("sport-panel");
  var panelBody = document.getElementById("panel-body");
  var panelClose = document.getElementById("panel-close");
  var panelHint = document.getElementById("panel-hint");
  var lastFocus = null;
  var shownSportId = null;
  var pinnedSportId = null;
  var previewTimer = null;
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function photoHtml(sport) {
    if (!sport.image) {
      return "<div class=\"panel__photo panel__photo--empty\">" +
        "<span>" + escapeHtml(sport.name.charAt(0)) + "</span></div>";
    }
    return "<figure class=\"panel__figure\">" +
      "<a href=\"" + sport.image.page + "\" target=\"_blank\" rel=\"noopener\">" +
      "<img class=\"panel__photo\" src=\"" + sport.image.src + "\" alt=\"" + escapeHtml(sport.name) + "\"></a>" +
      "<figcaption>Photo: <a href=\"" + sport.image.page + "\" target=\"_blank\" rel=\"noopener\">" +
      escapeHtml(sport.image.file) + "</a>" +
      (sport.image.sourceName ? "" : " (Wikimedia Commons)") + "</figcaption></figure>";
  }

  /* Fills the panel with one sport's details. */
  function renderPanel(id) {
    var sport = sportsById[id];
    if (!sport) { return false; }
    var loc = LOCATIONS[sport.location];
    var continent = CONTINENTS[sport.continent];
    shownSportId = id;

    var html = photoHtml(sport);
    html += "<p class=\"panel__place\">" +
      escapeHtml(loc.name) + ", " + escapeHtml(continent.name) + "</p>";
    html += "<h2 class=\"panel__title\" id=\"panel-title\">" + escapeHtml(sport.name) + "</h2>";

    var play = HOW_TO_PLAY[sport.id];
    if (play) {
      html += "<section class=\"basics\"><h3 class=\"basics__title\">The basics</h3><dl>" +
        "<dt>What it is</dt><dd>" + textOrList(play.what) + "</dd>" +
        "<dt>How it's played</dt><dd>" + textOrList(play.how) + "</dd>" +
        "<dt>" + escapeHtml(play.winLabel || "How to win") + "</dt><dd>" + textOrList(play.win) + "</dd>" +
        "</dl></section>";
    }

    sport.sections.forEach(function (section) {
      html += "<section class=\"panel__section\"><h3>" + escapeHtml(section[0]) + "</h3>" +
        "<p>" + formatText(section[1]) + "</p></section>";
    });

    if (sport.terms && sport.terms.length) {
      html += "<section class=\"panel__section\"><h3>Key terms</h3><dl class=\"terms\">";
      sport.terms.forEach(function (term) {
        html += "<dt>" + escapeHtml(term[0]) + "</dt><dd>" + escapeHtml(term[1]) + "</dd>";
      });
      html += "</dl></section>";
    }

    /* Video: a thumbnail picture that links to YouTube (it does not play here). */
    var videoUrl = "https://www.youtube.com/watch?v=" + sport.video;
    html += "<section class=\"panel__section\"><h3>Watch</h3>" +
      "<a class=\"video\" href=\"" + videoUrl + "\" target=\"_blank\" rel=\"noopener\">" +
      "<img src=\"https://i.ytimg.com/vi/" + sport.video + "/hqdefault.jpg\" " +
      "alt=\"Video thumbnail: " + escapeHtml(sport.name) + "\" loading=\"lazy\">" +
      "<span class=\"video__play\" aria-hidden=\"true\"></span></a>" +
      "<p class=\"panel__small\"><a href=\"" + videoUrl + "\" target=\"_blank\" rel=\"noopener\">" +
      "Open the video on YouTube</a></p></section>";

    html += "<section class=\"panel__section\"><h3>Source</h3><ul class=\"source-list\">" +
      "<li><a href=\"" + sport.wiki + "\" target=\"_blank\" rel=\"noopener\">" +
      escapeHtml(decodeURIComponent(sport.wiki.split("/wiki/")[1]).replace(/_/g, " ")) + " on Wikipedia</a></li>";
    if (sport.wiki2) {
      html += "<li><a href=\"" + sport.wiki2 + "\" target=\"_blank\" rel=\"noopener\">" +
        escapeHtml(decodeURIComponent(sport.wiki2.split("/wiki/")[1]).replace(/_/g, " ")) + " on Wikipedia</a></li>";
    }
    (sport.extraSources || []).forEach(function (source) {
      html += "<li><a href=\"" + source[1] + "\" target=\"_blank\" rel=\"noopener\">" +
        escapeHtml(source[0]) + "</a></li>";
    });
    if (play && play.rulesSources) {
      play.rulesSources.forEach(function (source) {
        html += "<li><a href=\"" + source[1] + "\" target=\"_blank\" rel=\"noopener\">" +
          escapeHtml(source[0]) + "</a> (rules)</li>";
      });
    }
    html += "</ul></section>";

    /* The continent class sets the accent colour used inside the panel. */
    panelBody.className = "panel__body c-" + sport.continent;
    panelBody.innerHTML = html;
    panelBody.scrollTop = 0;
    markShownSport();
    return true;
  }

  function slideIn() {
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    document.body.classList.add("panel-open");
  }

  /*
    Changing sport while the panel is open: the panel slides out to
    the right, the new sport is filled in, and it slides back in.
    If you move to another sport mid-slide, the panel just brings in
    the newest one instead of starting over.
  */
  var wantedSportId = null;   /* the sport the panel is showing or about to show */
  var slidePhase = null;      /* null, "out" or "in" */
  var slideOutAnim = null;
  var slideInAnim = null;
  var switchTimer = null;

  function stopSlide() {
    if (slideOutAnim) { slideOutAnim.cancel(); slideOutAnim = null; }
    if (slideInAnim) { slideInAnim.cancel(); slideInAnim = null; }
    slidePhase = null;
  }

  function slideToSport() {
    if (slidePhase === "out") { return; }   /* already leaving: the new sport comes in next */

    /* Start from wherever the panel is now (it may be half-way in). */
    var current = new DOMMatrix(getComputedStyle(panel).transform).m41;
    var panelW = panel.offsetWidth;
    if (slideInAnim) { slideInAnim.cancel(); slideInAnim = null; }

    slidePhase = "out";
    slideOutAnim = panel.animate(
      [{ transform: "translateX(" + current + "px)" }, { transform: "translateX(100%)" }],
      { duration: Math.max(60, 170 * (1 - current / panelW)), easing: "ease-in", fill: "forwards" }
    );
    slideOutAnim.onfinish = function () {
      renderPanel(wantedSportId);
      slidePhase = "in";
      slideInAnim = panel.animate(
        [{ transform: "translateX(100%)" }, { transform: "translateX(0)" }],
        { duration: 280, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" }
      );
      if (slideOutAnim) { slideOutAnim.cancel(); slideOutAnim = null; }
      slideInAnim.onfinish = function () {
        slideInAnim = null;
        slidePhase = null;
      };
    };
  }

  /* Shows a sport: slides the panel in, or slides it to the new sport. */
  function showSport(id) {
    clearTimeout(switchTimer);
    var isOpen = panel.classList.contains("is-open");
    if (isOpen && id === wantedSportId) { return; }
    wantedSportId = id;
    markShownSport();

    if (!isOpen) {
      stopSlide();
      renderPanel(id);
      slideIn();
    } else if (reduceMotion) {
      renderPanel(id);
    } else {
      slideToSport();
    }
  }

  /* Shows a sport while the mouse is over its name. */
  function previewSport(id) {
    if (!canHover) { return; }
    clearTimeout(previewTimer);
    clearTimeout(switchTimer);
    panel.classList.toggle("is-preview", id !== pinnedSportId);
    if (panel.classList.contains("is-open") && id !== wantedSportId) {
      /* A short pause, so names the mouse only passes over don't trigger a slide. */
      switchTimer = setTimeout(function () { showSport(id); }, 90);
    } else {
      showSport(id);
    }
  }

  /* Called when the mouse leaves a sport name: go back or close. */
  function endPreview() {
    clearTimeout(previewTimer);
    previewTimer = setTimeout(function () {
      if (pinnedSportId) {
        showSport(pinnedSportId);
        panel.classList.remove("is-preview");
      } else {
        closePanel(false);
      }
    }, 300);
  }

  /* Opens a sport and keeps the panel open (a click). */
  function pinSport(id) {
    clearTimeout(previewTimer);
    if (!panel.classList.contains("is-open")) {
      lastFocus = document.activeElement;
    }
    pinnedSportId = id;
    showSport(id);
    panel.classList.remove("is-preview");
    hideMenu(true);
    markShownSport();
    panelClose.focus({ preventScroll: true });
  }

  function closePanel(returnFocus) {
    clearTimeout(previewTimer);
    clearTimeout(switchTimer);
    if (!panel.classList.contains("is-open")) { return; }
    stopSlide();
    panel.classList.remove("is-open", "is-preview");
    panel.setAttribute("aria-hidden", "true");
    document.body.classList.remove("panel-open");
    var wasPinned = pinnedSportId;
    shownSportId = null;
    wantedSportId = null;
    pinnedSportId = null;
    markShownSport();
    /* Clear the panel after it has slid away. */
    setTimeout(function () {
      if (!shownSportId) { panelBody.innerHTML = ""; }
    }, 400);
    if (returnFocus && wasPinned && lastFocus && lastFocus.focus) {
      lastFocus.focus({ preventScroll: true });
    }
  }

  /* Highlights the sport name (in the list and the map menu) that is showing. */
  function markShownSport() {
    document.querySelectorAll("[data-sport]").forEach(function (el) {
      var id = el.getAttribute("data-sport");
      el.classList.toggle("is-shown", id === wantedSportId);
      el.classList.toggle("is-pinned", id === pinnedSportId);
    });
  }

  panelClose.addEventListener("click", function () { closePanel(true); });

  /* Clicking anywhere in a preview keeps it open. */
  panel.addEventListener("click", function (event) {
    if (panel.classList.contains("is-preview") && wantedSportId && !event.target.closest("#panel-close")) {
      pinSport(wantedSportId);
    }
  });
  /* Moving the mouse into a preview keeps it on screen. */
  panel.addEventListener("mouseenter", function () { clearTimeout(previewTimer); });
  panel.addEventListener("mouseleave", function () {
    if (panel.classList.contains("is-preview")) { endPreview(); }
  });

  /*
    Every sport name has data-sport="id": the list under the map and
    the names in the map's hover menu.
      hover -> preview, mouse away -> close, click -> keep open
  */
  document.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-sport]");
    if (trigger) {
      event.preventDefault();
      pinSport(trigger.getAttribute("data-sport"));
    }
  });

  document.addEventListener("mouseover", function (event) {
    var trigger = event.target.closest("[data-sport]");
    if (trigger && !trigger.contains(event.relatedTarget)) {
      previewSport(trigger.getAttribute("data-sport"));
    }
  });

  document.addEventListener("mouseout", function (event) {
    var trigger = event.target.closest("[data-sport]");
    if (trigger && !trigger.contains(event.relatedTarget)) {
      endPreview();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (menu.classList.contains("is-open")) { hideMenu(true); }
      else { closePanel(true); }
    }
  });

  /* =========================================================
     3. THE MAP
     ========================================================= */

  var mapBox = document.getElementById("map");
  var mapStatus = document.getElementById("map-status");
  var markerLayer = document.getElementById("map-markers");
  var backButton = document.getElementById("map-back");
  var mapTitle = document.getElementById("map-title");
  var mapHint = document.getElementById("map-hint");
  var menu = document.getElementById("pin-menu");

  var svg, countryPaths, spherePath, projection, pathGen;
  var width = 0, height = 0;
  var view = "world";
  var state = null;
  var badges = {};
  var pins = {};

  /*
    How much of the map the side panel covers when it is open.
    Zoomed-in continents are drawn in the part the panel leaves free,
    so you can keep hovering countries while a sport is showing.
    On phones the panel covers the whole screen, so nothing is reserved.
  */
  function panelOverlap() {
    var pageW = document.documentElement.clientWidth;
    var panelW = panel.offsetWidth;
    if (panelW >= pageW * 0.9) { return 0; }
    var overlap = mapBox.getBoundingClientRect().right - (pageW - panelW) + 16;
    return Math.max(0, Math.min(overlap, width * 0.5));
  }

  /* Works out the zoom (rotation, scale, position) for a view. */
  function stateFor(name) {
    var p = d3.geoNaturalEarth1();
    if (name === "world") {
      p.rotate([-10, 0]).fitExtent([[8, 8], [width - 8, height - 8]], { type: "Sphere" });
    } else {
      var c = CONTINENTS[name];
      var pad = Math.min(width, height) * 0.08;
      var right = width - panelOverlap() - pad;
      p.rotate([-c.center, 0]).fitExtent([[pad, pad], [right, height - pad]],
        { type: "MultiPoint", coordinates: c.extent });
    }
    return { r: p.rotate()[0], s: p.scale(), t: p.translate() };
  }

  function applyState(s) {
    state = s;
    projection.rotate([s.r, 0]).scale(s.s).translate(s.t);
    spherePath.attr("d", pathGen);
    countryPaths.attr("d", pathGen);
    placeMarkers();
  }

  /* Moves the HTML badges and pins to their spot on the map. */
  function placeMarkers() {
    Object.keys(badges).forEach(function (key) {
      var xy = projection(CONTINENT_LABELS[key]);
      badges[key].style.transform = "translate(" + xy[0] + "px," + xy[1] + "px)";
    });
    Object.keys(pins).forEach(function (key) {
      var xy = projection(LOCATIONS[key].pin);
      pins[key].style.transform = "translate(" + xy[0] + "px," + xy[1] + "px)";
    });
    if (menu.classList.contains("is-open") && menu.dataset.location) {
      positionMenu(menu.dataset.location);
    }
  }

  function setView(name, animate) {
    view = name;
    hideMenu(true);
    var isWorld = name === "world";

    mapBox.classList.toggle("map--world", isWorld);
    mapBox.classList.toggle("map--continent", !isWorld);
    backButton.hidden = isWorld;

    countryPaths
      .classed("in-view", function (d) { return d.continent === name; })
      .classed("is-origin", function (d) { return d.location && d.location.continent === name; });

    Object.keys(badges).forEach(function (key) { badges[key].hidden = !isWorld; });
    Object.keys(pins).forEach(function (key) {
      pins[key].hidden = isWorld || LOCATIONS[key].continent !== name;
    });

    document.querySelectorAll(".continent-switch button").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.continent === name));
    });

    if (isWorld) {
      mapTitle.textContent = "Choose a continent";
      mapHint.textContent = "Click a continent to zoom in. Numbers show how many sports come from each one.";
    } else {
      mapTitle.textContent = CONTINENTS[name].name;
      mapHint.textContent = "Coloured countries are where these " +
        plural(countByContinent[name], "sport") + " come from. Hover a number to see its sports, " +
        "hover a sport to preview it, and click to keep it open.";
    }

    var target = stateFor(name);
    if (!animate || reduceMotion || !state) {
      applyState(target);
      return;
    }
    var from = state;
    d3.transition().duration(950).ease(d3.easeCubicInOut).tween("view", function () {
      var i = d3.interpolate(from, target);
      return function (t) { applyState(i(t)); };
    });
  }

  /* ---------- Hover menu (list of sports in one country) ---------- */

  var hideTimer = null;

  function positionMenu(locKey) {
    var xy = projection(LOCATIONS[locKey].pin);
    /* Keep the menu out of the area the side panel covers. */
    var boxW = mapBox.clientWidth - (view === "world" ? 0 : panelOverlap());
    var menuW = menu.offsetWidth;
    var x = xy[0] + 22;
    if (x + menuW > boxW - 8) { x = xy[0] - menuW - 22; }
    x = Math.max(8, x);
    var y = Math.max(8, Math.min(xy[1] - 24, mapBox.clientHeight - menu.offsetHeight - 8));
    menu.style.transform = "translate(" + x + "px," + y + "px)";
  }

  function showMenu(locKey) {
    clearTimeout(hideTimer);
    var loc = LOCATIONS[locKey];
    var list = sportsByLocation[locKey];
    var color = loc.color;

    if (menu.dataset.location !== locKey) {
      var html = "<p class=\"pin-menu__title\">" + escapeHtml(loc.name) + "</p><ul>";
      list.forEach(function (sport) {
        html += "<li><button type=\"button\" data-sport=\"" + sport.id + "\">" +
          escapeHtml(sport.name) + "</button></li>";
      });
      menu.innerHTML = html + "</ul>";
      menu.dataset.location = locKey;
      menu.style.setProperty("--c", color);
      markShownSport();
    }
    menu.classList.add("is-open");
    positionMenu(locKey);
  }

  function hideMenu(now) {
    clearTimeout(hideTimer);
    var close = function () {
      menu.classList.remove("is-open");
      menu.dataset.location = "";
    };
    if (now) { close(); } else { hideTimer = setTimeout(close, 250); }
  }

  menu.addEventListener("mouseenter", function () { clearTimeout(hideTimer); });
  menu.addEventListener("mouseleave", function () { hideMenu(false); });

  /* One sport opens straight away; several show the list to pick from. */
  function chooseLocation(locKey) {
    var list = sportsByLocation[locKey];
    if (list.length === 1) {
      pinSport(list[0].id);
    } else {
      showMenu(locKey);
      var first = menu.querySelector("button");
      if (first) { first.focus(); }
    }
  }

  /* ---------- Build badges, pins and the continent buttons ---------- */

  function buildMarkers() {
    Object.keys(CONTINENT_LABELS).forEach(function (key) {
      var c = CONTINENTS[key];
      var b = document.createElement("button");
      b.type = "button";
      b.className = "badge";
      b.style.setProperty("--c", c.color);
      b.innerHTML = "<span class=\"badge__count\">" + countByContinent[key] + "</span>" +
        "<span class=\"badge__name\">" + c.name + "</span>";
      b.setAttribute("aria-label", c.name + ", " + plural(countByContinent[key], "sport") + ". Zoom in.");
      b.addEventListener("click", function () { setView(key, true); });
      b.addEventListener("mouseenter", function () { hoverContinent(key); });
      b.addEventListener("mouseleave", function () { hoverContinent(null); });
      markerLayer.appendChild(b);
      badges[key] = b;
    });

    Object.keys(LOCATIONS).forEach(function (key) {
      var loc = LOCATIONS[key];
      var count = sportsByLocation[key].length;
      var p = document.createElement("button");
      p.type = "button";
      p.className = "pin";
      p.hidden = true;
      p.style.setProperty("--c", loc.color);
      p.textContent = count;
      p.setAttribute("aria-label", loc.name + ": " + plural(count, "sport"));
      p.addEventListener("mouseenter", function () { showMenu(key); });
      p.addEventListener("mouseleave", function () { hideMenu(false); });
      p.addEventListener("click", function () { chooseLocation(key); });
      markerLayer.appendChild(p);
      pins[key] = p;
    });
  }

  function hoverContinent(key) {
    mapBox.dataset.hover = key || "";
    countryPaths.classed("is-hover", function (d) { return key && d.continent === key; });
  }

  function buildSwitcher() {
    var bar = document.querySelector(".continent-switch");
    Object.keys(CONTINENTS).forEach(function (key) {
      var c = CONTINENTS[key];
      var b = document.createElement("button");
      b.type = "button";
      b.dataset.continent = key;
      b.style.setProperty("--c", c.color);
      b.setAttribute("aria-pressed", "false");
      b.innerHTML = c.name + " <span>" + countByContinent[key] + "</span>";
      b.addEventListener("click", function () {
        if (countryPaths) { setView(key, true); }
      });
      bar.appendChild(b);
    });
  }

  /* ---------- Draw the map ---------- */

  function measure() {
    width = mapBox.clientWidth;
    height = mapBox.clientHeight;
    svg.attr("viewBox", "0 0 " + width + " " + height);
  }

  /*
    On the map, Hawaii is part of the USA shape. This cuts the Hawaiian
    islands out into their own shape, so they can be coloured as the
    home of three Oceania sports.
  */
  function splitHawaii(countries) {
    var usa = countries.filter(function (d) { return String(d.id).padStart(3, "0") === "840"; })[0];
    if (!usa || usa.geometry.type !== "MultiPolygon") { return []; }

    var isHawaii = function (polygon) {
      return polygon[0].every(function (point) {
        return point[0] < -150 && point[0] > -165 && point[1] > 17 && point[1] < 24;
      });
    };
    var islands = usa.geometry.coordinates.filter(isHawaii);
    if (!islands.length) { return []; }

    usa.geometry = { type: "MultiPolygon", coordinates: usa.geometry.coordinates.filter(function (p) { return !isHawaii(p); }) };
    return [{
      type: "Feature",
      id: "hawaii",
      properties: { name: "Hawaii" },
      geometry: { type: "MultiPolygon", coordinates: islands },
      continent: "oceania",
      location: LOCATIONS.hawaii
    }];
  }

  function drawMap(world) {
    var countries = topojson.feature(world, world.objects.countries).features;

    countries.forEach(function (d) {
      var code = d.id ? String(d.id).padStart(3, "0") : null;
      d.continent = (code && COUNTRY_CONTINENT[code]) || null;
      if (!d.continent && !code) {
        var centre = d3.geoCentroid(d);
        d.continent = guessContinent(centre[0], centre[1]);
      }
      d.location = code ? locationByIso[code] : null;
    });

    countries = countries.concat(splitHawaii(countries));

    svg = d3.select(mapBox).insert("svg", ":first-child")
      .attr("class", "map__svg")
      .attr("role", "img")
      .attr("aria-label", "World map of traditional sports by continent");

    projection = d3.geoNaturalEarth1();
    pathGen = d3.geoPath(projection);
    measure();

    spherePath = svg.append("path").datum({ type: "Sphere" }).attr("class", "sphere");

    countryPaths = svg.append("g").selectAll("path")
      .data(countries)
      .join("path")
      .attr("class", function (d) { return "country" + (d.continent ? "" : " country--none"); })
      .style("--c", function (d) { return d.continent ? CONTINENTS[d.continent].color : null; })
      .style("--loc", function (d) { return d.location ? d.location.color : null; })
      .on("mouseenter", function (event, d) {
        if (view === "world") { hoverContinent(d.continent); }
        else if (d.location && d.location.continent === view) { showMenu(d.location.key); }
      })
      .on("mouseleave", function (event, d) {
        if (view === "world") { hoverContinent(null); }
        else if (d.location) { hideMenu(false); }
      })
      .on("click", function (event, d) {
        if (!d.continent) { return; }
        if (view === "world" || d.continent !== view) {
          hoverContinent(null);
          setView(d.continent, true);
        } else if (d.location && d.location.continent === view) {
          chooseLocation(d.location.key);
        }
      });

    countryPaths.append("title").text(function (d) {
      return d.properties && d.properties.name ? d.properties.name : "";
    });

    buildMarkers();
    setView("world", false);
    mapStatus.hidden = true;

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        measure();
        applyState(stateFor(view));
      }, 150);
    });
  }

  backButton.addEventListener("click", function () { setView("world", true); });

  /* ---------- Start everything ---------- */

  buildSwitcher();

  loadImages().then(startHero);

  if (typeof d3 === "undefined" || typeof topojson === "undefined") {
    mapStatus.textContent = "The map couldn't load because the map library is missing. " +
      "Check your internet connection and reload the page. You can still browse every sport in the list below.";
    return;
  }

  fetch(WORLD_DATA_URL)
    .then(function (response) {
      if (!response.ok) { throw new Error(response.status); }
      return response.json();
    })
    .then(drawMap)
    .catch(function () {
      mapStatus.textContent = "The map couldn't load. Check your internet connection and reload the page. " +
        "You can still browse every sport in the list below.";
    });
})();
