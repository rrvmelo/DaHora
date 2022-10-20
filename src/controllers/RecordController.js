const User = require("../models/User");
const Record = require("../models/Record");

module.exports = {
  async index(req, res) {
    const records = await Record.findAll();

    return res.json(records);
  },

  async store(req, res) {
    const entrada = req.body.entrada;
    const userDado = await User.findOne({ where: { entrada: entrada } });

    const userId = await userDado.id;

    await Record.create({
      entrada,
      userId,
    });
    return res.status(200).json({
      erro: false,
      mensagem: "Registro OK",
    });
  },
};
