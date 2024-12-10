const {addMatch,getAllMatches,getAllMatchesWithNames,getMatchWithNames,deleteMatch,getMatch,getLiveMatches,
    getHistoryMatches,goal,endMatch,giveCard,matchWithAllData, startMatch,getUpcomingMatches,getSortedEvents,fixMatches} = require('../controllers/matchController')
const express = require('express');
const {authenticateToken}= require('../controllers/apiSecurityController')
const isAdmin = authenticateToken('admin');
const isUser = authenticateToken('user');
const router = express.Router();

router.get("/matches",getAllMatches);

router.get("/matchesLive",getLiveMatches)

router.get("/matchesHistory",getHistoryMatches)

router.get("/upcomingMatches",getUpcomingMatches)

router.get("/matchesWithNames",getAllMatchesWithNames);

router.get("/adminMatchesWithNames"/*,isAdmin*/,getAllMatchesWithNames);

router.post("/match",addMatch);

//take match,team and player all  id's
router.post("/goal"/*,isAdmin*/,goal)

//takes match and player both id's
router.post("/card"/*,isAdmin*/,giveCard)

router.get("/matchWithNames/:id",getMatchWithNames);

router.get("/match/:id",getMatch);

router.delete("/match/:id",deleteMatch);

router.get("/endMatch/:id", endMatch);

router.get("/matchWithAllData/:id",matchWithAllData)

router.get("/matchStart/:id"/*,isAdmin*/,startMatch)

router.get("/sortedEvents/:id",getSortedEvents)

router.get("/fixMatches/",fixMatches)


module.exports = router;