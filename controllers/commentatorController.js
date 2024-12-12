import {Commentator} from "../models/persons.js";

const updateCommentator = async (req, res) => {
    const result = await Commentator.findByIdAndUpdate(req.params['id'], req.body);
    res.send(result);
};

const deleteCommentator = async (req, res) => {
    const result = await Commentator.findByIdAndDelete(req.params['id']);
    res.send(result);
};

const addCommentator = async (req, res) => {
    const commentator = new Commentator({
        name: req.body.name, age: req.body.age, nationality: req.body.nationality,
    });
    const result = await commentator.save().catch((err) => console.log(err));
    res.send(result);
};

const getCommentator = async (req, res) => {
    const result = await Commentator.findOne({'_id': req.params['id']});
    res.send(result);
};

const getAllCommentators = async (req, res) => {
    const result = await Commentator.find({});
    res.send(result);
};

export {updateCommentator, deleteCommentator, addCommentator, getCommentator, getAllCommentators};
