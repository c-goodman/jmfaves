"use server";

import { getCache, setCache } from "./cache";
import { parseAndSortDetails } from "./utils";

export async function getEventDetails(): Promise<{
  events: Record<string, Record<string, number>>[];
  lastUpdated: string;
}> {
  const { cachedEvents, lastFetched } = getCache();

  if (cachedEvents.length > 0) {
    // Return cached data
    return {
      events: cachedEvents,
      lastUpdated: lastFetched!,
    };
  }

  // Get current days events
  const data = await fetch(
    "http://sports.core.api.espn.com/v2/sports/hockey/leagues/nhl/events",
    { next: { revalidate: 1800 } }, // Revalidate every 30 minutes
  ).then((res) => res.json());

  // Extract event IDs
  const eventIds: string[] = data.items.map(
    (item: { $ref: string }) => item.$ref.split("/events/")[1].split("?")[0],
  );

  // Fetch odds object for each eventId and get details string -> ["BOS -142", "NYR -120", ...]
  const details = await Promise.all(
    eventIds.map(async (id) => {
      const oddsData = await fetch(
        `http://sports.core.api.espn.com/v2/sports/hockey/leagues/nhl/events/${id}/competitions/${id}/odds`,
        { next: { revalidate: 1800 } }, // Revalidate every 30 minutes
      ).then((res) => res.json());

      // Return the details string -> "BOS -142"
      return oddsData.items?.[0]?.details ?? "N/A";
    }),
  );

  const parsedDetails = parseAndSortDetails(details);

  // Store in cache
  setCache(parsedDetails);

  return {
    events: parsedDetails,
    lastUpdated: lastFetched!,
  };
}
