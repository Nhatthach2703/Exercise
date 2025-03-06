const express = require('express');
const articleRouter = express.Router();
articleRouter.use(express.json());
articleRouter.use(express.urlencoded({ extended: true }));

// Routes for handling articles
articleRouter.route('/')
    // GET all articles
    .get( async (req, res) => {
        try {
            res.status(200).end('Will send all the articles to you!');
        } catch (err) {
            next(err, res);
        }
    })

    // POST a new article
    .post(async (req, res) => {
        try {
            res.status(201).end('Will add the article: ' + req.body.title + ' with details: ' + req.body.text + ' and ' + req.body.date);
        } catch (err) {
            next(err, res);
        }
    })

    // PUT operation not supported
    .put(async (req, res) => {
        try {
            res.status(403).end('PUT operation not supported on /articles');
        } catch (err) {
            next(err, res);
        }
    })

    // DELETE all articles
    .delete(async (req, res) => {
        try {
            res.status(200).end('Deleting all articles');
        } catch (err) {
            next(err, res);
        }
    });

// Routes for handling specific articles by ID
articleRouter.route('/:id')
    // GET a specific article
    .get(async (req, res) => {
        try {
            res.status(200).end('Will send details of the article: ' + req.params.id + ' to you!');
        } catch (err) {
            next(err, res);
        }
    })

    // POST operation not supported for specific articles
    .post(async (req, res) => {
        try {
            res.status(403).end('POST operation not supported on /articles/' + req.params.id);
        } catch (err) {
            next(err, res);
        }
    })

    // PUT a specific article
    .put(async (req, res) => {
        try {
            res.write('Updating the article: ' + req.params.id + '\n');
            res.status(201).end('Will update the article: ' + req.body.title + ' with details: ' + req.body.text);
        } catch (err) {
            next(err, res);
        }
    })

    // DELETE a specific article
    .delete(async (req, res) => {
        try {
            res.status(200).end('Deleting article: ' + req.params.id);
        } catch (err) {
            next(err, res);
        }
    });

// Global error handler for any unhandled routes or errors
articleRouter.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

module.exports = articleRouter;
