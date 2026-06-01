const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', async (req, res) => {
    const [players] = await db.query('SELECT * FROM players');
    const [equipos] = await db.query('SELECT * FROM equipos');

    res.render('admin/jugadores', {
        players,
        equipos,
        mensaje: req.query.mensaje || null,
        tipo: req.query.tipo || null
    });
});

router.post('/agregar', async (req, res) => {
    const { slug, nombre, comentario } = req.body;
    let teams = req.body.teams || [];

    if (!Array.isArray(teams)) {
        teams = [teams];
    }

    const team = teams.join(', ');

    await db.query(
        'INSERT INTO players (slug, nombre, team, comentario) VALUES (?, ?, ?, ?)',
        [slug, nombre, team, comentario]
    );

    res.redirect(`/admin/jugadores?tipo=success&mensaje=Se ha agregado el jugador ${nombre}`);
});

router.post('/editar/:id', async (req, res) => {
    const { slug, nombre, comentario } = req.body;
    let teams = req.body.teams || [];

    if (!Array.isArray(teams)) {
        teams = [teams];
    }

    const team = teams.join(', ');

    await db.query(
        'UPDATE players SET slug = ?, nombre = ?, team = ?, comentario = ? WHERE id = ?',
        [slug, nombre, team, comentario, req.params.id]
    );

    res.redirect(`/admin/jugadores?tipo=success&mensaje=Se ha editado el jugador ${nombre}`);
});

router.post('/eliminar/:id', async (req, res) => {
    const { nombre } = req.body;

    await db.query(
        'DELETE FROM players WHERE id = $1',
        [req.params.id]
    );

    res.redirect(`/admin/jugadores?tipo=danger&mensaje=Se ha eliminado el jugador ${nombre}`);
});

module.exports = router;