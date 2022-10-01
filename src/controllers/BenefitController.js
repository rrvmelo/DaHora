const Benefit = require('../models/Benefit');

module.exports = {
  async index(req, res) {
    const benefits = await Benefit.findAll();

    return res.json(benefits);
  },

  async store(req, res) {
    const { 
      beneficio, 
      valorDiario,
      descricao
    } = req.body;

    const benefit = await Benefit.create({ 
      beneficio, 
      valorDiario,
      descricao
    });

    return res.json(benefit);
  }
};