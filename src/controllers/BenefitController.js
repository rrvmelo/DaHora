const User = require("../models/User");
const Benefit = require("../models/Benefit");

module.exports = {
  async index(req, res) {
    const benefits = await Benefit.findAll();

    return res.json(benefits);
  },

  async store(req, res) {
    const { beneficio, valorDiario, descricao } = req.body;

    const benefit = await Benefit.create({
      beneficio,
      valorDiario,
      descricao,
    });

    return res.json(benefit);
  },

  async update(req, res) {
    const benefit = req.body;
    const benefitData = await Benefit.findOne({ where: { id: benefit.id } });
    if (benefitData == undefined) {
      return res.status(400).json({
        erro: true,
        mensagem: "Não atualizado, verifique os dados informados!",
      });
    } else if (benefit.id != benefitData.id) {
      return res.status(400).json({
        erro: true,
        mensagem: "Não atualizado, verifique os dados informados!",
      });
    } else {
      await Benefit.update(benefit, {
        where: { id: benefit.id },
      });

      return res.status(200).json({
        erro: false,
        mensagem: "Atualizado!",
        benefit, //Tirar antes de publicar
      });
    }
  },

  async delete(req, res) {},

  async indexId(req, res) {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      include: { association: "benefits", through: { attributes: [] } },
    });
    return res.json(user.benefits);
  },

  async storeId(req, res) {
    const { userId } = req.params;
    const { beneficio } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({
        erro: false,
        mensagem: "Usuário não encontrado!",
      });
    }

    const benefit = await Benefit.findOne({ where: { beneficio: beneficio } });

    await user.addBenefit(benefit);

    return res.status(200).json({
      erro: false,
      mensagem: "Beneficio OK",
      user,
      benefit,
    });
  },

  async deleteId(req, res) {
    const { userId } = req.params;
    const { beneficio } = req.body;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({
        erro: false,
        mensagem: "Usuário não encontrado!",
      });
    }

    const benefit = await Benefit.findOne({ where: { beneficio: beneficio } });

    await user.removeBenefit(benefit);

    return res.status(200).json();
  },
};
