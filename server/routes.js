const router = require('express').Router();

const controller = require('./controllers/index.js');

router.get('/products', controller.products.get);

module.exports = router;
