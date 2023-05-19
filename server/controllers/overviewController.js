const axios = require('axios');
require('dotenv').config();

module.exports = {
  getProduct: (req, res) => {
    const { productId } = req.params;

    const productOptions = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}`,
      method: 'get',
      headers: {
        'User-Agent': 'request',
        Authorization: process.env.TOKEN,
      },
    };

    axios(productOptions)
      .then((productData) => {
        res.status(200).json(productData.data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching product data.' });
      });
  },

  getStyles: (req, res) => {
    const { productId } = req.params;

    const stylesOptions = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}/styles`,
      method: 'get',
      headers: {
        'User-Agent': 'request',
        Authorization: process.env.TOKEN,
      },
    };

    axios(stylesOptions)
      .then((stylesData) => {
        res.status(200).json(stylesData.data.results);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching styles data.' });
      });
  },
};
