const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');

async function mostrarUsuarios(req, res) {
    const usuarios = await Usuario.obtenerTodos();

    res.render('admin/usuarios', {
        usuarios,
        mensaje: req.query.mensaje || null,
        tipo: req.query.tipo || null
    });
}

async function agregarUsuario(req, res) {
    let { usuario, password, rol } = req.body;

    usuario = usuario.toUpperCase();

    const passwordEncriptada = await bcrypt.hash(password, 10);

    await Usuario.agregar(usuario, passwordEncriptada, rol);

    res.redirect('/admin/usuarios?tipo=success&mensaje=Usuario agregado');
}

async function editarRolUsuario(req, res) {
    const { id } = req.params;
    const { rol } = req.body;

    await Usuario.editarRol(id, rol);

    res.redirect('/admin/usuarios?tipo=warning&mensaje=Rol actualizado');
}

async function cambiarPasswordUsuario(req, res) {
    const { id } = req.params;
    const { password } = req.body;

    const passwordEncriptada = await bcrypt.hash(password, 10);

    await Usuario.cambiarPassword(id, passwordEncriptada);

    res.redirect('/admin/usuarios?tipo=warning&mensaje=Contraseña actualizada');
}

async function eliminarUsuario(req, res) {
    const { id } = req.params;

    await Usuario.eliminar(id);

    res.redirect('/admin/usuarios?tipo=danger&mensaje=Usuario eliminado');
}

module.exports = {
    mostrarUsuarios,
    agregarUsuario,
    editarRolUsuario,
    cambiarPasswordUsuario,
    eliminarUsuario
};