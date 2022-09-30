const { Router } = require('express');
const OccupationController = require('./controllers/OccupationController');
const UserController = require('./controllers/UserController');
const BenefitController = require('./controllers/BenefitController');
const RegisterController = require('./controllers/RegisterController');

const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.json('Hi')
});

routes.post('/occupations', OccupationController.store);
routes.post('/users', UserController.store);
routes.post('/benefits', BenefitController.store);
routes.post('/registers', RegisterController.store);

module.exports = routes;