const db = require('../db/database');

async function obtenerVistaGeneral() {
    const result = await db.query(
        'SELECT * FROM vista_general_seraphim ORDER BY jugador'
    );

    return result.rows;
}

module.exports = {
    obtenerVistaGeneral
};