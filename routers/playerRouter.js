const {getPlayer,addPlayer,updatePlayer,deletePlayer,getAllPlayers,addPlayers,playersWithSameTeam} = require('../controllers/playerController');
const express = require('express');
const router = express.Router();

router.post("/player",addPlayer);

router.get("/players",getAllPlayers);

router.post("/addPlayers",addPlayers);

router.patch("/player/:id",updatePlayer);

router.delete("/player/:id",deletePlayer);

router.get("/player/:playerId",getPlayer);

router.get("/playersWithSameTeam/:teamId",playersWithSameTeam)

module.exports = router;
