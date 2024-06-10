const User = require("../models/User");

const getUsersAPI = async (req, res) => {
    const results = await User.find({});
    return res.status(200).json({
        errorCode: 0,
        data: results,
    });
};

const postCreateUserAPI = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;

    let user = await User.create({
        email,
        name,
        city,
    });

    return res.status(200).json({
        errorCode: 0,
        data: user,
    });
};

const putUpdateUserAPI = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let userId = req.body.userId;
    // await updateUserById(email, name, city, userId);
    let user = await User.updateOne(
        { _id: userId },
        { email: email, name: name, city: city }
    );
    return res.status(200).json({
        errorCode: 0,
        data: user,
    });
};

module.exports = {
    getUsersAPI,
    postCreateUserAPI,
    putUpdateUserAPI,
};
