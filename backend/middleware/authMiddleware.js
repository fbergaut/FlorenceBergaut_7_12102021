const jwt = require("jsonwebtoken");
const { User } = require('../models');

exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(token);
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async(err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie("jwt", "", { maxAge: 1 });
                next();
            } else {
                const user = await User.findOne({
                    where: { uuid: decodedToken.uuid }
                });
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async(err, decodedToken) => {
            if (err) {
                console.log(err);
                res.send(200).json('no token')
            } else {
                console.log(decodedToken.uuid);
                next();
            }
        });
    } else {
        console.log('Pas de token !');
    }
};