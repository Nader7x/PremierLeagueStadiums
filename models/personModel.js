// @ts-check
import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const baseOptions = {
    discriminatorKey: "type",
    collection: "person",
};

const personSchema = new mongoose.Schema({
    name: {type: String, allowNull: false},
    age: {type: Number, allowNull: false},
}, baseOptions);
const Person = mongoose.model("Person", personSchema);

export default Person;
