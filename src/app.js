const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const answerRouter = require('./answers/answer-router')
const questionsRouter = require('./questions/questions-router')

// define the Express app
const app = express();

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
// app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

app.use('/answer',answerRouter)

app.use('/question', questionsRouter)

// get a specific question
// app.get('/question/:id', (req, res) => {
//   const question = questions.filter(q => (q.id === parseInt(req.params.id)));
//   if (question.length > 1) return res.status(500).send();
//   if (question.length === 0) return res.status(404).send();
//   res.send(question[0]);
// });

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

// insert a new answer to a question

// app.post('/answer/:id', checkJwt, (req, res) => {
//   const {answer} = req.body;

//   const question = questions.filter(q => (q.id === parseInt(req.params.id)));
//   if (question.length > 1) return res.status(500).send();
//   if (question.length === 0) return res.status(404).send();

//   question[0].answers.push({
//     answer,
//     author: req.user.name,
//   });

//   res.status(200).send();
// });

module.exports = app
