const STORAGE_KEY = 'myshop-analytics-v1';
const MAX_EVENTS = 200;

const readEvents = () => {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

const writeEvents = (events) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(0, MAX_EVENTS)));
};

export const trackEvent = (name, payload = {}) => {
  if (typeof window === 'undefined') return;
  const event = {
    id: `${name}-${Date.now()}`,
    name,
    payload,
    ts: new Date().toISOString(),
  };

  const events = readEvents();
  writeEvents([event, ...events]);

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...payload });
  }
};

export const trackPageView = (path) => {
  trackEvent('page_view', {
    path,
    title: typeof document !== 'undefined' ? document.title : '',
  });
};
