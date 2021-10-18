const express = require('express');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config({ path: './config/.env' });
const app = express();

//routes
app.use('/api/user', userRoutes);

// server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);

});