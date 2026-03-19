export function parseAndSortDetails(
  details: string[],
): Record<string, Record<string, number>>[] {
  return (
    details
      // Remove any "N/A" entries
      .filter((d) => d !== "N/A")

      // Convert "BOS -142" → { "BOS": -142 }
      .map((d) => {
        const [team, odds] = d.split(" ");
        return {
          [team]: {
            odds: Number(odds),
            // Convert odds to probability percentage
            probability: Math.round(convertOddsToProbability(Number(odds))),
          },
        };
      })

      // Sort by the odds value from lowest to highest
      .sort((a, b) => {
        const valA = Object.values(a)[0].odds;
        const valB = Object.values(b)[0].odds;
        return valA - valB;
      })
  );
}

export function convertOddsToProbability(odds: number): number {
  if (odds > 0) {
    // Positive odds (Underdogs)
    return (100 / (odds + 100)) * 100;
  } else {
    // Negative odds (Favorites)
    return (-odds / (-odds + 100)) * 100;
  }
}
