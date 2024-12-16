import {Admin, User} from "../models/persons.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const saltRounds = 10; // Number of salt rounds, you can adjust this based on your security requirements

/**
 * Generates a JWT token for a user with a specified role.
 * @param {string} userId - The ID of the user.
 * @param {string} role - The role of the user (e.g., 'admin', 'user').
 * @returns {string} - The generated JWT token.
 */
const generateToken = (userId, role) => {
    const secretKey = process.env["JWT_SECRET_KEY"];
    const expiresIn = '1w';
    return jwt.sign({userId, role}, secretKey, {expiresIn});
};

/**
 * Generates a long-lived JWT token for a user with a specified role.
 * @param {string} userId - The ID of the user.
 * @param {string} role - The role of the user (e.g., 'admin', 'user').
 * @returns {string} - The generated JWT token.
 */
const generatelifeToken = (userId, role) => {
    const secretKey = process.env["JWT_SECRET_KEY"];
    const expiresIn = '10000y';
    return jwt.sign({userId, role}, secretKey, {expiresIn});
};

/**
 * Registers a new user (admin or regular user) in the system.
 * - Hashes the user's password before saving.
 * - Checks if the username already exists.
 * - Creates a new Admin or User based on the provided role.
 * @param {Object} req - The request object containing user details.
 * @param {Object} res - The response object.
 */
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
        const token = generateToken(result._id, req.body.role);
        res.header('Authorization', `Bearer ${token}`);
        res.cookie('token', token, {httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000}); // 1 week expiration
        res.status(201).json({user: result, token});
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred during registration. Please try again later.",
            error: err.message
        });
    }
};

/**
 * Logs in a user (admin or regular user) by verifying their credentials.
 * - Checks if the user exists.
 * - Compares the provided password with the stored hashed password.
 * - Generates a JWT token for the user upon successful login.
 * - Sets the token as a cookie in the response.
 * @param {Object} req - The request object containing login details.
 * @param {Object} res - The response object.
 */
const login = async (req, res) => {
    try {
        const resultAdmin = await Admin.findOne({username: req.body.username});

        if (!resultAdmin) {
            const resultUser = await User.findOne({username: req.body.username});

            if (!resultUser) {
                res.status(400).send({
                    message: "Invalid username or password. Please try again."
                });
            } else {
                const passwordMatch = await bcrypt.compare(req.body.password, resultUser.password);
                if (passwordMatch) {
                    const token = generateToken(resultUser['_id'], 'user');
                    res.header('Authorization', `Bearer ${token}`);
                    // Set the token as a cookie
                    res.cookie('token', token, {httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000}); // 1 week expiration
                    res.status(200).json({user: resultUser, token});
                } else {
                    res.status(400).send({
                        message: "Invalid username or password. Please try again."
                    });
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
                res.status(400).send({
                    message: "Invalid username or password. Please try again."
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred during login. Please try again later.",
            error: err.message
        });
    }
};

export {register, login};
