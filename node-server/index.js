import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/CartRoutes.js';

dotenv.config()
const app = express();
app.use(cors());

const PORT = process.env.PORT
const API_URL = process.env.MONGO

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

app.use('/cart', router)

const connect = async () => {
    try {
        await mongoose.connect(API_URL)
        console.log("Connect To Mongoose Successfully!");
    } catch (error) {
        console.log("Connect To Mongoose Failure!");
    }
}

app.listen(PORT, () => {
    try {
        connect()
        console.log(`Connect to DB Successfully! port: ${PORT}`);
    } catch (error) {
        console.log('Error connecting...');
    }
});


// https://github.com/safak/youtube2022/blob/mern-booking/api/