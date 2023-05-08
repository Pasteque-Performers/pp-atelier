const axios = require('axios');
require('dotenv').config();

module.exports = {
  get: (req, res) => {
    const options = {
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',
      method: 'get',
      headers: {
        'User-Agent': 'request',
        Authorization: process.env.TOKEN,
      },
    };

    return axios(options)
      .then((data) => { res.send(data.data); })
      .catch((err) => { console.error(err); });
  },
};
