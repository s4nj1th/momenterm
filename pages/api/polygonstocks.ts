// pages/api/tiingostocks.ts

import type { NextApiRequest, NextApiResponse } from "next";

// Helper: Get yesterday's date (for daily data)
function getYesterday(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
}

// Helper: Sleep function for rate limiting
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const API_KEY = process.env.TIINGO_API_KEY;
  
  if (!API_KEY) {
    console.error("❌ TIINGO_API_KEY not found in environment variables");
    return res.status(500).json({ error: "Tiingo API key not set" });
  }

  console.log("🔑 Tiingo API Key found:", API_KEY.substring(0, 8) + "...");

  try {
    // Step 1: Get a diverse set of popular tickers
    const popularTickers = [
      'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX',
      'JPM', 'BAC', 'WFC', 'GS', 'JNJ', 'PFE', 'UNH', 'ABBV',
      'WMT', 'PG', 'KO', 'PEP', 'XOM', 'CVX', 'BA', 'CAT',
      'AAL', 'DAL', 'UAL', 'HD', 'TGT', 'COST', 'GME', 'AMC',
      'COIN', 'SPG', 'NEE', 'AMD', 'INTC', 'GILD', 'BIIB', 'DIS',
      'V', 'MA', 'PYPL', 'SQ', 'ROKU', 'ZM', 'UBER', 'LYFT'
    ];

    console.log(`🚀 Fetching data for ${popularTickers.length} tickers individually...`);

    // Step 2: Get yesterday's date for daily data
    const yesterday = getYesterday();
    console.log(`📆 Using date: ${yesterday}`);

    // Step 3: Fetch data for each ticker individually
    const allStockData: Array<{
      symbol: string;
      name: string;
      price: number;
      change: number;
      volume: number;
    }> = [];

    for (let i = 0; i < popularTickers.length; i++) {
      const ticker = popularTickers[i];
      
      try {
        console.log(`📊 Processing ${ticker} (${i + 1}/${popularTickers.length})...`);
        
        // Fetch individual ticker data - CORRECT Tiingo API usage
        const url = `https://api.tiingo.com/tiingo/daily/${ticker}/prices?startDate=${yesterday}&endDate=${yesterday}&token=${API_KEY}`;
        
        const response = await fetch(url);
        const data = await response.json();

        // Check if we got valid data
        if (Array.isArray(data) && data.length > 0) {
          const stockData = data[0]; // Get the first day's data
          
          if (stockData && stockData.close && stockData.open && stockData.volume) {
            const change = ((stockData.close - stockData.open) / stockData.open) * 100;
            
            allStockData.push({
              symbol: ticker,
              name: ticker, // Tiingo doesn't return company names in this endpoint
              price: stockData.close,
              change: Number(change.toFixed(2)),
              volume: stockData.volume
            });
            
            console.log(`✅ ${ticker}: ${change.toFixed(2)}% change, $${stockData.close}, vol: ${stockData.volume}`);
          } else {
            console.warn(`⚠️ Invalid data structure for ${ticker}:`, stockData);
          }
        } else {
          console.warn(`⚠️ No data returned for ${ticker}:`, data);
        }

        // Small delay to be respectful to API (Tiingo allows 1000/hour = ~3 per second)
        await sleep(350); // 350ms delay = ~3 requests per second

      } catch (err) {
        console.error(`❌ Error processing ${ticker}:`, err);
      }
    }

    console.log(`📊 Total valid results: ${allStockData.length}`);

    if (allStockData.length === 0) {
      return res.status(500).json({ error: "No valid stock data retrieved from Tiingo" });
    }

    // Step 4: Sort into categories
    const top = [...allStockData]
      .sort((a, b) => b.change - a.change)
      .slice(0, 30);
    
    const worst = [...allStockData]
      .sort((a, b) => a.change - b.change)
      .slice(0, 30);
    
    const popular = [...allStockData]
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 30);

    console.log("🎯 Final results:", { 
      topCount: top.length, 
      worstCount: worst.length, 
      popularCount: popular.length,
      topSymbols: top.slice(0, 5).map(s => `${s.symbol}(${s.change}%)`),
      worstSymbols: worst.slice(0, 5).map(s => `${s.symbol}(${s.change}%)`),
      popularSymbols: popular.slice(0, 5).map(s => `${s.symbol}(${s.volume})`)
    });

    return res.status(200).json({ 
      top, 
      worst, 
      popular,
      metadata: {
        totalProcessed: allStockData.length,
        date: yesterday,
        timestamp: new Date().toISOString()
      }
    });

  } catch (err) {
    console.error("❌ Tiingo API error:", err);
    return res.status(500).json({ error: "Internal Server Error", detail: err.message });
  }
}
