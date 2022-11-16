const moment = require("moment");
const User = require("../models/User");
const Record = require("../models/Record");

module.exports = {
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

      const records = await Record.findAll({ offset: offset, limit: limit });
      const total = await Record.count();
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

        results: records.map((item) => ({
          id: item.id,
          userId: item.userId,
          createdAt: item.createdAt,
        })),
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  async indexId(req, res) {
    try {
      let { limit } = Number(req.query.limit);
      let { offset } = Number(req.query.offset);

      if (!limit) {
        limit = 10;
      }

      if (!offset) {
        offset = 0;
      }

      const { userId } = req.params;
      console.log(req.params.userId);

      const users = await User.findAll({
        where: { id: userId },
        include: { association: "records" },
        offset: offset,
        limit: limit,
      });
      const total = await Record.count({ where: { userId: userId } });
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
          funcao: item.funcao,
          ativo: item.ativo,
          records: item.records,
        })),
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  async store(req, res) {
    try {
      const entrada = req.body.entrada;
      const userDado = await User.findOne({ where: { entrada: entrada } });

      if (userDado == null) {
        return res.status(400).json({
          erro: false,
          mensagem: "Usuário não encontrado!",
        });
      }

      const userId = await userDado.id;

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({
          erro: false,
          mensagem: "Usuário não encontrado!",
        });
      }
      const today = moment().format("YYYY-MM-DD");

      const record = await Record.findOne({
        where: { entrada: entrada, createdAt: today },
      });

      if (record != null) {
        if (record.createdAt == today) {
          return res.status(200).json();
        }
      } else {
        await Record.create({
          entrada,
          userId,
        });
        return res.status(200).json({
          erro: false,
          mensagem: "Registro OK",
        });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
};
