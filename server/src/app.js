import express from 'express'
import cors from 'cors'

const app = express()


// Enable CORS with specific origin and credentials
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

//routes import 

import coinsRouter from './routes/coin.route.js'

// routes declations
app.use('/api/coins', coinsRouter);

export default app;