const { Pool } = require('pg');

const db = new Pool({
    host: 'bjayhkrdz6vvtubxvrok-postgresql.services.clever-cloud.com',
    user: 'usmay3qkpa6drvct9ehq',
    password: 'eRj727N9PSoQvOPWyw0npuy7felpMx',
    database: 'bjayhkrdz6vvtubxvrok',
    port: 50013,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = db;