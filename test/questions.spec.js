const QuestionsService = require('../src/questions/questions-service')
const knex = require('knex')

  //  describe(`getAllQuestions()`, () => {
    let db
    let testQuestions = [
        {
            title: 'First question',
            description: 'This is your first question',
            author: 'Jone',
            id: 1
        },

        {
            title: 'Second question',
            description: 'This is your second question',
            author: 'Ashley',
            id: 2
        }
    ]
    
       before(() => {
         db = knex({
           client: 'pg',
           connection: process.env.TEST_DATABASE_URL,
         })
       })

      //  before('cleanup', () => db.raw('TRUNCATE TABLE answers;'));
       before('cleanup', () => db.raw('TRUNCATE TABLE questions CASCADE;'));

       afterEach(() => db.raw('TRUNCATE TABLE questions CASCADE;'))

      //  before(() => {
      //      return db
      //        .into('questions')
      //        .insert(testQuestions)
      //    })

         after(() => db.destroy())

    describe(`getAllQuestions()`, () => {
      context(`Given 'questions' has data`, () => {
           before(() => {
             return db
               .into('questions')
               .insert(testQuestions)
           })

      it(`getAllQuestions() resolves all questions from 'questions' table`, () => {
       // test that ArticlesService.getAllArticles gets data from table
       return QuestionsService.getAllQuestions(db)
       .then(actual => {
        expect(actual).to.eql(testQuestions)
       })
     })
  })
  context(`Given 'questions' has no data`, () => {
       it(`getAllQuestions() resolves an empty array`, () => {
         return QuestionsService.getAllQuestions(db)
           .then(actual => {
             expect(actual).to.eql([])
           })
       })
     })

}) 