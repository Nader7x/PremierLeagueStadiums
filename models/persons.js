// @ts-check
import mongoose from 'mongoose';
import Person from './personModel.js';
import AdminUser from './adminUserModel.js';

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
    username: {type: String, allowNull: false},
    password: {type: String, allowNull: false},
}));

const Admin = AdminUser.discriminator("Admin", new mongoose.Schema({
    username: {type: String, allowNull: false},
    password: {type: String, allowNull: false},
}));

const positions = ['gk', 'cb', 'lb', 'rb', 'cm', 'cam', 'cdm', 'cf', 'rw', 'rm', 'lw', 'lm', 'st'];

const Player = Person.discriminator("Player", new mongoose.Schema({
    nationality: String,
    kitNumber: {type: Number, allowNull: false},
    position: {type: String, allowNull: false},
    team: {type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: false}
}));

export {
    Referee, Coach, Commentator, User, Admin, Player
};
