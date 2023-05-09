require('dotenv').config();
const axios = require('axios');

module.exports = {
  getAllQuestions: (req, res) => {
    const productId = req.params.product_id;
    const { page } = req.query;
    const { count } = req.query;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${productId}&page=${page}&count=${count}`, {
      headers: {
        Authorization: process.env.TOKEN,
      },
    })
      .then((response) => {
        console.log('Response from getting all questions:', response.data.results);
        res.status(200).send(response.data.results);
      })
      .catch((error) => {
        console.log('Error getting data for all messages', error.response.data);
        res.sendStatus(404);
      });
  },
  getAnswers: (req, res) => {
    const questionId = req.params.question_id;
    const { page } = req.params;
    const { count } = req.params;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionId}/answers?page=${page}&count=${count}`, {
      headers: {
        Authorization: process.env.TOKEN,
      },
    })
      .then(((response) => {
        console.log('Response for all answers of given question', response.data.results);
        res.status(200).send(response.data.results);
      }))
      .catch((error) => {
        console.log('Error getting answers for question', error);
        res.sendStatus(404);
      });
  },
};
