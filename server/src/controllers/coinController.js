import axios from "axios";
import CurrentCoin from "../models/CurrentCoin.model.js";
import HistoricalCoin from "../models/History.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";


//  * @route GET /api/coins
 
export const getCoins = async (req, res) => {
  try {
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

    await CurrentCoin.deleteMany({});

    await CurrentCoin.insertMany(
      data.map((coin) => ({
        coinId: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        price: coin.current_price,
        marketCap: coin.market_cap,
        change24h: coin.price_change_percentage_24h,
        timestamp: coin.last_updated,
      }))
    );

    return res
      .status(200)
      .json(new ApiResponse(200, "Coins fetched successfully", data));
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError(500, "Failed to fetch coins", [err.message]));
  }
};


//  * @route POST /api/history

export const storeHistory = async (req, res) => {
  try {
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

    const historyRecords = data.map((coin) => ({
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      price: coin.current_price,
      marketCap: coin.market_cap,
      change24h: coin.price_change_percentage_24h,
      timestamp: new Date(),
    }));

    await HistoricalCoin.insertMany(historyRecords);

    return res
      .status(201)
      .json(new ApiResponse(201, "History stored successfully", null));
  } catch (err) {
    // Return a properly structured error response
    return res.status(500).json({
      statusCode: 500,
      message: "Failed to store history",
      success: false,
      errors: [err.message],
      data: null,
    });
  }
};



//  * @route GET /api/history/:coinId

export const getHistoryByCoin = async (req, res) => {
  try {
    const { coinId } = req.params;

    const history = await HistoricalCoin.find({ coinId }).sort({
      timestamp: -1,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "History fetched", history));
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError(500, "Failed to fetch history", [err.message]));
  }
};
