require('dotenv').config();
const mongoose = require('mongoose').default;
mongoose.set('strictQuery', false);
const express = require("express");
const app = express();
const Stadium = require("./models/stadiumModel")
const Match = require("./models/matchModel")
const Team = require("./models/teamModel")

app.use(express.static("public"));

async function connectToMongoDB() {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect("mongodb://127.0.0.1:27017/premierLeagueDB");
        console.log("Connected to Mongo Successfully!");
    } catch (error) {
        console.log(error);
    }
}



connectToMongoDB().then();

app.get("/",function (req, res) {
    console.log("get request")
});

app.listen(3000,function () {
    console.log("Server started");
});