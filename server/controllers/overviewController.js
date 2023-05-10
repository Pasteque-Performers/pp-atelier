const axios = require('axios');
require('dotenv').config();

module.exports = {
  getProduct: (req, res) => {
    const { productId } = req.params;

    const options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}`,
      method: 'get',
      headers: {
        'User-Agent': 'request',
        Authorization: process.env.TOKEN,
      },
    };

    return axios(options)
      .then((data) => {
        res.status(200).json(data.data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching product data.' });
      });
  },
};
