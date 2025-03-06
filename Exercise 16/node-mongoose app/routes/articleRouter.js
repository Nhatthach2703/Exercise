const express = require('express');
const mongoose = require('mongoose');
const Article = require('../models/article');
const articleRouter = express.Router();
articleRouter.use(express.json());
articleRouter.use(express.urlencoded({ extended: true }));

// Routes for handling articles
articleRouter.route('/')
    // GET all articles
    .get( async (req, res) => {
        try {
            const article = await Article.find();
            res.json(article);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })

    // POST a new article
    .post(async (req, res) => {
        try {
            const article = new Article(req.body);
            await article.save();
            res.status(201).json(article);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })

    // PUT operation not supported
    .put(async (req, res) => {
        try {
            res.status(403).json('PUT operation not supported on /articles' );
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })

    // DELETE all articles
    .delete(async (req, res) => {
        try {
            await Article.deleteMany({});
            res.status(200).send('All articles deleted successfully');
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

// Routes for handling specific articles by ID
articleRouter.route('/:id')
    // GET a specific article
    .get(async (req, res) => {
        try {
           const article = await Article.findById(req.params.id);
           res.json(article);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })

    // POST operation not supported for specific articles
    .post(async (req, res) => {
        try {
            res.status(403).end('POST operation not supported on /articles/' + req.params.id);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })

    // PUT a specific article
    .put(async (req, res) => {
        try {
            const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(article);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })

    // DELETE a specific article
    .delete(async (req, res) => {
        try {
            await Article.findByIdAndDelete(req.params.id);
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

module.exports = articleRouter;
