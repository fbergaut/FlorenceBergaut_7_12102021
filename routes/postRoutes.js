const router = require('express').Router();
const { Sequelize } = require("sequelize");

// Connexion Sequelize
const sequelize = new Sequelize("groupomania", "root", "root", {
    host: "localhost",
    dialect: "mysql",
});

(async() => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();


// Synchronisation Sequelize
const PostModel = require("../models/postModel");
const UserModelInstance = PostModel(sequelize);
sequelize.sync({ alter: true });


module.exports = router;