const router = require('express').Router();

const controller = require('./controllers/index.js');

router.get('/products', controller.products.get);
router.get('/productsquery', controller.productsQuery.get);

router.get('/reviews', controller.reviews.get);
router.get('/reviews/meta', controller.reviews.getMeta);

router.get('/qa/questions/:product_id/:page/:count', controller.questions.getAllQuestions);
router.get('/qa/questions/:question_id/answers/:page/:count', controller.questions.getAnswers);

module.exports = router;
