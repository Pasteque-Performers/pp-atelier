const router = require('express').Router();

const controller = require('./controllers/index.js');

router.get('/products', controller.products.get);
router.get('/productsquery', controller.productsQuery.get);

router.get('/reviews', controller.reviews.get);

module.exports = router;
