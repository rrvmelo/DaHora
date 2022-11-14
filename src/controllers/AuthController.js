const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

module.exports = {
  async store(req, res) {
    const { cpf, senha } = req.body;

    const user = await User.findOne({
      attributes: ["id", "name", "email", "cpf", "senha", "isRH"],
      where: {
        cpf: req.body.cpf,
      },
    });

    if (!user) return res.status(400).send({ error: "Usuário não encontrado" });

    if (!(await bcrypt.compare(req.body.senha, user.senha))) {
      return res.status(400).send({ error: "Senha Inválida" });
    }

        console.log(user)

        const token = jwt.sign(
            {
                id: user.id,
                userName: user.name
            }, 
            authConfig.secret, {
            expiresIn: 43200,
        });

      user.senha = undefined;

    res.send({ user, token });
  },
};
