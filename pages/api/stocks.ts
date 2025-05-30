// pages/api/stocks.ts
import type { NextApiRequest, NextApiResponse } from "next";

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

const symbols = [
  { symbol: "RELIANCE.NS", name: "Reliance Industries" },
  { symbol: "TCS.NS", name: "Tata Consultancy Services" },
  { symbol: "HDFCBANK.NS", name: "HDFC Bank" },
  { symbol: "INFY.NS", name: "Infosys" },
  { symbol: "ITC.NS", name: "ITC Ltd" },
  { symbol: "ICICIBANK.NS", name: "ICICI Bank" },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!FINNHUB_API_KEY) {
    return res.status(500).json({ error: "Missing FINNHUB_API_KEY" });
  }

  try {
    const data = await Promise.all(
      symbols.map(async ({ symbol, name }) => {
        const result = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
        );
        const json = await result.json();

        return {
          symbol: symbol.replace(".NS", ""), // Clean symbol for display
          name,
          price: json.c,
          change: Number(((json.c - json.pc) / json.pc) * 100).toFixed(2),
        };
      })
    );

    res.status(200).json({ stocks: data });
  } catch (err) {
    console.error("Finnhub fetch error:", err);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
}
