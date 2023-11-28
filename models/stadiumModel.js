const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', false);

const stadiumSchema = new mongoose.Schema({
    homeTeam: { type: String, required: true },//Team
    name:{type:String, required:true}
});

const Stadium = mongoose.model("Stadium",stadiumSchema);

module.exports = Stadium;