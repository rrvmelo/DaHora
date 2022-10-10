const Record = require('../models/Record');

module.exports = {
    async index(req, res) {
                const records = await Record.findAll();

        return res.json(records);
    },

    async store(req, res) {
        const {entrada} = req.body;

        const record = await Record.create({entrada});
        return res.json(record);
    }
};