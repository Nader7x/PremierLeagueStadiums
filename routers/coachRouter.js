const {updateCoach, deleteCoach, addCoach, getCoach, getAllCoaches} = require("../controllers/coachController");
const express = require('express');
const authenticateToken= require('../controllers/apiSecurityController')
const router = express.Router();
const isAdmin = authenticateToken('admin');
const isUser = authenticateToken('user');
router.get("/coaches",isAdmin,getAllCoaches);

router.post("/coach",isAdmin,addCoach);

router.get("/coach/:id",isAdmin,getCoach);

router.delete("/coach/:id",isAdmin,deleteCoach);

router.patch("/coach/:id",isAdmin,updateCoach)

module.exports = router;