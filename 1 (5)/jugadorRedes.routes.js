const express = require('express');
const router = express.Router();

const jugadorRedesController = require('../controllers/jugadorRedes.controller');

router.get('/', jugadorRedesController.mostrarJugadorRedes);
router.post('/agregar', jugadorRedesController.agregarJugadorRed);
router.post('/eliminar', jugadorRedesController.eliminarJugadorRed);

module.exports = router;