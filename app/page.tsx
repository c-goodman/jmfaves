import { getEventDetails } from "@/lib/queries";
import { DISCLAIMER_A, DISCLAIMER_B } from "@/lib/constants";

export default async function Home() {
  const { events, lastUpdated } = await getEventDetails();

  return (
    <div className="flex flex-col items-center min-h-screen bg-linear-to-br from-gray-500 via-gray-700 to-black text-white">
      <div className="p-6">
        <h1 className="text-3xl font-bold">
          NHL Favorites (Jersey Mike's Faves)
        </h1>
        <p className="text-sm text-gray-400">Updated Every 30 Minutes</p>
        <p className="text-sm text-gray-400 mb-3">
          Last updated: {new Date(lastUpdated).toLocaleString()}
        </p>

        <div className="max-w-xl">
          {events.map((event, i) => {
            const [team, value] = Object.entries(event)[0];

            return (
              <div
                key={i}
                className="mb-2 shadow-sm p-2 transition hover:shadow-lg backdrop-blur-sm bg-opacity-30 rounded"
              >
                <span className="justify-between flex items-start">
                  <p className="text-lg font-semibold">{team}</p>
                  <p className="text-sm font-thin">
                    {value.odds} / {value.probability}%
                  </p>
                </span>

                {/* Probability bar */}
                <div className="h-1 w-full rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-300 rounded-full transition-all duration-500"
                    style={{ width: `${value.probability}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-sm text-gray-400 mt-6 max-w-xl">
          <span className="font-semibold text-gray-300">How it works:</span>{" "}
          This app pulls publicly available NHL odds data from ESPN's API and
          identifies the favorites for each game. Useful for quickly making
          picks in the Jersey Mike's Shore Points hockey promotion.
        </p>

        <p className="text-sm text-gray-400 mt-4 max-w-xl leading-relaxed">
          <span className="font-semibold text-gray-300">Inspired by:</span>{" "}
          <a
            href="https://jmpicks.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-400"
          >
            jmpicks.vercel.app
          </a>
          , which uses real-time betting market APIs to generate its
          projections. Instead, this app calculates implied probabilities from
          publicly available Vegas-style odds.
        </p>

        <p className="text-xs text-gray-500 mt-4 max-w-xl">
          <span className="text-xs font-semibold text-gray-300">
            Disclaimer:
          </span>{" "}
          {DISCLAIMER_A}
          <a
            href="https://www.espn.com/nhl/odds"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 underline hover:text-blue-400"
          >
            ESPN API v2
          </a>
          {DISCLAIMER_B}
        </p>
      </div>
    </div>
  );
}
