const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const connectDB = require('./config/database')

//Requiring dotenv file to make .env available globally
require('dotenv').config();

// calling express file
const app = express();

//connect to MongoDB database
connectDB()

//Import Routes
const authRoutes = require('./routes/authRoute');

//app middleswares
app.use(morgan('dev'));
//app.use(bodyParser.json())
app.use(bodyParser.json({ limit: '5mb', type: 'application/json'}))
//app.use(cors())
app.use(cors({ origin: process.env.CLIENT_URL }))

//middlewares
app.use('/api/v1', authRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`API is running on port ${port}`));