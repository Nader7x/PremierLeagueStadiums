const {updateCommentator, deleteCommentator, addCommentator, getCommentator, getAllCommentators} = require("../controllers/commentatorController");
const express = require('express');
const authenticateToken= require('../controllers/apiSecurityController')
const isAdmin = authenticateToken('admin');
const isUser = authenticateToken('user');
const router = express.Router();

router.get("/commentators",isAdmin,getAllCommentators);

router.post("/commentator",isAdmin,addCommentator);

router.get("/commentator/:id",isAdmin || isUser,getCommentator);

router.delete("/commentator/:id",isAdmin,deleteCommentator);

router.patch("/commentator/:id",isAdmin,updateCommentator)

module.exports = router;