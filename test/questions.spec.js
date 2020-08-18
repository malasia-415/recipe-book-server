const QuestionsService = require('../src/questions/questions-service')
const knex = require('knex')

   describe(`getAllQuestions()`, () => {
    let db
    let testQuestions = [
        {
            title: 'First question',
            description: 'This is your first question',
            author: 'Jone'
        },

        {
            title: 'Second question',
            description: 'This is your second question',
            author: 'Ashley'
        }
    ]
    
       before(() => {
         db = knex({
           client: 'pg',
           connection: process.env.TEST_DATABASE_URL,
         })
       })

       before('cleanup', () => db.raw('TRUNCATE TABLE answers;'));
       before('cleanup', () => db.raw('TRUNCATE TABLE questions CASCADE;'));

       before(() => db('questions').truncate())
           return db
             .into('questions')
             .insert(testQuestions)
         })

         after(() => db.destroy())

     it(`resolves all questions from questions table`, () => {
       // test that ArticlesService.getAllArticles gets data from table
       return QuestionsService.getAllQuestions(db)
       .then(actual => {
         expect(actual).to.eql(testQuestions)
       })
     })