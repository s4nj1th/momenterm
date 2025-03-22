import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect"; // Ensure dbConnect.ts exists in lib folder
import Watchlist from "@/models/Watchlist";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect(); // Connect to MongoDB
    const { userId } = getAuth(req); // Get authenticated user

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.method === "GET") {
      const watchlist = await Watchlist.findOne({ userId });
      return res.json(watchlist || { stocks: [] });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
