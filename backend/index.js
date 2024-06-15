const express = require('express');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoute');
const dreamRoute = require('./routes/dreamRoute');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors({
    origin: 'https://subconscious-notes.vercel.app', // Allow requests from your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'x-auth-token']
})); 
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/dream', dreamRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));