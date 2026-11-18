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

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
