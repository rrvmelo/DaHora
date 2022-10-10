const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const authConfig = require('..config/auth')

router.post('/authenticate', async (req, res) =>{
    const { cpf , senha} = req.body;

    const user = await User.findOne({ cpf }).select('+senha');

    if (!user)
        return res.status(400).send({ error: 'Usuário não encontrado'});

    if (!await bcrypt.compare(senha, user.senha))
        return res.status(400).send({ error: 'Senha Invalida'});

    user.senha = undefined;

    const token = jwt.sign({ id: user.id }, authConfig.secret, {expriresIn: 43200,
    });

    res.send({ user, token });

});