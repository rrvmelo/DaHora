const Occupation = require('../models/Occupation');

module.exports = {
    async index(req, res) {
        const occupations = await Occupation.findAll();

        return res.json(occupations);
    },

    async store(req, res) {
        const { funcao, vencimento } = req.body;

        const occupation = await Occupation.create({ funcao, vencimento });

        return res.json(occupation);
    }
};