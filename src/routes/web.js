//server site rendering
//Khai báo route
const express = require("express");
const {
    getHomepage,
    getShoppage,
    getCreatePage,
    getCreateUser,
    getUpdatePage,
    postUpdateUser,
    postDeleteUser,
    postHandleRemoveUser,
} = require("../controllers/homeController");
const router = express.Router();

//router.Method('/route', handler)
router.get("/", getHomepage);
router.get("/shop", getShoppage);
router.get("/create", getCreatePage);
router.get("/update/:id", getUpdatePage);

router.post("/create-user", getCreateUser);
router.post("/update-user", postUpdateUser);
router.post("/delete-user/:id", postDeleteUser);
router.post("/delete-user", postHandleRemoveUser);

module.exports = router;
