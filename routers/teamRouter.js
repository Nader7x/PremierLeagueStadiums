const express = require("express");
const router = express.Router();
const {getTeam,addTeam,updateTeam,deleteTeam,getAllTeams,getTeamWithPlayers,teamsWithPlayers,getTeamsWithNoStadium} = require("../controllers/teamController");
const authenticateToken= require('../controllers/apiSecurityController')
const isAdmin = authenticateToken('admin');
const isUser = authenticateToken('user');


//get all teams with players
router.get("/teamsWithPlayers",isUser || isAdmin,teamsWithPlayers);
//get all teams
router.get("/teams",isAdmin,getAllTeams);
//get all teams with no stadium
router.get("/teamsWithNoStadium",isAdmin,getTeamsWithNoStadium);

//adding team without a stadium and when adding the stadium a new field in the team stadium is added automatically
router.post("/team",isAdmin,addTeam);

//get team
router.get("/team/:id",isAdmin || isUser,getTeam);

//get team with players
router.get("/teamWithPlayers/:id",isAdmin,getTeamWithPlayers);
//delete team
router.delete('/team/:id',isAdmin,deleteTeam);

//can't update stadium or squad
router.patch('/team/:id',isAdmin,updateTeam);

module.exports = router;