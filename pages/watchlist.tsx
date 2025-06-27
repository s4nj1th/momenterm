"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import WatchlistItem from "../components/Watchlist/WatchlistItem";

interface Stock {
  symbol: string;
  name: string;
  price: number;
}

export default function Watchlist() {
  const { isSignedIn } = useUser();
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Input fields
  const [symbol, setSymbol] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Fetch watchlist
  useEffect(() => {
    if (!isSignedIn) return;

    fetch("/api/watchlist")
      .then((res) => {
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data?.stocks) setWatchlist(data.stocks);
      })
      .catch((err) => {
        console.error("Error fetching watchlist:", err);
        setError("Failed to load watchlist.");
      })
      .finally(() => setIsLoading(false));
  }, [isSignedIn]);

  // Handle adding new stock
  const handleAdd = async () => {
    if (!symbol || !name || !price) return;

    const res = await fetch("/api/watchlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        symbol: symbol.toUpperCase(),
        name,
        price: parseFloat(price),
      }),
    });

    const data = await res.json();

    if (res.ok && data.stocks) {
      setWatchlist(data.stocks);
      setSymbol("");
      setName("");
      setPrice("");
    } else {
      alert("Failed to add stock");
    }
  };

  if (!isSignedIn)
    return <p className="p-6">Please log in to view your watchlist.</p>;
  if (isLoading) return <p className="p-6">Loading your watchlist...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Your Watchlist</h1>

      <div className="mt-4 mb-6 space-y-2">
        <input
          type="text"
          placeholder="Symbol (e.g., INFY)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="px-3 py-2 rounded bg-black border w-full max-w-sm text-white"
        />
        <input
          type="text"
          placeholder="Company Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 rounded bg-black border w-full max-w-sm text-white"
        />
        <input
          type="number"
          placeholder="Current Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="px-3 py-2 rounded bg-black border w-full max-w-sm text-white"
        />
        <button
          className="bg-[var(--accent-lighter)] px-4 py-2 rounded"
          onClick={handleAdd}
        >
          Add to Watchlist
        </button>
      </div>

      {watchlist.length === 0 ? (
        <p>No investments added yet.</p>
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
