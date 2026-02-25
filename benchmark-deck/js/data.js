(function () {
  "use strict";

  var DATA_PATH = "data/benchmark.apps.json";
  var UNKNOWN_PATTERN = /(unknown|likely)/i;
  var STORE_DOMAINS = {
    "apps.apple.com": true,
    "play.google.com": true,
    "itunes.apple.com": true,
    "appgallery.huawei.com": true
  };

  function isObject(value) {
    return value && typeof value === "object" && !Array.isArray(value);
  }

  function ensureArray(value) {
    if (!Array.isArray(value)) {
      return [];
    }
    return value.filter(function (item) {
      return typeof item === "string" && item.trim().length > 0;
    });
  }

  function normalizeDomain(value) {
    if (typeof value !== "string") {
      return null;
    }
    var cleaned = value.trim().toLowerCase();
    if (!cleaned) {
      return null;
    }
    cleaned = cleaned.replace(/^https?:\/\//, "");
    cleaned = cleaned.replace(/^www\./, "");
    cleaned = cleaned.split("/")[0];
    return cleaned || null;
  }

  function extractPrimaryDomain(sources) {
    var safe = ensureArray(sources);
    for (var i = 0; i < safe.length; i += 1) {
      var domain = normalizeDomain(safe[i]);
      if (!domain) {
        continue;
      }
      if (STORE_DOMAINS[domain]) {
        continue;
      }
      return domain;
    }
    return null;
  }

  function domainToUrl(domain) {
    var normalized = normalizeDomain(domain);
    if (!normalized) {
      return null;
    }
    return "https://" + normalized;
  }

  function fallbackLogoUrl(domain) {
    var normalized = normalizeDomain(domain);
    if (!normalized) {
      return null;
    }
    return "https://www.google.com/s2/favicons?domain=" + encodeURIComponent(normalized) + "&sz=256";
  }

  function capList(items, min, max, fallbackText) {
    var safe = ensureArray(items).slice(0, max);
    while (safe.length < min) {
      safe.push(fallbackText);
    }
    return safe;
  }

  function parseJson(text) {
    try {
      return JSON.parse(text);
    } catch (error) {
      throw new Error("Invalid benchmark JSON: " + error.message);
    }
  }

  function loadViaFetch() {
    return fetch(DATA_PATH, { cache: "no-store" }).then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP " + response.status);
      }
      return response.text();
    }).then(parseJson);
  }

  function loadViaXhr() {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", DATA_PATH, true);
      xhr.overrideMimeType("application/json");
      xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 0) {
          try {
            resolve(parseJson(xhr.responseText));
          } catch (error) {
            reject(error);
          }
          return;
        }
        reject(new Error("XHR " + xhr.status));
      };
      xhr.onerror = function () {
        reject(new Error("XHR network error"));
      };
      xhr.send();
    });
  }

  function loadEmbedded() {
    if (window.__BENCHMARK_DATA_EMBEDDED) {
      return Promise.resolve(window.__BENCHMARK_DATA_EMBEDDED);
    }
    return Promise.reject(new Error("No embedded benchmark data found"));
  }

  function loadRawData() {
    return loadViaFetch().catch(function () {
      return loadViaXhr();
    }).catch(function () {
      return loadEmbedded();
    });
  }

  function normalizeFeatures(rawFeatures, warnings) {
    var safe = Array.isArray(rawFeatures) ? rawFeatures : [];
    var features = safe.filter(function (feature) {
      return feature && typeof feature.id === "string" && typeof feature.label === "string";
    }).map(function (feature) {
      return {
        id: feature.id,
        label: feature.label
      };
    });

    if (!features.length) {
      warnings.push("matrixFeatures is missing or invalid. Injected default feature set.");
      return [
        { id: "listings", label: "Listings" },
        { id: "map", label: "Map" },
        { id: "advancedFilters", label: "Advanced Filters" },
        { id: "favorites", label: "Favorites / Saved" },
        { id: "priceEstimates", label: "Price Estimates" },
        { id: "areaGuides", label: "Area Guides / Neighborhood Data" },
        { id: "mortgageTools", label: "Mortgage / Rent Tools" },
        { id: "investmentTools", label: "Investment / ROI Tools" },
        { id: "newProjects", label: "New Projects / Developers" },
        { id: "govServices", label: "Gov Housing Services" },
        { id: "aiAssistant", label: "AI Assistant / Chat" }
      ];
    }

    return features;
  }

  function normalizeCoverage(coverage, featureIds) {
    var safe = isObject(coverage) ? coverage : {};
    var out = {};
    featureIds.forEach(function (id) {
      out[id] = Boolean(safe[id]);
    });
    return out;
  }

  function containsUnknown(items) {
    if (typeof items === "string") {
      return UNKNOWN_PATTERN.test(items);
    }
    if (Array.isArray(items)) {
      return items.some(function (value) {
        return typeof value === "string" && UNKNOWN_PATTERN.test(value);
      });
    }
    return false;
  }

  function normalizeApp(rawApp, index, featureIds, warnings) {
    var app = isObject(rawApp) ? rawApp : {};
    var id = typeof app.id === "string" && app.id.trim() ? app.id.trim() : "app-" + (index + 1);
    var name = typeof app.name === "string" && app.name.trim() ? app.name.trim() : "Unknown App " + (index + 1);

    if (!app.id) {
      warnings.push("App at index " + index + " missing id. Assigned " + id + ".");
    }
    if (!app.name) {
      warnings.push("App " + id + " missing name.");
    }

    var region = typeof app.region === "string" && app.region.trim() ? app.region.trim() : "Unknown Region";
    var countries = ensureArray(app.countries);
    if (!countries.length) {
      countries = ["Unknown"];
      warnings.push("App " + id + " missing countries.");
    }

    var safeSources = ensureArray(app.sources);
    if (!safeSources.length) {
      safeSources = ["Unknown"];
    }

    var explicitPrimary = normalizeDomain(app.primaryDomain);
    var sourcePrimary = extractPrimaryDomain(safeSources);
    var primaryDomain = explicitPrimary || sourcePrimary;
    var explicitWebsite = domainToUrl(app.website);
    var website = explicitWebsite || domainToUrl(primaryDomain);
    var explicitLogoPath = app.logo && typeof app.logo.path === "string" && app.logo.path.trim() ? app.logo.path.trim() : null;
    var logoPath = explicitLogoPath || fallbackLogoUrl(primaryDomain);

    var normalized = {
      id: id,
      name: name,
      region: region,
      countries: countries,
      type: typeof app.type === "string" && app.type.trim() ? app.type.trim() : "Unknown Type",
      businessModel: capList(app.businessModel, 2, 4, "Unknown business model"),
      coreFeatures: capList(app.coreFeatures, 5, 8, "Unknown core feature"),
      strengths: capList(app.strengths, 3, 3, "Unknown strength"),
      weaknesses: capList(app.weaknesses, 3, 3, "Unknown weakness"),
      differentiators: capList(app.differentiators, 1, 4, "Unknown differentiator"),
      primaryDomain: primaryDomain,
      website: website,
      sources: safeSources,
      featureCoverage: normalizeCoverage(app.featureCoverage, featureIds),
      tags: ensureArray(app.tags),
      notes: typeof app.notes === "string" ? app.notes : "",
      logo: {
        path: logoPath,
        note: app.logo && typeof app.logo.note === "string" && app.logo.note.trim() ? app.logo.note.trim() : (logoPath ? "Remote logo from primary domain" : "No local logo bundled; fallback badge in deck")
      }
    };

    var incomplete = false;
    if (containsUnknown(normalized.notes) ||
        containsUnknown(normalized.businessModel) ||
        containsUnknown(normalized.coreFeatures) ||
        containsUnknown(normalized.strengths) ||
        containsUnknown(normalized.weaknesses) ||
        normalized.sources[0] === "Unknown" ||
        normalized.countries[0] === "Unknown") {
      incomplete = true;
    }

    normalized.isIncomplete = incomplete;
    return normalized;
  }

  function summarize(data) {
    var byRegion = {};
    var domains = {};
    var incomplete = [];

    data.apps.forEach(function (app) {
      byRegion[app.region] = (byRegion[app.region] || 0) + 1;
      app.sources.forEach(function (domain) {
        if (typeof domain === "string" && domain.trim()) {
          domains[domain.trim().toLowerCase()] = true;
        }
      });
      if (app.isIncomplete) {
        incomplete.push(app.name);
      }
    });

    return {
      totalApps: data.apps.length,
      appsByRegion: byRegion,
      uniqueDomains: Object.keys(domains).sort(),
      incompleteApps: incomplete
    };
  }

  function normalizeData(raw) {
    var warnings = [];
    var safeRaw = isObject(raw) ? raw : {};

    var features = normalizeFeatures(safeRaw.matrixFeatures, warnings);
    var featureIds = features.map(function (feature) { return feature.id; });

    var appsRaw = Array.isArray(safeRaw.apps) ? safeRaw.apps : [];
    var apps = appsRaw.map(function (app, index) {
      return normalizeApp(app, index, featureIds, warnings);
    });

    var data = {
      meta: isObject(safeRaw.meta) ? safeRaw.meta : {},
      matrixFeatures: features,
      apps: apps,
      warnings: warnings
    };

    data.summary = summarize(data);

    if (warnings.length) {
      warnings.forEach(function (warning) {
        console.warn("[benchmark-data]", warning);
      });
    }

    return data;
  }

  function load() {
    return loadRawData().then(normalizeData);
  }

  window.BenchmarkData = {
    load: load,
    normalizeData: normalizeData,
    UNKNOWN_PATTERN: UNKNOWN_PATTERN
  };
})();
