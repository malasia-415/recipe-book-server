const QuestionsService = {
    getAllQuestions (knex) {
        return knex.select('*').from('questions')
    },
    getQuestionById(knex, id) {
        return knex
            .select('*')
            .from('questions')
            .where('id',id)
            .first()
    },
    insertQuestion(knex, newQuestion) {
        return knex
            .insert(newQuestion)
            .into('questions')
            .returning('*')
            .then( rows => {
                return rows[0]
            })
         },
}

module.exports = QuestionsService