(function () {
  "use strict";

  var DESIGN_WIDTH = 1600;
  var DESIGN_HEIGHT = 900;
  var DECK_TITLE = "Tomorrow Systems";

  var state = {
    data: null,
    slides: [],
    index: 0,
    overview: false,
    help: false,
    suppressHash: false
  };

  var refs = {};

  function byId(id) {
    return document.getElementById(id);
  }

  function cacheDom() {
    refs.viewport = byId("deck-viewport");
    refs.frame = byId("deck-frame");
    refs.slidesRoot = byId("slides-root");
    refs.progressBar = byId("progress-bar");
    refs.progressLabel = byId("progress-label");
    refs.globalSources = byId("global-sources");
    refs.overviewPanel = byId("overview-panel");
    refs.overviewGrid = byId("overview-grid");
    refs.overviewSearch = byId("overview-search");
    refs.overviewStatus = byId("overview-status");
    refs.helpOverlay = byId("help-overlay");
    refs.deckTitle = byId("deck-title");
    refs.btnPrev = byId("btn-prev");
    refs.btnNext = byId("btn-next");
    refs.btnOverview = byId("btn-overview");
    refs.btnPrint = byId("btn-print");
    refs.btnFullscreen = byId("btn-fullscreen");
    refs.btnHelp = byId("btn-help");
    refs.loadingState = byId("loading-state");
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function parseHash() {
    var match = window.location.hash.match(/^#\/slide\/(\d+)$/);
    if (!match) {
      return null;
    }
    var parsed = Number(match[1]);
    if (!Number.isFinite(parsed)) {
      return null;
    }
    return parsed - 1;
  }

  function syncHash(index) {
    var target = "#/slide/" + (index + 1);
    if (window.location.hash === target) {
      return;
    }

    state.suppressHash = true;
    if (window.history && window.history.replaceState) {
      var base = window.location.href.split("#")[0];
      window.history.replaceState(null, "", base + target);
      window.setTimeout(function () {
        state.suppressHash = false;
      }, 0);
      return;
    }

    window.location.hash = target;
    window.setTimeout(function () {
      state.suppressHash = false;
    }, 0);
  }

  function updateProgress() {
    var total = state.slides.length || 1;
    var pct = ((state.index + 1) / total) * 100;

    refs.progressBar.style.width = pct.toFixed(2) + "%";
    refs.progressLabel.textContent = (state.index + 1) + " / " + total;

    var active = state.slides[state.index];
    refs.globalSources.textContent = "Sources: " + (active ? active.sources : "-");
    refs.deckTitle.textContent = DECK_TITLE;
  }

  function setActiveSlide(nextIndex, options) {
    if (!state.slides.length) {
      return;
    }
    var opts = options || {};
    var index = clamp(nextIndex, 0, state.slides.length - 1);

    state.slides.forEach(function (slideMeta, idx) {
      if (idx === index) {
        slideMeta.element.classList.add("is-active");
      } else {
        slideMeta.element.classList.remove("is-active");
      }
    });

    state.index = index;
    updateProgress();
    window.requestAnimationFrame(fitDeck);

    if (opts.updateHash !== false) {
      syncHash(index);
    }
  }

  function nextSlide() {
    setActiveSlide(state.index + 1);
  }

  function prevSlide() {
    setActiveSlide(state.index - 1);
  }

  function toggleOverview(forceState) {
    var open = typeof forceState === "boolean" ? forceState : !state.overview;
    state.overview = open;

    if (open) {
      refs.overviewPanel.classList.add("visible");
      refs.overviewSearch.value = "";
      applyOverviewFilter("");
      window.setTimeout(function () {
        refs.overviewSearch.focus();
      }, 30);
      return;
    }

    refs.overviewPanel.classList.remove("visible");
  }

  function toggleHelp(forceState) {
    var open = typeof forceState === "boolean" ? forceState : !state.help;
    state.help = open;

    if (open) {
      refs.helpOverlay.classList.add("visible");
    } else {
      refs.helpOverlay.classList.remove("visible");
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(function () {
        /* no-op */
      });
      return;
    }
    document.exitFullscreen().catch(function () {
      /* no-op */
    });
  }

  function fitDeck() {
    if (!refs.viewport || !refs.frame) {
      return;
    }
    var width = refs.viewport.clientWidth;
    var height = refs.viewport.clientHeight;
    var scale = Math.min(width / DESIGN_WIDTH, height / DESIGN_HEIGHT);
    if (!Number.isFinite(scale) || scale <= 0) {
      scale = 1;
    }
    var scaledWidth = DESIGN_WIDTH * scale;
    var scaledHeight = DESIGN_HEIGHT * scale;
    var left = Math.max(0, (width - scaledWidth) / 2);
    var top = Math.max(0, (height - scaledHeight) / 2);

    refs.frame.style.left = left.toFixed(2) + "px";
    refs.frame.style.top = top.toFixed(2) + "px";
    refs.frame.style.transform = "scale(" + scale.toFixed(4) + ")";
  }

  function buildOverviewGrid() {
    refs.overviewGrid.innerHTML = "";

    state.slides.forEach(function (slideMeta, index) {
      var card = document.createElement("button");
      card.type = "button";
      card.className = "overview-card";
      card.setAttribute("data-index", String(index));
      card.setAttribute("aria-label", "Slide " + (index + 1) + ": " + slideMeta.title);

      var search = (slideMeta.search || "") + " " + slideMeta.title + " " + slideMeta.kind;
      card.setAttribute("data-search", search.toLowerCase());

      var preview = document.createElement("div");
      preview.className = "overview-preview";
      var clone = slideMeta.element.cloneNode(true);
      clone.classList.remove("is-active");
      clone.classList.add("overview-clone");
      preview.appendChild(clone);

      var meta = document.createElement("div");
      meta.className = "overview-meta";
      meta.innerHTML = "<span>" + (index + 1) + "</span><span>" + slideMeta.kind + "</span>";

      var title = document.createElement("div");
      title.className = "overview-title";
      title.textContent = slideMeta.title;

      card.appendChild(meta);
      card.appendChild(preview);
      card.appendChild(title);

      card.addEventListener("click", function () {
        setActiveSlide(index);
        toggleOverview(false);
      });

      refs.overviewGrid.appendChild(card);
    });
  }

  function applyOverviewFilter(query) {
    var needle = String(query || "").toLowerCase().trim();
    var cards = Array.prototype.slice.call(refs.overviewGrid.querySelectorAll(".overview-card"));
    var visibleCount = 0;

    cards.forEach(function (card) {
      var haystack = card.getAttribute("data-search") || "";
      var visible = !needle || haystack.indexOf(needle) !== -1;
      card.style.display = visible ? "block" : "none";
      if (visible) {
        visibleCount += 1;
      }
    });

    if (refs.overviewStatus) {
      refs.overviewStatus.textContent = "Showing " + visibleCount + " of " + cards.length;
    }

    var emptyNode = refs.overviewGrid.querySelector(".overview-empty");
    if (visibleCount === 0) {
      if (!emptyNode) {
        emptyNode = document.createElement("div");
        emptyNode.className = "overview-empty";
        emptyNode.textContent = "No slides match this search. Try app name, region, or type.";
        refs.overviewGrid.appendChild(emptyNode);
      }
    } else if (emptyNode) {
      emptyNode.remove();
    }
  }

  function showLoading(message) {
    refs.loadingState.textContent = message;
    refs.loadingState.classList.remove("hidden");
  }

  function hideLoading() {
    refs.loadingState.classList.add("hidden");
  }

  function bindEvents() {
    refs.btnPrev.addEventListener("click", prevSlide);
    refs.btnNext.addEventListener("click", nextSlide);
    refs.btnOverview.addEventListener("click", function () { toggleOverview(); });
    refs.btnPrint.addEventListener("click", function () { window.print(); });
    refs.btnFullscreen.addEventListener("click", toggleFullscreen);
    refs.btnHelp.addEventListener("click", function () { toggleHelp(); });

    refs.overviewSearch.addEventListener("input", function (event) {
      applyOverviewFilter(event.target.value);
    });

    refs.overviewPanel.addEventListener("click", function (event) {
      if (event.target === refs.overviewPanel) {
        toggleOverview(false);
      }
    });

    refs.helpOverlay.addEventListener("click", function (event) {
      if (event.target === refs.helpOverlay) {
        toggleHelp(false);
      }
    });

    window.addEventListener("resize", fitDeck);

    window.addEventListener("hashchange", function () {
      if (state.suppressHash) {
        return;
      }
      var parsed = parseHash();
      if (parsed === null) {
        return;
      }
      setActiveSlide(parsed);
    });

    document.addEventListener("keydown", function (event) {
      var activeTag = document.activeElement ? document.activeElement.tagName : "";
      var isTypingContext = activeTag === "INPUT" || activeTag === "TEXTAREA";

      if (event.key === "Escape") {
        event.preventDefault();
        if (state.help) {
          toggleHelp(false);
          return;
        }
        toggleOverview();
        return;
      }

      if (isTypingContext) {
        return;
      }

      if (state.help || state.overview) {
        if (event.key === "?" || (event.key === "/" && event.shiftKey)) {
          event.preventDefault();
          toggleHelp();
        }
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        nextSlide();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        prevSlide();
      } else if (event.key === "Home") {
        event.preventDefault();
        setActiveSlide(0);
      } else if (event.key === "End") {
        event.preventDefault();
        setActiveSlide(state.slides.length - 1);
      } else if (event.key === "f" || event.key === "F") {
        event.preventDefault();
        toggleFullscreen();
      } else if (event.key === "?" || (event.key === "/" && event.shiftKey)) {
        event.preventDefault();
        toggleHelp();
      }
    });
  }

  function init() {
    cacheDom();
    bindEvents();
    showLoading("Loading benchmark data...");

    BenchmarkData.load().then(function (data) {
      state.data = data;
      var result = BenchmarkRender.render(refs.slidesRoot, data);
      state.slides = result.slides;

      buildOverviewGrid();
      fitDeck();

      var hashIndex = parseHash();
      if (hashIndex !== null) {
        setActiveSlide(hashIndex);
      } else {
        setActiveSlide(0);
      }

      window.BenchmarkDeckSummary = {
        totalSlides: result.totalSlides,
        totalApps: data.summary.totalApps,
        appsByRegion: data.summary.appsByRegion,
        incompleteApps: data.summary.incompleteApps
      };

      console.log("[benchmark-deck] Summary", window.BenchmarkDeckSummary);
      hideLoading();
    }).catch(function (error) {
      console.error(error);
      showLoading("Data failed to load. If opened from file:// and blocked, try a browser that allows local JSON reads.");
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
