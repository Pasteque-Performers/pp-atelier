const router = require('express').Router();

const controller = require('./controllers/index.js');

router.get('/products', controller.products.get);
router.get('/productsquery', controller.productsQuery.get);

router.get('/reviews', controller.reviews.get);

router.get('/qa/questions/', controller.questions.getAllQuestions);
router.get('/qa/questions/:question_id/answers', controller.questions.getAnswers);

module.exports = router;
