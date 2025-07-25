// routes/coin.routes.js
import express from "express";
import { getCoins, storeHistory, getHistoryByCoin } from "../controllers/coinController.js";
import { apiLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.get("/", apiLimiter, getCoins);
router.post("/history", apiLimiter, storeHistory);
router.get("/history/:coinId", getHistoryByCoin);

export default router;
