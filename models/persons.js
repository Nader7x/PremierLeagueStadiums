const mongoose = require('mongoose');
const Person = require('./personModel')
const AdminUser = require('./adminUserModel')

const Referee = Person.discriminator("Referee",new mongoose.Schema({
    nationality:String
}));

const Coach = Person.discriminator("Coach",new mongoose.Schema({
    nationality:String
}));

const Commentator = Person.discriminator("Commentator",new mongoose.Schema({
    nationality:String
}));

//admin, user, player same collection or should be in different one
const User = AdminUser.discriminator("User",new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
}));

const Admin = AdminUser.discriminator("Admin",new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
}));

const positions = ['gk','cb','lb','rb','cm','cam','cdm','cf','rw','rm','lw','lm','st']

const Player = Person.discriminator("Player",new mongoose.Schema({
    nationality:String,
    kitNumber:{type:Number,required:true,max:99,min:1},
    position:{type:String, enum: positions},
    team:{type:mongoose.Schema.Types.ObjectId, ref: 'Team',required:false}
}));


module.exports = {
    Referee,Coach,Commentator,User,Admin,Player
}
/*calling it like this
const myModule = require('./myModule.js');
const method = myModule.method;
const otherMethod = myModule.otherMethod;
// OR:
const {method, otherMethod} = require('./myModule.js');
 */