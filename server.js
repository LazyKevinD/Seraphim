require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const db = require('./db/database');


const app = express();
//const PORT = 3000;
const PORT = process.env.PORT || 8080;

const adminPlayerRoutes = require('./routes/adminJugadores.routes');
const equiposRoutes = require('./routes/equipos.routes');
const redesRoutes = require('./routes/redes.routes');
const miembrosEquipoRoutes = require('./routes/miembrosEquipo.routes');
const jugadorRedesRoutes = require('./routes/jugadorRedes.routes');
const usuariosRoutes = require('./routes/usuario.routes');
const reporteRoutes = require('./routes/reporte.routes');



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'seraphim_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

function soloAdmin(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    if (req.session.user.rol !== 'ADMIN') {
        return res.status(403).render('principal/403');
    }

    next();
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', require('./routes/public.routes'));
app.use('/', require('./routes/auth.routes'));
app.use('/PLAYERS', require('./routes/players.routes'));

app.use('/admin/reporte-vista', soloAdmin, require('./routes/reporte.routes'));

app.use('/admin/jugadores', soloAdmin, require('./routes/adminJugadores.routes'));
app.use('/admin/redes', soloAdmin, require('./routes/redes.routes'));
app.use('/admin/equipos', soloAdmin, require('./routes/equipos.routes'));
app.use('/admin/jugador-redes', soloAdmin, require('./routes/jugadorRedes.routes'));
app.use('/admin/miembros-equipo', soloAdmin, require('./routes/miembrosEquipo.routes'));
app.use('/admin/usuarios', soloAdmin, require('./routes/usuario.routes'));
app.use('/admin/dashboard', soloAdmin, require('./routes/dashboard.routes'));

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});