const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const teamSchema = new mongoose.Schema({
    name: {type: String, required: true},
    squad:{type: [mongoose.Schema.Types.ObjectId],ref:'Player' ,required: false},//player
    coach: {type: mongoose.Schema.Types.ObjectId, ref: 'Coach', required: true},//coach
    wins: {type: Number, required: true},
    loss: {type: Number, required: true},
    draw: {type: Number, required: true},
    points: {type: Number, required: true},
    stadium: {type: mongoose.Schema.Types.ObjectId, ref: 'Stadium',required:false},
    kit: {type: [String],min:2,max:2, required: true},


});
const Team = mongoose.model("Team",teamSchema);

module.exports = Team;