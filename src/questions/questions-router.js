const express = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const questionsRouter = express.Router()
const QuestionsService = require('./questions-service');
const jsonParser = express.json()

questionsRouter.get('/', (req, res) => {
  const database = req.app.get('db')
  QuestionsService.getAllQuestions(database)
    .then(questions => {
      res.json(questions)
    })
    .catch(error => {
      console.log(error)
    })
});

// get a specific question
questionsRouter.get('/:id', (req, res) => {
  const database = req.app.get('db')
  const questionId = req.params.id
  QuestionsService.getQuestionById(database, questionId)
    .then(question => {
      console.log(question)
      res.json(question)
    })
  });
  
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
  
  // insert a new question
  questionsRouter.post('/', jsonParser, checkJwt, (req, res) => {
    const {title, description} = req.body;
    const newQuestion = {
      title,
      description,
      author: req.user.name,
    };
    const database = req.app.get('db')
    QuestionsService.insertQuestion(database, newQuestion)
      .then(question => {
        res
        .status(201)
        .json(question);
      })
  });
  

  module.exports = questionsRouter