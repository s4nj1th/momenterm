"use client";

import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi"; // Add icon

export default function StockList() {
  const [stocks, setStocks] = useState<any[]>([]);
  const [added, setAdded] = useState<string | null>(null); // for feedback
  const topPerformers = [...stocks].sort((a, b) => b.change - a.change).slice(0, 3);
    const worstPerformers = [...stocks].sort((a, b) => a.change - b.change).slice(0, 3);
    const popular = stocks.slice(0, 3); // First 3 for now


  useEffect(() => {
    setStocks([
      { symbol: "RELIANCE", name: "Reliance Industries", price: 2950, change: +2.3 },
      { symbol: "TCS", name: "Tata Consultancy Services", price: 3700, change: +1.8 },
      { symbol: "HDFCBANK", name: "HDFC Bank", price: 1580, change: -1.1 },
    ]);
  }, []);

  const addToWatchlist = async (stock: any) => {
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
      setTimeout(() => setAdded(null), 2000); // clear feedback after 2s
    } else {
      alert("Failed to add to watchlist");
    }
  };

  useEffect(() => {
    fetch("/api/stocks")
      .then((res) => res.json())
      .then((data) => {
        if (data?.stocks) {
          // Optional: categorize here
          setStocks(data.stocks);
        }
      })
      .catch((err) => {
        console.error("Error fetching stock data:", err);
      });
  }, []);
  
  return (
    <div className="space-y-6">
      <StockSection title="🔥 Popular Stocks" stocks={stocks.slice(0, 3)} addToWatchlist={addToWatchlist} />
      <StockSection title="🚀 Top Performing" stocks={[...stocks].sort((a, b) => b.change - a.change).slice(0, 3)} addToWatchlist={addToWatchlist} />
      <StockSection title="📉 Worst Performing" stocks={[...stocks].sort((a, b) => a.change - b.change).slice(0, 3)} addToWatchlist={addToWatchlist} />
  
      {added && (
        <p className="text-sm text-green-400">
          ✅ {added} added to your watchlist!
        </p>
      )}
    </div>
  );
  function StockSection({
    title,
    stocks,
    addToWatchlist,
  }: {
    title: string;
    stocks: any[];
    addToWatchlist: (s: any) => void;
  }) {
    return (
      <div className="bg-[var(--secondary-bg)] p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <div className="space-y-2">
          {stocks.map((s) => (
            <div
              key={s.symbol}
              className="flex justify-between items-center border-b border-gray-700 pb-2"
            >
              <div>
                <p className="font-medium">{s.symbol}</p>
                <p className={s.change >= 0 ? "text-green-500" : "text-red-500"}>
                  ₹{s.price} ({s.change}%)
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
      </div>
    );
  }
  
}
