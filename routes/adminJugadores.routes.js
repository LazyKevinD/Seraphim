const express = require('express');
const router = express.Router();

const adminPlayerController = require('../controllers/players.controller');

router.get('/', adminPlayerController.mostrarJugadores);

router.post('/agregar', adminPlayerController.agregarJugador);

router.post('/editar/:id', adminPlayerController.editarJugador);

router.post('/eliminar/:id', adminPlayerController.eliminarJugador);

module.exports = router;