const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './config/.env' });
const app = express();
const { sequelize, User, Post } = require("./models");


//---------------------- Middleware général : Transforme corps de la requête en obj JS utilisable
app.use(bodyParser.json());

app.post('/users', async(req, res) => {
    const { firstname, lastname, username, email, password } = req.body
    try {
        const user = await User.create({ firstname, lastname, username, email, password })
        return res.json(user)
    } catch(err) {
        console.log(err)
        return res.status(500).json({ message: err })
    }
});

// Connexion server + Sequelize
app.listen(process.env.PORT, async () => {
    try {
        console.log(`Listening on port ${process.env.PORT}`),
        await sequelize.sync({ force: true });
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    } 
});