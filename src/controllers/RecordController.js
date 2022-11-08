const moment = require('moment');
const User = require("../models/User");
const Record = require("../models/Record");

module.exports = {
  async index(req, res) {
    const records = await Record.findAll();

    return res.json(records);
  },

  async indexId(req, res) {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      include: { association: "records" },
      attributes: { exclude: ["email", "senha", "isRH", "entrada"] },
    });
    return res.json(user);
  },

  async store(req, res) {
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
    const today = moment().format('YYYY-MM-DD')

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
  },
};
