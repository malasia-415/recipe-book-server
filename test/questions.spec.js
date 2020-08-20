const knex = require('knex');
const QuestionsService = require('../src/questions/questions-service');

   describe(`getAllQuestions()`, () => {
    let db;
    
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

       afterEach('cleanup', () => db.raw('TRUNCATE TABLE questions CASCADE;'));

      //  before(() => {
      //      return db
      //        .into('questions')
      //        .insert(testQuestions)
      //    })

         after(() => db.destroy())

    describe(`getAllQuestions()`, () => {
      context(`Given 'questions' has data`, () => {
           beforeEach(() => {
             return db
               .into('questions')
              // .getAllQuestions(db)
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

    
     it(`insertQuestions() inserts a new questions and resolves the new questions with an 'id'`, () => {
      const newQuestion = {
        title: 'First question',
        description: 'This is your first question',
        author: 'Jone',
      }

      return QuestionsService
      .updateQuestions(db, updatedQuestionsId, updatedQuestionsId)
      .insertQuestion(db, newQuestion)
      .then(actual => {
        expect(actual).to.eql({
          id: 1,
          title: newQuestion.title,
          author: newQuestion.author,
          description: newQuestion.description
        });
        return db('questions').select('*').where({ id: updatedQuestionsId}).first();
      });
  })

getQuestionsById(knex, id) 
describe('getById()', () => {
  it('should return undefined', () => {
        return knex.from('questions').select('*').where('id', id).first()
        .getById(db, 999)
        .then(questions => expect(questions).to.be.undefined);
    });

    context('with data present', () => {
      before('insert articles', () => 
        db('blogful_articles')
          .into('questions')
          .insert(testArticles)
      );
})

it(`getQuestionsById() resolves an questions by id from 'questions' table`, () => {
    const thirdId = 3
    const thirdTestQuestions = testQuestions[thirdId - 1]
    return QuestionsService.getQuestionsById(db, thirdId)
      .then(actual => {
        expect(actual).to.eql({
          id: thirdId,
          title: thirdTestQuestions.title,
          author: thirdTestQuestions.author,
          description: thirdTestQuestions.description
        });
      });
    })

it(`updateQuestions() updates an question from the 'question' table`, () => {
        const idOfQuestionsToUpdate = 3
        const newQuestionsData = {
          id: 'updated id',
          title: 'updated title',
          author: 'updated content',
          description: 'updated description',
        }
        return QuestionsService.updateQuestions(db, idOfQuestionsToUpdate, newQuestionsData)
          .then(() => QuestionsService.getQuestionsById(db, idOfQuestionsToUpdate))
          .then(questions => {
            expect(questions).to.eql({
              id: idOfQuetsionsToUpdate,
              ...newQuestionsData,
            })
          })
        })
    })
  })
})