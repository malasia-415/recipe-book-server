const express = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const AnswerService = require('./answer-service');

const answerRouter = express.Router()
const jsonParser = express.json()

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://dev-ete98t3j.us.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: '2nq2QW9fzFjXTk860g92gb4z7A4Z6IbJ',
    issuer: `https://dev-ete98t3j.us.auth0.com/`,
    algorithms: ['RS256']
  });

answerRouter.get('/:id', (req, res) => {
  const database = req.app.get('db')
  const questionId = req.params.id

  AnswerService.getAllAnswersById(database, questionId)
  .then(answers => {
    console.log(answers)
    res
    .status(200)
    .json(answers)
  })
})

// insert a new answer to a question

answerRouter.post('/',jsonParser, checkJwt, (req, res) => {
  console.log(req.body)
    
    const {answer, question_id} = req.body;
    const newAnswer = {
      answer,
      question_id,
      author: req.user.name,
    };
    const database = req.app.get('db')
    AnswerService.insertAnswer(database, newAnswer)
    .then(answer => {
      res
      .status(201)
      .json(answer);
    })
});

module.exports = answerRouter