const express = require('express');
const router = express.Router();

const reporteController = require('../controllers/reporte.controller');

router.get('/', reporteController.mostrarVista);
router.get('/excel', reporteController.generarExcel);

module.exports = router;