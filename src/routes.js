const express = require('express');
const { eAdmin } = require('./middlewares/auth')

const AuthController = require('./controllers/AuthController');
const ProjectController = require('./controllers/ProjectController');
const OccupationController = require('./controllers/OccupationController');
const UserController = require('./controllers/UserController');
const BenefitController = require('./controllers/BenefitController');
const RecordController = require('./controllers/RecordController');
const routes = express.Router();



routes.post('/auth', AuthController.store);

routes.get('/projects', ProjectController.index);

routes.get('/occupations', eAdmin, OccupationController.index);
routes.post('/occupations', eAdmin, OccupationController.store);

routes.get('/users', eAdmin, UserController.index);
routes.post('/users', UserController.store);

routes.get('/benefits', eAdmin, BenefitController.index);
routes.post('/benefits', eAdmin, BenefitController.store);

routes.get('/records', RecordController.index);
routes.post('/records', RecordController.store);


module.exports = routes;