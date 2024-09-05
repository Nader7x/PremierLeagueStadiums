const {updateReferee, deleteReferee, addReferee, getReferee, getAllReferee} = require("../controllers/refereeController");
const express = require('express');
const {authenticateToken}= require('../controllers/apiSecurityController')
const isAdmin = authenticateToken('admin');
const isUser = authenticateToken('user');
const router = express.Router();

router.get("/referees",getAllReferee);

router.post("/referee",addReferee);

router.get("/referee/:id",getReferee);

router.delete("/referee/:id",deleteReferee);

router.patch("/referee/:id",updateReferee)

module.exports = router;