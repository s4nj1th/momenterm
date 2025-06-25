"use client";

import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

export default function StockList() {
  const [top, setTop] = useState<Stock[]>([]);
  const [worst, setWorst] = useState<Stock[]>([]);
  const [popular, setPopular] = useState<Stock[]>([]);
  const [added, setAdded] = useState<string | null>(null);

  const [showAll, setShowAll] = useState({
    top: false,
    worst: false,
    popular: false,
  });

  useEffect(() => {
    console.log("📡 Fetching stock data...");
    fetch("/api/polygonstocks")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Stock data received:", data);
        setTop(data.top || []);
        setWorst(data.worst || []);
        setPopular(data.popular || []);
      })
      .catch((err) => {
        console.error("❌ Error fetching stock data:", err);
      });
  }, []);

  const addToWatchlist = async (stock: Stock) => {
    const res = await fetch("/api/watchlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        symbol: stock.symbol,
        name: stock.name,
        price: stock.price,
      }),
    });

    if (res.ok) {
      setAdded(stock.symbol);
      setTimeout(() => setAdded(null), 2000);
    } else {
      alert("Failed to add to watchlist");
    }
  };

  return (
    <div className="space-y-6">
      <StockSection
        title="🔥 Popular Stocks"
        stocks={popular}
        expanded={showAll.popular}
        toggle={() =>
          setShowAll((prev) => ({ ...prev, popular: !prev.popular }))
        }
        addToWatchlist={addToWatchlist}
      />
      <StockSection
        title="🚀 Top Performing"
        stocks={top}
        expanded={showAll.top}
        toggle={() => setShowAll((prev) => ({ ...prev, top: !prev.top }))}
        addToWatchlist={addToWatchlist}
      />
      <StockSection
        title="📉 Worst Performing"
        stocks={worst}
        expanded={showAll.worst}
        toggle={() => setShowAll((prev) => ({ ...prev, worst: !prev.worst }))}
        addToWatchlist={addToWatchlist}
      />

      {added && (
        <p className="text-sm text-green-400">
          ✅ {added} added to your watchlist!
        </p>
      )}
    </div>
  );
}

function StockSection({
  title,
  stocks,
  expanded,
  toggle,
  addToWatchlist,
}: {
  title: string;
  stocks: Stock[];
  expanded: boolean;
  toggle: () => void;
  addToWatchlist: (s: Stock) => void;
}) {
  const visibleStocks = expanded ? stocks.slice(0, 30) : stocks.slice(0, 5);

  return (
    <div className="bg-[var(--secondary-bg)] p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="space-y-2">
        {visibleStocks.map((s) => (
          <div
            key={s.symbol}
            className="flex justify-between items-center border-b border-gray-700 pb-2"
          >
            <div>
              <p className="font-medium">{s.symbol}</p>
              <p className={s.change >= 0 ? "text-green-500" : "text-red-500"}>
                ${s.price.toFixed(2)} ({s.change}%)
              </p>
            </div>
            <button
              className="p-2 rounded hover:bg-[var(--accent-lighter)] transition-all"
              onClick={() => addToWatchlist(s)}
              title="Add to Watchlist"
            >
              <FiPlus />
            </button>
          </div>
        ))}
      </div>
      {stocks.length > 5 && (
        <button
          className="mt-3 text-sm text-[var(--accent-lighter)] underline"
          onClick={toggle}
        >
          {expanded ? "Show Less" : "Show All"}
        </button>
      )}
    </div>
  );
}
