const express = require("express");
const router = express.Router();
const {getTeam,addTeam,updateTeam,deleteTeam,getAllTeams,getTeamWithPlayers,teamsWithPlayers,getTeamsWithNoStadium} = require("../controllers/teamController");




router.get("/teamsWithPlayers",teamsWithPlayers);

router.get("/teams",getAllTeams);

router.get("/teamsWithNoStadium",getTeamsWithNoStadium);

//adding team without a stadium and when adding the stadium a new field in the team stadium is added automatically
router.post("/team",addTeam);

router.get("/team/:id",getTeam);

router.get("/teamWithPlayers/:id",getTeamWithPlayers);

router.delete('/team/:id',deleteTeam);

//can't update stadium or squad
router.patch('/team/:id',updateTeam);

module.exports = router;