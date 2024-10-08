const {Player} = require("../models/persons");
const Team = require("../models/teamModel");


const getPlayer = async (req, res)=> {
    const result = await Player.findOne({_id: req.params['playerId']});
    // console.log(result)
    res.send(result);
}
const playersWithSameTeam = async function (req, res) {
    const result = await Player.find({'team':req.params['teamId']} );
    // console.log(result)
    res.send(result)
}
const addPlayer = async (req, res)=> {

    const player = new Player({
        name:req.body.name,
        age:req.body.age,
        nationality:req.body.nationality,
        kitNumber:req.body.kitNumber,
        position:req.body.position,
        team:req.body.team
    });
    const result = await player.save().catch((err)=>console.log(err));
    try {
        const playerTeam = await Team.findById(result['team']);
        await Team.findByIdAndUpdate(result['team'],{squad:playerTeam['squad'].concat(result['_id'])});

    }catch (e) {
        console.log(e);
    }
    // console.log(result);
    res.send(result)
};

const updatePlayer = async (req, res) => {
    //result send data before update
    const result = await Player.findByIdAndUpdate(req.params['id'],req.body);
    // console.log(result);
    res.send(result);
};

const deletePlayer = async (req, res) => {
    try {
        const playerId = req.params['id'];
        const player = await Player.findOne({_id:playerId});
        const teamId = player['team'];
        await Team.findByIdAndUpdate(teamId,{$pull:{squad:playerId}});
        const result = await Player.findByIdAndDelete(playerId);
        // console.log(result);
        res.send(result)
    }catch (e) {
        res.send(e)
    }

};

const getAllPlayers = async (req, res) => {
    const result = await Player.find({});
    // console.log(result)
    res.send(result);
};

const addPlayers = async (req, res) =>{

    const result = await Player.insertMany(req.body);

    try {
        for (const player of result) {
            const playerTeam = await Team.findById(player['team']);
            await Team.findByIdAndUpdate(player['team'],{squad:playerTeam['squad'].concat(player['_id'])});
        }

    }catch (e) {
        console.log(e);
    }
    // console.log(result);
    res.send(result)
};


module.exports = {getPlayer,addPlayer,updatePlayer,deletePlayer,getAllPlayers,addPlayers,playersWithSameTeam};