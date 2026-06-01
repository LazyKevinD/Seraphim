const MiembroEquipo = require('../models/miembroEquipo.model');
const Equipo = require('../models/equipo.model');
const Player = require('../models/player.model');

async function mostrarMiembros(req, res) {
    const miembros = await MiembroEquipo.obtenerTodos();
    const equipos = await Equipo.obtenerTodos();
    const players = await Player.obtenerTodosLosJugadores();

    res.render('admin/miembrosEquipo', {
        miembros,
        equipos,
        players,
        mensaje: req.query.mensaje || null,
        tipo: req.query.tipo || null
    });
}

async function agregarMiembro(req, res) {
    let { nombre_equipo, integrante } = req.body;

    nombre_equipo = nombre_equipo.toUpperCase();
    integrante = integrante.toUpperCase();

    await MiembroEquipo.agregar(nombre_equipo, integrante);

    res.redirect('/admin/miembros-equipo?tipo=success&mensaje=Miembro agregado');
}

async function eliminarMiembro(req, res) {
    let { nombre_equipo, integrante } = req.body;

    await MiembroEquipo.eliminar(nombre_equipo, integrante);

    res.redirect('/admin/miembros-equipo?tipo=danger&mensaje=Miembro eliminado');
}

module.exports = {
    mostrarMiembros,
    agregarMiembro,
    eliminarMiembro
};