const app = require("./app");

const { sequelize } = require("./models");

//---------------------- Connexion server + Sequelize
app.listen(process.env.PORT, async() => {
    try {
        console.log(`Listening on port ${process.env.PORT}`),
            await sequelize.authenticate();
        console.log("Database connected !");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});