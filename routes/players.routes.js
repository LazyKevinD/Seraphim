const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/:slug', async (req, res) => {
    try {
        const slug = req.params.slug;

        const [players] = await db.query(
            'SELECT * FROM players WHERE slug = ?',
            [slug]
        );

        if (players.length === 0) {
            return res.status(404).send('Jugador no encontrado');
        }

        const player = players[0];

        const [socials] = await db.query(
            'SELECT red_social AS plataforma, url FROM jugador_red_social WHERE nombre_jugador = ?',
            [player.nombre]
        );

        res.render('PLAYERS/player', {
            player,
            socials
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});

module.exports = router;