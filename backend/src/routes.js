const express = require('express');

const ongController = require('./controllers/OngController');
const incidentsController = require('./controllers/IncidentsController');
const profileController = require('./controllers/ProfileController');
const sessionsController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', sessionsController.create);

routes.post('/ongs', ongController.create);
routes.get('/ongs', ongController.index);

routes.get('/profile', profileController.index);

routes.post('/incidents', incidentsController.create);
routes.get('/incidents', incidentsController.index);
routes.delete('/incidents/:id', incidentsController.delete);

module.exports = routes;