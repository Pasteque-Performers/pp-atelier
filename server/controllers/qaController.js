require('dotenv').config();
const axios = require('axios');

module.exports = {
  getAllQuestions: (req, res) => {
    const productId = req.query.product_id;
    const { page, count } = req.query;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${productId}&page=${page}&count=${count}`, {
      headers: {
        Authorization: process.env.TOKEN,
      },
    })
      .then((response) => {
        res.status(200).send(response.data.results);
      })
      .catch((error) => {
        console.log('Error getting data for all messages', error.response.data);
        res.sendStatus(404);
      });
  },
  getAnswers: (req, res) => {
    const questionId = req.params.question_id;
    const { page, count } = req.query;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionId}/answers?page=${page}&count=${count}`, {
      headers: {
        Authorization: process.env.TOKEN,
      },
    })
      .then(((response) => {
        res.status(200).send(response.data.results);
      }))
      .catch((error) => {
        console.log('Error getting answers for question', error);
        res.sendStatus(404);
      });
  },
  updateQuestionHelpfulness: (req, res) => {
    const questionId = req.params.question_id;
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionId}/helpful`, null, {
      headers: {
        Authorization: process.env.TOKEN,
      },
    })
      .then(() => {
        res.sendStatus(204);
      })
      .catch((error) => {
        console.log('Error updating question helpfulness:', error);
        res.sendStatus(404);
      });
  },
  updateAnswerHelpfulness: (req, res) => {
    const answerId = req.params.answer_id;
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answerId}/helpful`, null, {
      headers: {
        Authorization: process.env.TOKEN,
      },
    })
      .then(() => {
        res.sendStatus(204);
      })
      .catch((error) => {
        console.log('Error updating answer helpfulness:', error);
        res.sendStatus(404);
      });
  },
  reportAnswer: (req, res) => {
    const answerId = req.params.answer_id;
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answerId}/report`, null, {
      headers: {
        Authorization: process.env.TOKEN,
      },
    })
      .then(() => {
        res.sendStatus(204);
      })
      .catch((error) => {
        console.log('Error reporting answer', error);
        res.sendStatus(404);
      });
  },
  reportQuestion: (req, res) => {
    const questionId = req.params.question_id;
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionId}/report`, null, {
      headers: {
        Authorization: process.env.TOKEN,
      },
    })
      .then(() => {
        res.sendStatus(204);
      })
      .catch((error) => {
        console.log('Error reporting question', error);
        res.sendStatus(404);
      });
  },
  addQuestion: (req, res) => {
    const { body, name, email } = req.body;
    const productId = req.body.product_id;

    axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions', {
      body,
      name,
      email,
      product_id: productId,
    }, {
      headers: {
        Authorization: process.env.TOKEN,
      },
    })
      .then(() => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log('Error posting new question', error);
        res.sendStatus(404);
      });
  },
  addAnswer: (req, res) => {
    const {
      body, name, email, photos,
    } = req.body;
    const questionId = req.params.question_id;
    axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionId}/answers`, {
      body,
      name,
      email,
      photos,
    }, {
      headers: {
        Authorization: process.env.TOKEN,
      },
    })
      .then(() => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log('Error posting new answer', error);
        res.sendStatus(404);
      });
  },
};
