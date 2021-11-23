const { User } = require('../models');
const jwt = require("jsonwebtoken");
const Sequelize = require('sequelize');
const passwordValidator = require("password-validator");
const bcrypt = require('bcrypt');
const Op = Sequelize.Op;
const { signUpErrors, signInErrors } = require('../utils/errorsUtils');

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
    const { firstname, lastname, username, email, password } = req.body

    if (schema.validate(req.body.password) === true) {

        User.findOne({
                where: {
                    email: email
                }
            })
            .then(user => {
                if (user) {
                    res.status(200).send({
                        errors: { errorMessage: 'Cet utilisateur existe déjà !' }
                    })
                }
            });

        try {
            const user = await User.create({ firstname, lastname, username, email, password })
            return res.status(201).json({ message: "Utilisateur créé !" })
        } catch (err) {
            const errors = signUpErrors(err)
            return res.status(200).send({
                errors
            })
        }
    } else {
        return res.status(200).send({
            errors: { errorPassword: "Votre mot de passe doit contenir : - au moins 8 charactères - au moins une majuscule - au moins 2 chiffres - aucun espace" }
        });
    };
};

// User.findOne({
//         where: {
//             email: email
//         }
//     })
//     .then(user => {
//             if (user) {
//                 res.status(200).send({
//                     errors: { errorMessage: 'Cet utilisateur existe déjà !' }
//                 })
//             } else {

//                 const user = User.create({ firstname, lastname, username, email, password });
// if (err === 'SequelizeValidationError') {
//     return res.status(400).json({
//         success: false,
//         msg: err.errors.map(e => e.message)
//     })
// } else {
//     return res.status(201).send(user)
// };

//         const dataUser = [];
//         dataUser.push(firstname, lastname, username);
//         console.log(dataUser);
//         dataUser.forEach(err => {
//             const errors = [];
//             if (!firstname) {

//                 res.status(200).send({
//                     errorFirstname: "Veuillez indiquer votre prénom"
//                 })
//                 errors.push(err.errorFirstname)
//             };

//             if (!lastname) {
//                 res.status(200).send({
//                     errorLastname: "Veuillez indiquer votre nom"
//                 })
//                 errors.push(err.errorLastname)
//             };

//             if (!username) {
//                 return res.status(200).send({
//                     errors: {
//                         errorUsername: "Veuillez indiquer votre pseudo"
//                     }
//                 })
//             };
//             return res.status(200).send({ errors })
//         });
//         return res.status(201).send({ dataUser })
//     }
// })

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
                        errors: { errorPassword: "Mot de passe incorrect" }
                    })
                }
            } else {
                res.status(200).send({
                    errors: { errorEmail: "Email incorrect" }
                })
            }
        })
};

exports.logOut = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
};