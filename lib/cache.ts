let cachedEvents: any[] = [];
let lastFetched: string | null = null;

export function getCache() {
  return { cachedEvents, lastFetched };
}

export function setCache(events: any[]) {
  cachedEvents = events;
  lastFetched = new Date().toISOString();
}
