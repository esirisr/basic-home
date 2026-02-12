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

// API Routes
app.use('/api/students', require('./routes/studentRoutes'));

// Serve frontend build (Vite → dist)
const frontendBuildPath = path.resolve(__dirname, '..', 'frontend', 'dist');

app.use(express.static(frontendBuildPath));

// Catch-all (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
