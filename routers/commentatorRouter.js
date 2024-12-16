import express from 'express';
import { updateCommentator, deleteCommentator, addCommentator, getCommentator, getAllCommentators } from "../controllers/commentatorController.js";
import { authenticateToken } from '../controllers/apiSecurityController.js';

const isAdmin = authenticateToken('admin');
const isUser = authenticateToken('user');
const router = express.Router();

/**
 * @swagger
 * /commentators:
 *   get:
 *     summary: Retrieve a list of commentators
 *     tags: [Commentators]
 *     responses:
 *       200:
 *         description: A list of commentators
 */
router.get("/commentators", isUser, getAllCommentators);

/**
 * @swagger
 * /commentator:
 *   post:
 *     summary: Add a new commentator
 *     tags: [Commentators]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               nationality:
 *                 type: string
 *             required:
 *               - name
 *               - age
 *               - nationality
 *     responses:
 *       201:
 *         description: Commentator added
 */
router.post("/commentator", isAdmin, addCommentator);

/**
 * @swagger
 * /commentator/{id}:
 *   get:
 *     summary: Retrieve a commentator by ID
 *     tags: [Commentators]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A commentator
 */
router.get("/commentator/:id", isUser, getCommentator);

/**
 * @swagger
 * /commentator/{id}:
 *   delete:
 *     summary: Delete a commentator by ID
 *     tags: [Commentators]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Commentator deleted
 */
router.delete("/commentator/:id", isAdmin, deleteCommentator);

/**
 * @swagger
 * /commentator/{id}:
 *   patch:
 *     summary: Update a commentator by ID
 *     tags: [Commentators]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               nationality:
 *                 type: string
 *     responses:
 *       200:
 *         description: Commentator updated
 */
router.patch("/commentator/:id", isAdmin, updateCommentator);

export default router;
