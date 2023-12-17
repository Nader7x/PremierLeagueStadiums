const {addMatch,getAllMatches,getAllMatchesWithNames,getMatchWithNames,deleteMatch,getMatch,getLiveMatches,
    getHistoryMatches,goal,endMatch,giveCard,matchWithAllData, startMatch} = require('../controllers/matchController')
const express = require('express');
const router = express.Router();

router.get("/matches",getAllMatches);

router.get("/matchesLive",getLiveMatches)

router.get("/matchesHistory",getHistoryMatches)

router.get("/matchesWithNames",getAllMatchesWithNames);

router.post("/match",addMatch);

//take match,team and player all  id's
router.post("/goal",goal)

//takes match and player both id's
router.post("/card",giveCard)

router.get("/matchWithNames/:id",getMatchWithNames);

router.get("/match/:id",getMatch);

router.delete("/match/:id",deleteMatch);

router.get("/endMatch/:id", endMatch);

router.get("/matchWithAllData/:id",matchWithAllData)    //will give me the whole data that I need

router.get("/matchStart/:id",startMatch)



module.exports = router;