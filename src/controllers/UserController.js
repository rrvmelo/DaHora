const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  },

  async indexs(req, res) {
    const { userId } = req.params;
    const users = await User.findByPk(userId, {
      attributes: { exclude: "senha" },
    });
    return res.json(users);
  },

  async store(req, res) {
    const user = req.body;
    const userData = await User.findOne({ where: { cpf: user.cpf } });
    if (userData == undefined || user.cpf != userData.cpf) {
      user.senha = await bcrypt.hashSync(user.senha, 8);

      await User.create(user)
        .then(() => {
          return res.status(200).json({
            erro: false,
            mensagem: "Usuário cadastrado com sucesso!",
            user, //Tirar antes de publicar
          });
        })
        .catch(() => {
          return res.status(400).json({
            erro: true,
            mensagem:
              "Erro: Usuário não cadastrado, verifique os dados inseridos!",
          });
        });
    } else {
      return res.status(409).json({
        erro: true,
        mensagem: "Erro: CPF já cadastrado!",
      });
    }
  },

  async update(req, res) {
    const user = req.body;
    const userData = await User.findOne({
      where: { id: user.id },
      attributes: { exclude: ["senha"] },
    });
    if (userData == undefined) {
      return res.status(400).json({
        erro: true,
        mensagem: "Não atualizado, verifique os dados informados!",
      });
    } else if (user.id != userData.id) {
      return res.status(400).json({
        erro: true,
        mensagem: "Não atualizado, verifique os dados informados!",
      });
    } else {
      await User.update(user, {
        where: { id: user.id },
      });

      return res.status(200).json({
        erro: false,
        mensagem: "Atualizado!",
        user, //Tirar antes de publicar
      });
    }
  },
};
