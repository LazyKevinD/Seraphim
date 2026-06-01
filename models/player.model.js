const db = require('../db/database');

async function obtenerJugadorPorSlug(slug) {
    const result = await db.query(
        'SELECT * FROM players WHERE slug = $1',
        [slug]
    );

    return result.rows[0];
}

async function obtenerRedesPorJugador(nombre) {
    const result = await db.query(
        'SELECT red_social AS plataforma, url FROM jugador_red_social WHERE nombre_jugador = $1',
        [nombre]
    );

    return result.rows;
}

async function obtenerTodosLosJugadores() {
    const result = await db.query('SELECT * FROM players ORDER BY id ASC');
    return result.rows;
}

async function obtenerEquipos() {
    const result = await db.query('SELECT * FROM equipos ORDER BY id ASC');
    return result.rows;
}


async function agregarJugador(slug, nombre, team, comentario) {
    const client = await db.connect();

    try {
        await client.query('BEGIN');

        await client.query(
            `INSERT INTO players
            (slug, nombre, team, comentario)
            VALUES ($1, $2, $3, $4)`,
            [slug, nombre, team, comentario]
        );

        const equipos = team
            ? team.split(',').map(equipo => equipo.trim()).filter(equipo => equipo !== '')
            : [];

        for (const equipo of equipos) {
            await client.query(
                `INSERT INTO miembros_equipo
                (nombre_equipo, integrante)
                VALUES ($1, $2)`,
                [equipo, nombre]
            );
        }

        await client.query('COMMIT');

    } catch (error) {
        await client.query('ROLLBACK');
        throw error;

    } finally {
        client.release();
    }
}

async function editarJugador(id, slug, nombre, team, comentario) {
    await db.query(
        'UPDATE players SET slug = $1, nombre = $2, team = $3, comentario = $4 WHERE id = $5',
        [slug, nombre, team, comentario, id]
    );
}

async function eliminarJugador(id) {
    await db.query(
        'DELETE FROM players WHERE id = $1',
        [id]
    );
}

module.exports = {
    obtenerJugadorPorSlug,
    obtenerRedesPorJugador,
    obtenerTodosLosJugadores,
    obtenerEquipos,
    agregarJugador,
    editarJugador,
    eliminarJugador
};