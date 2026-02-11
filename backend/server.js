const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- ROUTES ---

// 1. Root Route (Fixes "Cannot GET /")
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Student Management API is live!",
        endpoints: {
            students: "/api/students"
        }
    });
});

// 2. API Routes
app.use('/api/students', require('./routes/studentRoutes'));

// 3. 404 Catch-all (For any route that doesn't exist)
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// Server Configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
