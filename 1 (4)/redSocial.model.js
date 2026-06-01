const db = require('../db/database');

async function obtenerTodas() {
    const result = await db.query('SELECT * FROM redes_sociales ORDER BY id ASC');
    return result.rows;
}

async function agregar(nombre_red_social) {
    await db.query(
        'INSERT INTO redes_sociales (nombre_red_social) VALUES ($1)',
        [nombre_red_social]
    );
}

async function editar(id, nombre_red_social) {
    await db.query(
        'UPDATE redes_sociales SET nombre_red_social = $1 WHERE id = $2',
        [nombre_red_social, id]
    );
}

async function eliminar(id) {
    await db.query('DELETE FROM redes_sociales WHERE id = $1', [id]);
}

module.exports = {
    obtenerTodas,
    agregar,
    editar,
    eliminar
};