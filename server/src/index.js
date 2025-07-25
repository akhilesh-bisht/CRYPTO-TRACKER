// server.js
import "./config/env.js";
import app from "./app.js";
import connectDB from "./config/db.js";
import { startCoinHistoryCron } from "./utils/cronJob.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";

const PORT = process.env.PORT || 4000;


app.use("/api", apiLimiter);
const startServer = async () => {
  await connectDB();

  try {
    app.listen(PORT, () => {
      console.log("🚀 Server started at", PORT);
    });

    // Start cron job
    startCoinHistoryCron();
  } catch (error) {
    console.error(`❌ Server Error: ${error}`);
  }
};

startServer();
