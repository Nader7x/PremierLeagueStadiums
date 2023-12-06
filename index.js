require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require('mongoose').default;
mongoose.set('strictQuery', false);
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const Stadium = require("./models/stadiumModel")
const Match = require("./models/matchModel")
const Team = require("./models/teamModel")
const myModule = require('./models/persons');
const {Coach} = require("./models/persons");
const Referee = myModule.Referee
const Player = myModule.Player
app.use(express.static("public"));

const positions = ['gk','cb','lb','rb','cm','cam','cdm','cf','rw','rm','lw','lm','st']

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

app.get("/",async function (req, res) {
    const result = await Referee.find({})
    console.log(result)
    res.send(result)
});

app.get("/showAllTeams",async function (req, res) {
    const result = await Team.find({}).populate('coach','name');
    console.log(result)
    res.send(result)
});

app.post("/addPlayer",async function(req, res){

    const player = new Player({
        name:req.body.name,
        age:req.body.age,
        nationality:req.body.nationality,
        kitNumber:req.body.kitNumber,
        position:req.body.position,
        team:req.body.team
    });
    const result = await player.save().catch((err)=>console.log(err));
    console.log(result);
    res.send(result)
});

app.post("/addCoach",async function(req, res){

    const coach = new Coach({
        name:req.body.name,
        age:req.body.age,
        nationality:req.body.nationality,
    });
    const result = await coach.save().catch((err)=>console.log(err));
    console.log(result);
    res.send(result)
});

app.post("/addReferee",async function(req, res){

    const referee = new Referee({
        name:req.body.name,
        age:req.body.age,
        nationality:req.body.nationality,
    });
    const result = await referee.save().catch((err)=>console.log(err));
    console.log(result);
    res.send(result)
});

//adding team without a stadium and when adding the stadium a new field in the team stadium is added automatically
app.post("/addTeam",async function(req, res){

    const team = new Team({
        name:req.body.name,
        squad:req.body.squad,
        coach:req.body.coach,
        wins:req.body.wins,
        loss:req.body.loss,
        draw:req.body.draw,
        points:req.body.points,
        kit:req.body.kit
    });
    const result = await team.save().catch((err)=>console.log(err));
    console.log(result);
    res.send(result)
});

app.post("/addStadium",async function(req, res){

    const stadium = new Stadium({
        homeTeam:req.body.homeTeam,
        name:req.body.name,
        capacity:req.body.capacity,
        state:req.body.state
    });
    const result = await stadium.save().catch((err)=>console.log(err));
    await Team.findByIdAndUpdate(result['homeTeam'],{stadium:result["_id"]})

    console.log(result);
    res.send(result)
});

app.listen(3000,function () {
    console.log("Server started");
});