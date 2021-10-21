const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config({ path: './config/.env' });

//---------------------- Création de l'application Express
const app = express();

const userRoutes = require('./routes/users')
const postRoutes = require('./routes/posts')

//---------------------- Middleware général : Transforme corps de la requête en obj JS utilisable
app.use(bodyParser.json());

//---------------------- Middleware général : Utilise les routes définies dans le fichier routes/users.js et routes/posts.js
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

//---------------------- On exporte l'application pour y accèder depuis les autres fichiers
module.exports = app;