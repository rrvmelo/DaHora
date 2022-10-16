const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async store(req, res) {
    const user = req.body;

    user.senha = await bcrypt.hashSync(user.senha, 8);

    await User.create(user)
    .then(() => {
      return res.json({
        erro: false,
        mensagem: "Usuário cadastrado com sucesso!",
        user
      });
    }).catch(() => {
      return res.status(400).json ({
        erro: true,
        mensagem: "Erro: Usuário não cadastrado, verifique os dados inseridos!"
      });
    });
  }
};