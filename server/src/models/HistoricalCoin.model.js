import mongoose from 'mongoose';



const historicalCoinSchema = new mongoose.Schema({
  coinId: String,
  name: String,
  symbol: String,
  price: Number,
  marketCap: Number,
  change24h: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const HistoricalCoin = mongoose.model('HistoricalCoin', historicalCoinSchema);

export default HistoricalCoin;
