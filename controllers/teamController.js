import Team from "../models/teamModel.js";
import {Player} from "../models/persons.js";
import Stadium from "../models/stadiumModel.js";

const teamsWithPlayers = async function (req, res) {
    const result = await Team.find({}).populate('coach', 'name').populate('squad', 'name kitNumber position');
    res.send(result);
};

const getAllTeams = async (req, res) => {
    const result = await Team.find({});
    res.send(result);
};

const getTeamsWithNoStadium = async (req, res) => {
    const teamsWithoutStadium = await Team.find({stadium: {$exists: false}});
    res.send(teamsWithoutStadium);
};

const addTeam = async function (req, res) {
    const team = new Team({
        name: req.body.name,
        squad: req.body.squad,
        coach: req.body.coach,
        wins: req.body.wins,
        loss: req.body.loss,
        draw: req.body.draw,
        points: req.body.points,
        kit: req.body.kit,
        logo: req.body.logo
    });
    const result = await team.save().catch((err) => console.log(err));
    res.send(result);
};

const deleteTeam = async (req, res) => {
    const team = await Team.findById(req.params['id']);
    const players = team['squad'];
    await Stadium.findByIdAndUpdate(team['stadium'], {homeTeam: null});
    for (const playerId of players) {
        await Player.findByIdAndUpdate(playerId, {team: null});
    }
    const result = await Team.findByIdAndDelete(req.params['id']);
    res.send(result);
};

const updateTeam = async (req, res) => {
    const newJson = JSON.parse(JSON.stringify(req.body));
    if (req.body.stadium) {
        delete newJson['stadium'];
    }
    if (req.body.squad) {
        delete newJson['squad'];
    }
    const result = await Team.findByIdAndUpdate(req.params['id'], newJson);
    res.send(result);
};

const getTeam = async (req, res) => {
    const result = await Team.findById(req.params['id']);
    res.send(result);
};

const getTeamWithPlayers = async function (req, res) {
    const result = await Team.findById(req.params['id']).populate("squad", "name");
    res.send(result);
};

export {
    teamsWithPlayers,
    getAllTeams,
    getTeamsWithNoStadium,
    addTeam,
    deleteTeam,
    updateTeam,
    getTeam,
    getTeamWithPlayers
};
