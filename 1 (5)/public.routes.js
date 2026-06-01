const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/cart', (req, res) => {
    res.render('principal/cart');
});

router.get('/teams', (req, res) => {
    res.render('principal/equipos');
});

router.get('/info', (req, res) => {
    res.render('principal/info');
});

router.get('/productos', (req, res) => {
    res.render('principal/productos');
});

router.get('/coaches', (req, res) => {
    res.render('staff/coaches');
});

router.get('/staff-members', (req, res) => {
    res.render('staff/staff-members');
});

router.get('/seraphim_overwatch_members', (req, res) => {
    res.render('team_members/seraphim_overwatch_members');
});

router.get('/seraphim_rocket_members', (req, res) => {
    res.render('team_members/seraphim_rocket_members');
});

router.get('/serenity_overwatch_members', (req, res) => {
    res.render('team_members/serenity_overwatch_members');
});

router.get('/void_overwatch_members', (req, res) => {
    res.render('team_members/void_overwatch_members');
});

router.get('/fortnite_teams', (req, res) => {
    res.render('teams/fortnite_teams');
});

router.get('/marvelrivals_teams', (req, res) => {
    res.render('teams/marvelrivals_teams');
});

router.get('/overwatch_teams', (req, res) => {
    res.render('teams/overwatch_teams');
});

router.get('/rocket_teams', (req, res) => {
    res.render('teams/rocket_teams');
});

router.get('/valorant_teams', (req, res) => {
    res.render('teams/valorant_teams');
});

module.exports = router;