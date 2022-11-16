const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");
const { promisify } = require("util");

module.exports = {
  // Token para alterar senha
  ePass: async function (req, res, next) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader)
        return res.status(401).send({
          erro: true,
          mensagem: "Token não informado",
        });

      const parts = authHeader.split(" ");

      if (!parts.length === 2)
        return res.status(498).send({
          erro: true,
          mensagem: "Erro de token",
        });

      const [scheme, token] = parts;

      if (!/^Bearer$/i.test(scheme))
        return res.status(498).send({
          erro: true,
          mensagem: "Token em formato incorreto!",
        });

      try {
        const decode = await promisify(jwt.verify)(token, authConfig.secret);
        req.userId = decode.id;
        return next();
      } catch (err) {
        if (err.name == "TokenExpiredError") {
          return res.status(498).json({
            erro: true,
            mensagem: "Acesso expirado! Por favor, reinicie a operação",
          });
        } else {
          return res.status(498).json({
            erro: true,
            mensagem: "Token inválido!",
          });
        }
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
};
