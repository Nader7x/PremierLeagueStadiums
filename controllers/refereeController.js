const {Referee} = require("../models/persons");

const updateReferee = async (req, res)=>{
    const result = await Referee.findByIdAndUpdate(req.params['id'], req.body);
    // console.log(result);
    res.send(result);
};

const deleteReferee = async (req, res)=>{
    const result = await Referee.findByIdAndDelete(req.params['id']);
    // console.log(result);
    res.send(result)
}

const addReferee = async (req, res)=>{
    const referee = new Referee({
        name:req.body.name,
        age:req.body.age,
        nationality:req.body.nationality,
    });
    const result = await referee.save().catch((err)=>console.log(err));
    // console.log(result);
    res.send(result)
};

const getReferee = async (req, res)=>{
    const result = await Referee.findOne({'_id':req.params['id']});
    // console.log(result);
    res.send(result);
}

const getAllReferee = async (req, res)=>{
    const result = await Referee.find({});
    // console.log(result);
    res.send(result);
};

module.exports = {updateReferee, deleteReferee, addReferee, getReferee, getAllReferee}