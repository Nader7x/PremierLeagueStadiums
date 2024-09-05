const commentatorRoute = require('./routers/commentatorRouter')
const stadiumRoute = require('./routers/stadiumRouter')
const refereeRoute = require('./routers/refereeRouter')
const playerRoute = require('./routers/playerRouter')
const matchRoute = require('./routers/matchRouter')
const coachRoute = require('./routers/coachRouter')
const teamRoute = require('./routers/teamRouter')
const adminUserRoute = require('./routers/adminUserRouter')
const mongoose = require('mongoose').default;
//const { MongoClient, ServerApiVersion } = require('mongodb');
const {Coach, Referee, Commentator} = require("./models/persons");
const Team = require("./models/teamModel")
// const StartMatchService = require('./Services/StartEndMatchService')
const bodyParser = require('body-parser')
const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
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

async function connectToMongoDBOnline() {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.raud4.mongodb.net/premierLeagueDB?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Connected to Mongo Successfully!");
    } catch (error) {
        console.log(error);
    }
}

connectToMongoDBOnline().then()
//connectToMongoDB().then();

// try {
//     StartMatchService.start().then(
//
//     );
// } catch (error) {
//     console.error("Error in cron job:", error);
// }


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

app.get('/addMatch', async (req, res) => {
    try {
        // Fetch teams, referees, and commentators from the database
        const teams = await Team.find({});
        const referees = await Referee.find({});
        const commentators = await Commentator.find({});

        // Render the addMatch view and pass the fetched data to the template
        res.render('addMatch', { teams, referees, commentators });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.use('/',commentatorRoute);

app.use('/',adminUserRoute);

app.use('/',stadiumRoute);

app.use('/',refereeRoute);

app.use('/',playerRoute);

app.use('/',coachRoute);

app.use('/',matchRoute);

app.use('/',teamRoute);

app.listen(3000,function () {
    console.log("Server started");
});