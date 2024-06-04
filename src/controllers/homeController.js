const connection = require("../config/database");
const {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
} = require("../services/CRUDService");
const User = require("../models/User");

const getHomepage = async (req, res) => {
    //process data
    //call model
    const results = await User.find({});
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
    //let user = await getUserById(userId);
    let user = await User.findById(userId).exec();
    res.render("update.ejs", { userUpdate: user });
};

const postCreateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;

    await User.create({
        email,
        name,
        city,
    });

    res.send("create user succes!");
};

const postUpdateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let userId = req.body.userId;
    // await updateUserById(email, name, city, userId);
    await User.updateOne(
        { _id: userId },
        { email: email, name: name, city: city }
    );
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
    postCreateUser,
    getUpdatePage,
    postUpdateUser,
    postDeleteUser,
    postHandleRemoveUser,
};
