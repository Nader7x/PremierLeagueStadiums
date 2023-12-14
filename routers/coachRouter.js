const {updateCoach, deleteCoach, addCoach, getCoach, getAllCoaches} = require("../controllers/coachController");
const express = require('express');
const router = express.Router();

router.get("/coaches",getAllCoaches);

router.post("/coach",addCoach);

router.get("/coach/:id",getCoach);

router.delete("/coach/:id",deleteCoach);

router.patch("/coach/:id",updateCoach)

module.exports = router;