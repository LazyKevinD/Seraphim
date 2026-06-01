const db = require('../db/database');

async function obtenerUsuariosPorRol() {

    const result = await db.query(`
        SELECT rol, COUNT(*) as total
        FROM usuarios
        GROUP BY rol
        ORDER BY rol
    `);

    return result.rows;
}

module.exports = {
    obtenerUsuariosPorRol
};