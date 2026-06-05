// @ts-check
import { getPagination } from './pagination.js';
import {Player} from "../models/persons.js";
import Team from "../models/teamModel.js";
import {cacheData, getCachedData} from "./caching.js";


const getPlayer = async (req, res) => {
    const cacheKey = `players:${req.params['playerId']}`;
    const cachedData = await getCachedData(cacheKey);

    if (cachedData) {
        return res.status(200).json(cachedData);
    }

    const result = await Player.findById(req.params['playerId']);
    await cacheData(cacheKey, result, 3600); // Cache the data with expiry
    res.status(200).json(result);
};

const playersWithSameTeam = async (req, res) => {
    const teamId = req.params['teamId'];
    const cacheKey = `playersWithSameTeam:${teamId}`;

    const cachedData = await getCachedData(cacheKey);
    if (cachedData) {
        console.log(`Cache hit for ${cacheKey}`);
        return res.status(200).json(cachedData);
    }

    const result = await Player.find({ team: teamId }).lean();
    if (!result || result.length === 0) {
        return res.status(404).json({ message: "No players found for this team." });
    }

    await cacheData(cacheKey, result, 3600); // Cache the data with expiry
    res.status(200).json(result);
};


const addPlayer = async (req, res) => {
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
};

const updatePlayer = async (req, res) => {
    const result = await Player.findByIdAndUpdate(req.params['id'], req.body);
    res.send(result);
};

const deletePlayer = async (req, res) => {
    const playerId = req.params['id'];
    const player = await Player.findOne({_id: playerId});
    const teamId = player['team'];
    await Team.findByIdAndUpdate(teamId, {$pull: {squad: playerId}});
    const result = await Player.findByIdAndDelete(playerId);
    res.send(result);
};
const getAllPlayers = async (req, res) => {
    const cacheKey = 'allPlayers';
    const cachedData = await getCachedData(cacheKey);

    if (cachedData) {
        console.log(`Cache hit for ${cacheKey}`);
        return res.status(200).json(cachedData);
    }
    const result = await Player.find().lean();
    await cacheData(cacheKey, result, 3600); // Cache the data with expiry
    res.status(200).json(result);
};

const addPlayers = async (req, res) => {
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
};

export {getPlayer, addPlayer, updatePlayer, deletePlayer, getAllPlayers, addPlayers, playersWithSameTeam};
