// const express = require('express');
// const articleController = require('../controllers/articlesController');
// const articleRouter = express.Router();
// const passport = require('../config/jwtConfig');

// articleRouter.use(express.json());
// articleRouter.use(express.urlencoded({ extended: true }));
 
// articleRouter.route('/', )
//     .get(passport.verifyUser, articleController.findAll)
//     .post(passport.verifyUser, articleController.create)
//     .put ((req, res) =>{
//         res.status(403).json('PUT operation not supported on /articles');
//     })
//     .delete(articleController.delete);
// articleRouter.route('/:id')
//     .get(articleController.findById)
//     .post(passport.verifyUser, (req, res) => {
//         res.status(403).end('POST operation not supported on /articles/' + req.params.id);
//     })
//     .put(articleController.update)
//     .delete(passport.verifyUser, articleController.delete);

// module.exports = articleRouter;


const express = require('express');
const articleController = require('../controllers/articlesController');
const articleRouter = express.Router();
const jwtConfig = require('../config/jwtConfig');

articleRouter.use(express.json());
articleRouter.use(express.urlencoded({ extended: true }));

articleRouter.route('/')
    .get(articleController.findAll)
    .post(jwtConfig.verifyToken, articleController.create) // Require JWT for POST
    .put((req, res) => {
        res.status(403).json('PUT operation not supported on /articles');
    })
    .delete(jwtConfig.verifyToken, articleController.delete); // Require JWT for DELETE

articleRouter.route('/:id')
    .get(articleController.findById)
    .post((req, res) => {
        res.status(403).json('POST operation not supported on /articles/' + req.params.id);
    })
    .put(jwtConfig.verifyToken, articleController.update) // Require JWT for PUT
    .delete(jwtConfig.verifyToken, articleController.delete); // Require JWT for DELETE

module.exports = articleRouter;
