// @ts-check
import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const matchSchema = new mongoose.Schema({
    homeTeam: {type: mongoose.Schema.Types.ObjectId, ref: 'Team', allowNull: false},
    awayTeam: {type: mongoose.Schema.Types.ObjectId, ref: 'Team', allowNull: false},
    stadium: {type: mongoose.Schema.Types.ObjectId, ref: 'Stadium', allowNull: false},
    referee: {type: mongoose.Schema.Types.ObjectId, ref: 'Referee', allowNull: false},//referee
    commentator: {type: mongoose.Schema.Types.ObjectId, ref: 'Commentator', allowNull: false},//commentator
    cards: {type: Map, required: false, default: {}},
    homeGoals: {type: Number, allowNull: false},
    awayGoals: {type: Number, allowNull: false},
    status: {type: Boolean, required: false, default: false},
    goals: {type: Map, required: false, default: {}},
    date: {type: Date, allowNull: false},
    endState: {type: Boolean, required: false, default: false},
    events: [[]]
});
const Match = mongoose.model("Match", matchSchema);

export default Match;
