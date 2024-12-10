const {updateCommentator, deleteCommentator, addCommentator, getCommentator, getAllCommentators} = require("../controllers/commentatorController");
const express = require('express');
const {authenticateToken}= require('../controllers/apiSecurityController')
const isAdmin = authenticateToken('admin');
const isUser = authenticateToken('user');
const router = express.Router();

router.get("/commentators",getAllCommentators);

router.post("/commentator",addCommentator);

router.get("/commentator/:id",getCommentator);

router.delete("/commentator/:id",deleteCommentator);

router.patch("/commentator/:id",updateCommentator)

module.exports = router;