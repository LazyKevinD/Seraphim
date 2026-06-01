const express = require('express');
const router = express.Router();

const miembrosController = require('../controllers/miembrosEquipo.controller');

router.get('/', miembrosController.mostrarMiembros);
router.post('/agregar', miembrosController.agregarMiembro);
router.post('/eliminar', miembrosController.eliminarMiembro);

module.exports = router;