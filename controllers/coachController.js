const {Coach} = require("../models/persons");

const updateCoach = async (req, res)=>{
    const result = await Coach.findByIdAndUpdate(req.params['id'], req.body);
    console.log(result);
    res.send(result);
};

const deleteCoach = async (req, res)=>{
    const result = await Coach.findByIdAndDelete(req.params['id']);
    console.log(result);
    res.send(result)
}

const addCoach = async (req, res)=>{
    const coach = new Coach({
        name:req.body.name,
        age:req.body.age,
        nationality:req.body.nationality,
    });
    const result = await coach.save().catch((err)=>console.log(err));
    console.log(result);
    res.send(result)
};

const getCoach = async (req, res)=>{
    const result = await Coach.findOne({'_id':req.params['id']});
    console.log(result);
    res.send(result);
}

const getAllCoaches = async (req, res)=>{
    const result = await Coach.find({});
    console.log(result);
    res.send(result);
};

module.exports = {updateCoach, deleteCoach, addCoach, getCoach, getAllCoaches}