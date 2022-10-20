const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Occupation = require("../models/Occupation");
const User = require("../models/User");
const Benefit = require("../models/Benefit");
const Register = require("../models/Record");

const connection = new Sequelize(dbConfig);

Occupation.init(connection);
User.init(connection);
Benefit.init(connection);
Register.init(connection);

User.associate(connection.models);
Register.associate(connection.models);


module.exports = connection;
