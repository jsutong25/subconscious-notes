const express = require('express');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoute');
const dreamRoute = require('./routes/dreamRoute');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors()); // Allow requests from all origins
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/dream', dreamRoute);

const PORT = process.env.PORT || 5000; // Use a port different from Vercel
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
