import mongoose from "mongoose";

const WatchlistSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  stocks: [{ symbol: String, name: String, price: Number }],
});

export default mongoose.models.Watchlist || mongoose.model("Watchlist", WatchlistSchema);
