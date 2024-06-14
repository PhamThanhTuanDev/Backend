//resfull api
const express = require("express");
const routerAPI = express.Router();

const {
    getUsersAPI,
    postCreateUserAPI,
    putUpdateUserAPI,
    deleteUserAPI,
    postUploadSingleFileAPI,
    postuploadMultipleFilesAPI,
} = require("../controllers/apiController");

const { postCreateCustomer } = require("../controllers/customerController");
routerAPI.get("/users", getUsersAPI);
routerAPI.post("/users", postCreateUserAPI);
routerAPI.put("/users", putUpdateUserAPI);
routerAPI.delete("/users", deleteUserAPI);

routerAPI.post("/file", postUploadSingleFileAPI);
routerAPI.post("/files", postuploadMultipleFilesAPI);

routerAPI.post("/customers", postCreateCustomer);

module.exports = routerAPI;
