const express = require('express');
const app = express();

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the backend page!');
});

// Other routes and middleware...

// Start the server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
