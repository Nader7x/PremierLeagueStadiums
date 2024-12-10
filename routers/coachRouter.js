const {updateCoach, deleteCoach, addCoach, getCoach, getAllCoaches} = require("../controllers/coachController");
const express = require('express');
const {authenticateToken}= require('../controllers/apiSecurityController')
const router = express.Router();
const isAdmin = authenticateToken('admin');
const isUser = authenticateToken('user');
router.get("/coaches",getAllCoaches);

router.post("/coach",addCoach);

router.get("/coach/:id",getCoach);

router.delete("/coach/:id",deleteCoach);

router.patch("/coach/:id",updateCoach)

module.exports = router;