var express = require('express');
const app = express();
const port = 3000;
// // Middleware to prase JSON body
// app.use(express.json());
// // Simulated articles saving operation
// app.post('/articles', async (req, res, next) => {
//     try {
//         const { title, date, text } = req.body;

//         // Simulate article saving logic
//         if (!body ||!text || !date) {
//         // if (!title ||!text || !date) {
//             throw new Error('Missing required article fields');
//         }

//         // If the operation was successful, send a response
//         res.status(201).json({ message: 'Article saved successfully' });
//     } catch (err) {
//         // Pass the error to the error-handling middleware
//         next(err);
//     }
// });

// // Error-handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack); // Log the error stack for debugging

//     // Send a generic error message
//     res.status(500).json({ error: "An error occurred, pleasea try again later." });
// });

// Import routers
const articlesRouter = require('./routes/articleRouter');
const videoRouter = require('./routes/videoRouter');

// Use routers
app.use('/articles', articlesRouter);
app.use('/videos', videoRouter);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

