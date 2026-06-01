const Equipo = require('../models/equipo.model');

async function mostrarEquipos(req, res) {
    const equipos = await Equipo.obtenerTodos();

    res.render('admin/equipos', {
        equipos,
        mensaje: req.query.mensaje || null,
        tipo: req.query.tipo || null
    });
}

async function agregarEquipo(req, res) {
    let { nombre_equipo } = req.body;
    nombre_equipo = nombre_equipo.toUpperCase();

    await Equipo.agregar(nombre_equipo);

    res.redirect('/admin/equipos?tipo=success&mensaje=Equipo agregado');
}

async function editarEquipo(req, res) {
    const { id } = req.params;
    let { nombre_equipo } = req.body;
    nombre_equipo = nombre_equipo.toUpperCase();

    await Equipo.editar(id, nombre_equipo);

    res.redirect('/admin/equipos?tipo=warning&mensaje=Equipo editado');
}

async function eliminarEquipo(req, res) {
    const { id } = req.params;

    await Equipo.eliminar(id);

    res.redirect('/admin/equipos?tipo=danger&mensaje=Equipo eliminado');
}

module.exports = {
    mostrarEquipos,
    agregarEquipo,
    editarEquipo,
    eliminarEquipo
};