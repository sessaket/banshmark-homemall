(function () {
  "use strict";

  var Templates = window.SlideTemplates;
  var Charts = window.BenchmarkCharts;

  var REGION_ORDER = [
    "Morocco",
    "Arab World / MENA",
    "USA",
    "UK",
    "France",
    "Germany",
    "Spain / Italy / EU",
    "India",
    "China",
    "LatAm / Canada / Australia / Africa"
  ];

  function sourceSample(data, size) {
    return data.summary.uniqueDomains.slice(0, size || 6);
  }

  function appSort(a, b) {
    var ai = REGION_ORDER.indexOf(a.region);
    var bi = REGION_ORDER.indexOf(b.region);
    var regionCmp = (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    if (regionCmp !== 0) {
      return regionCmp;
    }
    return a.name.localeCompare(b.name);
  }

  function score(app, features) {
    return Charts.scoreApp(app, features);
  }

  function genericSlide(config) {
    return Templates.slideShell(config);
  }

  function titleSlide(data) {
    var companyLogoPath = "Tomorrow_Systems_Logo.webp";
    var content = "" +
      "<div class=\"title-center\">" +
      "  <div>" +
      "    <img class=\"title-brand-logo\" src=\"" + companyLogoPath + "\" alt=\"Tomorrow Systems Logo\" />" +
      "    <h1>benchmark homemall</h1>" +
      "    <p>Competitive benchmark deck</p>" +
      "    <div class=\"title-pill\">" + data.summary.totalApps + " platforms \u2022 " + data.summary.uniqueDomains.length + " source domains</div>" +
      "  </div>" +
      "</div>";

    return genericSlide({
      title: "benchmark homemall",
      subtitle: "Competitive benchmark deck",
      tags: ["Benchmark", "Web Deck"],
      content: content,
      sources: sourceSample(data, 6),
      kind: "title",
      searchText: "title benchmark"
    });
  }

  function agendaSlide(data) {
    var content = Templates.listColumns([
      {
        title: "Deck Flow",
        items: [
          "Benchmark scope and scoring rules",
          "Market map by regions and categories",
          "67 competitor deep-dive slides",
          "Comparison matrix and regional patterns",
          "Appendix: source domains and grouped app list"
        ]
      },
      {
        title: "What Is Benchmarked",
        items: [
          "Business model and monetization",
          "Core product features and UX depth",
          "Strengths and structural weaknesses",
          "Feature matrix across 11 capability columns",
          "Coverage across Morocco, MENA, and global markets",
          "Unknown/Likely tags for uncertain facts"
        ]
      }
    ]);

    return genericSlide({
      title: "Agenda",
      subtitle: "Scope and navigation",
      tags: ["Overview"],
      content: content,
      sources: sourceSample(data, 6),
      kind: "agenda",
      searchText: "agenda"
    });
  }

  function marketMapSlide(data) {
    var regionCounts = data.summary.appsByRegion;
    var mapBlocks = REGION_ORDER.map(function (region) {
      var count = regionCounts[region] || 0;
      return "" +
        "<section class=\"region-block\">" +
        "  <h4>" + Templates.escapeHtml(region) + "</h4>" +
        "  <p>Benchmarked apps: " + count + "</p>" +
        "</section>";
    }).join("");

    var content = "" +
      "<div class=\"columns-2\">" +
      "  <section class=\"panel\">" +
      "    <h3>Regions Included</h3>" +
      "    <div class=\"region-grid\">" + mapBlocks + "</div>" +
      "  </section>" +
      "  <section class=\"panel\">" +
      "    <h3>Category Coverage</h3>" +
      Templates.bulletList([
        "Classifieds and horizontal marketplaces",
        "Residential listing portals",
        "Rental-first search and landlord tools",
        "Investment/analytics-led platforms",
        "Commercial property specialists",
        "Government housing and subsidy services"
      ], 8) +
      "    <h3 style=\"margin-top:14px;\">Regional Distribution</h3>" +
      "    <div class=\"chart-area\">" + Charts.regionDistributionChart(data.apps) + "</div>" +
      "  </section>" +
      "</div>";

    return genericSlide({
      title: "Market Map",
      subtitle: "Regions and platform categories covered in the benchmark",
      tags: ["Regions", "Categories"],
      content: content,
      sources: sourceSample(data, 8),
      kind: "market-map",
      searchText: "market map regions categories"
    });
  }

  function matrixSlides(data) {
    var features = data.matrixFeatures;
    var apps = data.apps;

    var slide = genericSlide({
      title: "Comparison Matrix",
      subtitle: "Regional capability table",
      tags: ["Matrix", "Table"],
      content: "" +
        "<section class=\"panel matrix-table-only\" style=\"height:100%;\">" +
        "  <h3>Regional Capability Table</h3>" +
        "  <div class=\"matrix-heat-wrap\">" + Charts.regionMatrix(features, apps) + "</div>" +
        "</section>",
      sources: sourceSample(data, 8),
      kind: "matrix",
      searchText: "matrix regional capability table"
    });

    return [slide];
  }

  function sourceAppendixSlide(data) {
    var sourceItems = data.summary.uniqueDomains.map(function (domain) {
      return "<li>" + Templates.escapeHtml(domain) + "</li>";
    }).join("");

    return genericSlide({
      title: "Appendix: Source Domains",
      subtitle: "Domain-level references used across competitor slides",
      tags: ["Appendix", "Sources"],
      content: "<ol class=\"source-grid\">" + sourceItems + "</ol>",
      sources: sourceSample(data, 10),
      kind: "appendix",
      searchText: "appendix sources domains"
    });
  }

  function appsAppendixSlide(data) {
    var grouped = {};
    data.apps.forEach(function (app) {
      if (!grouped[app.region]) {
        grouped[app.region] = [];
      }
      grouped[app.region].push(app.name);
    });

    var blocks = REGION_ORDER.filter(function (region) {
      return grouped[region] && grouped[region].length;
    }).map(function (region) {
      var names = grouped[region].slice().sort();
      return {
        title: region + " (" + names.length + ")",
        items: names
      };
    });

    var content = "<div class=\"appendix-region-columns\">" + blocks.map(function (block) {
      return "" +
        "<section class=\"appendix-region-item\">" +
        "<h4>" + Templates.escapeHtml(block.title) + "</h4>" +
        "<p>" + Templates.escapeHtml(block.items.join(", ")) + "</p>" +
        "</section>";
    }).join("") + "</div>";

    return genericSlide({
      title: "Appendix: Apps Grouped by Region",
      subtitle: "Complete benchmark universe",
      tags: ["Appendix", "App Universe"],
      content: content,
      sources: sourceSample(data, 8),
      kind: "appendix",
      searchText: "appendix apps by region"
    });
  }

  function renderAllSlides(data) {
    var slides = [];

    slides.push(titleSlide(data));
    slides.push(agendaSlide(data));
    slides.push(marketMapSlide(data));

    matrixSlides(data).forEach(function (slideHtml) {
      slides.push(slideHtml);
    });

    var sortedApps = data.apps.slice().sort(appSort);
    sortedApps.forEach(function (app) {
      var appScore = score(app, data.matrixFeatures);
      slides.push(Templates.appSlide(app, appScore.total, appScore.max));
    });

    slides.push(sourceAppendixSlide(data));
    slides.push(appsAppendixSlide(data));

    return slides;
  }

  function collectSlideMeta(container) {
    return Array.prototype.slice.call(container.querySelectorAll(".slide")).map(function (node, index) {
      var titleNode = node.querySelector(".slide-title");
      return {
        index: index,
        kind: node.getAttribute("data-kind") || "generic",
        title: titleNode ? titleNode.textContent.trim() : "Slide " + (index + 1),
        search: node.getAttribute("data-search") || "",
        sources: node.getAttribute("data-sources") || "",
        element: node
      };
    });
  }

  function stampSlideNumbers(slides) {
    var total = slides.length;
    slides.forEach(function (meta, index) {
      var numberNode = meta.element.querySelector("[data-slide-number]");
      if (numberNode) {
        numberNode.textContent = (index + 1) + " / " + total;
      }
    });
  }

  function render(container, data) {
    var htmlSlides = renderAllSlides(data);
    container.innerHTML = htmlSlides.join("\n");

    var meta = collectSlideMeta(container);
    stampSlideNumbers(meta);

    return {
      slides: meta,
      totalSlides: meta.length,
      summary: data.summary
    };
  }

  window.BenchmarkRender = {
    render: render,
    REGION_ORDER: REGION_ORDER
  };
})();
