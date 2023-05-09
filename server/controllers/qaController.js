require('dotenv').config();
const axios = require('axios');

module.exports = {
  getAllQuestions: (req, res) => {
    const productId = 11;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${productId}`, {
      headers: {
        Authorization: process.env.TOKEN,
      },
    })
      .then((response) => {
        console.log('Response from getting all questions:', response.data.results);
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('Error getting data for all messages', error);
        res.sendStatus(404);
      });
  },
  getAnswers: (req, res) => {
    const questionId = 10;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?question_id=${questionId}/answers`, {
      headers: {
        Authorization: process.env.TOKEN,
      },
    })
      .then(((response) => {
        console.log('Response for all answers of given question', response);
        res.sendStatus(200);
      }))
      .catch((error) => {
        console.log('Error getting answers for question', error);
        res.sendStatus(404);
      });
  },
};
