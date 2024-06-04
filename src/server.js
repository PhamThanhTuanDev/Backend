require("dotenv").config();
const express = require("express"); //commonjs
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const connection = require("./config/database");
const mongoose = require("mongoose");

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

const kittySchema = new mongoose.Schema({
    name: String,
});
const Kitten = mongoose.model("Kitten", kittySchema);
const cat = new Kitten({ name: "Jonh" });
cat.save();

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
