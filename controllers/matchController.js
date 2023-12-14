const Match = require("../models/matchModel");


const addMatch = async (req, res)=>{

    const match = new Match({
        homeTeam:req.body.homeTeam,
        awayTeam:req.body.awayTeam,
        referee:req.body.referee,
        commentator:req.body.commentator
    });
    const result = await match.save().catch((err)=>console.log(err));
    console.log(result);
    res.send(result)
}

const getAllMatches = async (req,res)=>{
    const result = await Match.find({});
    console.log(result);
    res.send(result);
};

const getAllMatchesWithNames = async (req,res)=>{
    const result = await Match.find({}).populate('homeTeam','name').populate('awayTeam','name').populate('referee','name').populate('commentator','name');
    console.log(result);
    res.send(result);
};

const getMatchWithNames = async (req,res)=>{
    const result = await Match.findById(req.params['id']).populate('homeTeam','name').populate('awayTeam','name').populate('referee','name').populate('commentator','name');
    console.log(result);
    res.send(result);
};

const deleteMatch = async (req,res)=>{
    try {
        const result = await Match.findByIdAndDelete(req.params['id']);
        console.log(result);
        res.send(result);
    }catch (e) {
        console.log(e)
        res.send(e)
    }
};

const getMatch = async (req,res)=>{
    const result = await Match.findById(req.params['id']);
    console.log(result);
    res.send(result);
};

const getLiveMatches = async (req, res)=> {
    const result = await Match.find({status:true}).populate({
        path: 'homeTeam',
        populate: {
            path: 'squad',
            model: 'Player',
            select: 'name'
        }
    })
        .populate({
            path: 'awayTeam',
            populate: {
                path: 'squad',
                model: 'Player',
                select: 'name'
            }
        }).populate('referee', 'name')
        .populate('commentator', 'name');
    console.log(result)
    res.send(result)
};

const getHistoryMatches = async (req, res)=> {
    const result = await Match.find({status:false}).populate({
        path: 'homeTeam',
        populate: {
            path: 'squad',
            model: 'Player',
            select: 'name'
        }
    })
        .populate({
            path: 'awayTeam',
            populate: {
                path: 'squad',
                model: 'Player',
                select: 'name'
            }
        }).populate('referee', 'name')
        .populate('commentator', 'name');
    console.log(result)
    res.send(result)
};
//take match and team both id's
const goal = async (req,res)=>{

    const match = await Match.findById(req.body.match);
    let result;
    if (req.body.team === String(match['homeTeam'])) {
        result = await Match.findByIdAndUpdate(req.body.match, {homeGoals: ++match['homeGoals']})
    } else {
        result = await Match.findByIdAndUpdate(req.body.match, {awayGoals: ++match['awayGoals']})
    }
    console.log(result);
    res.send(result);
};

module.exports = {addMatch,getAllMatches,getAllMatchesWithNames,getMatchWithNames,deleteMatch,getMatch,getLiveMatches,getHistoryMatches,goal};