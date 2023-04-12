require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect = process.env.MONGO_DB_URI;

mongoose.connection.on('connected', () => {
    console.log(`[${new Date().toLocaleTimeString()}] - MongoDB connected...`)
});

mongoose.connection.on('error', (error) => {
    console.log('MongoDB connection error', error)
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected')
});