// Vendored @encatch/web-sdk stub (IIFE). Includes pauseSession, resumeSession, stopSession.
!function(e){Object.defineProperties(e,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});var t="encatch-sdk-script";var n=!1,i=!1,r=null;function o(e){return i?Promise.resolve():r?Promise.reject(r):n?new Promise((e,t)=>{const n=setInterval(()=>{i?(clearInterval(n),e()):r&&(clearInterval(n),t(r))},50)}):(n=!0,new Promise((o,s)=>{if(document.getElementById(t))return n=!1,i=!0,void o();const a=(e.webHost||"https://app.encatch.com")+"/s/sdk/v1/encatch.js?dt="+function(){const e=new Date,t=String(e.getUTCFullYear()).slice(-2),n=String(e.getUTCMonth()+1).padStart(2,"0"),i=String(e.getUTCDate()).padStart(2,"0"),r=String(e.getUTCHours()).padStart(2,"0"),o=30*Math.floor(e.getUTCMinutes()/30);return`${t}${n}${i}${r}${String(o).padStart(2,"0")}`}(),c=document.createElement("script");c.id=t,c.src=a,c.type="module",c.async=!0,c.onload=()=>{n=!1,i=!0,o()},c.onerror=e=>{n=!1,r=new Error(`[Encatch] Failed to load SDK from ${a}. Please check your network connection and web host configuration.`),console.error(r.message,e),s(r)};const l=document.getElementsByTagName("script")[0];l&&l.parentNode?l.parentNode.insertBefore(c,l):document.head.appendChild(c)}))}function s(e,t){return function(...n){e.push([t,...n])}}var a=["init","identifyUser","setLocale","setCountry","setTheme","trackEvent","trackScreen","startSession","pauseSession","resumeSession","stopSession","resetUser","showForm","dismissForm","addToResponse","submitForm","emitEvent","clearAll","addSourceTracking"];function c(){const e=[],t=[],n={_q:e,_eventCallbacks:t,_initialized:!1,_apiKey:null,_config:{},init(t,i){n._initialized?console.warn("[Encatch] SDK already initialized. Ignoring init call."):(n._apiKey=t,n._config=i||{},n._initialized=!0,e.push(["init",t,i]),"undefined"!=typeof window&&"undefined"!=typeof document&&o(n._config).catch(e=>{console.error("[Encatch] Failed to initialize SDK:",e)}))},on:e=>(t.push(e),()=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)}),identifyUser:()=>{},setLocale:()=>{},setCountry:()=>{},setTheme:()=>{},trackEvent:()=>{},trackScreen:()=>{},startSession:()=>{},pauseSession:()=>{},resumeSession:()=>{},stopSession:()=>{},resetUser:()=>{},showForm:()=>{},dismissForm:()=>{},addToResponse:()=>{},submitForm:()=>{},emitEvent:()=>{},refineText:()=>Promise.resolve({}),qnaWithAi:()=>Promise.resolve({answer:""}),streamQnaWithAi:()=>Promise.resolve(),uploadFile:()=>Promise.reject(new Error("[Encatch] uploadFile is not available before SDK initialization")),clearAll:()=>{},addSourceTracking:()=>{}},i=a.filter(e=>"init"!==e);for(const r of i)n[r]=s(e,r);return n}var l=function(){if("undefined"!=typeof window){const e=window._encatch;if(e&&Array.isArray(e._q)){const t=c();return t._q.push(...e._q),Array.isArray(e._eventCallbacks)&&t._eventCallbacks.push(...e._eventCallbacks),e._initialized&&(t._initialized=e._initialized,t._apiKey=e._apiKey,t._config=e._config||{}),window._encatch=t,t}const t=c();return window._encatch=t,t}return c()}();e._encatch=l,e.default=l}(this._encatch=this._encatch||{});

(function () {
  "use strict";

  var config = window.__ENCATCH_CONFIG__ || {};
  var apiKey = (config.apiKey || "").trim();
  var raiseIssueFormId = (config.raiseIssueFormId || config.feedbackFormId || "").trim();

  if (!apiKey || !raiseIssueFormId) {
    return;
  }

  window._encatch.init(apiKey);

  function openRaiseIssueForm() {
    window._encatch.showForm(raiseIssueFormId);
  }

  function getFeedbackArea() {
    var thumbsUp = document.getElementById("feedback-thumbs-up");
    if (!thumbsUp) {
      return null;
    }

    var pagination = document.getElementById("pagination");
    if (pagination && pagination.previousElementSibling && pagination.previousElementSibling.contains(thumbsUp)) {
      return pagination.previousElementSibling;
    }

    return (
      thumbsUp.closest("feedback-toolbar") ||
      thumbsUp.closest(".feedback-toolbar") ||
      thumbsUp.parentElement
    );
  }

  function isRaiseIssueControl(element) {
    if (!element || !(element instanceof Element)) {
      return false;
    }

    var control = element.closest("a, button");
    if (!control) {
      return false;
    }

    var feedbackArea = getFeedbackArea();
    if (!feedbackArea || !feedbackArea.contains(control)) {
      return false;
    }

    var label = (control.textContent || "").trim().toLowerCase();
    var href = (control.getAttribute("href") || "").trim().toLowerCase();

    return label.indexOf("raise issue") !== -1 || href.indexOf("/issues/new") !== -1;
  }

  function blockRaiseIssueNavigation(event) {
    if (!isRaiseIssueControl(event.target)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openRaiseIssueForm();
  }

  function neutralizeRaiseIssueLinks() {
    var feedbackArea = getFeedbackArea();
    if (!feedbackArea) {
      return;
    }

    var links = feedbackArea.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var label = (link.textContent || "").trim().toLowerCase();
      var href = (link.getAttribute("href") || "").trim().toLowerCase();

      if (label.indexOf("raise issue") === -1 && href.indexOf("/issues/new") === -1) {
        continue;
      }

      link.removeAttribute("target");
      link.setAttribute("href", "#");
      link.dataset.encatchRaiseIssueBound = "true";
    }
  }

  document.addEventListener("click", blockRaiseIssueNavigation, true);
  document.addEventListener("pointerdown", blockRaiseIssueNavigation, true);

  neutralizeRaiseIssueLinks();
  new MutationObserver(neutralizeRaiseIssueLinks).observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
