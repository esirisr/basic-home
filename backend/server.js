const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// 1. API Routes
app.use('/api/students', require('./routes/studentRoutes'));

// 2. Serve Frontend Static Files
// This looks inside your 'frontend' folder for the production build
const frontendBuildPath = path.join(__dirname, 'frontend', 'dist'); 
app.use(express.static(frontendBuildPath));

// 3. Catch-all Route
// Directs all non-API requests to your React app
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
