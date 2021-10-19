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
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err })
    }
});

app.get('/users', async(req, res) => {
    try {
        const users = await User.findAll()
        return res.json(users)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Something went wrong !' })
    }
});

app.get('/users/:id', async(req, res) => {
    const id = req.params.id
    try {
        const user = await User.findOne({
            where: { id }
        })
        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Something went wrong !' })
    }
});

// Connexion server + Sequelize
app.listen(process.env.PORT, async() => {
    try {
        console.log(`Listening on port ${process.env.PORT}`),
            await sequelize.authenticate();
        console.log("Database connected !");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});