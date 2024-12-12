import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const stadiumSchema = new mongoose.Schema({
    homeTeam: {type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: false},//Team
    name: {type: String, required: true},
    capacity: {type: Number, required: true},
    state: {type: Boolean, required: false, default: false}
}, {collection: 'stadium'});

const Stadium = mongoose.model("Stadium", stadiumSchema);

export default Stadium;
