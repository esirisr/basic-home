const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/students', require('./routes/studentRoutes'));

// Updated Path Logic: 
// Finds 'frontend/dist' starting from the root of your project
const frontendBuildPath = path.join(process.cwd(), 'frontend', 'dist');

// Serve static files from the Vite build directory
app.use(express.static(frontendBuildPath));

// Catch-all (SPA support)
app.get('*', (req, res) => {
    const indexPath = path.join(frontendBuildPath, 'index.html');
    
    res.sendFile(indexPath, (err) => {
        if (err) {
            // If the file is missing, don't let the server crash!
            console.error("Frontend build not found at:", indexPath);
            res.status(404).send("Frontend build missing. Please run 'npm run build' first.");
        }
    });
});

const PORT = process.env.PORT || 8080;

// Listen on 0.0.0.0 for external access
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
