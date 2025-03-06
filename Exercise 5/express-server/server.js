// Import the EXpress module
const express = require('express');

// Create an Instance of the Express application
const app = express();

// Define a GET route
app.get('/Hello', (req, res) => {
    res.send('Hello, World');
});

// Start th server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});