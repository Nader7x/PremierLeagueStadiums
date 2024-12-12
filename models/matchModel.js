import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

const matchSchema = new mongoose.Schema({
    homeTeam: {type: mongoose.Schema.Types.ObjectId, ref: 'Team',required:true},
    awayTeam:{type: mongoose.Schema.Types.ObjectId, ref: 'Team',required:true},
    stadium: {type: mongoose.Schema.Types.ObjectId, ref: 'Stadium',required:true},
    referee:{type: mongoose.Schema.Types.ObjectId, ref: 'Referee',required:true},//referee
    commentator:{type: mongoose.Schema.Types.ObjectId, ref: 'Commentator',required:true},//commentator
    cards:{type:Map,required:false,default:{}},
    homeGoals:{type:Number,required:false,default:0},
    awayGoals:{type:Number,required:false,default:0},
    status:{type:Boolean,required:false,default:false},
    goals:{type:Map,required:false,default:{}},
    date:{type:Date,required:true},
    endState:{type:Boolean,required:false,default:false},
    events:[[]]
});
const Match = mongoose.model("Match",matchSchema);

export default Match;
