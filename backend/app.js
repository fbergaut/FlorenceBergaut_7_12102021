const express = require('express');
const bodyParser = require('body-parser');
const helmet = require("helmet");

require('dotenv').config({ path: './config/.env' });

const app = express();

app.use(helmet());

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const postRoutes = require('./routes/posts')
const commentRoutes = require('./routes/comments')

//---------------------- Middleware général : Transforme corps de la requête en obj JS utilisable
app.use(bodyParser.json());

//---------------------- Middleware général : Utilise les routes définies dans le fichier routes/users.js et routes/posts.js
app.use('/users', authRoutes)
app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/comments', commentRoutes)

//---------------------- On exporte l'application pour y accèder depuis les autres fichiers
module.exports = app;