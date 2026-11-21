(() => {
  // Set the production GA4 web stream measurement ID to enable collection.
  const measurementId = "";
  if (!/^G-[A-Z0-9]+$/.test(measurementId)) return;

  const eventNames = new Set([
    "diagnosis_cta_click",
    "diagnosis_complete",
    "line_contact_click",
    "support_application_click"
  ]);

  // Only send the path. Existing form URLs may contain business information.
  const pageLocation = location.origin + location.pathname;
  const referrer = document.referrer ? new URL(document.referrer) : null;
  const pageReferrer = referrer ? referrer.origin + referrer.pathname : "";

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }

  gtag("js", new Date());
  gtag("config", measurementId, {
    page_location: pageLocation,
    page_referrer: pageReferrer,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  const tag = document.createElement("script");
  tag.async = true;
  tag.src = "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
  document.head.append(tag);

  function record(eventName) {
    if (eventNames.has(eventName)) gtag("event", eventName);
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-analytics-event]");
    if (link) record(link.dataset.analyticsEvent);
  });

  document.addEventListener("furusapo:diagnosis-complete", () => {
    record("diagnosis_complete");
  }, { once: true });
})();
