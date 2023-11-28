const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const matchSchema = new mongoose.Schema({
    homeTeam: {type: mongoose.Schema.Types.ObjectId, ref: 'Team',required:true},
    awayTeam:{type: mongoose.Schema.Types.ObjectId, ref: 'Team',required:true},
    stadium: {type: mongoose.Schema.Types.ObjectId, ref: 'Stadium',required:true},
    referee:{type:String,required:true},//referee
    commentator:{type:String,required:true},//commentator
    cards:{type:Map,required:true},
    homeGoals:{type:Number,required:true},
    awayGoals:{type:Number,required:true},
    //status:
    //goalScorer
});
const Match = mongoose.model("Match",matchSchema);

module.exports = Match;