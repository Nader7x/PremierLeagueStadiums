const {getPlayer,addPlayer,updatePlayer,deletePlayer,getAllPlayers,addPlayers,playersWithSameTeam} = require('../controllers/playerController');
const express = require('express');
const authenticateToken= require('../controllers/apiSecurityController')
const isAdmin = authenticateToken('admin');
const isUser = authenticateToken('user');
const router = express.Router();

router.post("/player",isAdmin,addPlayer);

router.get("/players",isAdmin,getAllPlayers);

router.post("/addPlayers",isAdmin,addPlayers);

router.patch("/player/:id",isAdmin,updatePlayer);

router.delete("/player/:id",isAdmin,deletePlayer);

router.get("/player/:playerId",isAdmin,getPlayer);

router.get("/playersWithSameTeam/:teamId",isAdmin,playersWithSameTeam)

module.exports = router;
