import mongoose from 'mongoose';

const currentCoinSchema = new mongoose.Schema({
  coinId: String,
  name: String,
  symbol: String,
  price: Number,
  marketCap: Number,
  change24h: Number,
  lastUpdated: Date,
});

const CurrentCoin = mongoose.model('CurrentCoin', currentCoinSchema);

export default CurrentCoin;
