const Dashboard = require('../models/dashboard.model');

async function mostrarDashboard(req, res) {

    const roles = await Dashboard.obtenerUsuariosPorRol();

    res.render('admin/dashboard', {
        user: req.session.user,
        roles
    });
}

module.exports = {
    mostrarDashboard
};