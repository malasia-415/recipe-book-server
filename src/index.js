const knex = require('knex')
const app = require('./app')
const {PORT, DATABASE_URL} = require('./config')

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
})

app.set('db', db)

// start the server
app.listen(PORT, () => {
    console.log('listening on port ' + PORT) ;
  });
