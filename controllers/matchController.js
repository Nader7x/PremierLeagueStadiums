const Match = require("../models/matchModel");
const Team = require("../models/teamModel");
const Stadium = require("../models/stadiumModel");
const {Player} = require("../models/persons");
const {messaging} = require("../controllers/notificationController")
const message = {
    notification: {
        title: '',
        body: '',
    },
    token: 'dDz0h0a9x0k7lQh1JS6a-W:APA91bEf6kEaHTwy9zsSIseCVuTljO03geOhgorBshq_YwdRifb8AOolx-9j9asU9ukcSRc48NAIw1Oe2okq2vvIBPDkRSIBQ_NophwjSxOutCt6uqBjss3VwBJ9Q_M73PSKYoNEU1-M',
};
const addMatch = async (req, res)=>{
    const team = await Team.findById(req.body.homeTeam)

    const match = new Match({
        homeTeam:req.body.homeTeam,
        awayTeam:req.body.awayTeam,
        referee:req.body.referee,
        commentator:req.body.commentator,
        stadium:team['stadium'],
        date:req.body.date

    });
    const result = await match.save().catch((err)=>console.log(err));
    // console.log(result);
    // console.log(result);
    res.send(result)
}

const getAllMatches = async (req,res)=>{
    const result = await Match.find({});
    // console.log(result);
    // console.log(result);
    res.send(result);
};

const getAllMatchesWithNames = async (req,res)=>{
    const result = await Match.find({}).populate('homeTeam','name').populate('awayTeam','name').populate('referee','name').populate('commentator','name');
    // console.log(result);
    // console.log(result);
    res.send(result);
};

const getMatchWithNames = async (req,res)=>{
    const result = await Match.findById(req.params['id']).populate('homeTeam','name').populate('awayTeam','name').populate('referee','name').populate('commentator','name');
    // console.log(result);
    // console.log(result);
    res.send(result);
};

const deleteMatch = async (req,res)=>{
    try {
        const result = await Match.findByIdAndDelete(req.params['id']);
        // console.log(result);
        // console.log(result);
        res.send(result);
    }catch (e) {
        console.log(e)
        res.send(e)
    }
};

const getMatch = async (req,res)=>{
    const result = await Match.findById(req.params['id']);
    // console.log(result);
    // console.log(result);
    res.send(result);
};

const getLiveMatches = async (req, res)=> {
    const result = await Match.find({status:true,endState:false}).populate({
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
        .populate('commentator', 'name').populate('stadium', 'name');
    // console.log(result)
    res.send(result)
};

const getHistoryMatches = async (req, res)=> {
    const result = await Match.find({endState : true , status : true}).populate({
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
        }).populate('referee', 'name').populate('commentator', 'name');
    // console.log(result)
    res.send(result)
};
//take match and team both id's
const goal = async (req,res)=>{

    const match = await Match.findById(req.body.match);
    const homeTeam = await  Team.findById(match['homeTeam'])
    const awayTeam = await  Team.findById(match['awayTeam'])
    if (!(homeTeam['squad'].includes(req.body.player)) && !(awayTeam['squad'].includes(req.body.player)))
    {
        console.log("no player with this name in the match")
        res.send("no player with this name in the match")
        return;
    }
    if (match['cards'].get(req.body.player) && match['cards'].get(req.body.player) === 'red') {
        console.log("this player is suspended can't score a goal")
        res.send("this player is suspended can't score a goal")
        return;
    }
    if (req.body.team === String(match['homeTeam'])) {
        await Match.findByIdAndUpdate(req.body.match, {homeGoals: ++match['homeGoals']})
    } else {
       await Match.findByIdAndUpdate(req.body.match, {awayGoals: ++match['awayGoals']})
    }
    let result;
    var matchofGoals= JSON.parse(JSON.stringify(match['goals']));
    if(match['goals'].get(req.body.player))
    {
        const playername = await Player.findById(req.body.player);
        matchofGoals[req.body.player]++;
        result = await Match.findByIdAndUpdate(match['_id'],{'goals':matchofGoals,$push: {
                events: [req.body.player, 'goal']
            }}, {new : true})
        message['notification']['title'] = 'Goal';
        message['notification']['body'] = playername['name'];
        console.log(playername['name']);
        messaging.send(message);
    }
    else
    {
        matchofGoals[req.body.player]=1;
       result = await Match.findByIdAndUpdate(match['_id'],{'goals':matchofGoals,$push: {
               events: [req.body.player, 'goal']
           }}, {new :true})
        const playername = await Player.findById(req.body.player);
        message['notification']['title'] = 'Goal'
        message['notification']['body'] = playername['name'];
        console.log(playername['name']);
        messaging.send(message)
    }
    // console.log(result);
    res.send(result);
};
const endMatch = async (req , res) => {
    const  result = await Match.findByIdAndUpdate(req.params['id'],{endState : true, status:false}, {new: true});
    await Stadium.findByIdAndUpdate(result['stadium'],{state: false });
    const hometeamId = result['homeTeam']
    const awayteamId = result['awayTeam']
    const homeTeam = await Team.findById(hometeamId);
    const awayTeam = await Team.findById(awayteamId);
    if (result.homeGoals > result.awayGoals)
    {
        homeTeam['points'] +=3;
        homeTeam['wins'] +=1;
        awayTeam['loss'] +=1;
    }
    else if (result.awayGoals > result.homeGoals)
    {
        awayTeam['points'] +=3;
        awayTeam['wins'] +=1;
        homeTeam['loss'] +=1;
    }
    else
    {
        homeTeam['points'] +=1;
        homeTeam['draw'] +=1;
        awayTeam['points'] +=1;
        awayTeam['draw'] +=1;
    }
    await Team.findByIdAndUpdate(hometeamId, homeTeam);
    await Team.findByIdAndUpdate(awayteamId, awayTeam);
    // console.log(result);
    // console.log(result);
    res.send(result)
}
const giveCard = async (req , res) => {
    try {
            const match = await Match.findById(req.body.match)
            const homeTeam = await  Team.findById(match['homeTeam'])
            const awayTeam = await  Team.findById(match['awayTeam'])
            if (!(homeTeam['squad'].includes(req.body.player)) && !(awayTeam['squad'].includes(req.body.player)))
            {
                console.log("no player with this name in the match")
                res.send("no player with this name in the match")
                return;
            }
            if (match['cards'].get(req.body.player) && match['cards'].get(req.body.player) === 'yellow') {
                const update = {};
                update['cards.' + req.body.player] = 'red';
                const result = await Match.findByIdAndUpdate(req.body.match, {$set: update,$push: {
                        events: [req.body.player, 'red']
                    }}, {new: true});
                // console.log(result);
                res.send(result);
            }
            else if (match['cards'].get(req.body.player) && match['cards'].get(req.body.player) === 'red'){
                console.log("error player already suspended");
                res.send("error player already suspended");
            }
            else {
                const update = {};
                update['cards.' + req.body.player] = req.body.card;
                const result = await Match.findByIdAndUpdate(req.body.match, {$set: update,$push: {
                        events: [req.body.player, req.body.card]
                    }}, {new: true});
                // console.log(result);
                res.send(result);
            }
        }
        catch (e)
        {
            console.log(e);
            res.send(e);
        }
}
const matchWithAllData = async (req,res)=>
{
    const result = await Match.findById(req.params['id']).populate('homeTeam').populate('awayTeam').populate('referee').populate('commentator').populate('stadium');
    console.log(result)
    res.send(result)
}
const startMatch = async (req,res)=>{
   const result = await Match.findByIdAndUpdate(req.params['id'],{status : true} , {new: true});
    await Stadium.findByIdAndUpdate(result['stadium'],{state: true});
    // console.log(result);
    res.send(result);
}
const getUpcomingMatches = async (req,res)=>{
    const result = await Match.find({status: false , endState: false})
    // console.log(result)
    res.send(result)
}
const fixMatches = async (req , res) =>
{
    //find all matches and clear the goals and cards and make status and end state false and initialize the events
    const matches = await Match.updateMany({},{homeGoals:0,awayGoals:0 ,goals:{},cards:{},status:false,endState:false,events:[]});
    console.log(matches);
    res.send(matches);
}
const getSortedEvents = async (req, res) => {
    const match = await Match.findById(req.params['id']);
    const events = match['events'];

    const sortedEvents = [];
    for (const event of events) {
        const player = await Player.findById(event[0]).populate('team','name');
        const playerName = player['name'];
        const playerTeam = player['team']['name'];
        const eventType = event[1];

        const transformedEvent = [

             playerName,
             playerTeam,
             eventType,
        ];


        sortedEvents.push(transformedEvent);
    }

    console.log(sortedEvents);
    res.send(sortedEvents);
};
module.exports = {addMatch,getAllMatches,getAllMatchesWithNames,getMatchWithNames,deleteMatch,getMatch,getLiveMatches,getHistoryMatches,goal,endMatch,giveCard,matchWithAllData,startMatch,getUpcomingMatches,getSortedEvents,fixMatches};
