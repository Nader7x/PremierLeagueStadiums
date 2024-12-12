import mongoose from 'mongoose';
import Person from './personModel';
import AdminUser from './adminUserModel';

const Referee = Person.discriminator("Referee", new mongoose.Schema({
    nationality: String
}));

const Coach = Person.discriminator("Coach", new mongoose.Schema({
    nationality: String
}));

const Commentator = Person.discriminator("Commentator", new mongoose.Schema({
    nationality: String
}));

const User = AdminUser.discriminator("User", new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}));

const Admin = AdminUser.discriminator("Admin", new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
}));

const positions = ['gk', 'cb', 'lb', 'rb', 'cm', 'cam', 'cdm', 'cf', 'rw', 'rm', 'lw', 'lm', 'st'];

const Player = Person.discriminator("Player", new mongoose.Schema({
    nationality: String,
    kitNumber: { type: Number, required: true, max: 99, min: 1 },
    position: { type: String, enum: positions },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: false }
}));

export {
    Referee, Coach, Commentator, User, Admin, Player
};
