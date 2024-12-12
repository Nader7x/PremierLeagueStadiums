import {Admin, User} from "../models/persons.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const saltRounds = 10; // Number of salt rounds, you can adjust this based on your security requirements

const generateToken = (userId, role) => {
    const secretKey = process.env["JWT_SECRET_KEY"];
    const expiresIn = '1w';
    return jwt.sign({userId, role}, secretKey, {expiresIn});
};

const generatelifeToken = (userId, role) => {
    const secretKey = process.env["JWT_SECRET_KEY"];
    const expiresIn = '10000y';
    return jwt.sign({userId, role}, secretKey, {expiresIn});
};

const register = async (req, res) => {
    let human;

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        // Check if the username already exists
        const usernameExists = await User.exists({username: req.body.username});

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
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

const login = async (req, res) => {
    const resultAdmin = await Admin.findOne({username: req.body.username});

    if (!resultAdmin) {
        const resultUser = await User.findOne({username: req.body.username});

        if (!resultUser) {
            res.status(400).send(false);
        } else {
            const passwordMatch = await bcrypt.compare(req.body.password, resultUser.password);
            if (passwordMatch) {
                const token = generateToken(resultUser['_id'], 'user');
                res.header('Authorization', `Bearer ${token}`);
                // Set the token as a cookie
                res.cookie('token', token, {httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000}); // 1 week expiration
                res.status(200).json({user: resultUser, token});
            } else {
                res.status(400).send(false);
            }
        }
    } else {
        const passwordMatch = await bcrypt.compare(req.body.password, resultAdmin.password);

        if (passwordMatch) {
            const token = generatelifeToken(resultAdmin['_id'], 'admin');
            res.header('Authorization', `Bearer ${token}`);
            // Set the token as a cookie
            res.cookie('token', token, {httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000}); // 1 week expiration
            res.status(200).json({admin: resultAdmin, token});
        } else {
            res.status(400).send(false);
        }
    }
};

export {register, login};
