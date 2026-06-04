(function () {
  var apiKey = "en_VYxbSw6TbZySXeBWmBKW97KgUNTnYjN4xyfqlP5wXzfMJGqEKG7tGhy3PnIVgjMxTJEHhvg6F1d_beb74374";
  var raiseIssueFormId = "encatch_raise_issue";
  var suggestEditFormId = "encatch_suggest_an_edit";
  var helpfulFormId = "helpful_documentation_choice";

  function showHelpfulForm(isHelpful) {
    window._encatch.addToResponse("page_url", window.location.href);
    window._encatch.addToResponse("helpful_question_choice", isHelpful ? "yes" : "no");
    window._encatch.showForm(helpfulFormId);
  }

  function start() {
    window._encatch.init(apiKey);
    document.addEventListener(
      "click",
      function (e) {
        if (e.target.closest("#feedback-thumbs-up")) {
          e.preventDefault();
          e.stopImmediatePropagation();
          showHelpfulForm(true);
          return;
        }

        if (e.target.closest("#feedback-thumbs-down")) {
          e.preventDefault();
          e.stopImmediatePropagation();
          showHelpfulForm(false);
          return;
        }

        var a = e.target.closest("a");
        if (!a) return;

        var href = (a.getAttribute("href") || "").toLowerCase();
        var label = (a.textContent || "").trim().toLowerCase();
        var formId = null;

        if (href.indexOf("/issues/new") !== -1 || label.indexOf("raise issue") !== -1) {
          formId = raiseIssueFormId;
        } else if (
          (href.indexOf("github.com") !== -1 && href.indexOf("/edit/") !== -1) ||
          label.indexOf("suggest edit") !== -1
        ) {
          formId = suggestEditFormId;
        }

        if (!formId) return;

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