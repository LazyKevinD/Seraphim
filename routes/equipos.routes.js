const express = require('express');
const router = express.Router();

const equiposController = require('../controllers/equipos.controller');

router.get('/', equiposController.mostrarEquipos);
router.post('/agregar', equiposController.agregarEquipo);
router.post('/editar/:id', equiposController.editarEquipo);
router.post('/eliminar/:id', equiposController.eliminarEquipo);

module.exports = router;