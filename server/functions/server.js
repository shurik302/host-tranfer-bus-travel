require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const serverless = require('serverless-http');

const router = require('./router/index');
const ticketsRouter = require('./router/ticketRoutes');
const paymentRouter = require('./router/paymentRoutes');
const errorMiddleware = require('./middlewares/error-middleware');
const flightRoutes = require('./router/flightRoutes');
const cityRoutes = require('./router/cityRoutes');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:3001'],
}));

app.use("/api", router);
app.use('/api', ticketsRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/flights', flightRoutes);
app.use('/api', cityRoutes);
app.use(errorMiddleware);

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(e => console.log(e));

module.exports.handler = serverless(app);
