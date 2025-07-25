# 🚀 CRYPTO-TRACKER

A full-stack cryptocurrency dashboard that fetches real-time and historical data from CoinGecko, displays it via beautiful charts, and keeps data synced using a cron job. Built with React, Express, MongoDB, and Node.js.

---

## 📦 Tech Stack

### 🔹 Frontend
- **React.js**
- **Material UI (MUI)**
- **Axios**
- **React Router DOM**
- **Recharts** (or Chart.js)

### 🔹 Backend
- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **Axios**
- **Node-Cron**

### 🔹 Hosting
- **Frontend**: Vercel  
- **Backend**: Render  
- **Database**: MongoDB Atlas

---

## 📁 Folder Structure

/client # React frontend
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
Create a .env file in /server with the following:

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

Fetches top 10 coins from CoinGecko.

Stores price history in MongoDB with timestamps.

Used by charts and dashboard to show trends over time.

🕒 Cron Code Sample (server/cronJob.js):
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
Platform	URL
✅ Frontend	https://crypto-tracker-psi-silk.vercel.app
✅ Backend	https://crypto-api.onrender.com
✅ GitHub	https://github.com/akhilesh-bisht/CRYPTO-TRACKER.git

🧪 API Endpoints
Method	Route	Description
GET	/api/coins	Fetch top 10 cryptocurrencies
GET	/api/coins/:id/history	Fetch historical data for a coin
POST	/api/v1/users/login	User login
POST	/api/v1/users/register	User registration

📸 Screenshots
Include screenshots of:

💻 Dashboard UI

📊 Chart view

📂 MongoDB Sample Data

🕒 Cron Job Output

Place all screenshots inside the /assets folder and reference them like this:

markdown
Copy
Edit
![Dashboard](./assets/dashboard.png)
✅ Final Deliverables
✅ Live Frontend: crypto-tracker.vercel.app

✅ Live Backend: crypto-api.onrender.com

✅ GitHub Repo: GitHub Link

✅ Screenshots in /assets

✅ Cron job with logs in server

✅ Organized folder structure: /client, /server

📃 License
MIT © 2025

🙌 Credits
CoinGecko API

Material UI

Recharts

Chart.js