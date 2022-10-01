const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Occupation = require('../models/Occupation');
const User = require('../models/User');
const Benefit = require('../models/Benefit');
const Register = require('../models/Register');

const connection = new Sequelize(dbConfig);

Occupation.init(connection);
User.init(connection);
Benefit.init(connection);
Register.init(connection);


module.exports = connection;