const AnswerService = {
    getAllAnswers (knex) {
        return knex.select('*').from('answers')
    },
    getAnswerById(knex, id) {
        return knex
            .select('*')
            .from('answers')
            .where('id',id)
            .first()
    },
    insertAnswer(knex, newAnswers) {
        return knex
            .insert(newAnswers)
            .into('answers')
            .returning('*')
            .then( rows => {
                return rows
            })
         },

    getAllAnswersById(knex, questionId) {
    return knex
        .select('*')
        .from('answers')
        .where('question_id',questionId)
    },   
}

module.exports = AnswerService