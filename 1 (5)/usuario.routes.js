const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuario.controller');

router.get('/', usuariosController.mostrarUsuarios);
router.post('/agregar', usuariosController.agregarUsuario);
router.post('/editar-rol/:id', usuariosController.editarRolUsuario);
router.post('/cambiar-password/:id', usuariosController.cambiarPasswordUsuario);
router.post('/eliminar/:id', usuariosController.eliminarUsuario);

module.exports = router;