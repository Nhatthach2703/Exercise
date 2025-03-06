var express = require('express');
const app = express();
const port = 3000;

// For parsing application/json
app.use(express.json());
// For parsing application/x-www-form-urlencoded 
app.use(express.urlencoded({ extended: true }));





//Import data from articles.js
const articles = require('./articles');

app.get('/articles', async (req, res) => {
    try {
        res.status(200).end('Will send all the articles to you!');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new article
app.post('/articles', async (req, res) => {
    try {
        res.status(201).end('Will add the article: ' + req.body.title + ' with details: ' + req.body.text + ' and ' + req.body.date);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// PUT a new article
app.put('/articles', async (req, res) => {
    try {
        res.status(403).end('PUT operation not supported on /articles');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE all articles
app.delete('/articles', async (req, res) => {
    try {
        res.status(200).end('Deleting all articles');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET a specific article
app.get('/articles/:id', async (req, res) => {
    try {
        res.status(200).end('Will send details of the article: ' + req.params.id + ' to you!');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a specific article
app.post('/articles/:id', async (req, res) => {
    try {
        res.status(403).end('POST operation not supported on /articles/' + req.params.id);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT a specific article
app.put('/articles/:id', async (req, res) => {
    try {
        res.write('Updating the article: ' + req.params.id + '\n');
        res.status(201).end('Will update the article: ' + req.body.title + ' with details: ' + req.body.text + ' and ' + req.body.date);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// DELETE a specific article
app.delete('/articles/:id', async (req, res) => {
    try {
        res.status(200).end('Deleting article: ' + req.params.id);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Import data from db.json
const videos = require('./db.json').videos;

// GET all videos
app.get('/videos', async (req, res) => {
    try {
        res.status(200).end('Will send all the videos to you!');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new video
app.post('/videos', async (req, res) => {
    try {
        res.status(201).end(
            'Will add the video: ' +
                req.body.title +
                ' with details: ' +
                req.body.content +
                ', date: ' +
                req.body.date +
                ', and author: ' +
                req.body.author
        );
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT operation on /videos (not supported)
app.put('/videos', async (req, res) => {
    try {
        res.status(403).end('PUT operation not supported on /videos');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE all videos
app.delete('/videos', async (req, res) => {
    try {
        res.status(200).end('Deleting all videos');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET a specific video by ID
app.get('/videos/:id', async (req, res) => {
    try {
        res.status(200).end('Will send details of the video: ' + req.params.id + ' to you!');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST operation on a specific video (not supported)
app.post('/videos/:id', async (req, res) => {
    try {
        res.status(403).end('POST operation not supported on /videos/' + req.params.id);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT a specific video
app.put('/videos/:id', async (req, res) => {
    try {
        res.write('Updating the video: ' + req.params.id + '\n');
        res.status(201).end(
            'Will update the video: ' +
                req.body.title +
                ' with details: ' +
                req.body.content +
                ', date: ' +
                req.body.date +
                ', and author: ' +
                req.body.author
        );
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a specific video
app.delete('/videos/:id', async (req, res) => {
    try {
        res.status(200).end('Deleting video: ' + req.params.id);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Process data here
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
module.exports = app;