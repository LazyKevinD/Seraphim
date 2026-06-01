const JugadorRed = require('../models/jugadorRedSocial.model');
const Player = require('../models/player.model');
const RedSocial = require('../models/redSocial.model');

async function mostrarJugadorRedes(req, res) {
    const jugadorRedes = await JugadorRed.obtenerTodas();
    const players = await Player.obtenerTodosLosJugadores();
    const redes = await RedSocial.obtenerTodas();

    res.render('admin/jugadorRedes', {
        jugadorRedes,
        players,
        redes,
        mensaje: req.query.mensaje || null,
        tipo: req.query.tipo || null
    });
}

async function agregarJugadorRed(req, res) {
    let { nombre_jugador, red_social, url } = req.body;

    nombre_jugador = nombre_jugador.toUpperCase();
    red_social = red_social.toUpperCase();

    await JugadorRed.agregar(nombre_jugador, red_social, url);

    res.redirect('/admin/jugador-redes?tipo=success&mensaje=Red agregada al jugador');
}

async function eliminarJugadorRed(req, res) {
    const { nombre_jugador, red_social, url } = req.body;

    await JugadorRed.eliminar(nombre_jugador, red_social, url);

    res.redirect('/admin/jugador-redes?tipo=danger&mensaje=Red eliminada del jugador');
}

module.exports = {
    mostrarJugadorRedes,
    agregarJugadorRed,
    eliminarJugadorRed
};