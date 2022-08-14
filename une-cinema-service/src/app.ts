import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import connectDB from './util/connectDB';
import theatreHandler from './handler/theatres.handler';
import movieHandler from './handler/movie.handler';
import bookingHandler from './handler/booking.handler';

dotenv.config();

// connect to database
connectDB();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());

app.use('/theatres', theatreHandler)
app.use('/movies', movieHandler);
app.use('/bookings', bookingHandler)

// only listen to request when DB connection is established
mongoose.connection.once('connected', () => {
  console.log('⚡️[server]: Connected to MongoDB.');
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
})