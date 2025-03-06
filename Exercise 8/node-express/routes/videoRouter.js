const express = require('express');
const videoRouter = express.Router();

videoRouter.use(express.json());
videoRouter.use(express.urlencoded({ extended: true }));

// Routes for handling videos
videoRouter.route('/')
    // GET all videos
    .get(async (req, res) => {
        try {
            res.status(200).end('Will send all the videos to you!');
        } catch (err) {
            next(err, res);
        }
    })

    // POST a new video
    .post(async (req, res) => {
        try {
            res.status(201).end('Will add the video: ' + req.body.title + ' with details: ' + req.body.content + ', date: ' + req.body.date + ', and author: ' + req.body.author);
        } catch (err) {
            next(err, res);
        }
    })

    // PUT operation not supported
    .put(async (req, res) => {
        try {
            res.status(403).end('PUT operation not supported on /videos');
        } catch (err) {
            next(err, res);
        }
    })

    // DELETE all videos
    .delete(async (req, res) => {
        try {
            res.status(200).end('Deleting all videos');
        } catch (err) {
            next(err, res);
        }
    });

// Routes for handling specific videos by ID
videoRouter.route('/:id')
    // GET a specific video
    .get(async (req, res) => {
        try {
            res.status(200).end('Will send details of the video: ' + req.params.id + ' to you!');
        } catch (err) {
            next(err, res);
        }
    })

    // POST operation not supported for specific videos
    .post(async (req, res) => {
        try {
            res.status(403).end('POST operation not supported on /videos/' + req.params.id);
        } catch (err) {
            next(err, res);
        }
    })

    // PUT a specific video
    .put(async (req, res) => {
        try {
            res.write('Updating the video: ' + req.params.id + '\n');
            res.status(201).end('Will update the video: ' + req.body.title + ' with details: ' + req.body.content + ', date: ' + req.body.date + ', and author: ' + req.body.author);
        } catch (err) {
            next(err, res);
        }
    })

    // DELETE a specific video
    .delete(async (req, res) => {
        try {
            res.status(200).end('Deleting video: ' + req.params.id);
        } catch (err) {
            next(err, res);
        }
    });

// Global error handler for any unhandled routes or errors
videoRouter.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

module.exports = videoRouter;
