const db = require('../db/database');

async function obtenerTodas() {
    const result = await db.query('SELECT * FROM jugador_red_social ORDER BY nombre_jugador ASC');
    return result.rows;
}

async function agregar(nombre_jugador, red_social, url) {
    await db.query(
        'INSERT INTO jugador_red_social (nombre_jugador, red_social, url) VALUES ($1, $2, $3)',
        [nombre_jugador, red_social, url]
    );
}

async function eliminar(nombre_jugador, red_social, url) {
    await db.query(
        'DELETE FROM jugador_red_social WHERE nombre_jugador = $1 AND red_social = $2 AND url = $3',
        [nombre_jugador, red_social, url]
    );
}

module.exports = {
    obtenerTodas,
    agregar,
    eliminar
};