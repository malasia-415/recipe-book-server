const AnswerService = require('../src/answers/answer-service')
const knex = require('knex')
    let db
    let testAnswers = [
        {
            title: 'First answer',
            description: 'This is your first answer',
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
           connection: process.env.DATABASE_URL,
         })
       })
      before('cleanup', () => db.raw('TRUNCATE TABLE answers CASCADE;'));
      afterEach('cleanup', () => db.raw('TRUNCATE TABLE answers CASCADE;'))
      
      after('destroy db connection', () => db.destroy())
      
  describe('getAllAnswers()', () => {
    it('returns an empty array', () => {
      return AnswerService
        .getAllAnswers(db)
        .then(answers => expect(answers).to.eql([])
        );
    }); 
 });


  describe('insertAnswers()' , () => {
    it('inserts record in db and returns answer with new id', () => {

      const newAnswer = {
        id: 1,
        answer: 'First answer',
        description: 'This is your first answer',
        author: 'Jone',
    };

    it('throws not-null constraint error if title not provided', () => {    
      const newAnswer = {
        id: 1,
        answer: 'New test',
        description: 'Test new description',
        author: 'James'
      };

      return AnswerService.insertAnswer(db, newAnswer)
        .then(actual => {
          expect(actual).to.eql({
            id: 1,
            answer: newAnswer.answer,
            description: newAnswer.description,
            author: newAnswer.author,
          });
        });
      });
    
   });
});




describe('getAnswersById()', () => {

    context('with data present', () => {
        before('answers', () => 
         db('answers')
        .insert(testAnswers)
     );
  });
});



      
describe('deleteAnswer()', () => {

    context('with data present', () => {
       before('insert answer', () => 
          db('answers')
         .insert(testAnswers)
    );
  });
});
    


describe('updateAnswer()', () => {

    context('with data present', () => {
       before('answers', () => 
        db('answers')
        .insert(testAnswers)
    );
  });
});