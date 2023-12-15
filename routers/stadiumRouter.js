const {addStadium,getAllStadiums,getAllStadiumsWithTeam,getStadiumWithTeam,deleteStadium,getStadium,updateStadium,stadiumMatches} = require('../controllers/stadiumController')
const express = require('express');
const authenticateToken= require('../controllers/apiSecurityController')
const isAdmin = authenticateToken('admin');
const isUser = authenticateToken('user');
const router = express.Router();

router.get("/stadiums",isAdmin,getAllStadiums);

router.post("/stadium",isAdmin,addStadium);

router.get("/stadiumsWithTeam",isAdmin,getAllStadiumsWithTeam);

router.get("/stadiumWithTeam/:id",isAdmin,getStadiumWithTeam);

router.get("/stadium/:id",isAdmin || isUser,getStadium);
//can't update team
router.patch("/stadium/:id",isAdmin,updateStadium);

router.delete("/stadium/:id",isAdmin,deleteStadium);
router.get("/stadiumMatches/:id",isAdmin || isUser, stadiumMatches)

module.exports = router;