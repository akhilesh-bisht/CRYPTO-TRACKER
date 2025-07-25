import cron from "node-cron";
import axios from "axios";
import HistoricalCoin from "../models/historicalCoin.model.js";

export const startCoinHistoryCron = () => {
  // Runs every 1 minute for testing
  cron.schedule("* * * * *", async () => {
    try {
      console.log("⏱️ Running coin history sync...");

      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
          },
        }
      );

      const records = data.map((coin) => ({
        coinId: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        price: coin.current_price,
        marketCap: coin.market_cap,
        change24h: coin.price_change_percentage_24h,
        timestamp: new Date(),
      }));

      await HistoricalCoin.insertMany(records);
      console.log("✅ Coin history stored successfully");
    } catch (err) {
      console.error("❌ Cron job error:", err.message);
    }
  });
};
