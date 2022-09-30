const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async store(req, res) {
    const { name, cpf, email, funcao, senha } = req.body;

    const user = await User.create({ name, cpf, email, funcao, senha });

    return res.json(user);
  }
};