const { User } = require('../models');
const jwt = require("jsonwebtoken");
const Sequelize = require('sequelize');
const passwordValidator = require("password-validator");
const bcrypt = require('bcrypt');
const Op = Sequelize.Op;

const schema = new passwordValidator();
schema
    .is().min(8) // Minimum length 8
    .is().max(100) // Maximum length 100
    .has().uppercase() // Must have uppercase letters
    .has().lowercase() // Must have lowercase letters
    .has().digits(2) // Must have at least 2 digits
    .has().not().spaces() // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

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
    if (schema.validate(req.body.password) === true) {
        User.findOne({
                where: {
                    email: email
                }
            })
            .then(user => {
                if (user) { res.status(200).json({ errorMessage: 'Cet utilisateur existe déjà !' }) } else {
                    try {
                        const user = User.create({ firstname, lastname, username, email, password })
                        return res.status(201).json({ message: "Utilisateur créé !" })
                    } catch (err) {
                        console.log(err)
                        return res.status(500).json({ err })
                    }
                }
            })
    } else {
        return res.status(401).json({ errorMessage: "Votre mot de passe doit contenir au moins 8 charactères, au moins une majuscule, au moins 2 chiffres et ne pas comporter d'espace !" });
    }
};

exports.signIn = async(req, res) => {
    const { email, password } = req.body
    User.findOne({
            where: {
                email: {
                    [Op.eq]: email
                }
            }
        })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    const token = createToken(user.uuid)
                    res.cookie('jwt', token, { httpOnly: true, maxAge })
                    res.status(200).send({ message: "Vous êtes connecté !" })
                } else {
                    res.status(200).send({
                        errorMessage: "Mot de passe incorrect"
                    })
                }
            } else {
                res.status(200).send({
                    errorMessage: "Email incorrect"
                })
            }
        })

    // try {
    //     const user = await User.findOne({
    //         where: {
    //             email: email
    //         }
    //     })

    // console.log(email);
    // if (email !== user.email) {

    //     return res.sendStatus(400).json({ errors: "Email incorrect" })
    // }

    // if (password !== user.password) {
    //     return res.sendStatus(400).json({ errors: "Password incorrect" })
    // }

    //     const token = createToken(user.uuid)
    //     res.cookie('jwt', token, { httpOnly: true, maxAge })
    //     return res.status(200).json(user)
    // } catch (err) {
    //     console.log(err)
    //     return res.status(500).json({ err: "Il y a une erreur" })
    // }
};

exports.logOut = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
};