const router = require('express').Router();

const controller = require('./controllers/index.js');

router.get('/products/:productId', controller.overview.getProduct);
router.get('/products/:productId/styles', controller.overview.getStyles);

router.get('/products', controller.products.get);
router.get('/productsquery', controller.productsQuery.get);

router.get('/reviews', controller.reviews.get);
router.get('/reviews/meta', controller.reviews.getMeta);

router.get('/qa/questions/', controller.questions.getAllQuestions);
router.get('/qa/questions/:question_id/answers', controller.questions.getAnswers);
router.put('/qa/questions/:question_id/helpful', controller.questions.updateQuestionHelpfulness);
router.put('/qa/answers/:answer_id/helpful', controller.questions.updateAnswerHelpfulness);
router.put('/qa/answers/:answer_id/report', controller.questions.reportAnswer);
router.put('/qa/questions/:question_id/report', controller.questions.reportQuestion);
router.post('/qa/questions', controller.questions.addQuestion);
router.post('/qa/questions/:question_id/answers', controller.questions.addAnswer);

module.exports = router;
