const AnswersService = require('../src/answers/answers-service')
const knex = require('knex')

//  describe(`getAllAnswers()`, () => {
let db
let testAnswers = [
    {
        title: 'First answers',
        description: 'This is your first answers',
        author: 'Jone',
        id: 1
    },

    {
        title: 'Second answer',
        description: 'This is your second answer',
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
      before('cleanup', () => db.raw('TRUNCATE TABLE answers CASCADE;'));

      afterEach('cleanup', () => db.raw('TRUNCATE TABLE answers CASCADE;'));

      after(() => db.destroy())

      describe(`getAllAnswers()`, () => {
        context(`Given 'answers' has data`, () => {
             beforeEach(() => {
               return db
                 .into('answers')
                // .getAllAnswers(db)
                .insert(testAnswers)
                
             })

             it(`getAllAnswers() resolves all answers from 'answers' table`, () => {
                // test that ArticlesService.getAllArticles gets data from table
                return AnswersService.getAllAnswers(db)
                .then(actual => {
                 expect(actual).to.eql(testAnswers)
                })
              })
           })   

           context(`Given 'answers' has no data`, () => {
            it(`getAllAnswers() resolves an empty array`, () => {
              return AnswersService.getAllAnswers(db)
                .then(actual => {
                  expect(actual).to.eql([])
                })
            })
          })
          it(`insertAnswers() inserts a new answers and resolves the new answers with an 'id'`, () => {
            const newAnswer = {
              title: 'First answer',
              description: 'This is your first answer',
              author: 'Jone',
            }

            getAnswersById(knex, id) 
            return knex.from('answers').select('*').where('id', id).first()   

            return AnswersService.insertAnswer(db, newAnswer)
            .then(actual => {
              expect(actual).to.eql({
                id: 1,
                title: newAnswer.title,
                author: newAnswer.author,
                description: newAnswer.description
              });
            });
        }) 
      })   