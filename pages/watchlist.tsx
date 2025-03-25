"use client"; // Ensure this runs only on the client

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import WatchlistItem from "../components/Watchlist/WatchlistItem";

interface Stock {
  symbol: string;
  name: string;
  price: number;
}

export default function Watchlist() {
  const { isSignedIn, user } = useUser();
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSignedIn) return; // Don't fetch if user is not signed in

    fetch("/api/watchlist")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data?.stocks) {
          setWatchlist(data.stocks);
        }
      })
      .catch((err) => {
        console.error("Error fetching watchlist:", err);
        setError("Failed to load watchlist.");
      })
      .finally(() => setIsLoading(false));
  }, [isSignedIn]);

  if (!isSignedIn) return <p className="p-6">Please log in to view your watchlist.</p>;
  if (isLoading) return <p className="p-6">Loading your watchlist...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Your Watchlist</h1>
      {watchlist.length === 0 ? (
        <p className="mt-4">No investments added yet.</p>
      ) : (
        <div className="grid gap-4 mt-6">
          {watchlist.map((stock) =>
            stock.symbol ? (
              <WatchlistItem key={stock.symbol} stock={stock} />
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
