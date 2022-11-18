const User = require("../models/User");
const Benefit = require("../models/Benefit");
const { Op } = require("sequelize");

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

      const { beneficio } = req.query;
      if (beneficio != null) {
        const benefits = await Benefit.findAll({
          where: { beneficio: {[Op.like]: beneficio} },
        });
        return res.send({
          results: benefits.map((item) => ({
            id: item.id,
            beneficio: item.beneficio,
            porcentagemCalculo: item.porcentagemCalculo,
            valorDiario: item.valorDiario,
            descricao: item.descricao,
          })),
        });
      } else {
      const benefits = await Benefit.findAll({ offset: offset, limit: limit });
      const total = await Benefit.count();
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

        results: benefits.map((item) => ({
          id: item.id,
          beneficio: item.beneficio,
          porcentagemCalculo: item.porcentagemCalculo,
          valorDiario: item.valorDiario,
          descricao: item.descricao,
        })),
      });
    }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  async indexs(req, res) {
    try {
      const { benefitId } = req.params;
      const benefits = await Benefit.findByPk(benefitId);
      return res.send({
        benefits: {
          id: benefits.id,
          beneficio: benefits.beneficio,
          porcentagemCalculo: benefits.porcentagemCalculo,
          valorDiario: benefits.valorDiario,
          descricao: benefits.descricao,
        }
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  async store(req, res) {
    try {
      const { beneficio, valorDiario, descricao } = req.body;

      const benefit = await Benefit.create({
        beneficio,
        valorDiario,
        descricao,
      });

      return res.json(benefit);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const { benefitId } = req.params;
      const benefit = req.body;
      const benefitData = await Benefit.findOne({ where: { id: benefitId } });
      if (benefitData == undefined) {
        return res.status(400).json({
          erro: true,
          mensagem: "Não atualizado, verifique os dados informados!",
        });
      } else if (benefitId != benefitData.id) {
        return res.status(400).json({
          erro: true,
          mensagem: "Não atualizado, verifique os dados informados!",
        });
      } else {
        await Benefit.update(benefit, {
          where: { id: benefitId },
        });

        return res.status(200).json({
          erro: false,
          mensagem: "Atualizado!",
          benefit, //Tirar antes de publicar
        });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  async delete(req, res) {},/*Verificar*/

  async indexId(req, res) {
    try {
      const { userId } = req.params;

      const user = await User.findByPk(userId, {
        include: { association: "benefits", through: { attributes: [] } },
      });
      return res.json(user.benefits);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  async storeId(req, res) {
    try {
      const { userId } = req.params;
      const { beneficio } = req.body;

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({
          erro: false,
          mensagem: "Usuário não encontrado!",
        });
      }

      const benefit = await Benefit.findOne({
        where: { beneficio: beneficio },
      });

      await user.addBenefit(benefit);

      return res.status(200).json({
        erro: false,
        mensagem: "Beneficio OK",
        user,
        benefit,
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  async deleteId(req, res) {
    try {
      const { userId } = req.params;
      const { beneficio } = req.body;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({
          erro: false,
          mensagem: "Usuário não encontrado!",
        });
      }

      const benefit = await Benefit.findOne({
        where: { beneficio: beneficio },
      });

      await user.removeBenefit(benefit);

      return res.status(200).json();
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
};
