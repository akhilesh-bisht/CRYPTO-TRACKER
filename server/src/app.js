import express from 'express'

const app = express()



import coinsRouter from './routes/coin.route.js'
app.use('/api/coins', coinsRouter);

export default app;