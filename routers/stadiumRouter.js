const {addStadium,getAllStadiums,getAllStadiumsWithTeam,getStadiumWithTeam,deleteStadium,getStadium,updateStadium} = require('../controllers/stadiumController')
const express = require('express');
const router = express.Router();

router.get("/stadiums",getAllStadiums);

router.post("/stadium",addStadium);

router.get("/stadiumsWithTeam",getAllStadiumsWithTeam);

router.get("/stadiumWithTeam/:id",getStadiumWithTeam);

router.get("/stadium/:id",getStadium);
//can't update team
router.patch("/stadium/:id",updateStadium);

router.delete("/stadium/:id",deleteStadium);

module.exports = router;