const express = require("express");
const router = express.Router();
const {getTeam,addTeam,updateTeam,deleteTeam,getAllTeams,getTeamWithPlayers,teamsWithPlayers,getTeamsWithNoStadium} = require("../controllers/teamController");
const {authenticateToken}= require('../controllers/apiSecurityController')
const isAdmin = authenticateToken('admin');
const isUser = authenticateToken('user');


//get all teams with players
router.get("/teamsWithPlayers",teamsWithPlayers);
//get all teams
router.get("/teams",getAllTeams);
//get all teams with no stadium
router.get("/teamsWithNoStadium",getTeamsWithNoStadium);

//adding team without a stadium and when adding the stadium a new field in the team stadium is added automatically
router.post("/team",addTeam);

//get team
router.get("/team/:id",getTeam);

//get team with players
router.get("/teamWithPlayers/:id",getTeamWithPlayers);
//delete team
router.delete('/team/:id',deleteTeam);

//can't update stadium or squad
router.patch('/team/:id',updateTeam);

module.exports = router;