import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect"; // Ensure this exists
import Watchlist from "@/models/Watchlist";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("📡 Connecting to MongoDB...");
    await dbConnect(); // Connect to MongoDB
    console.log("✅ Connected to MongoDB");

    const auth = getAuth(req);
    console.log("🔑 Clerk Auth Data:", auth);

    if (!auth || !auth.userId) {
      console.error("❌ No user found in request");
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = auth.userId;
    console.log("👤 User ID:", userId);

    if (req.method === "GET") {
      console.log("🔎 Fetching watchlist for user:", userId);
      const watchlist = await Watchlist.findOne({ userId }).exec();
      console.log("📊 Watchlist Data:", watchlist);
      return res.json(watchlist || { stocks: [] });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("🚨 API Error:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
