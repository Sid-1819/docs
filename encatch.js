(function () {
  var c = window.__ENCATCH_CONFIG__ || {};
  var apiKey = c.apiKey;
  var formId = c.raiseIssueFormId;
  if (!apiKey || !formId) return;

  function start() {
    window._encatch.init(apiKey);
    document.addEventListener(
      "click",
      function (e) {
        var a = e.target.closest("a");
        if (!a || a.href.indexOf("/issues/new") === -1) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        window._encatch.showForm(formId);
      },
      true
    );
  }

  var s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/@encatch/web-sdk@1.3.0/dist/encatch.iife.js";
  s.onload = start;
  document.head.appendChild(s);
})();
