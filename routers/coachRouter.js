import express from 'express';
import { updateCoach, deleteCoach, addCoach, getCoach, getAllCoaches } from "../controllers/coachController.js";
import { authenticateToken } from '../controllers/apiSecurityController.js';

const router = express.Router();
const isAdmin = authenticateToken('admin');
const isUser = authenticateToken('user');

/**
 * @swagger
 * /coaches:
 *   get:
 *     summary: Retrieve a list of coaches
 *     tags: [Coaches]
 *     responses:
 *       200:
 *         description: A list of coaches
 */
router.get("/coaches", getAllCoaches);

/**
 * @swagger
 * /coach:
 *   post:
 *     summary: Add a new coach
 *     tags: [Coaches]
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
 *         description: Coach added
 */
router.post("/coach", addCoach);

/**
 * @swagger
 * /coach/{id}:
 *   get:
 *     summary: Retrieve a coach by ID
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A coach
 */
router.get("/coach/:id", getCoach);

/**
 * @swagger
 * /coach/{id}:
 *   delete:
 *     summary: Delete a coach by ID
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coach deleted
 */
router.delete("/coach/:id", deleteCoach);

/**
 * @swagger
 * /coach/{id}:
 *   patch:
 *     summary: Update a coach by ID
 *     tags: [Coaches]
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
 *         description: Coach updated
 */
router.patch("/coach/:id", updateCoach);

export default router;
