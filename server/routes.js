const router = require('express').Router();

const controller = require('./controllers/index.js');

router.get('/products', controller.products.get);

router.get('/qa/questions', controller.questions.getAllQuestions);
router.get('/qa/questions/answers'); // double check this
module.exports = router;
