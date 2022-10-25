const Occupation = require("../models/Occupation");
const User = require("../models/User");

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
  async delete(req, res) {
    const occupation = req.body;
    const occupationId = await Occupation.findOne({
      where: { id: occupation.id },
    });

    console.log(occupationId);
    console.log(occupationId.funcao);
    const user = await User.findOne({ where: { funcao: occupationId.funcao } });

    console.log(user);

    if (!user) {
      await Occupation.destroy({ where: { id: occupationId.id } });
      return res.status(200).json();
    } else if (user == undefined) {
      await Occupation.destroy({ where: { id: occupationId.id } });
      return res.status(200).json();
    }
    return res.status(400).json({
      erro: true,
      mensagem:
        "Ocupação não pode ser excluida pois existem profissionais vinculados a ela",
    });
  },
};
