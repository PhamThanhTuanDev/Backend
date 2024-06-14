const User = require("../models/User");
const {
    uploadSingleFile,
    uploadMultipleFile,
} = require("../services/fileService");

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

const deleteUserAPI = async (req, res) => {
    const userId = req.body.userId;
    let result = await User.deleteOne({
        _id: userId,
    });

    return res.status(200).json({
        errorCode: 0,
        data: result,
    });
};

const postUploadSingleFileAPI = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    let result = await uploadSingleFile(req.files.image);

    return res.status(200).json({
        EC: 0,
        data: result,
    });
};
const postuploadMultipleFilesAPI = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }
    //upload single => file is an object
    //upload multiple => file is an array
    if (Array.isArray(req.files.image)) {
        //upload multiple
        let result = await uploadMultipleFile(req.files.image);
        return res.status(200).json({
            EC: 0,
            data: result,
        });
    } else {
        //uploat single
        return await postUploadSingleFileAPI(req, res);
    }
};

module.exports = {
    getUsersAPI,
    postCreateUserAPI,
    putUpdateUserAPI,
    deleteUserAPI,
    postUploadSingleFileAPI,
    postuploadMultipleFilesAPI,
};
