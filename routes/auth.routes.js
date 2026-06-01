const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../db/database');

router.get('/login', (req, res) => {
    res.render('PRINCIPAL/LOGIN', {
        mensaje: req.query.mensaje || null
    });
});

router.post('/login', async (req, res) => {
    const { usuario, password } = req.body;

    const [usuarios] = await db.query(
        'SELECT * FROM usuarios WHERE usuario = $1',
        [usuario]
    );

    if (usuarios.length === 0) {
        return res.redirect('/login?mensaje=Usuario no encontrado');
    }

    const user = usuarios[0];

    const passwordCorrecta = await bcrypt.compare(password, user.password);

    if (!passwordCorrecta) {
        return res.redirect('/login?mensaje=Contraseña incorrecta');
    }

    req.session.user = {
        id: user.id,
        usuario: user.usuario,
        rol: user.rol
    };

    res.redirect('/');
});

router.post('/login/invitado', (req, res) => {
    req.session.user = {
        id: 0,
        usuario: 'Invitado',
        rol: 'INVITADO'
    };

    res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

router.get('/registro', (req, res) => {
    res.render('PRINCIPAL/REGISTRO', {
        mensaje: req.query.mensaje || null
    });
});

router.post('/registro', async (req, res) => {
    const { usuario, password, confirmarPassword } = req.body;

    if (!usuario || !password || !confirmarPassword) {
        return res.redirect('/registro?mensaje=Todos los campos son obligatorios');
    }

    if (password !== confirmarPassword) {
        return res.redirect('/registro?mensaje=Las contraseñas no coinciden');
    }

    try {
        const [existeUsuario] = await db.query(
            'SELECT id FROM usuarios WHERE usuario = $1',
            [usuario]
        );

        if (existeUsuario.length > 0) {
            return res.redirect('/registro?mensaje=El usuario ya existe');
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await db.query(
            'INSERT INTO usuarios (usuario, password, rol) VALUES ($1, $2, $3)',
            [usuario, passwordHash, 'REGISTRADO']
        );

        res.redirect('/login?mensaje=Cuenta creada correctamente');

    } catch (error) {
        console.error(error);
        res.redirect('/registro?mensaje=Error al registrar usuario');
    }
});

module.exports = router;