const Benefit = require('../models/Benefit');

module.exports = {
  async index(req, res) {
    const benefits = await Benefit.findAll();

    return res.json(benefit);
  },

  async store(req, res) {
    const { 
      beneficio, 
      valorDiario,
      descrição
    } = req.body;

    const user = await Benefit.create({ 
      beneficio, 
      valorDiario,
      descrição
    });

    return res.json(benefit);
  }
};