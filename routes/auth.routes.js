const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const axios = require('axios');
const db = require('../db/database');

router.get('/login', (req, res) => {
    res.render('principal/login', {
        mensaje: req.query.mensaje || null
    });
});

function validarUsuario(usuario) {
    return /^[A-Za-z0-9]{4,}$/.test(usuario);
}

function validarPassword(password) {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])\S{6,}$/.test(password);
}

router.post('/login', async (req, res) => {
    let { usuario, password } = req.body;

    usuario = usuario ? usuario.trim() : '';

    if (!validarUsuario(usuario)) {
        return res.render('principal/login', {
            mensaje: 'Usuario inválido',
            usuario
        });
    }

    if (!password || password.includes(' ')) {
        return res.render('principal/login', {
            mensaje: 'Contraseña inválida',
            usuario
        });
    }

    const captcha = req.body['g-recaptcha-response'];

    if (!captcha) {
        return res.render('principal/login', {
        mensaje: 'Completa el captcha',
        usuario
    });
    }

    try {
        const response = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            null,
            {
                params: {
                    secret: process.env.RECAPTCHA_SECRET,
                    response: captcha
                }
            }
        );

        if (!response.data.success) {
            return res.render('principal/login', {
                mensaje: 'Captcha inválido',
                usuario,
                password
                });
        }

        const result = await db.query(
            'SELECT * FROM usuarios WHERE usuario = $1',
            [usuario]
        );

        const usuarios = result.rows;

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

    } catch (error) {
        console.error(error);
        res.redirect('/login?mensaje=Error al validar captcha');
    }
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
    res.render('principal/registro', {
        mensaje: null,
        usuario: ''
    });
});

router.post('/registro', async (req, res) => {
    let { usuario, password, confirmarPassword } = req.body;

    usuario = usuario ? usuario.trim() : '';

    if (!usuario || !password || !confirmarPassword) {
        return res.render('principal/registro', {
            mensaje: 'Todos los campos son obligatorios',
            usuario
        });
    }

    if (!validarUsuario(usuario)) {
        return res.render('principal/registro', {
            mensaje: 'El usuario debe tener mínimo 4 caracteres y solo letras y números',
            usuario
        });
    }

    if (!validarPassword(password)) {
        return res.render('principal/registro', {
            mensaje: 'La contraseña debe tener mínimo 6 caracteres, una mayúscula, un número y un carácter especial',
            usuario
        });
    }

    if (password !== confirmarPassword) {
        return res.render('principal/registro', {
            mensaje: 'Las contraseñas no coinciden',
            usuario
        });
    }

    try {
        const result1 = await db.query(
            'SELECT id FROM usuarios WHERE usuario = $1',
            [usuario]
        );

        if (result1.rows.length > 0) {
            return res.render('principal/registro', {
                mensaje: 'El usuario ya existe',
                usuario
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await db.query(
            'INSERT INTO usuarios (usuario, password, rol) VALUES ($1, $2, $3)',
            [usuario, passwordHash, 'REGISTRADO']
        );

        res.redirect('/login?mensaje=Cuenta creada correctamente');

    } catch (error) {
        console.error(error);

        return res.render('principal/registro', {
            mensaje: 'Error al registrar usuario',
            usuario
        });
    }
});

module.exports = router;