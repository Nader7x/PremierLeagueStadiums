const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const stadiumSchema = new mongoose.Schema({
    homeTeam: { type: String, required: true },//Team
    name:{type:String, required:true},
    //fixtures: { type: Map,of:String,required:true},
    capacity:{type:Number,required:true},
    state:{type:Boolean,required:true}}, { collection: 'stadium' });

const Stadium = mongoose.model("Stadium",stadiumSchema);

module.exports = Stadium;