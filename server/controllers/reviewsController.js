const axios = require('axios');
require('dotenv').config();

module.exports = {
  get: (req, res) => {
    const {
      productId, page, count, sort,
    } = req.query;
    const options = {
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews',
      method: 'get',
      headers: {
        'User-Agent': 'request',
        Authorization: process.env.TOKEN,
      },
      params: {
        product_id: productId,
        page,
        count,
        sort,
      },
    };

    return axios(options)
      .then((response) => {
        console.log('Successfully got review data', response.data);
        res.status(200).json(response.data);
      })
      .catch((err) => {
        console.error('Error Getting review data', err);
        res.status(500).send();
      });
  },
  getMeta: (req, res) => {
    const { productId } = req.query;
    const options = {
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/',
      method: 'get',
      headers: {
        'User-Agent': 'request',
        Authorization: process.env.TOKEN,
      },
      params: {
        product_id: productId,
      },
    };

    return axios(options)
      .then((response) => {
        console.log('Successfully got review meta data', response.data);
        res.status(200).send(response.data);
      })
      .catch((err) => {
        console.error('Error getting meta data from reviews', err);
        res.status(500).send();
      });
  },

  post: (req, res) => {
    console.log('this is req.body >>>>>>>>>>>>>>>>', req.body);
    const {
      body,
      name,
      rating,
      summary,
      photos,
      email,
      recommend,
      characteristics,
      productId,
    } = req.body;
    const options = {
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews',
      method: 'post',
      headers: {
        Authorization: process.env.TOKEN,
      },
      data: {
        product_id: productId,
        rating,
        summary,
        name,
        body,
        email,
        photos,
        recommend,
        characteristics,
      },
    };
    axios(options)
      .then((response) => {
        console.log('Successfully posted review data', response.data);
        res.status(201).send(response.data);
      })
      .catch((err) => {
        console.error('Error posting review data', err);
        res.status(500).send();
      });
  },
};
