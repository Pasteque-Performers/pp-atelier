const router = require('express').Router();

const controller = require('./controllers/index.js');

router.get('/products', controller.products.get);
router.get('/productsquery', controller.productsQuery.get);

module.exports = router;
