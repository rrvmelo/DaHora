const express = require('express');

/*const AuthController = require('./controllers/AuthController');*/
const ProjectController = require('./controllers/ProjectController');
const OccupationController = require('./controllers/OccupationController');
const UserController = require('./controllers/UserController');
const BenefitController = require('./controllers/BenefitController');
const RecordController = require('./controllers/RecordController');
const routes = express.Router();

routes.get('/projects', ProjectController.index);

routes.get('/occupations', OccupationController.index);
routes.post('/occupations', OccupationController.store);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/benefits', BenefitController.index);
routes.post('/benefits', BenefitController.store);

routes.get('/records', RecordController.index);
routes.post('/records', RecordController.store);


module.exports = routes;