# CRYPTO-TRACKER
# Crypto Dashboard

A full-stack cryptocurrency tracking dashboard that fetches real-time data from CoinGecko and displays interactive charts using React and Express.

---

## 📦 Tech Stack

### 🔹 Frontend
- React.js
- Material UI (MUI)
- Axios
- React Router
- Recharts (or Chart.js)

### 🔹 Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Axios
- Node-Cron

### 🔹 Hosting
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📁 Folder Structure

/frontend # React frontend
/server # Express backend

yaml
Copy
Edit

---

## 🛠️ Setup & Installation

### 🔧 Backend Setup (`/server`)

```bash
cd server
npm install
npm run dev
Create a .env file in /server with:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_uri
COINGECKO_API=https://api.coingecko.com/api/v3
🌐 Frontend Setup (/client)
bash
Copy
Edit
cd client
npm install
npm start
Create a .env file in /client with:

ini
Copy
Edit
REACT_APP_API_URL=https://your-backend-url/api
🔁 Cron Job (Price Sync)
Runs every 30 minutes using node-cron.

Calls CoinGecko API to fetch top 10 coins.

Stores data in MongoDB with timestamps.

This data is used to populate the dashboard and charts.

🕒 Code Example (server/cronJob.js):
js
Copy
Edit
const cron = require("node-cron");
const fetchCoins = require("./controllers/fetchCoins");

cron.schedule("*/30 * * * *", async () => {
  console.log("⏱️  Running coin fetch job...");
  await fetchCoins();
});
🚀 Deployed Links
Frontend (Vercel): https://crypto-dashboard.vercel.app

Backend (Render): https://crypto-tracker-2vyu.onrender.com

🧪 API Endpoints
Method	Route	Description
GET	/api/coins	Fetch top 10 coins
GET	/api/coins/:id/history	Fetch historical data for a coin

📸 Screenshots
💻 Dashboard UI

📂 MongoDB Sample Data

🕒 Cron Job Output

✅ Final Deliverables
✅ Live Frontend: https://crypto-dashboard.vercel.app

✅ Live Backend: https://crypto-api.onrender.com

✅ GitHub: https://github.com/yourusername/crypto-dashboard

✅ Screenshots in /assets

✅ Cron job included in backend with logs

✅ Proper folder structure: /client, /server

📃 License
MIT © 2025

🙌 Credits
CoinGecko API

Chart.js / Recharts

Material UI

yaml
Copy
Edit

---

✅ You can now save this as `README.md` in your repo root.  
Need a downloadable file version or help uploading screenshots to `/assets`?