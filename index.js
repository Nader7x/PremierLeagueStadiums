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
import {createYoga, createSchema} from "graphql-yoga";
import {ruruHTML} from "ruru/server";
import {typeDefs, resolvers} from "./graphql/schema.js";
import redis from "redis";

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

connectToMongoDB().then();

// Redis client configuration
const redisClient = redis.createClient({
    username: 'default', password: process.env.REDIS_PASSWORD, socket: {
        host: 'redis-19658.c328.europe-west3-1.gce.redns.redis-cloud.com', port: 19658
    }
});


try {
    await redisClient.connect();
    console.log('Connected to Redis successfully!');
} catch (err) {
    console.error('Redis connection error:', err);
}
const cacheData = async (key, data) => {
    try {
        await redisClient.json.set(key, "$", data);
        console.log(`Data cached successfully for key: ${key}`);
    } catch (error) {
        console.error(`Error caching data for key: ${key}`, error);
    }
};

const getCachedData = async (key) => {
    try {
        const data = await redisClient.json.get(key);
        return data;
    } catch (error) {
        console.error(`Error retrieving cached data for key: ${key}`, error);
        return null;
    }
};


// Export the Redis client for reuse
export {cacheData, getCachedData};


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
const port = 3000;
app.listen(port, function () {
    console.log("Server started");
});
