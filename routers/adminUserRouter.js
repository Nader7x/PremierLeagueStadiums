const express = require('express');
const {register,login} = require("../controllers/adminUserController");
const router = express.Router();

//username password
router.post("/login",login);

//name username password age and role which is Admin or User
router.post("/register",register);

module.exports = router;