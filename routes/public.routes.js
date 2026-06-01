const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/CART', (req, res) => {
    res.render('PRINCIPAL/CART');
});

router.get('/TEAMS', (req, res) => {
    res.render('PRINCIPAL/EQUIPOS');
});

router.get('/INFO', (req, res) => {
    res.render('PRINCIPAL/INFO');
});

router.get('/PRODUCTOS', (req, res) => {
    res.render('PRINCIPAL/PRODUCTOS');
});

router.get('/COACHES', (req, res) => {
    res.render('STAFF/COACHES');
});

router.get('/STAFF_MEMBERS', (req, res) => {
    res.render('STAFF/STAFF_MEMBERS');
});

router.get('/SERAPHIM_OVERWATCH_MEMBERS', (req, res) => {
    res.render('TEAM_MEMBERS/SERAPHIM_OVERWATCH_MEMBERS');
});

router.get('/SERAPHIM_ROCKET_MEMBERS', (req, res) => {
    res.render('TEAM_MEMBERS/SERAPHIM_ROCKET_MEMBERS');
});

router.get('/SERENITY_OVERWATCH_MEMBERS', (req, res) => {
    res.render('TEAM_MEMBERS/SERENITY_OVERWATCH_MEMBERS');
});

router.get('/VOID_OVERWATCH_MEMBERS', (req, res) => {
    res.render('TEAM_MEMBERS/VOID_OVERWATCH_MEMBERS');
});

router.get('/FORTNITE_TEAMS', (req, res) => {
    res.render('TEAMS/FORTNITE_TEAMS');
});

router.get('/MARVELRIVALS_TEAMS', (req, res) => {
    res.render('TEAMS/MARVELRIVALS_TEAMS');
});

router.get('/OVERWATCH_TEAMS', (req, res) => {
    res.render('TEAMS/OVERWATCH_TEAMS');
});

router.get('/ROCKET_TEAMS', (req, res) => {
    res.render('TEAMS/ROCKET_TEAMS');
});

router.get('/VALORANT_TEAMS', (req, res) => {
    res.render('TEAMS/VALORANT_TEAMS');
});

module.exports = router;