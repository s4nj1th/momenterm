import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Watchlist from "@/models/Watchlist";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();
    const auth = getAuth(req);

    if (!auth || !auth.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = auth.userId;

    if (req.method === "GET") {
      const watchlist = await Watchlist.findOne({ userId }).exec();
      return res.json(watchlist || { stocks: [] });
    }

    if (req.method === "POST") {
      const { symbol, name, price } = req.body;

      if (!symbol || !name || price === undefined) {
        return res.status(400).json({ error: "Missing symbol, name, or price" });
      }

      let watchlist = await Watchlist.findOne({ userId });

      
      if (!watchlist) {
        watchlist = new Watchlist({ userId, stocks: [] });
      }

      const alreadyExists = watchlist.stocks.some((s) => s.symbol === symbol);
      if (!alreadyExists) {
        watchlist.stocks.push({ symbol, name, price });
        await watchlist.save();
      }

      return res.status(200).json({ message: "Stock added", stocks: watchlist.stocks });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
