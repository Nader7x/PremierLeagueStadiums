const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const teamSchema = new mongoose.Schema({
    name: {type: String, required: true},
    squad:{type: [mongoose.Schema.Types.ObjectId],ref:'Player' ,required: false},//player
    coach: {type: mongoose.Schema.Types.ObjectId, ref: 'Coach', required: true},//coach
    wins: {type: Number, required: false,default:0},
    loss: {type: Number, required: false,default:0},
    draw: {type: Number, required: false,default:0},
    points: {type: Number, required: false,default:0},
    stadium: {type: mongoose.Schema.Types.ObjectId, ref: 'Stadium',required:false},
    kit: {type: [String],min:2,max:2, required: true},
    logo: {type: String, required: false},


});
const Team = mongoose.model("Team",teamSchema);

module.exports = Team;