const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware to parse JSON data in requests
app.use(express.json());

// Endpoint to read data from data.json
app.get('/data', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send({ error: 'Failed to read data' });
        } else {
            res.send(JSON.parse(data));
        }
    });
});


// Endpoint to update data in data.json
app.post('/update', (req, res) => {
    const newData = req.body;

    // Validate the input
    if (!newData.message) {
        return res.status(400).send({ error: 'Message field is required' });
    }

    // Write the new data to data.json
    fs.writeFile('data.json', JSON.stringify(newData, null, 2), (err) => {
        if (err) {
            res.status(500).send({ error: 'Failed to update data' });
        } else {
            res.send({ message: 'The data has been updated' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});