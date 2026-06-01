const ExcelJS = require('exceljs');
const Reporte = require('../models/reporte.model');

async function mostrarVista(req, res) {
    const datos = await Reporte.obtenerVistaGeneral();

    res.render('admin/reporteVista', {
        datos,
        user: req.session.user || null
    });
}

async function generarExcel(req, res) {
    const datos = await Reporte.obtenerVistaGeneral();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte Seraphim');

    worksheet.columns = [
        { header: 'Jugador', key: 'jugador', width: 25 },
        { header: 'Equipo', key: 'nombre_equipo', width: 30 },
        { header: 'Red Social', key: 'red_social', width: 20 },
        { header: 'URL', key: 'url', width: 50 }
    ];

    datos.forEach(dato => {
        worksheet.addRow(dato);
    });

    res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    res.setHeader(
        'Content-Disposition',
        'attachment; filename=reporte_seraphim.xlsx'
    );

    await workbook.xlsx.write(res);
    res.end();
}

module.exports = {
    mostrarVista,
    generarExcel
};