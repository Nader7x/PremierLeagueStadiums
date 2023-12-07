const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const stadiumSchema = new mongoose.Schema({
    homeTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },//Team
    name:{type:String, required:true},
    //fixtures: { type: Map,of:String,required:true},
    capacity:{type:Number,required:true},
    state:{type:Boolean,required:false,default:false}}, { collection: 'stadium' });

const Stadium = mongoose.model("Stadium",stadiumSchema);

module.exports = Stadium;