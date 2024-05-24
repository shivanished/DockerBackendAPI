require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const menuRoutes = require('./routes/menu');

const app = express();

// Ensure necessary environment variables are set
if (!process.env.MONGODB_URI || !process.env.PORT) {
    console.error('Error: Missing necessary environment variables');
    process.exit(1);
}

// Middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.path}`);
    next();
});

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the app' });
});
app.use('/api/user', userRoutes);
app.use('/api/menu', menuRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Define the port
const PORT = process.env.PORT || 8080; // Default to 8080 if PORT isn't set

// Start the server independently
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect to database
console.log('Attempting to connect to database...');
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });