const RedSocial = require('../models/redSocial.model');

async function mostrarRedes(req, res) {
    const redes = await RedSocial.obtenerTodas();

    res.render('admin/redes', {
        redes,
        mensaje: req.query.mensaje || null,
        tipo: req.query.tipo || null
    });
}

async function agregarRed(req, res) {
    let { nombre_red_social } = req.body;
    nombre_red_social = nombre_red_social.toUpperCase();

    await RedSocial.agregar(nombre_red_social);

    res.redirect('/admin/redes?tipo=success&mensaje=Red social agregada');
}

async function editarRed(req, res) {
    const { id } = req.params;
    let { nombre_red_social } = req.body;
    nombre_red_social = nombre_red_social.toUpperCase();

    await RedSocial.editar(id, nombre_red_social);

    res.redirect('/admin/redes?tipo=warning&mensaje=Red social editada');
}

async function eliminarRed(req, res) {
    const { id } = req.params;

    await RedSocial.eliminar(id);

    res.redirect('/admin/redes?tipo=danger&mensaje=Red social eliminada');
}

module.exports = {
    mostrarRedes,
    agregarRed,
    editarRed,
    eliminarRed
};