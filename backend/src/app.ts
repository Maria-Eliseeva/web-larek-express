import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';

import productRoutes from './routes/product';
import orderRoutes from './routes/order';

import errorHandler from './middlewares/errorHandler';
import { requestLogger, errorLogger } from './middlewares/logger';
import NotFoundError from './errors/not-found-error';

import { config } from './config';

const app = express();
mongoose.connect(config.DB_ADDRESS);

// middleware
app.use(
  cors({
    origin: config.ORIGIN_ALLOW,
  }),
);
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(requestLogger);

// роуты
app.use('/product', productRoutes);
app.use('/order', orderRoutes);

app.use(errors());
app.use('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger);
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
