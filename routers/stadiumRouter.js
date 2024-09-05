const {addStadium,getAllStadiums,getAllStadiumsWithTeam,getStadiumWithTeam,deleteStadium,getStadium,updateStadium,stadiumMatches,stadiumHistoryMatches} = require('../controllers/stadiumController')
const express = require('express');
const {authenticateToken}= require('../controllers/apiSecurityController')
const isAdmin = authenticateToken('admin');
const isUser = authenticateToken('user');
const router = express.Router();

router.get("/stadiums",getAllStadiums);

router.post("/stadium",addStadium);

router.get("/stadiumsWithTeam",getAllStadiumsWithTeam);

router.get("/stadiumWithTeam/:id",getStadiumWithTeam);

router.get("/stadium/:id",getStadium);
//can't update team
router.patch("/stadium/:id",updateStadium);

router.delete("/stadium/:id",deleteStadium);
//get all matches in this stadium
router.get("/stadiumMatches/:id", stadiumMatches)
//get stadium history matches
router.get("/stadiumHistoryMatches/:id", stadiumHistoryMatches)

module.exports = router;