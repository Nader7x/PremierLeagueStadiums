import Stadium from "../models/stadiumModel.js";
import Team from "../models/teamModel.js";
import Match from "../models/matchModel.js";

const addStadium = async (req, res) => {
    try {
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
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while adding the stadium. Please try again later.",
            error: err.message
        });
    }
};

const getAllStadiums = async (req, res) => {
    try {
        const result = await Stadium.find({});
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving all stadiums. Please try again later.",
            error: err.message
        });
    }
};

const getAllStadiumsWithTeam = async (req, res) => {
    try {
        const result = await Stadium.find({}).populate('homeTeam', 'name');
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving all stadiums with team. Please try again later.",
            error: err.message
        });
    }
};

const getStadiumWithTeam = async (req, res) => {
    try {
        const result = await Stadium.findById(req.params['id']).populate('homeTeam', 'name');
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving the stadium with team. Please try again later.",
            error: err.message
        });
    }
};

const deleteStadium = async (req, res) => {
    try {
        const stadium = await Stadium.findById(req.params['id']);
        const teamId = await stadium['homeTeam'];
        await Team.findByIdAndUpdate(teamId, {$unset: {stadium: 1}});
        const result = await Stadium.findByIdAndDelete(req.params['id']);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while deleting the stadium. Please try again later.",
            error: err.message
        });
    }
};

const getStadium = async (req, res) => {
    try {
        const result = await Stadium.findById(req.params['id']);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving the stadium. Please try again later.",
            error: err.message
        });
    }
};

const updateStadium = async (req, res) => {
    try {
        const newJson = JSON.parse(JSON.stringify(req.body));
        if (req.body.homeTeam) {
            delete newJson['homeTeam'];
        }
        const result = await Stadium.findByIdAndUpdate(req.params['id'], newJson);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while updating the stadium. Please try again later.",
            error: err.message
        });
    }
};

const stadiumMatches = async (req, res) => {
    try {
        const result = await Match.find({stadium: req.params['id']}).populate('homeTeam', 'name').populate('awayTeam', 'name');
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving stadium matches. Please try again later.",
            error: err.message
        });
    }
};

const stadiumHistoryMatches = async (req, res) => {
    try {
        const result = await Match.find({
            stadium: req.params['id'],
            endState: true
        }).populate('homeTeam', 'name').populate('awayTeam', 'name');
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving stadium history matches. Please try again later.",
            error: err.message
        });
    }
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
