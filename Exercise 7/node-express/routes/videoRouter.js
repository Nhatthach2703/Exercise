const express = require('express');
const videoRouter = express.Router();

videoRouter.use(express.json());
videoRouter.use(express.urlencoded({ extended: true }));

videoRouter.route('/')
    .get(async (req, res) => {
        try {
            res.status(200).end('Will send all the videos to you!');
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })

    // POST a new video
    .post(async (req, res) => {
        try {
            res.status(201).end('Will add the video: ' + req.body.title + ' with details: ' + req.body.content + ', date: ' + req.body.date + ', and author: ' + req.body.author);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })

    // PUT a new video
    .put(async (req, res) => {
        try {
            res.status(403).end('PUT operation not supported on /videos');
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })

    // DELETE all videos
    .delete(async (req, res) => {
        try {
            res.status(200).end('Deleting all videos');
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

videoRouter.route('/:id')
    // GET a specific video
    .get(async (req, res) => {
        try {
            res.status(200).end('Will send details of the video: ' + req.params.id + ' to you!');
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })

    // POST a specific video
    .post(async (req, res) => {
        try {
            res.status(403).end('POST operation not supported on /videos/' + req.params.id);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })

    // PUT a specific video
    .put(async (req, res) => {
        try {
            res.write('Updating the video: ' + req.params.id + '\n');
            res.status(201).end('Will update the video: ' + req.body.title + ' with details: ' + req.body.content + ', date: ' + req.body.date + ', and author: ' + req.body.author);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })

    // DELETE a specific video
    .delete(async (req, res) => {
        try {
            res.status(200).end('Deleting video: ' + req.params.id);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

module.exports = videoRouter;
