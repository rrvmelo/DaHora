const Occupation = require("../models/Occupation");
const User = require("../models/User");
const { Op } = require("sequelize");

module.exports = {
  //Busca funcao por geral
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

      const { funcao } = req.query;
      if (funcao != null) {
        const occupations = await Occupation.findAll({
          where: { funcao: { [Op.like]: funcao } },
        });
        return res.send({
          results: occupations.map((item) => ({
            id: item.id,
            funcao: item.funcao,
            vencimento: item.vencimento,
          })),
        });
      } else {
        const occupations = await Occupation.findAll({
          offset: offset,
          limit: limit,
        });
        const total = await Occupation.count();
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

          results: occupations.map((item) => ({
            id: item.id,
            funcao: item.funcao,
            vencimento: item.vencimento,
          })),
        });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
//Busca funcao por id
  async indexs(req, res) {
    try {
      const { occupationId } = req.params;
      const occupations = await Occupation.findByPk(occupationId);
      return res.send({
        occupations: {
          id: occupations.id,
          funcao: occupations.funcao,
          vencimento: occupations.vencimento,
        },
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
//Adiciona nova funcao
async store(req, res) {
  try {
    const occupation = req.body;
    const occupationData = await Occupation.findOne({
      where: { funcao: occupation.funcao },
    });

    if (!occupationData){
      await Occupation.create(occupation);
      return res.status(200).json({
        erro: false,
        mensagem: "Fun????o criada com sucesso",
      })
    } else{
      return res.status(400).json({
        erro: true,
        mensagem: " Ocupa????o duplicada ou nula, por favor verifique",
      });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
},
//Atualiza funcao
  async update(req, res) {
    try {
      const { occupationId } = req.params;
      const occupation = req.body;
      const occupationData = await Occupation.findOne({
        where: { id: occupationId },
      });
      if (occupationData == undefined) {
        return res.status(400).json({
          erro: true,
          mensagem: "N??o atualizado, verifique os dados informados!",
        });
      } else if (occupationId != occupationData.id) {
        return res.status(400).json({
          erro: true,
          mensagem: "N??o atualizado, verifique os dados informados!",
        });
      } else {
        await Occupation.update(occupation, {
          where: { id: occupationId },
        });

        return res.status(200).json({
          erro: false,
          mensagem: "Atualizado!",
          occupation, //Tirar antes de publicar
        });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  //Exclui funcao
  async delete(req, res) {
    try {
      const occupation = req.body;
      const occupationId = await Occupation.findOne({
        where: { id: occupation.id },
      });

      const user = await User.findOne({
        where: { funcao: occupationId.funcao },
      });

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
          "Ocupa????o n??o pode ser excluida pois existem profissionais vinculados a ela",
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
};
