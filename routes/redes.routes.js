const express = require('express');
const router = express.Router();

const redesController = require('../controllers/redes.controller');

router.get('/', redesController.mostrarRedes);
router.post('/agregar', redesController.agregarRed);
router.post('/editar/:id', redesController.editarRed);
router.post('/eliminar/:id', redesController.eliminarRed);

module.exports = router;