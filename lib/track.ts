// Pushes custom events to the GTM dataLayer.
// In GTM: create a "Custom Event" trigger per event name below,
// plus Data Layer Variables for each parameter, then a GA4 Event tag.
//
// Events used on this site
//   project_link_click  { project_name, link_type }      link_type: github | slides | tableau
//   project_open        { project_name, location }       card → detail page
//   contact_click       { channel, location }            channel: email | linkedin | github
//   section_view        { section_name }                 fired once per page load

type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

// GTM's dataLayer remembers values from earlier pushes, so every event
// first resets all parameters. Otherwise contact_click could carry the
// project_name of a project opened earlier.
const PARAM_KEYS = ["project_name", "location", "link_type", "channel", "section_name"];

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  const reset: Params = {};
  PARAM_KEYS.forEach((k) => (reset[k] = undefined));
  window.dataLayer.push({ event, ...reset, ...params });
}
