const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const helmet = require("helmet");
const { checkUser, requireAuth } = require('./middleware/authMiddleware');

require('dotenv').config({ path: './config/.env' });

const app = express();

app.use(helmet());

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const uploadRoutes = require('./routes/upload')
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


app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//---------------------- jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).json(res.locals.user.uuid)
});

//---------------------- routes
app.use('/users', authRoutes)
app.use('/users', userRoutes)
app.use('/users', uploadRoutes)
app.use('/posts', postRoutes)
app.use('/comments', commentRoutes)

//---------------------- On exporte l'application pour y accèder depuis les autres fichiers
module.exports = app;