import {Coach} from "../models/persons.js";

const updateCoach = async (req, res) => {
    try {
        const result = await Coach.findByIdAndUpdate(req.params['id'], req.body);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while updating the coach. Please try again later.",
            error: err.message
        });
    }
};

const deleteCoach = async (req, res) => {
    try {
        const result = await Coach.findByIdAndDelete(req.params['id']);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while deleting the coach. Please try again later.",
            error: err.message
        });
    }
};

const addCoach = async (req, res) => {
    try {
        const coach = new Coach({
            name: req.body.name,
            age: req.body.age,
            nationality: req.body.nationality,
        });
        const result = await coach.save();
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while adding the coach. Please try again later.",
            error: err.message
        });
    }
};

const getCoach = async (req, res) => {
    try {
        const result = await Coach.findOne({'_id': req.params['id']});
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving the coach. Please try again later.",
            error: err.message
        });
    }
};

const getAllCoaches = async (req, res) => {
    try {
        const result = await Coach.find({});
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving all coaches. Please try again later.",
            error: err.message
        });
    }
};

export {updateCoach, deleteCoach, addCoach, getCoach, getAllCoaches};
