const Pool = require('pg').Pool

const pool = new Pool({
  user: 'meghanmccue',
  password: '',
  host: 'localhost',
  port: 5432,
  database: 'meal_planner'
})

module.exports = pool