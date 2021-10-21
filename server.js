const http = require("http");
const app = require("./app");

const { sequelize } = require("./models");

//------------------------------- normalizePort : renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT);
//------------------------------- On dit à l'App Express sur quel port elle va tourner
app.set("port", port);

//------------------------------- errorHandler : recherche les différentes erreurs et les gère de manière appropriée
const errorHandler = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const address = server.address();
    const bind =
        typeof address === "string" ? "pipe " + address : "port: " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges.");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use.");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

//------------------------------- Création du server auquel on passe en argument app
const server = http.createServer(app);

//------------------------------- écouteur d'évènements est également enregistré, consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console
server.on("error", errorHandler);
server.on("listening", () => {
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "port " + port;
    console.log("Listening on " + bind);
});

//---------------------- Connexion server + Sequelize
server.listen(process.env.PORT, async() => {
    try {
        console.log(`Listening on port ${process.env.PORT}`),
            await sequelize.authenticate();
        console.log("Database connected !");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});