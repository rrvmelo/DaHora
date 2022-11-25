const User = require("../models/User");
const Benefit = require("../models/Benefit");
const { Op } = require("sequelize");

module.exports = {
  //Busca geral e filtragem
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
          where: { beneficio: { [Op.like]: beneficio } },
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
        const benefits = await Benefit.findAll({
          offset: offset,
          limit: limit,
        });
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
  //Busca de Beneficio passando id no Params
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
        },
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  //Adiciona novo beneficio
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
  //Atualiza Beneficio
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
  //Excluir beneficio
  async delete(req, res) {
    try {
      const { benefitId } = req.params;

      const benefit = await Benefit.find({ where: { id: benefitId } });
      if (!benefit) {
        return res.status(401).json({
          erro: true,
          mensagem: "Beneficio não encontrado, por favor verifique",
        });
      } else {
        await Benefit.destroy({ where: { id: benefitId } });
        return res.status(200).json({
          erro: false,
          mensagem: "Beneficio Excluido",
        });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  //Busca o beneficio vinculado ao usuario
  async indexId(req, res) {
    try {
      const { userId } = req.params;

      const { benefits } = await User.findByPk(userId, {
        include: { association: "benefits", through: { attributes: [] } },
      });

      return res.send({
        beneficio: benefits.map((item) => ({
          id: item.id,
          beneficio: item.beneficio,
          porcentagemCalculo: item.porcentagemCalculo,
          valorDiario: item.valorDiario,
          descricao: item.descricao,
        })),
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  //Vincula beneficio ao usuario
  async updateId(req, res) {
    try {
      const { userId } = req.params;
      const { beneficio } = req.body;

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({
          erro: true,
          mensagem: "Usuário não encontrado!",
        });
      }

      const { benefits } = await User.findByPk(userId, {
        include: { association: "benefits", through: { attributes: [] } },
      });

      const delbeneficio = benefits.map((benefit) => benefit.id);
      console.log("=====>>", delbeneficio);

      user.removeBenefits(delbeneficio);

      for (let index = 0; index < beneficio.length; index++) {
        const benefit = await Benefit.findOne({
          where: { id: beneficio[index] },
        });
        if (!benefit) {
          return res.status(400).send({
            erro: true,
            mensagem: "Beneficio invalido, por favor verifique",
          });
        }
      }

      for (let index = 0; index < beneficio.length; index++) {
        const benefit = await Benefit.findOne({
          where: { id: beneficio[index] },
        });

        user.addBenefits(benefit);
      }
      return res.status(200).send({
        erro: false,
        mensagem: "Beneficio(s) adicionado(s) ou alterado(s) com sucesso",
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
};
