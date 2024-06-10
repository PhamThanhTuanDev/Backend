require("dotenv").config();
const express = require("express"); //commonjs
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");

const connection = require("./config/database");

const app = express(); //app express
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config template engine
configViewEngine(app);

//Khai báo Route
app.use("/", webRoutes);
app.use("/v1/api", apiRoutes);

(async () => {
    try {
        await connection();
        app.listen(port, hostname, () => {
            console.log(`http://localhost:${port}`);
        });
    } catch (e) {
        console.log(">>>Eror connect to DB: ", e);
    }
})();
