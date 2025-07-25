import axios from "axios";

const BASE_URL = "http://localhost:5000/api/coins";

export const getCoins = () => axios.get(`${BASE_URL}`);
export const storeHistory = () => axios.post(`${BASE_URL}/history`);
export const getCoinHistory = (coinId) => axios.get(`${BASE_URL}/history/${coinId}`);
