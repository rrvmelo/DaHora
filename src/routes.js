const express = require('express');

const OccupationController = require('./controllers/OccupationController');
const UserController = require('./controllers/UserController');
const BenefitController = require('./controllers/BenefitController');
const RegisterController = require('./controllers/RegisterController');

const routes = express.Router();

routes.get('/occupations', OccupationController.index);
routes.post('/occupations', OccupationController.store);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/benefits', BenefitController.index);
routes.post('/benefits', BenefitController.store);

routes.get('/registers', RegisterController.index);
routes.post('/registers', RegisterController.store);

module.exports = routes;