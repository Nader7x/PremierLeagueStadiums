import { addStadium, getAllStadiums, getAllStadiumsWithTeam, getStadiumWithTeam, deleteStadium, getStadium, updateStadium, stadiumMatches, stadiumHistoryMatches } from '../controllers/stadiumController';
import express from 'express';
import { authenticateToken } from '../controllers/apiSecurityController';
const isAdmin = authenticateToken('admin');
const isUser = authenticateToken('user');
const router = express.Router();

/**
 * @swagger
 * /stadiums:
 *   get:
 *     summary: Retrieve a list of stadiums
 *     tags: [Stadiums]
 *     responses:
 *       200:
 *         description: A list of stadiums
 */
router.get("/stadiums", getAllStadiums);

/**
 * @swagger
 * /stadium:
 *   post:
 *     summary: Add a new stadium
 *     tags: [Stadiums]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               homeTeam:
 *                 type: string
 *               name:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               state:
 *                 type: boolean
 *             required:
 *               - homeTeam
 *               - name
 *               - capacity
 *               - state
 *     responses:
 *       201:
 *         description: Stadium added
 */
router.post("/stadium", addStadium);

/**
 * @swagger
 * /stadiumsWithTeam:
 *   get:
 *     summary: Retrieve a list of stadiums with teams
 *     tags: [Stadiums]
 *     responses:
 *       200:
 *         description: A list of stadiums with teams
 */
router.get("/stadiumsWithTeam", getAllStadiumsWithTeam);

/**
 * @swagger
 * /stadiumWithTeam/{id}:
 *   get:
 *     summary: Retrieve a stadium with team by ID
 *     tags: [Stadiums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A stadium with team
 */
router.get("/stadiumWithTeam/:id", getStadiumWithTeam);

/**
 * @swagger
 * /stadium/{id}:
 *   get:
 *     summary: Retrieve a stadium by ID
 *     tags: [Stadiums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A stadium
 */
router.get("/stadium/:id", getStadium);

/**
 * @swagger
 * /stadium/{id}:
 *   patch:
 *     summary: Update a stadium by ID
 *     tags: [Stadiums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stadium updated
 */
router.patch("/stadium/:id", updateStadium);

/**
 * @swagger
 * /stadium/{id}:
 *   delete:
 *     summary: Delete a stadium by ID
 *     tags: [Stadiums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stadium deleted
 */
router.delete("/stadium/:id", deleteStadium);

/**
 * @swagger
 * /stadiumMatches/{id}:
 *   get:
 *     summary: Retrieve matches in a stadium by ID
 *     tags: [Stadiums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Matches in a stadium
 */
router.get("/stadiumMatches/:id", stadiumMatches);

/**
 * @swagger
 * /stadiumHistoryMatches/{id}:
 *   get:
 *     summary: Retrieve historical matches in a stadium by ID
 *     tags: [Stadiums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Historical matches in a stadium
 */
router.get("/stadiumHistoryMatches/:id", stadiumHistoryMatches);

export default router;
