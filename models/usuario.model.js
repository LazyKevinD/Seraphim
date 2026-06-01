const db = require('../db/database');

async function obtenerTodos() {
    const result = await db.query('SELECT id, usuario, rol FROM usuarios ORDER BY id ASC');
    return result.rows;
}

async function agregar(usuario, password, rol) {
    await db.query(
        'INSERT INTO usuarios (usuario, password, rol) VALUES ($1, $2, $3)',
        [usuario, password, rol]
    );
}

async function editarRol(id, rol) {
    await db.query(
        'UPDATE usuarios SET rol = $1 WHERE id = $2',
        [rol, id]
    );
}

async function cambiarPassword(id, password) {
    await db.query(
        'UPDATE usuarios SET password = $1 WHERE id = $2',
        [password, id]
    );
}

async function eliminar(id) {
    await db.query('DELETE FROM usuarios WHERE id = $1', [id]);
}

module.exports = {
    obtenerTodos,
    agregar,
    editarRol,
    cambiarPassword,
    eliminar
};