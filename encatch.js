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

  function bindRaiseIssueClick(element) {
    if (!element || element.dataset.encatchRaiseIssueBound === "true") {
      return;
    }

    element.dataset.encatchRaiseIssueBound = "true";
    element.addEventListener(
      "click",
      function (event) {
        event.preventDefault();
        event.stopPropagation();
        window._encatch.showForm(raiseIssueFormId);
      },
      true
    );
  }

  function attachRaiseIssueButton() {
    bindRaiseIssueClick(document.getElementById("feedback-raise-issue"));

    var toolbar = document.querySelector("feedback-toolbar");
    if (!toolbar) {
      return;
    }

    var links = toolbar.querySelectorAll("a, button");
    for (var i = 0; i < links.length; i++) {
      var label = (links[i].textContent || "").trim().toLowerCase();
      if (label.indexOf("issue") !== -1) {
        bindRaiseIssueClick(links[i]);
      }
    }
  }

  attachRaiseIssueButton();
  new MutationObserver(attachRaiseIssueButton).observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
