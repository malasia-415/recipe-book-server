const QuestionsService = require('../src/questions/questions-service')
const knex = require('knex')
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
           connection: process.env.DATABASE_URL,
         })
       })
      before('cleanup', () => db.raw('TRUNCATE TABLE questions CASCADE;'));
      afterEach('cleanup', () => db.raw('TRUNCATE TABLE questions CASCADE;'))
      
      // after('destroy',() => db.destroy())

  describe('getAllQuestions()', () => {
    it('returns an empty array', () => {

      return QuestionsService
        .getAllQuestions(db)
        .then(questions => {
          expect(questions).to.eql([])
        });
    });
    context('with data present', () => {
      beforeEach('insert test articles', () =>
        db('questions')
          .insert(testQuestions)
      );
      it('returns all test questions', () => {
        return QuestionsService
          .getAllQuestions(db)
          .then(questions => expect(questions).to.eql(testQuestions));
      });
    });
  });
  describe('insertQuestions()' , () => {
    
    it('inserts record in db and returns question with new id', () => {
      const newQuestion = {
        id: 1,
        title: 'First question',
        description: 'This is your first question',
        author: 'Jone',
      }

      return QuestionsService.insertQuestion(db, newQuestion)
        .then(actual => {
          // console.log({actual})
          expect(actual).to.eql({
            id: 1,
            title: newQuestion.title,
            description: newQuestion.description,
            author: newQuestion.author,
          });
        });
    });


    it('throws not-null constraint error if title not provided', () => {    
      const newQuestion = {
        description: 'Test new description',
        author: 'James'
      };
      return QuestionsService 
        .insertQuestion(db, newQuestion)
        .then(
          () => expect.fail('db should throw error'),
          err => expect(err.message).to.include('not-null')
        );
    });
  });