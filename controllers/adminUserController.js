const {Admin,User} = require("../models/persons");

const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds, you can adjust this based on your security requirements

const register = async (req, res) => {
    let human;

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        // Check if the username already exists
        const usernameExists = await User.exists({ username: req.body.username });

        if (usernameExists) {
            return res.status(400).send("Username is already taken");
        }

        if (req.body.role === 'admin') {
            human = new Admin({
                name: req.body.name,
                age: req.body.age,
                username: req.body.username,
                password: hashedPassword,
            });
        } else {
            human = new User({
                name: req.body.name,
                age: req.body.age,
                username: req.body.username,
                password: hashedPassword,
            });
        }

        const result = await human.save();
        console.log(result);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

const login = async (req, res) => {
        const result = await Admin.findOne({ username: req.body.username });

        if (!result) {
            const result2 = await User.findOne({ username: req.body.username });

            if (!result2) {
                res.send(false);
            } else {
                const passwordMatch = await bcrypt.compare(req.body.password, result2.password);

                if (passwordMatch) {
                    res.send(result2);
                } else {
                    res.send(false);
                }
            }
        } else {
            const passwordMatch = await bcrypt.compare(req.body.password, result.password);

            if (passwordMatch) {
                res.send(result);
            } else {
                res.send(false);
            }
        }
};

module.exports = {register,login};