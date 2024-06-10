const User = require("../models/User");

const getUsersAPI = async (req, res) => {
    const results = await User.find({});
    return res.status(200).json({
        errorCode: 0,
        data: results,
    });
};

module.exports = {
    getUsersAPI,
};
