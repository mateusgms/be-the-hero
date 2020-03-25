const express = require('express');

const ongController = require('./controllers/ongController');
const incidentsController = require('./controllers/incidentsController');
const profileController = require('./controllers/profileController');
const sessionsController = require('./controllers/sessionController');

const routes = express.Router();

routes.post('/sessions', sessionsController.create);

routes.post('/ongs', ongController.create);
routes.get('/ongs', ongController.index);

routes.get('/profile', profileController.index);

routes.post('/incidents', incidentsController.create);
routes.get('/incidents', incidentsController.index);
routes.delete('/incidents/:id', incidentsController.delete);

module.exports = routes;