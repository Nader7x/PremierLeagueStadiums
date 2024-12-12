import commentatorRoute from "./routers/commentatorRouter.js";
import stadiumRoute from "./routers/stadiumRouter.js";
import refereeRoute from "./routers/refereeRouter.js";
import playerRoute from "./routers/playerRouter.js";
import matchRoute from "./routers/matchRouter.js";
import coachRoute from "./routers/coachRouter.js";
import teamRoute from "./routers/teamRouter.js";
import adminUserRoute from "./routers/adminUserRouter.js";
import mongoose from "mongoose";
import { Coach, Referee, Commentator } from "./models/persons.js";
import Team from "./models/teamModel.js";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { createYoga, createSchema } from "graphql-yoga";
import { ruruHTML } from "ruru/server";
import {typeDefs,resolvers} from "./graphql/schema.js";

const app = express();
app.use(cookieParser());
mongoose.set('strictQuery', false);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(cors());
import ejs from "ejs";
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'EPL Grounds API Documentation',
            version: '1.0.0',
            description: 'API documentation for EPL Grounds API',
        },
    },
    apis: ['./routers/*.js'], // Path to the API docs
};

async function connectToMongoDB() {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect("mongodb://127.0.0.1:27017/premierLeagueDB");
        console.log("Connected to Mongo Successfully!");
    } catch (error) {
        console.log(error);
    }
}

// async function connectToMongoDBOnline() {
//     try {
//         mongoose.set("strictQuery", false);
//         await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.raud4.mongodb.net/premierLeagueDB?retryWrites=true&w=majority&appName=Cluster0`);
//         console.log("Connected to Mongo Successfully!");
//     } catch (error) {
//         console.log(error);
//     }
// }

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

app.get('/addMatch', async (req, res) => {
    try {
        const teams = await Team.find({});
        const referees = await Referee.find({});
        const commentators = await Commentator.find({});
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

const yoga = createYoga({
    schema: createSchema({
        typeDefs: typeDefs,
        resolvers: resolvers,
    }),
});

app.use('/graphql', yoga);

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get("/", (_req, res) => {
    res.type("html");
    res.end(ruruHTML({ endpoint: "/graphql" }));
});
const port = process.env.PORT || 3000;
app.listen(port,function () {
    console.log("Server started");
});
