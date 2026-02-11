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
// If your build files are in 'dist', leave this as 'dist'. 
// If your error said they are directly in 'frontend', remove the 'dist' part.
const frontendBuildPath = path.join(__dirname, 'frontend', 'dist'); 

app.use(express.static(frontendBuildPath));

// DEBUG LOG: This will print in Railway logs so you can verify the path
console.log("Static files being served from:", frontendBuildPath);

// 3. Catch-all Route
app.get('*', (req, res) => {
    // We use path.resolve to ensure the absolute path is correct on the Linux server
    const indexPath = path.resolve(frontendBuildPath, 'index.html');
    
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error("ERROR: Could not find index.html at", indexPath);
            res.status(500).send("Frontend build missing or path incorrect.");
        }
    });
});

const PORT = process.env.PORT || 8080; // Railway often prefers 8080, but 5000 is usually fine
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
