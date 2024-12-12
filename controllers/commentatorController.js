import {Commentator} from "../models/persons.js";

const updateCommentator = async (req, res) => {
    try {
        const result = await Commentator.findByIdAndUpdate(req.params['id'], req.body);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while updating the commentator. Please try again later.",
            error: err.message
        });
    }
};

const deleteCommentator = async (req, res) => {
    try {
        const result = await Commentator.findByIdAndDelete(req.params['id']);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while deleting the commentator. Please try again later.",
            error: err.message
        });
    }
};

const addCommentator = async (req, res) => {
    try {
        const commentator = new Commentator({
            name: req.body.name, age: req.body.age, nationality: req.body.nationality,
        });
        const result = await commentator.save();
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while adding the commentator. Please try again later.",
            error: err.message
        });
    }
};

const getCommentator = async (req, res) => {
    try {
        const result = await Commentator.findOne({'_id': req.params['id']});
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving the commentator. Please try again later.",
            error: err.message
        });
    }
};

const getAllCommentators = async (req, res) => {
    try {
        const result = await Commentator.find({});
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving all commentators. Please try again later.",
            error: err.message
        });
    }
};

export {updateCommentator, deleteCommentator, addCommentator, getCommentator, getAllCommentators};
