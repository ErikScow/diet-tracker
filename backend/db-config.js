const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: 'Kire1010*',
    host: 'localhost',
    port: 5432,
    database: 'diet_tracker'
})

module.exports = pool