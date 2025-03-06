var express = require('express');
const app = express();
const port = 3000;

// Import routers
const articlesRouter = require('./routes/articleRouter');
const videoRouter = require('./routes/videoRouter');

// Use routers
app.use('/articles', articlesRouter);
app.use('/videos', videoRouter);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

