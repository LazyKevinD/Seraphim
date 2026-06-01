const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'kevin',
    database: 'pagina_seraphim',
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = db.promise();