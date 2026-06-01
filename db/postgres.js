const { Pool } = require('pg');

const db = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'kevin',
    database: 'pagina_seraphim',
    port: 5432
});

module.exports = db;