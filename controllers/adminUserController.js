const {Admin,User} = require("../models/persons");

const register = async (req, res)=>{
    let human;
    if (req.body.role === 'admin'){
        human = new Admin({
            name:req.body.name,
            age:req.body.age,
            username:req.body.username,
            password:req.body.password,
        });
    }else
    {
        human = new User({
            name:req.body.name,
            age:req.body.age,
            username:req.body.username,
            password:req.body.password,
        });
    }

    const result = await human.save().catch((err)=>console.log(err));
    console.log(result);
    res.send(result)
};

const login = async (req, res)=>{
    const result = await Admin.findOne({username:req.body.username});
    if (result === null){
        const result2 = await User.findOne({username:req.body.username})
        if (result2 === null){
            res.send(false)
        }else{
            console.log(result2.password === req.body.password)
            if (result2.password === req.body.password) {
                res.send(result2)
            } else {
                res.send(false)
            }
        }
    }else {
        if (result.password === req.body.password) {
            res.send(result)
        } else {
            res.send(false)
        }
    }
}
module.exports = {register,login};