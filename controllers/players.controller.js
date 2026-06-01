const Player = require('../models/player.model');
const ExcelJS = require('exceljs');

async function mostrarJugadores(req, res) {
    try {
        const players = await Player.obtenerTodosLosJugadores();
        const equipos = await Player.obtenerEquipos();

        res.render('admin/jugadores', {
            players,
            equipos,
            mensaje: req.query.mensaje || null,
            tipo: req.query.tipo || null
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
}

async function agregarJugador(req, res) {
    try {
        let { slug, nombre, comentario } = req.body;
        let teams = req.body.teams || [];

        if (!Array.isArray(teams)) {
            teams = [teams];
        }

        slug = slug.toUpperCase();
        nombre = nombre.toUpperCase();
        comentario = comentario ? comentario.toUpperCase() : '';

        const team = teams.join(', ');

        await Player.agregarJugador(slug, nombre, team, comentario);

        res.redirect(`/admin/jugadores?tipo=success&mensaje=Se ha agregado el jugador ${nombre}`);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
}

async function editarJugador(req, res) {
    try {
        const { id } = req.params;
        let { slug, nombre, comentario } = req.body;
        let teams = req.body.teams || [];

        if (!Array.isArray(teams)) {
            teams = [teams];
        }

        slug = slug.toUpperCase();
        nombre = nombre.toUpperCase();
        comentario = comentario ? comentario.toUpperCase() : '';

        const team = teams.join(', ');

        await Player.editarJugador(id, slug, nombre, team, comentario);

        res.redirect(`/admin/jugadores?tipo=warning&mensaje=Se ha editado el jugador ${nombre}`);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
}

async function eliminarJugador(req, res) {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        await Player.eliminarJugador(id);

        res.redirect(`/admin/jugadores?tipo=danger&mensaje=Se ha eliminado el jugador ${nombre}`);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
}

async function verJugador(req, res) {
    try {
        const { slug } = req.params;

        const player = await Player.obtenerJugadorPorSlug(slug);

        if (!player) {
            return res.status(404).render('principal/jugadorPendiente', {
                user: req.session.user || null,
                slug
            });
        }

        const socials = await Player.obtenerRedesPorJugador(player.nombre);

        res.render('PLAYERS/player', {
            player,
            socials
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
}
async function generarReporteJugadores(req, res) {

    const players = await Player.obtenerTodosLosJugadores();

    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet('Jugadores');

    worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'SLUG', key: 'slug', width: 20 },
        { header: 'NOMBRE', key: 'nombre', width: 25 },
        { header: 'TEAM', key: 'team', width: 40 },
        { header: 'COMENTARIO', key: 'comentario', width: 40 }
    ];

    players.forEach(player => {
        worksheet.addRow(player);
    });

    res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    res.setHeader(
        'Content-Disposition',
        'attachment; filename=jugadores.xlsx'
    );

    await workbook.xlsx.write(res);

    res.end();
}


module.exports = {
    verJugador,
    mostrarJugadores,
    agregarJugador,
    editarJugador,
    eliminarJugador,
    generarReporteJugadores
};