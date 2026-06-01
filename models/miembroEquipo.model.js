const db = require('../db/database');

async function obtenerTodos() {
    const result = await db.query(
        'SELECT * FROM miembros_equipo ORDER BY nombre_equipo ASC'
    );

    return result.rows;
}

async function agregar(nombre_equipo, integrante) {
    await db.query(
        'INSERT INTO miembros_equipo (nombre_equipo, integrante) VALUES ($1, $2)',
        [nombre_equipo, integrante]
    );
}

async function eliminar(nombre_equipo, integrante) {
    await db.query(
        'DELETE FROM miembros_equipo WHERE nombre_equipo = $1 AND integrante = $2',
        [nombre_equipo, integrante]
    );
}

module.exports = {
    obtenerTodos,
    agregar,
    eliminar
};