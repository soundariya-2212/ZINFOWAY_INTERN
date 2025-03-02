const express = require('express');
const authRouter = require('./auth');

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
// Add other middleware here as needed

// Routes
app.use('/auth', authRouter);
// Add other routes here

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
