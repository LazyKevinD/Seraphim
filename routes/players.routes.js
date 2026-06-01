const express = require('express');
const router = express.Router();

const playerController = require('../controllers/players.controller');

router.get('/:slug', playerController.verJugador);

module.exports = router;