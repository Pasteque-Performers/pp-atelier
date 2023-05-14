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

    const stylesOptions = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}/styles`,
      method: 'get',
      headers: {
        'User-Agent': 'request',
        Authorization: process.env.TOKEN,
      },
    };

    Promise.all([
      axios(productOptions),
      axios(stylesOptions),
    ])
      .then(([productData, stylesData]) => {
        const combinedData = {
          ...productData.data,
          styles: stylesData.data.results,
        };
        res.status(200).json(combinedData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching product data.' });
      });
  },
};
