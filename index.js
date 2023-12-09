//require('dotenv').config();
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
const {Referee,Coach,Commentator,User,Admin,Player} = require("./models/persons");
app.use(express.static("public"));
/*const ejs = */
require('ejs');
app.set('view engine', 'ejs');

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

app.get("/",async function (req, res) {
    const result = await Referee.find({})
    //const result = await Player.deleteMany({team:'6572664798b2d1184219c5f8'})
    console.log(result)
    res.send(result)
});

app.get("/showAllTeamsWithPlayers",async function (req, res) {
    const result = await Team.find({}).populate('coach','name').populate('squad','name');
    console.log(result)
    res.send(result)
});

app.get("/showAllTeams",async function (req, res) {
    const result = await Team.find({});
    console.log(result)
    res.send(result)
});
app.get("/showAllCurrentMatches",async function (req, res) {
    const result = await Match.find({status:true}).populate({
        path: 'homeTeam',
        populate: {
            path: 'squad',
            model: 'Player',
            select: 'name'
        }
    })
        .populate({
            path: 'awayTeam',
            populate: {
                path: 'squad',
                model: 'Player',
                select: 'name'
            }
        }).populate('referee', 'name')
        .populate('commentator', 'name');
    console.log(result)
    res.send(result)
});

app.get("/showPlayers/:teamId",async function (req, res) {
    const result = await Player.find({team:req.params['teamId']});
    console.log(result.length)
    res.send(result)
});

app.get("/showAllPlayers",async function (req, res) {
    const result = await Player.find({});
    console.log(result.length);
    res.send(result);
});

app.get("/showAllCoaches",async function (req, res) {
    const result = await Coach.find({});
    console.log(result);
    res.send(result);
});

app.get("/showAllReferees",async function (req, res) {
    const result = await Referee.find({});
    console.log(result);
    res.send(result);
});

app.get("/showAllCommentators",async function (req, res) {
    const result = await Commentator.find({});
    console.log(result);
    res.send(result);
});

app.get("/showAllTeamsWithNoStadium",async function (req, res) {
    const teamsWithoutStadium = await Team.find({ stadium: { $exists: false } });
    console.log(teamsWithoutStadium);
    res.send(teamsWithoutStadium);
});

app.get("/addPlayer", async function (req, res) {
    try {
        const teams = await Team.find({});
        res.render("addPlayer", { teams }); // Pass the teams data to the EJS template
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
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
    try {
        const playerTeam = await Team.findById(result['team']);
        await Team.findByIdAndUpdate(result['team'],{squad:playerTeam['squad'].concat(result['_id'])});

    }catch (e) {
        console.log(e);
    }
    console.log(result);
    res.send(result)
});

app.post("/addSquad",async function(req, res){

    const result = await Player.insertMany(req.body);

    try {
        for (const player of result) {
            const playerTeam = await Team.findById(player['team']);
            await Team.findByIdAndUpdate(player['team'],{squad:playerTeam['squad'].concat(player['_id'])});
        }

    }catch (e) {
        console.log(e);
    }
    console.log(result);
    res.send(result)
});


app.get("/addCoach", async function (req, res) {
    try {
        res.render("addCoach"); // Pass the teams data to the EJS template
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
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

app.get("/addReferee", async function (req, res) {
    try {

        res.render("addReferee"); // Pass the teams data to the EJS template
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
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

app.get("/addCommentator", async function (req, res) {
    try {

        res.render("addCommentator"); // Pass the teams data to the EJS template
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/addCommentator",async function(req, res){

    const commentator = new Commentator({
        name:req.body.name,
        age:req.body.age,
        nationality:req.body.nationality,
    });
    const result = await commentator.save().catch((err)=>console.log(err));
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
        kit:req.body.kit,
        logo:req.body.logo
    });
    const result = await team.save().catch((err)=>console.log(err));
    console.log(result);
    res.send(result)
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

app.post("/addStadium",async function(req, res){

    const stadium = new Stadium({
        homeTeam:req.body.homeTeam,
        name:req.body.name,
        capacity:req.body.capacity,
        state:req.body.state
    });
    const result = await stadium.save().catch((err)=>console.log(err));
    console.log(result);
    await Team.findByIdAndUpdate(result['homeTeam'],{stadium:result["_id"]})

    console.log(result);
    res.send(result)
});

app.post("/createMatch",async function(req, res){

    const match = new Match({
        homeTeam:req.body.homeTeam,
        awayTeam:req.body.awayTeam,
        referee:req.body.referee,
        commentator:req.body.commentator
    });
    const result = await match.save().catch((err)=>console.log(err));

    console.log(result);
    res.send(result)
});


app.listen(3000,function () {
    console.log("Server started");
});