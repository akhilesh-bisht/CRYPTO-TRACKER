import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()


// Enable CORS with specific origin and credentials
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

//routes import 

import coinsRouter from './routes/coin.route.js'
import authRoutes from "./routes/user.routes.js";

// routes declations
app.use('/api/coins', coinsRouter);
app.use("/api/auth", authRoutes);



export default app;