var express = require('express');
const app = express();
const port = 3000;

// Process data here
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
module.exports = app;

// Import data from articles.js
const articles = require('./articles');

// For parsing application/json
app.use(express.json());
// For parsing application/x-www-form-urlencoded 
app.use(express.urlencoded({ extended: true }));

// GET all articles
app.get('/articles', async (req, res) => {
    try {
        res.status(200).json(articles);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// GET a specific article
app.get('/articles/:id', async (req, res) => {
    try {
        // Get Id from URL
        const id = parseInt(req.params.id);
        // Find the article with ID
        const article = articles.find((entry) => entry.id === id);
        // If the post not found is not found, 404n is returned
        if (!article) {
            res.status(404).json({ message: 'Article not found!' });
        }
        // If found, return the article
        res.status(200).json(article);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// Add a new post (POST)
app.post('/articles', async (req, res) => {
    // Create a new post from the data in req.body
    const newArticle = {
        id: articles.length + 1, // This is simply an example and is not safe in a production environment
        title: req.body.title,
        date: req.body.date,
        text: req.body.text
    };
    articles.push(newArticle);
    res.status(201).json(newArticle);
});

// Update a post (PUT)
app.put('/articles/:id', async (req, res) => {
    // Find the article's index in the array
    const index = articles.findIndex((article) => article.id === parseInt(req.params.id));        
    if (index === -1) return res.status(404).json({ message: 'Article not found!' });

    // Updated article with new data from req.body
    articles[index] = {
        ...articles[index],
        ...req.body
    };
    res.json(articles[index]);
});

// Delete a post (DELETE)
app.delete('/articles/:id', async (req, res) => {
    // Find the article's index in the array
    const index = articles.findIndex((article) => article.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Article not found!' });

    // Remove post from the array
    const deletedArticle = articles.splice(index, 1);
    res.status(204).json(deletedArticle);
});