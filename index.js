import commentatorRoute from "./routers/commentatorRouter.js";
import stadiumRoute from "./routers/stadiumRouter.js";
import refereeRoute from "./routers/refereeRouter.js";
import playerRoute from "./routers/playerRouter.js";
import matchRoute from "./routers/matchRouter.js";
import coachRoute from "./routers/coachRouter.js";
import teamRoute from "./routers/teamRouter.js";
import adminUserRoute from "./routers/adminUserRouter.js";


import mongoose from "mongoose";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {createSchema, createYoga} from "graphql-yoga";
import {ruruHTML} from "ruru/server";
import {resolvers, typeDefs} from "./graphql/schema.js";
import redis from "redis";
import start from "./Services/StartEndMatchService.js"
import router from "./routers/matchRouter.js";
import Team from "./models/teamModel.js";
import {Commentator, Referee} from "./models/persons.js";
import Match from "./models/matchModel.js";


const app = express();
app.use(cookieParser());
mongoose.set('strictQuery', false);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(cors());


const options = {
    definition: {
        openapi: '3.0.0', info: {
            title: 'EPL Grounds API Documentation',
            version: '1.0.0',
            description: 'API documentation for EPL Grounds API',
        },
    }, apis: ['./routers/*.js'],
};

// Function to connect to MongoDB
async function connectToMongoDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/premierLeagueDB");
        console.log("Connected to Mongo Successfully!");
    } catch (error) {
        console.log(error);
    }
}

connectToMongoDB().then().catch((error) => console.error(error));

// Redis client configuration

let redisClient = redis.createClient({
    username: 'default', password: process.env.REDIS_PASSWORD, socket: {
        host: 'redis-19658.c328.europe-west3-1.gce.redns.redis-cloud.com', port: 19658
    }
});


try {
    await redisClient.connect();
    console.log('Connected to Redis successfully!');
} catch (err) {
    console.error('Redis connection error:', err);
    console.log('Attempting to connect to local Redis...');
    redisClient = redis.createClient({
        socket: {
            host: '127.0.0.1',
            port: 6379
        }
    });
    try {
        await redisClient.connect();
        console.log('Connected to local Redis successfully!');
    } catch (localErr) {
        console.error('Local Redis connection error:', localErr);
    }
}
const cacheData = async (key, data,expiry) => {
    try {
        await redisClient.json.set(key, "$", data,);
        await redisClient.expire(key, expiry);
        console.log(`Data cached successfully for key: ${key}`);
    } catch (error) {
        console.error(`Error caching data for key: ${key}`, error);
    }
};

const getCachedData = async (key) => {
    try {
        return await redisClient.json.get(key);
    } catch (error) {
        console.error(`Error retrieving cached data for key: ${key}`, error);
        return null;
    }
};


// Export the Redis client for reuse
export {cacheData, getCachedData};

app.get('/addMatch', async (req, res) => {
    try {
        // Fetch teams, referees, and commentators from your database
        const teams = await Team.find({}); // Replace with your database query for teams
        const referees = await Referee.find({}); // Replace with your database query for referees
        const commentators = await Commentator.find({}); // Replace with your database query for commentators

        // Render the template and pass the data
        res.render('addMatch', {
            teams: teams,
            referees: referees,
            commentators: commentators
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/addReferee', async (req, res) => {
    try {
        // Fetch all referees from the database
        const referees = await Referee.find();

        // Render the page and pass the referees list
        res.render('addReferee', { referees });
    } catch (error) {
        console.error('Error fetching referees:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/viewMatches', async (req, res) => {
    try {
        // Fetch matches from the database
        const matches = await Match.find({})
            .populate('homeTeam', 'name') // Populate homeTeam with name
            .populate('awayTeam', 'name') // Populate awayTeam with name
            .populate('referee', 'name')  // Populate referee with name
            .populate('commentator', 'name')
            .populate('stadium','name'); // Populate commentator with name

        // Render the view matches page and pass the matches
        res.render('viewMatches', { matches });
    } catch (error) {
        console.error('Error fetching matches:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Register routes
app.use('/', commentatorRoute);
app.use('/', adminUserRoute);
app.use('/', stadiumRoute);
app.use('/', refereeRoute);
app.use('/', playerRoute);
app.use('/', coachRoute);
app.use('/', matchRoute);
app.use('/', teamRoute);

// GraphQL setup
const yoga = createYoga({
    schema: createSchema({
        typeDefs: typeDefs, resolvers: resolvers,
    }),
});

app.use('/graphql', yoga);

// Swagger setup
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// ruruHTML setup
app.get("/", (_req, res) => {
    res.type("html");
    res.end(ruruHTML({endpoint: "/graphql"}));
});
start();
// Start the server
const port = 3000;
app.listen(port, function () {
    console.log("Server started");
});
