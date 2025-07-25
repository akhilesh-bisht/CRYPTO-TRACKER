import axios from "axios";

//  Pointing to the live backend
const BASE_URL = "https://crypto-tracker-2vyu.onrender.com/api/coins";

export const getCoins = () => axios.get(`${BASE_URL}`);
export const storeHistory = () => axios.post(`${BASE_URL}/history`);
export const getCoinHistory = (coinId) => axios.get(`${BASE_URL}/history/${coinId}`);
