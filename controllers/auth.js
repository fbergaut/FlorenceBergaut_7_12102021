const { User } = require('../models')
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errors")


//--------------------- Creation du token d'authentification
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (uuid) => {
    return jwt.sign({ uuid }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};

exports.signUp = async(req, res) => {
    console.log(req.body)
    const { firstname, lastname, username, email, password } = req.body
    try {
        const user = await User.create({ firstname, lastname, username, email, password })
        return res.status(201).json(user)
    } catch (err) {
        const errors = signUpErrors(err)
        return res.status(200).send({ errors })
    }
};

exports.signIn = async(req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({
            where: { email: email }
        })
        const token = createToken(user.uuid)
        res.cookie('jwt', token, { httpOnly: true, maxAge })
        return res.status(200).json(user)
    } catch (err) {
        const errors = signInErrors(err)
        return res.status(500).send({ errors })
    }
};

exports.logOut = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
};