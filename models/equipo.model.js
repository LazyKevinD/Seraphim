const db = require('../db/database');

async function obtenerTodos() {
    const result = await db.query('SELECT * FROM equipos ORDER BY id ASC');
    return result.rows;
}

async function agregar(nombre_equipo) {
    await db.query(
        'INSERT INTO equipos (nombre_equipo) VALUES ($1)',
        [nombre_equipo]
    );
}

async function editar(id, nombre_equipo) {
    await db.query(
        'UPDATE equipos SET nombre_equipo = $1 WHERE id = $2',
        [nombre_equipo, id]
    );
}

async function eliminar(id) {
    await db.query('DELETE FROM equipos WHERE id = $1', [id]);
}

module.exports = {
    obtenerTodos,
    agregar,
    editar,
    eliminar
};