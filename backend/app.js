const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require("helmet");

require('dotenv').config({ path: './config/.env' });

const app = express();

app.use(helmet());

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const postRoutes = require('./routes/posts')
const commentRoutes = require('./routes/comments')

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    'allowedHeaders': ['Content-Type', 'Authorization'],
    'exposedHeaders': ['Content-Range', 'X-Content-Range'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    "optionsSuccessStatus": 204
}
app.use(cors(corsOptions));

app.use(bodyParser.json());

//---------------------- routes
app.use('/users', authRoutes)
app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/comments', commentRoutes)

//---------------------- On exporte l'application pour y accèder depuis les autres fichiers
module.exports = app;