const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', async (req, res) => {
    const [redes] = await db.query('SELECT * FROM redes_sociales');

    res.render('admin/redes', {
        redes,
        mensaje: req.query.mensaje || null,
        tipo: req.query.tipo || null
    });
});

router.post('/agregar', async (req, res) => {
    const { nombre_red_social } = req.body;

    await db.query(
        'INSERT INTO redes_sociales (nombre_red_social) VALUES ($1)',
        [nombre_red_social]
    );

    res.redirect(`/admin/redes?tipo=success&mensaje=Se ha agregado la red social ${nombre_red_social}`);
});

router.post('/editar/:id', async (req, res) => {
    const { nombre_red_social } = req.body;

    await db.query(
        'UPDATE redes_sociales SET nombre_red_social = $1 WHERE id = $2',
        [nombre_red_social, req.params.id]
    );

    res.redirect(`/admin/redes?tipo=success&mensaje=Se ha editado la red social ${nombre_red_social}`);
});

router.post('/eliminar/:id', async (req, res) => {
    const { nombre_red_social } = req.body;

    await db.query(
        'DELETE FROM redes_sociales WHERE id = $1',
        [req.params.id]
    );

    res.redirect(`/admin/redes?tipo=danger&mensaje=Se ha eliminado la red social ${nombre_red_social}`);
});

module.exports = router;