const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");
const bcrypt = require("bcrypt");


module.exports = {
    //Validador de usuário para alterar senha
  async validator(req, res) {
    try {
      const { cpf } = req.body;
      const { email } = req.body;
      const user = await User.findOne({ where: { cpf: cpf, email: email } });

      if (!user) {
        return res.status(400).json({
          erro: true,
          mensagem: "Dados incorretos! Verifique os dados informados!",
        });
      } else if (user.ativo == 0) {
        return res.status(400).json({
          erro: true,
          mensagem: "Usuário Inativo, procure o departamento responsavel!",
        });
      } else {
        const token = jwt.sign(
          {
            id: user.id,
          },
          authConfig.secret,
          {
            expiresIn: 300,
          }
        );
        return res.send({
          erro: false,
          mensagem: "Digite sua nova senha",
          user: {
            id: user.id,
            name: user.name,
            cpf: user.cpf,
            email: user.email,
          },
          token,
        });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  // Alterando a senha
  async update(req, res) {
    try {
      const { userId } = req.params;
      const { senha } = req.body;
      const userOrigin = req.userId;
      if (userId != userOrigin) {
        return res.status(401).send({
          erro: true,
          mensagem:
            "Opa! Os dados de autenticação estão incorretos, por favor reinicie a operação.",
        });
      }

      const user = await User.findByPk(userId);

      user.senha = await bcrypt.hashSync(senha, 8);

      await User.update(user, {
        where: { id: userId },
      });

      return res.status(200).send({
        erro: false,
        mensagem: "Senha atualizada com sucesso!",
        user,
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
};
