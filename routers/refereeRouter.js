const {updateReferee, deleteReferee, addReferee, getReferee, getAllReferee} = require("../controllers/refereeController");
const express = require('express');
const authenticateToken= require('../controllers/apiSecurityController')
const isAdmin = authenticateToken('admin');
const isUser = authenticateToken('user');
const router = express.Router();

router.get("/referees",isAdmin,getAllReferee);

router.post("/referee",isAdmin,addReferee);

router.get("/referee/:id",isAdmin || isUser,getReferee);

router.delete("/referee/:id",isAdmin,deleteReferee);

router.patch("/referee/:id",isAdmin,updateReferee)

module.exports = router;