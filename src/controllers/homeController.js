const connection = require("../config/database");
const {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
} = require("../services/CRUDService");

const getHomepage = async (req, res) => {
    //process data
    //call model
    const results = await getAllUsers();
    return res.render("home.ejs", { data: results });
};
const getShoppage = (req, res) => {
    res.send("<h1>Trang sản phẩm</h1>");
};

const getCreatePage = (req, res) => {
    res.render("create.ejs");
};
const getUpdatePage = async (req, res) => {
    const userId = req.params.id;
    let user = await getUserById(userId);
    res.render("update.ejs", { userUpdate: user });
};

const getCreateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;

    // connection.query(
    //     `INSERT INTO Users (email, name, city)
    //     VALUES (?, ?, ?)`,
    //     [email, name, city],
    //     function (err, results) {
    //         console.log(results);
    //         res.send("create user succes!");
    //     }
    // );

    let [results, fields] = await connection.query(
        `INSERT INTO Users (email, name, city)
    VALUES (?, ?, ?)`,
        [email, name, city]
    );

    console.log("--> Check: ", results);
    res.send("create user succes!");

    // A simple SELECT query
    // connection.query(
    //     "SELECT * FROM `Users`",
    //     function (err, results, fields) {}
    // );

    // const [results, fields] = await connection.query("SELECT * FROM `Users`");
    // console.log("--> Check: ", results);
};

const postUpdateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let userId = req.body.userId;
    await updateUserById(email, name, city, userId);
    res.redirect("/");
};

const postDeleteUser = async (req, res) => {
    const userId = req.params.id;
    let user = await getUserById(userId);
    res.render("delete.ejs", { userDelete: user });
};

const postHandleRemoveUser = async (req, res) => {
    let userId = req.body.userId;
    await deleteUserById(userId);
    res.redirect("/");
};

module.exports = {
    getHomepage,
    getShoppage,
    getCreatePage,
    getCreateUser,
    getUpdatePage,
    postUpdateUser,
    postDeleteUser,
    postHandleRemoveUser,
};
