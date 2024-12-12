import {Referee} from "../models/persons.js";

const updateReferee = async (req, res) => {
    try {
        const result = await Referee.findByIdAndUpdate(req.params['id'], req.body);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while updating the referee. Please try again later.",
            error: err.message
        });
    }
};

const deleteReferee = async (req, res) => {
    try {
        const result = await Referee.findByIdAndDelete(req.params['id']);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while deleting the referee. Please try again later.",
            error: err.message
        });
    }
};

const addReferee = async (req, res) => {
    try {
        const referee = new Referee({
            name: req.body.name,
            age: req.body.age,
            nationality: req.body.nationality,
        });
        const result = await referee.save();
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while adding the referee. Please try again later.",
            error: err.message
        });
    }
};

const getReferee = async (req, res) => {
    try {
        const result = await Referee.findOne({'_id': req.params['id']});
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving the referee. Please try again later.",
            error: err.message
        });
    }
};

const getAllReferee = async (req, res) => {
    try {
        const result = await Referee.find({});
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving all referees. Please try again later.",
            error: err.message
        });
    }
};

export {updateReferee, deleteReferee, addReferee, getReferee, getAllReferee};
