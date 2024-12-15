import Team from "../models/teamModel.js";
import {Player} from "../models/persons.js";
import Stadium from "../models/stadiumModel.js";

const teamsWithPlayers = async function (req, res) {
    try {
        const result = await Team.find({}).populate('coach', 'name').populate('squad', 'name kitNumber position');
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving teams with players. Please try again later.",
            error: err.message
        });
    }
};

const getAllTeams = async (req, res) => {
    try {
        const result = await Team.find({});
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving all teams. Please try again later.",
            error: err.message
        });
    }
};

const getTeamsWithNoStadium = async (req, res) => {
    try {
        const teamsWithoutStadium = await Team.find({stadium: {$exists: false}});
        res.send(teamsWithoutStadium);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving teams with no stadium. Please try again later.",
            error: err.message
        });
    }
};

const addTeam = async function (req, res) {
    try {
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
        const result = await team.save();
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while adding the team. Please try again later.",
            error: err.message
        });
    }
};

const deleteTeam = async (req, res) => {
    try {
        const team = await Team.findById(req.params['id']);
        const players = team['squad'];
        await Stadium.findByIdAndUpdate(team['stadium'], {homeTeam: null});
        for (const playerId of players) {
            await Player.findByIdAndUpdate(playerId, {team: null});
        }
        const result = await Team.findByIdAndDelete(req.params['id']);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while deleting the team. Please try again later.",
            error: err.message
        });
    }
};

const updateTeam = async (req, res) => {
    try {
        const newJson = JSON.parse(JSON.stringify(req.body));
        if (req.body.stadium) {
            delete newJson['stadium'];
        }
        if (req.body.squad) {
            delete newJson['squad'];
        }
        const result = await Team.findByIdAndUpdate(req.params['id'], newJson);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while updating the team. Please try again later.",
            error: err.message
        });
    }
};

const getTeam = async (req, res) => {
    try {
        const result = await Team.findById(req.params['id']);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving the team. Please try again later.",
            error: err.message
        });
    }
};

const getTeamWithPlayers = async function (req, res) {
    try {
        const result = await Team.findById(req.params['id']).populate("squad", "name");
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving the team with players. Please try again later.",
            error: err.message
        });
    }
};

const getLeagueStandings = async (req, res) => {
    try {
        const teams = await Team.find({}).sort({ points: -1 });
        res.send(teams);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving the league standings. Please try again later.",
            error: err.message
        });
    }
};

export {
    teamsWithPlayers,
    getAllTeams,
    getTeamsWithNoStadium,
    addTeam,
    deleteTeam,
    updateTeam,
    getTeam,
    getTeamWithPlayers,
    getLeagueStandings
};
