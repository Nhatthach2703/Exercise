const express = require('express');
const articleController = require('../controllers/articlesController');
const articleRouter = express.Router();
const passport = require('../config/jwtConfig');
const cors = require('./cors');

articleRouter.use(express.json());
articleRouter.use(express.urlencoded({ extended: true }));
 
articleRouter.route('/')
    .get(cors.corsWithOptions, articleController.findAll)
articleRouter.route('/')
    .post(passport.verifyUser, articleController.create)
    .put ((req, res) =>{
        res.status(403).json('PUT operation not supported on /articles');
    })
    .delete(articleController.delete);
articleRouter.route('/:id')
    .get(articleController.findById)
    .post(passport.verifyUser, (req, res) => {
        res.status(403).end('POST operation not supported on /articles/' + req.params.id);
    })
    .put(articleController.update)
    .delete(passport.verifyUser, articleController.delete);

module.exports = articleRouter;
