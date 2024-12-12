import {Player} from "../models/persons.js";
import Team from "../models/teamModel.js";
import redis from "redis";
import util from "util";

const redisClient = redis.createClient();
redisClient.get = util.promisify(redisClient.get);

const getPlayer = async (req, res) => {
    try {
        const cacheKey = `player:${req.params['playerId']}`;
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return res.send(JSON.parse(cachedData));
        }
        const result = await Player.findOne({_id: req.params['playerId']});
        redisClient.set(cacheKey, JSON.stringify(result));
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving the player. Please try again later.",
            error: err.message
        });
    }
};

const playersWithSameTeam = async (req, res) => {
    try {
        const cacheKey = `playersWithSameTeam:${req.params['teamId']}`;
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return res.send(JSON.parse(cachedData));
        }
        const result = await Player.find({'team': req.params['teamId']});
        redisClient.set(cacheKey, JSON.stringify(result));
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving players with the same team. Please try again later.",
            error: err.message
        });
    }
};

const addPlayer = async (req, res) => {
    try {
        const player = new Player({
            name: req.body.name,
            age: req.body.age,
            nationality: req.body.nationality,
            kitNumber: req.body.kitNumber,
            position: req.body.position,
            team: req.body.team
        });
        const result = await player.save();
        try {
            const playerTeam = await Team.findById(result['team']);
            await Team.findByIdAndUpdate(result['team'], {squad: playerTeam['squad'].concat(result['_id'])});
        } catch (e) {
            console.log(e);
        }
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while adding the player. Please try again later.",
            error: err.message
        });
    }
};

const updatePlayer = async (req, res) => {
    try {
        const result = await Player.findByIdAndUpdate(req.params['id'], req.body);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while updating the player. Please try again later.",
            error: err.message
        });
    }
};

const deletePlayer = async (req, res) => {
    try {
        const playerId = req.params['id'];
        const player = await Player.findOne({_id: playerId});
        const teamId = player['team'];
        await Team.findByIdAndUpdate(teamId, {$pull: {squad: playerId}});
        const result = await Player.findByIdAndDelete(playerId);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while deleting the player. Please try again later.",
            error: err.message
        });
    }
};

const getAllPlayers = async (req, res) => {
    try {
        const cacheKey = 'allPlayers';
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return res.send(JSON.parse(cachedData));
        }
        const result = await Player.find({});
        redisClient.set(cacheKey, JSON.stringify(result));
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving all players. Please try again later.",
            error: err.message
        });
    }
};

const addPlayers = async (req, res) => {
    try {
        const result = await Player.insertMany(req.body);
        try {
            for (const player of result) {
                const playerTeam = await Team.findById(player['team']);
                await Team.findByIdAndUpdate(player['team'], {squad: playerTeam['squad'].concat(player['_id'])});
            }
        } catch (e) {
            console.log(e);
        }
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while adding players. Please try again later.",
            error: err.message
        });
    }
};

export {getPlayer, addPlayer, updatePlayer, deletePlayer, getAllPlayers, addPlayers, playersWithSameTeam};
