(function () {
  "use strict";

  var iconPaths = {
    business: "assets/icons/business.svg",
    features: "assets/icons/features.svg",
    strengths: "assets/icons/strengths.svg",
    weaknesses: "assets/icons/weaknesses.svg"
  };

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function initials(name) {
    if (!name) {
      return "NA";
    }
    var cleaned = String(name).replace(/\([^)]*\)/g, "").trim();
    var parts = cleaned.split(/\s+/).filter(Boolean);
    if (!parts.length) {
      return "NA";
    }
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  function bulletList(items, maxItems) {
    var safeItems = Array.isArray(items) ? items.slice(0, maxItems || 8) : [];
    if (!safeItems.length) {
      safeItems = ["Unknown"];
    }
    return "<ul class=\"bullet-list\">" + safeItems.map(function (item) {
      return "<li>" + escapeHtml(item) + "</li>";
    }).join("") + "</ul>";
  }

  function tagList(tags) {
    var safeTags = Array.isArray(tags) ? tags : [];
    if (!safeTags.length) {
      return "";
    }
    return "<div class=\"tag-list\">" + safeTags.map(function (tag) {
      return "<span class=\"tag\">" + escapeHtml(tag) + "</span>";
    }).join("") + "</div>";
  }

  function normalizeSources(sources) {
    if (!Array.isArray(sources) || !sources.length) {
      return "Unknown";
    }
    return sources.join(" \u2022 ");
  }

  function slideShell(config) {
    var title = config.title || "Untitled";
    var subtitle = config.subtitle || "";
    var tags = config.tags || [];
    var content = config.content || "";
    var sources = normalizeSources(config.sources || []);
    var kind = config.kind || "generic";
    var searchText = config.searchText || title;

    return "" +
      "<section class=\"slide\" data-kind=\"" + escapeHtml(kind) + "\" data-search=\"" + escapeHtml(searchText.toLowerCase()) + "\">" +
      "  <header class=\"slide-header\">" +
      "    <div class=\"slide-heading\">" +
      "      <h2 class=\"slide-title\">" + escapeHtml(title) + "</h2>" +
      "      <p class=\"slide-subtitle\">" + escapeHtml(subtitle) + "</p>" +
      "    </div>" +
           tagList(tags) +
      "  </header>" +
      "  <div class=\"slide-content\">" + content + "</div>" +
      "  <footer class=\"slide-footer\">" +
      "    <span class=\"footer-sources\">Sources: " + escapeHtml(sources) + "</span>" +
      "    <span class=\"footer-number\" data-slide-number></span>" +
      "  </footer>" +
      "</section>";
  }

  function card(title, iconPath, items, maxItems) {
    return "" +
      "<article class=\"card\">" +
      "  <div class=\"card-head\">" +
      "    <img src=\"" + escapeHtml(iconPath) + "\" alt=\"\" />" +
      "    <h4>" + escapeHtml(title) + "</h4>" +
      "  </div>" +
         bulletList(items, maxItems) +
      "</article>";
  }

  function appSlide(app, score, maxScore) {
    var countries = Array.isArray(app.countries) ? app.countries.join("/") : "Unknown";
    var tags = [app.region || "Unknown", countries, app.type || "Unknown"];
    var logoHtml;
    var website = typeof app.website === "string" ? app.website : "";
    var websiteLabel = app.primaryDomain || website.replace(/^https?:\/\//, "");

    if (app.logo && app.logo.path) {
      logoHtml = "<img src=\"" + escapeHtml(app.logo.path) + "\" alt=\"" + escapeHtml(app.name) + " logo\" />";
    } else {
      logoHtml = "<div class=\"fallback-badge\">" + escapeHtml(initials(app.name)) + "</div>";
    }

    var noteText = app.notes ? "<div class=\"logo-note\">" + escapeHtml(app.notes) + "</div>" : "<div class=\"logo-note\">" + escapeHtml((app.logo && app.logo.note) || "Logo fallback badge is used in this deck.") + "</div>";
    var websiteAction = website ?
      "<a class=\"website-btn\" href=\"" + escapeHtml(website) + "\" target=\"_blank\" rel=\"noopener noreferrer\">Visit Website</a><div class=\"website-domain\">" + escapeHtml(websiteLabel) + "</div>" :
      "<div class=\"website-domain\">Website: Unknown</div>";

    var content = "" +
      "<div class=\"app-layout\">" +
      "  <aside class=\"logo-panel\">" +
      "    <div class=\"logo-holder\">" + logoHtml + "</div>" +
           websiteAction +
           noteText +
      "  </aside>" +
      "  <section class=\"cards-grid\">" +
           card("Business Model", iconPaths.business, app.businessModel, 4) +
           card("Core Features", iconPaths.features, app.coreFeatures, 8) +
           card("Strengths", iconPaths.strengths, app.strengths, 3) +
           card("Weaknesses", iconPaths.weaknesses, app.weaknesses, 3) +
      "  </section>" +
      "</div>";

    return slideShell({
      title: app.name,
      subtitle: "Competitive snapshot",
      tags: tags,
      content: content,
      sources: app.sources,
      kind: "app",
      searchText: [app.name, app.region, app.type, countries].join(" ")
    });
  }

  function listColumns(blocks) {
    return "<div class=\"columns-2\">" + blocks.map(function (block) {
      return "<div class=\"panel\"><h3>" + escapeHtml(block.title) + "</h3>" + bulletList(block.items, 10) + "</div>";
    }).join("") + "</div>";
  }

  window.SlideTemplates = {
    escapeHtml: escapeHtml,
    slideShell: slideShell,
    appSlide: appSlide,
    bulletList: bulletList,
    listColumns: listColumns,
    normalizeSources: normalizeSources
  };
})();
