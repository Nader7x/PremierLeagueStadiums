import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

const baseOptions = {
    discriminatorKey: "type",
    collection: "person",
};

const personSchema = new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true,max:100,min:1},
},baseOptions);
const Person = mongoose.model("Person",personSchema);

export default Person;
