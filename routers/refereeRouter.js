import express from 'express';
import { updateReferee, deleteReferee, addReferee, getReferee, getAllReferee } from "../controllers/refereeController";
import { authenticateToken } from '../controllers/apiSecurityController';

const isAdmin = authenticateToken('admin');
const isUser = authenticateToken('user');
const router = express.Router();

/**
 * @swagger
 * /referees:
 *   get:
 *     summary: Retrieve a list of referees
 *     tags: [Referees]
 *     responses:
 *       200:
 *         description: A list of referees
 */
router.get("/referees", getAllReferee);

/**
 * @swagger
 * /referee:
 *   post:
 *     summary: Add a new referee
 *     tags: [Referees]
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
 *         description: Referee added
 */
router.post("/referee", addReferee);

/**
 * @swagger
 * /referee/{id}:
 *   get:
 *     summary: Retrieve a referee by ID
 *     tags: [Referees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A referee
 */
router.get("/referee/:id", getReferee);

/**
 * @swagger
 * /referee/{id}:
 *   delete:
 *     summary: Delete a referee by ID
 *     tags: [Referees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Referee deleted
 */
router.delete("/referee/:id", deleteReferee);

/**
 * @swagger
 * /referee/{id}:
 *   patch:
 *     summary: Update a referee by ID
 *     tags: [Referees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Referee updated
 */
router.patch("/referee/:id", updateReferee);

export default router;
