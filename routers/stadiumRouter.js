const {addStadium,getAllStadiums,getAllStadiumsWithTeam,getStadiumWithTeam,deleteStadium,getStadium,updateStadium,stadiumMatches,stadiumHistoryMatches} = require('../controllers/stadiumController')
const {addStadium,getAllStadiums,getAllStadiumsWithTeam,getStadiumWithTeam,deleteStadium,getStadium,updateStadium,stadiumMatches,stadiumHistoryMatches} = require('../controllers/stadiumController')
const express = require('express');
const authenticateToken= require('../controllers/apiSecurityController')
const isAdmin = authenticateToken('admin');
const isUser = authenticateToken('user');
const authenticateToken= require('../controllers/apiSecurityController')
const router = express.Router();

router.get("/stadiums",isAdmin,getAllStadiums);

router.post("/stadium",isAdmin,addStadium);
router.post("/stadium",isAdmin,addStadium);

router.get("/stadiumsWithTeam",isAdmin,getAllStadiumsWithTeam);
router.get("/stadiumsWithTeam",isAdmin,getAllStadiumsWithTeam);

router.get("/stadiumWithTeam/:id",isAdmin,getStadiumWithTeam);
router.get("/stadiumWithTeam/:id",isAdmin,getStadiumWithTeam);

router.get("/stadium/:id",isAdmin || isUser,getStadium);
router.get("/stadium/:id",isAdmin || isUser,getStadium);
//can't update team
router.patch("/stadium/:id",isAdmin,updateStadium);
router.patch("/stadium/:id",isAdmin,updateStadium);

router.delete("/stadium/:id",isAdmin,deleteStadium);
//get all matches in this stadium
router.get("/stadiumMatches/:id",isAdmin || isUser, stadiumMatches)
//get stadium history matches
router.get("/stadiumHistoryMatches/:id",isAdmin || isUser, stadiumHistoryMatches)
router.delete("/stadium/:id",isAdmin,deleteStadium);
//get all matches in this stadium
router.get("/stadiumMatches/:id",isAdmin || isUser, stadiumMatches)
//get stadium history matches
router.get("/stadiumHistoryMatches/:id",isAdmin || isUser, stadiumHistoryMatches)

module.exports = router;