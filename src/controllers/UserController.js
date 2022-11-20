const User = require("../models/User");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

module.exports = {
  //Busca de Usuários em Geral paginada
  async index(req, res) {
    try {
      let { limit } = Number(req.query.limit);
      let { offset } = Number(req.query.offset);

      if (!limit) {
        limit = 10;
      }

      if (!offset) {
        offset = 0;
      }
      const { name } = req.query;

      if (name != null) {
        const users = await User.findAll({
          where: { name: {[Op.like]: name} },
        });
        return res.send({
          results: users.map((item) => ({
            id: item.id,
            name: item.name,
            cpf: item.cpf,
            email: item.email,
            funcao: item.funcao,
            entrada: item.entrada,
            cargaHoraria: item.cargaHoraria,
            ativo: item.ativo,
            isRH: item.isRH,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          })),
        });
      } else{      

       const users = await User.findAll({ offset: offset, limit: limit });
      const total = await User.count();
      const currentUrl = req.originalUrl;
      const next = offset + limit;
      const nextUrl =
        next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

      const previous = offset - limit < 0 ? null : offset - limit;
      const previousUrl =
        previous != null
          ? `${currentUrl}?limit=${limit}&offset=${offset}`
          : null;

      return res.send({
        nextUrl,
        previousUrl,
        limit,
        offset,
        total,

        results: users.map((item) => ({
          id: item.id,
          name: item.name,
          cpf: item.cpf,
          email: item.email,
          funcao: item.funcao,
          entrada: item.entrada,
          cargaHoraria: item.cargaHoraria,
          ativo: item.ativo,
          isRH: item.isRH,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        })),
      });
    }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  //Busca de usuário por id
  async indexs(req, res) {
    try {
      const { userId } = req.params;
      const users = await User.findByPk(userId, {
        attributes: { exclude: "senha" },
      });
      return res.send({
        user: {
          id: users.id,
          name: users.name,
          cpf: users.cpf,
          email: users.email,
          funcao: users.funcao,
          entrada: users.entrada,
          cargaHoraria: users.cargaHoraria,
          ativo: users.ativo,
          isRH: users.isRH,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        },
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  //Adicionar novo usuário
  async store(req, res) {
    try {
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
            return res.status(400).send({
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
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  //Atualização de dados do usuário
  async update(req, res) {
    try {
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
          user, //Tirar antes de publicar /* Verificar*/
        });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
};
