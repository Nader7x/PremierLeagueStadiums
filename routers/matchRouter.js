const {addMatch,getAllMatches,getAllMatchesWithNames,getMatchWithNames,deleteMatch,getMatch,getLiveMatches,getHistoryMatches,goal,endMatch} = require('../controllers/matchController')
const express = require('express');
const router = express.Router();

router.get("/matches",getAllMatches);

router.get("/matchesLive",getLiveMatches)

router.get("/matchesHistory",getHistoryMatches)

router.get("/matchesWithNames",getAllMatchesWithNames);

router.post("/match",addMatch);

router.post("/goal",goal)

router.get("/matchWithNames/:id",getMatchWithNames);

router.get("/match/:id",getMatch);

router.delete("/match/:id",deleteMatch);

//router.patch("/match/:id",updateMatch);

router.get("/endMatch/:id", endMatch);

module.exports = router;