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
// Point to the 'dist' folder (Vite's default build folder)
const frontendBuildPath = path.join(__dirname, '..', 'frontend', 'dist'); 

app.use(express.static(frontendBuildPath));

// DEBUG LOG
console.log("Static files being served from:", frontendBuildPath);

// 3. Catch-all Route
app.get('*', (req, res) => {
    const indexPath = path.resolve(frontendBuildPath, 'index.html');
    
    res.sendFile(indexPath, (err) => {
        if (err) {
            // Updated error message with your specific spelling requirement
            console.error("ERROR: Could not find index.html at", indexPath);
            res.status(500).send("Frontend build missing or p**at**h incorrect.");
        }
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
