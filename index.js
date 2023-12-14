const commentatorRoute = require('./commentatorRouter')
const stadiumRoute = require('./stadiumRouter')
const refereeRoute = require('./refereeRouter')
const playerRoute = require('./playerRouter')
const matchRoute = require('./matchRouter')
const coachRoute = require('./coachRouter')
const teamRoute = require('./teamRouter')
const mongoose = require('mongoose').default;
const {Coach} = require("./persons");
const Team = require("./teamModel")
const bodyParser = require('body-parser')
const express = require("express");
const cors = require('cors');
const app = express();
mongoose.set('strictQuery', false);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(cors());
require('ejs');

//const positions = ['gk','cb','lb','rb','cm','cam','cdm','cf','rw','rm','lw','lm','st']

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

app.get("/addCoach", async function (req, res) {
    try {
        res.render("addCoach"); // Pass the teams data to the EJS template
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/addReferee", async function (req, res) {
    try {

        res.render("addReferee"); // Pass the teams data to the EJS template
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/addCommentator", async function (req, res) {
    try {

        res.render("addCommentator"); // Pass the teams data to the EJS template
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/addTeam", async function (req, res) {
    try {
        const coaches = await Coach.find({});
        res.render("addTeam", { coaches }); // Pass the teams data to the EJS template
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/addStadium", async function (req, res) {
    try {
        const teamsWithoutStadium = await Team.find({ stadium: { $exists: false } });
        res.render("addStadium", {teamsWithoutStadium}); // Pass the teams data to the EJS template
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.use('/',playerRoute);

app.use('/',commentatorRoute);

app.use('/',coachRoute);

app.use('/',refereeRoute);

app.use('/',teamRoute);

app.use('/',stadiumRoute);

app.use('/',matchRoute);

app.listen(3000,function () {
    console.log("Server started");
});