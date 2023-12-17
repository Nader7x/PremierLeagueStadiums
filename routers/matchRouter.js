const {addMatch,getAllMatches,getAllMatchesWithNames,getMatchWithNames,deleteMatch,getMatch,getLiveMatches,
    getHistoryMatches,goal,endMatch,giveCard,matchWithAllData, startMatch,getUpcomingMatches,getSortedEvents} = require('../controllers/matchController')
const express = require('express');
const authenticateToken= require('../controllers/apiSecurityController')
const isAdmin = authenticateToken('admin');
const isUser = authenticateToken('user');
const router = express.Router();

router.get("/matches",isAdmin,getAllMatches);

router.get("/matchesLive",isAdmin,getLiveMatches)

router.get("/matchesHistory",isAdmin,getHistoryMatches)

router.get("/upcomingMatches",isAdmin,getUpcomingMatches)

router.get("/matchesWithNames",isAdmin,getAllMatchesWithNames);

router.post("/match",isAdmin,addMatch);

//take match,team and player all  id's
router.post("/goal",isAdmin,goal)

//takes match and player both id's
router.post("/card",isAdmin,giveCard)

router.get("/matchWithNames/:id",isAdmin,getMatchWithNames);

router.get("/match/:id",isAdmin,getMatch);

router.delete("/match/:id",isAdmin,deleteMatch);

router.get("/endMatch/:id",isAdmin, endMatch);

router.get("/matchWithAllData/:id",isAdmin,matchWithAllData)

router.get("/matchStart/:id",isAdmin,startMatch)

router.get("/sortedEvents/:id",isAdmin,getSortedEvents)


module.exports = router;