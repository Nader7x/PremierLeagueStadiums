import express from 'express';
import { register, login } from "../controllers/adminUserController.js";
import { authenticateToken } from '../controllers/apiSecurityController.js';

const router = express.Router();
const isAdmin = authenticateToken('admin');
const isUser = authenticateToken('user');

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Admin user login
 *     tags: [Admin Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", login);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new admin user
 *     tags: [Admin Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               age:
 *                 type: integer
 *               role:
 *                 type: string
 *                 enum: [Admin, User]
 *             required:
 *               - name
 *               - username
 *               - password
 *               - age
 *               - role
 *     responses:
 *       201:
 *         description: Admin user registered
 */
router.post("/register", register);

export default router;
