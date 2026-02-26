(function () {
  "use strict";

  function scoreApp(app, features) {
    var total = 0;
    var max = features.length;
    features.forEach(function (feature) {
      if (app.featureCoverage && app.featureCoverage[feature.id]) {
        total += 1;
      }
    });
    return { total: total, max: max };
  }

  function percent(value) {
    return Math.round(value * 100);
  }

  function coverageByFeature(features, apps) {
    var count = apps.length || 1;
    return features.map(function (feature) {
      var supported = 0;
      apps.forEach(function (app) {
        if (app.featureCoverage && app.featureCoverage[feature.id]) {
          supported += 1;
        }
      });
      return {
        id: feature.id,
        label: feature.label,
        supported: supported,
        pct: supported / count
      };
    });
  }

  function createFeatureCoverageChart(features, apps) {
    var rows = coverageByFeature(features, apps);
    var barHeight = 24;
    var gap = 10;
    var left = 260;
    var rightPad = 110;
    var top = 18;
    var width = 980;
    var height = top + rows.length * (barHeight + gap) + 18;
    var usable = width - left - rightPad;

    var bars = rows.map(function (row, idx) {
      var y = top + idx * (barHeight + gap);
      var w = Math.max(3, Math.round(usable * row.pct));
      return "" +
        "<text x=\"10\" y=\"" + (y + 16) + "\" font-size=\"12\" fill=\"#374151\">" + row.label + "</text>" +
        "<rect x=\"" + left + "\" y=\"" + y + "\" width=\"" + usable + "\" height=\"" + barHeight + "\" fill=\"#eef2f7\" rx=\"5\" />" +
        "<rect x=\"" + left + "\" y=\"" + y + "\" width=\"" + w + "\" height=\"" + barHeight + "\" fill=\"#2563eb\" rx=\"5\" />" +
        "<text x=\"" + (left + usable + 10) + "\" y=\"" + (y + 16) + "\" font-size=\"12\" fill=\"#1f2937\">" + percent(row.pct / 1) + "%</text>";
    }).join("");

    return "<svg viewBox=\"0 0 " + width + " " + height + "\" width=\"100%\" height=\"100%\" role=\"img\" aria-label=\"Feature coverage chart\">" + bars + "</svg>";
  }

  function createTopPlatformsTable(apps, features, limit) {
    var ranked = apps.map(function (app) {
      var score = scoreApp(app, features);
      return {
        name: app.name,
        region: app.region,
        score: score.total,
        max: score.max
      };
    }).sort(function (a, b) {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.name.localeCompare(b.name);
    }).slice(0, limit || 15);

    var rows = ranked.map(function (row, index) {
      return "<tr><td>" + (index + 1) + "</td><td>" + row.name + "</td><td>" + row.region + "</td><td>" + row.score + "/" + row.max + "</td></tr>";
    }).join("");

    return "" +
      "<table class=\"rank-table\">" +
      "<thead><tr><th>#</th><th>Platform</th><th>Region</th><th>Score</th></tr></thead>" +
      "<tbody>" + rows + "</tbody>" +
      "</table>";
  }

  function regionMatrix(features, apps) {
    var grouped = {};
    apps.forEach(function (app) {
      if (!grouped[app.region]) {
        grouped[app.region] = [];
      }
      grouped[app.region].push(app);
    });

    var regions = Object.keys(grouped).sort();
    var header = "<tr><th>Region</th>" + features.map(function (feature) {
      return "<th>" + feature.label.replace(" / ", "<br/>") + "</th>";
    }).join("") + "</tr>";

    var rows = regions.map(function (region) {
      var localApps = grouped[region];
      var cells = features.map(function (feature) {
        var hits = 0;
        localApps.forEach(function (app) {
          if (app.featureCoverage && app.featureCoverage[feature.id]) {
            hits += 1;
          }
        });
        var ratio = hits / localApps.length;
        var level = ratio >= 0.66 ? "high" : (ratio >= 0.33 ? "mid" : "low");
        return "<td data-level=\"" + level + "\">" + percent(ratio) + "%</td>";
      }).join("");
      return "<tr><th>" + region + "</th>" + cells + "</tr>";
    }).join("");

    return "<table class=\"heat-table\"><thead>" + header + "</thead><tbody>" + rows + "</tbody></table>";
  }

  function regionDistributionChart(apps) {
    var totals = {};
    apps.forEach(function (app) {
      totals[app.region] = (totals[app.region] || 0) + 1;
    });

    var rows = Object.keys(totals).sort().map(function (region) {
      return { region: region, count: totals[region] };
    });

    var max = rows.reduce(function (best, row) {
      return Math.max(best, row.count);
    }, 1);

    var barHeight = 25;
    var gap = 9;
    var left = 270;
    var rightPad = 90;
    var width = 900;
    var height = 20 + rows.length * (barHeight + gap) + 10;
    var usable = width - left - rightPad;

    var bars = rows.map(function (row, index) {
      var y = 15 + index * (barHeight + gap);
      var w = Math.round((row.count / max) * usable);
      return "" +
        "<text x=\"8\" y=\"" + (y + 17) + "\" font-size=\"12\" fill=\"#374151\">" + row.region + "</text>" +
        "<rect x=\"" + left + "\" y=\"" + y + "\" width=\"" + usable + "\" height=\"" + barHeight + "\" fill=\"#eef2f7\" rx=\"5\" />" +
        "<rect x=\"" + left + "\" y=\"" + y + "\" width=\"" + w + "\" height=\"" + barHeight + "\" fill=\"#0ea5e9\" rx=\"5\" />" +
        "<text x=\"" + (left + usable + 10) + "\" y=\"" + (y + 17) + "\" font-size=\"12\" fill=\"#1f2937\">" + row.count + "</text>";
    }).join("");

    return "<svg viewBox=\"0 0 " + width + " " + height + "\" width=\"100%\" height=\"100%\" role=\"img\" aria-label=\"Regional distribution chart\">" + bars + "</svg>";
  }

  function featureValue(app, key) {
    return Boolean(app && app.featureCoverage && app.featureCoverage[key]);
  }

  function groupRatio(app, keys) {
    if (!keys.length) {
      return 0;
    }
    var hits = 0;
    keys.forEach(function (key) {
      if (featureValue(app, key)) {
        hits += 1;
      }
    });
    return hits / keys.length;
  }

  function pointLerp(a, b, t) {
    return {
      x: a.x + ((b.x - a.x) * t),
      y: a.y + ((b.y - a.y) * t)
    };
  }

  function toPoints(points) {
    return points.map(function (point) {
      return point.x.toFixed(1) + "," + point.y.toFixed(1);
    }).join(" ");
  }

  function createAppCapabilityDiagram(app) {
    var discovery = groupRatio(app, ["listings", "map", "advancedFilters", "favorites"]);
    var decision = groupRatio(app, ["priceEstimates", "areaGuides", "mortgageTools", "investmentTools", "aiAssistant"]);
    var supply = groupRatio(app, ["newProjects", "govServices"]);
    var values = [discovery, decision, supply];

    var width = 360;
    var height = 182;
    var center = { x: 180, y: 104 };
    var vertices = [
      { x: 180, y: 22 },   // Discovery
      { x: 62, y: 154 },   // Decision
      { x: 298, y: 154 }   // Supply/Gov
    ];

    var gridLevels = [0.25, 0.5, 0.75, 1];
    var grid = gridLevels.map(function (level) {
      return "<polygon points=\"" + toPoints(vertices.map(function (vertex) {
        return pointLerp(center, vertex, level);
      })) + "\" fill=\"none\" stroke=\"#cbd5e1\" stroke-width=\"1\" />";
    }).join("");

    var axis = vertices.map(function (vertex) {
      return "<line x1=\"" + center.x + "\" y1=\"" + center.y + "\" x2=\"" + vertex.x + "\" y2=\"" + vertex.y + "\" stroke=\"#dbe5f2\" stroke-width=\"1.2\" />";
    }).join("");

    var valuePoints = vertices.map(function (vertex, index) {
      var t = Math.max(0.1, values[index]);
      return pointLerp(center, vertex, t);
    });

    var valuePolygon = "<polygon points=\"" + toPoints(valuePoints) + "\" fill=\"rgba(37,99,235,0.26)\" stroke=\"#1d4ed8\" stroke-width=\"2\" />";
    var valueNodes = valuePoints.map(function (point) {
      return "<circle cx=\"" + point.x.toFixed(1) + "\" cy=\"" + point.y.toFixed(1) + "\" r=\"4\" fill=\"#1d4ed8\" />";
    }).join("");

    var labels = "" +
      "<text x=\"180\" y=\"16\" text-anchor=\"middle\" font-size=\"11\" fill=\"#0f3f70\">Discovery " + percent(discovery) + "%</text>" +
      "<text x=\"40\" y=\"168\" text-anchor=\"start\" font-size=\"11\" fill=\"#0f766e\">Decision " + percent(decision) + "%</text>" +
      "<text x=\"320\" y=\"168\" text-anchor=\"end\" font-size=\"11\" fill=\"#9a3412\">Supply " + percent(supply) + "%</text>";

    return "" +
      "<svg viewBox=\"0 0 " + width + " " + height + "\" width=\"100%\" height=\"100%\" role=\"img\" aria-label=\"Capability triangle diagram\">" +
      "  <rect x=\"1\" y=\"1\" width=\"" + (width - 2) + "\" height=\"" + (height - 2) + "\" rx=\"10\" fill=\"url(#capBg)\" stroke=\"#d8e2f1\" />" +
      "  <defs>" +
      "    <linearGradient id=\"capBg\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">" +
      "      <stop offset=\"0%\" stop-color=\"#f8fbff\"/>" +
      "      <stop offset=\"55%\" stop-color=\"#eef6ff\"/>" +
      "      <stop offset=\"100%\" stop-color=\"#f7fffd\"/>" +
      "    </linearGradient>" +
      "  </defs>" +
      axis +
      grid +
      valuePolygon +
      valueNodes +
      labels +
      "</svg>";
  }

  window.BenchmarkCharts = {
    scoreApp: scoreApp,
    coverageByFeature: coverageByFeature,
    createFeatureCoverageChart: createFeatureCoverageChart,
    createTopPlatformsTable: createTopPlatformsTable,
    regionMatrix: regionMatrix,
    regionDistributionChart: regionDistributionChart,
    createAppCapabilityDiagram: createAppCapabilityDiagram
  };
})();
