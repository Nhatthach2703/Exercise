const express = require('express');
const articleController = require('../controllers/articlesController');
const articleRouter = express.Router();
const auth = require('../authentication/auth');

// articleRouter.use(auth);

articleRouter.use(express.json());
articleRouter.use(express.urlencoded({ extended: true }));

console.log(typeof auth.isAuthenticated); // Should log 'function'
console.log(typeof (async (req, res) => {})); // Should also log 'function'

articleRouter.get('/', auth.isAuthenticated, articleController.findAll);   
articleRouter.route('/', auth.isAuthenticated)
    .post(articleController.create)
    .put ((req, res) =>{
        res.status(403).json('PUT operation not supported on /articles');
    })
    .delete(articleController.delete);
articleRouter.route('/:id')
    .get(articleController.findById)
    .post(auth.isAuthenticated, (req, res) => {
        res.status(403).end('POST operation not supported on /articles/' + req.params.id);
    })
    .put(articleController.update)
    .delete(auth.isAuthenticated, articleController.delete);

    


// articleRouter.route('/')
//     .get(articleController.findAll)
//     .post(articleController.create)
//     .put((req, res) => {
//         res.status(403).json('PUT operation not supported on /articles');
//     })
//     .delete(articleController.delete);

// articleRouter.route('/:id')
//     .get(articleController.findById)
//     .post((req, res) => {
//         res.status(403).end('POST operation not supported on /articles/' + req.params.id);
//     })
//     .put(articleController.update)
//     .delete(articleController.delete);

module.exports = articleRouter;
