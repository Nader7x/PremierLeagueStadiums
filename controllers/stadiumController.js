// @ts-check
import { getPagination } from './pagination.js';
import Stadium from "../models/stadiumModel.js";
import Team from "../models/teamModel.js";
import Match from "../models/matchModel.js";

const addStadium = async (req, res) => {
    const stadium = new Stadium({
        homeTeam: req.body.homeTeam,
        name: req.body.name,
        capacity: req.body.capacity,
        state: req.body.state
    });
    const result = await stadium.save();
    console.log(result);
    await Team.findByIdAndUpdate(result['homeTeam'], {stadium: result["_id"]});
    res.send(result);
};

const getAllStadiums = async (req, res) => {
    const result = await Stadium.find().lean();
    res.send(result);
};

const getAllStadiumsWithTeam = async (req, res) => {
    const result = await Stadium.find().lean();
    res.send(result);
};

const getStadiumWithTeam = async (req, res) => {
    const result = await Stadium.findById(req.params['id']).populate('homeTeam', 'name');
    res.send(result);
};

const deleteStadium = async (req, res) => {
    const stadium = await Stadium.findById(req.params['id']);
    const teamId = await stadium['homeTeam'];
    await Team.findByIdAndUpdate(teamId, {$unset: {stadium: 1}});
    const result = await Stadium.findByIdAndDelete(req.params['id']);
    res.send(result);
};

const getStadium = async (req, res) => {
    const result = await Stadium.findById(req.params['id']);
    res.send(result);
};

const updateStadium = async (req, res) => {
    const newJson = JSON.parse(JSON.stringify(req.body));
    if (req.body.homeTeam) {
        delete newJson['homeTeam'];
    }
    const result = await Stadium.findByIdAndUpdate(req.params['id'], newJson);
    res.send(result);
};

const stadiumMatches = async (req, res) => {
    const result = await Match.find({stadium: req.params['id']}).populate('homeTeam', 'name').populate('awayTeam', 'name').lean();
    res.send(result);
};

const stadiumHistoryMatches = async (req, res) => {
    const result = await Match.find({
        stadium: req.params['id'],
        endState: true
    }).populate('homeTeam', 'name').populate('awayTeam', 'name');
    res.send(result);
};

export {
    addStadium,
    getAllStadiums,
    getAllStadiumsWithTeam,
    getStadiumWithTeam,
    deleteStadium,
    getStadium,
    updateStadium,
    stadiumMatches,
    stadiumHistoryMatches
};
