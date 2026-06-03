(function () {
  "use strict";

  var SDK_CDN =
    "https://cdn.jsdelivr.net/npm/@encatch/web-sdk@1.3.0/dist/encatch.iife.js";

  var config = window.__ENCATCH_CONFIG__ || {};
  var apiKey = (config.apiKey || "").trim();
  var formId = (config.raiseIssueFormId || "").trim();

  if (!apiKey || !formId) {
    return;
  }

  function start() {
    window._encatch.init(apiKey);

    document.addEventListener(
      "click",
      function (event) {
        var link = event.target.closest("a");
        if (!link) {
          return;
        }

        var label = (link.textContent || "").trim().toLowerCase();
        var href = (link.getAttribute("href") || "").toLowerCase();
        if (label.indexOf("raise issue") === -1 && href.indexOf("/issues/new") === -1) {
          return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();
        window._encatch.showForm(formId);
      },
      true
    );
  }

  if (window._encatch) {
    start();
    return;
  }

  var script = document.createElement("script");
  script.src = SDK_CDN;
  script.async = true;
  script.onload = start;
  document.head.appendChild(script);
})();
