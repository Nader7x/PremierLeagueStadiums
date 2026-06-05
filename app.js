// @ts-check
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./controllers/errorController.js";
import commentatorRoute from "./routers/commentatorRouter.js";
import stadiumRoute from "./routers/stadiumRouter.js";
import refereeRoute from "./routers/refereeRouter.js";
import playerRoute from "./routers/playerRouter.js";
import matchRoute from "./routers/matchRouter.js";
import coachRoute from "./routers/coachRouter.js";
import teamRoute from "./routers/teamRouter.js";
import adminUserRoute from "./routers/adminUserRouter.js";


import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {createSchema, createYoga} from "graphql-yoga";
import {ruruHTML} from "ruru/server";
import {resolvers, typeDefs} from "./graphql/schema.js";

import Team from "./models/teamModel.js";
import {Commentator, Referee} from "./models/persons.js";
import Match from "./models/matchModel.js";


const app = express();
app.use(cookieParser());
app.use(morgan("dev")); // Log HTTP requests

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com"],
            connectSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
            frameAncestors: ["'none'"]
        }
    }
}));

app.use(compression());
app.use(mongoSanitize());
mongoose.set("strictQuery", true);
app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use("/api", limiter);

app.set('view engine', 'ejs');
app.use(express.json());

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map(o => o.trim());
app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));



const options = {
    definition: {
        openapi: '3.0.0', info: {
            title: 'EPL Grounds API Documentation',
            version: '1.0.0',
            description: 'API documentation for EPL Grounds API',
        },
    }, apis: ['./routers/*.js'],
};








app.get('/addMatch', async (req, res) => {
    try {
        // Fetch teams, referees, and commentators from your database
        const teams = await Team.find({}).lean(); // Replace with your database query for teams
        const referees = await Referee.find({}).lean(); // Replace with your database query for referees
        const commentators = await Commentator.find({}).lean(); // Replace with your database query for commentators

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
        const referees = await Referee.find().lean();

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
            .populate('stadium','name') // Populate commentator with name
            .lean();

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
// Start the server
app.use(errorHandler);
export default app;
