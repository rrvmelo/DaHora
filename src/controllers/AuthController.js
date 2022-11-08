const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

module.exports = {
  async store(req, res) {
    const { cpf, senha } = req.body;

    const user = await User.findOne({
      attributes: ["id", "name", "email", "cpf", "senha"],
      where: {
        cpf: req.body.cpf,
      },
    });

    if (!user) return res.status(400).send({ 
      erro: true,
      mensagem: "Usuário ou senha inválido"
    });

    if (!(await bcrypt.compare(req.body.senha, user.senha))) {
      return res.status(400).send({       
        erro: true,
        mensagem: "Usuário ou senha inválido"
      });
    }

    user.senha = undefined;

    const token = jwt.sign(
      {
        id: user.id,
      },
      authConfig.secret,
      {
        expiresIn: 43200,
      }
    );

    res.send({ user, token });
  },
};
