const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const SECRET_KEY = 'your_secret_key'; // Change this to a secure secret key

// Dummy user database (replace with your database)
const users = [
    {
        id: 1,
        email: 'user@example.com',
        passwordHash: '$2b$10$JzhQNXyhxTqlqnJNv23DVeGHblHrZSSih8v1E4PQ1n8nJUtrfFmPa', // hashed password: "password123"
    },
];

// Middleware to parse JSON bodies
router.use(bodyParser.json());

// Login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find(user => user.email === email);

    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare password hashes
    bcrypt.compare(password, user.passwordHash, (err, result) => {
        if (err || !result) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

        // Send token as response
        res.json({ token });
    });
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        req.user = user;
        next();
    });
};

// Example protected route
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Protected route accessed successfully' });
});

module.exports = router;
