// @ts-check
import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const teamSchema = new mongoose.Schema({
    name: {type: String, allowNull: false},
    squad: {type: [mongoose.Schema.Types.ObjectId], ref: 'Player', required: false},//player
    coach: {type: mongoose.Schema.Types.ObjectId, ref: 'Coach', allowNull: false},//coach
    wins: {type: Number, allowNull: false},
    loss: {type: Number, allowNull: false},
    draw: {type: Number, allowNull: false},
    points: {type: Number, allowNull: false},
    stadium: {type: mongoose.Schema.Types.ObjectId, ref: 'Stadium', required: false},
    kit: {type: [String], min: 2, max: 2, allowNull: false},
    logo: {type: String, allowNull: false},
});

const Team = mongoose.model("Team", teamSchema);

export default Team;
