import express from "express";
import { getCoins, storeHistory, getHistoryByCoin } from "../controllers/coinController.js";
import { apiLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

// get coins

router.get("/", apiLimiter, getCoins);

// store history
router.post("/history", apiLimiter, storeHistory);

// get details / :coinID

router.get("/history/:coinId", getHistoryByCoin);

export default router;
