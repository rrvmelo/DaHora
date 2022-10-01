const Register = require('../models/Register');

module.exports = {
    async index(req, res) {
        const registers = await Register.findAll();

        return res.json(registers);
    },

    async store(req, res) {
        const {entrada} = req.body;

        const register = await Register.create({entrada});
        return res.json(register);
    }
};