const Occupation = require("../models/Occupation");

module.exports = {
  async index(req, res) {
    const occupations = await Occupation.findAll();

    return res.json(occupations);
  },

  async store(req, res) {
    const { funcao, vencimento } = req.body;

    const occupation = await Occupation.create({ funcao, vencimento });

    return res.json(occupation);
  },

  async update(req, res) {
    const occupation = req.body;
    const occupationData = await Occupation.findOne({
      where: { id: occupation.id },
    });
    if (occupationData == undefined) {
      return res.status(400).json({
        erro: true,
        mensagem: "Não atualizado, verifique os dados informados!",
      });
    } else if (occupation.id != occupationData.id) {
      return res.status(400).json({
        erro: true,
        mensagem: "Não atualizado, verifique os dados informados!",
      });
    } else {
      await Occupation.update(occupation, {
        where: { id: occupation.id },
      });

      return res.status(200).json({
        erro: false,
        mensagem: "Atualizado!",
        occupation, //Tirar antes de publicar
      });
    }
  },
};
