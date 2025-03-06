const express = require('express');
const articleController = require('../controllers/articlesController');
const articleRouter = express.Router();
const passport = require('passport');
articleRouter.use(express.json());
articleRouter.use(express.urlencoded({ extended: true }));
// Helper function to use passport.authenticate with async/await 
articleRouter.route('/', passport.authenticate('local'))
    .get(articleController.findAll)
articleRouter.route('/', passport.authenticate('local'))
    .post(articleController.create)
    .put((req, res) => {
        res.status(403).json('PUT operation not supported on /articles');
    })
    .delete(articleController.delete);
articleRouter.route('/:id')
    .get(articleController.findById)
    .post(passport.authenticate('local'), (req, res) => {
        res.status(403).end('POST operation not supported on /articles/' + req.params.id);
    })
    .put(articleController.update)
    .delete(passport.authenticate('local'), articleController.delete);

module.exports = articleRouter;

