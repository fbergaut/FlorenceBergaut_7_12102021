const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './config/.env' });
const app = express();
const { sequelize, User, Post } = require("./models");


//---------------------- Middleware général : Transforme corps de la requête en obj JS utilisable
app.use(bodyParser.json());


// end point pour le model User
app.post('/users', async(req, res) => {
    const { firstname, lastname, username, email, password } = req.body
    try {
        const user = await User.create({ firstname, lastname, username, email, password })
        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
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

app.get('/users/:uuid', async(req, res) => {
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({
            where: { uuid },
            include: [{ model: Post, as: 'posts' }]
        })
        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Something went wrong !' })
    }
});

app.put('/users/:uuid', async(req, res) => {
    const uuid = req.params.uuid
    const { firstname, lastname, username, email, password } = req.body
    try {
        const user = await User.findOne({
            where: { uuid }
        })

        user.firstname = firstname
        user.lastname = lastname
        user.username = username
        user.email = email
        user.password = password

        await user.save()

        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json(user)
    }
});

app.delete('/users/:uuid', async(req, res) => {
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({
            where: { uuid }
        })
        await user.destroy()
        return res.json({ message: 'User deleted !' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Something went wrong !' })
    }
});

// end point pour le model Post
app.post('/posts', async(req, res) => {
    const { userUuid, message } = req.body
    try {
        const user = await User.findOne({
            where: { uuid: userUuid }
        })
        const post = await Post.create({ message, userId: user.id })
        return res.json(post)
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Post was not post !'
        })
    }
});

app.get('/posts', async(req, res) => {
    try {
        const posts = await Post.findAll({ include: [{ model: User, as: 'user' }] })
        return res.json(posts)
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Something went wrong !'
        })
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