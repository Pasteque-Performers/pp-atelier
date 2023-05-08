const axios = require('axios');
require('dotenv').config();

module.exports = {
  get: (req, res) => {
    const options = {
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews',
      method: 'get',
      headers: {
        'User-Agent': 'request',
        Authorization: process.env.TOKEN,
      },
      params: {
        product_id: 40344,
        page: 1,
        count: 5,
        sort: 'newest',
      },
    };

    return axios(options)
      .then((response) => {
        console.log('Successfully got review data', response.data);
        res.status(200).send(response.data);
      })
      .catch((err) => {
        console.error('Error Getting review data', err);
        res.status(500).send();
      });
  },
};
