const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/students', require('./routes/studentRoutes'));

// Railway provides the PORT environment variable automatically
const PORT = process.env.PORT || 5000;

// ADDITION: Added '0.0.0.0' to ensure the server is reachable externally
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
