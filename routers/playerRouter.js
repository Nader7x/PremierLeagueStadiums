import {getPlayer, addPlayer, updatePlayer, deletePlayer, getAllPlayers, addPlayers, playersWithSameTeam}
    from '../controllers/playerController.js';
import express from 'express';
import {authenticateToken} from '../controllers/apiSecurityController.js';

const isAdmin = authenticateToken('admin');
const isUser = authenticateToken('user');
const router = express.Router();

/**
 * @swagger
 * /player:
 *   post:
 *     summary: Add a new player
 *     tags: [Players]
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
 *               kitNumber:
 *                 type: integer
 *               position:
 *                 type: string
 *               team:
 *                 type: string
 *             required:
 *               - name
 *               - age
 *               - nationality
 *               - kitNumber
 *               - position
 *               - team
 *     responses:
 *       201:
 *         description: Player added
 */
router.post("/player", isAdmin, addPlayer);

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Retrieve a list of players
 *     tags: [Players]
 *     responses:
 *        200:
 *         description: A list of players
 */
router.get("/players", isUser, getAllPlayers);

/**
 * @swagger
 * /addPlayers:
 *   post:
 *     summary: Add multiple players
 *     tags: [Players]
 *     responses:
 *       201:
 *         description: Players added
 */
router.post("/addPlayers", isAdmin, addPlayers);

/**
 * @swagger
 * /player/{id}:
 *   patch:
 *     summary: Update a player by ID
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Player updated
 */
router.patch("/player/:id", isAdmin, updatePlayer);

/**
 * @swagger
 * /player/{id}:
 *   delete:
 *     summary: Delete a player by ID
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Player deleted
 */
router.delete("/player/:id", isAdmin, deletePlayer);

/**
 * @swagger
 * /player/{playerId}:
 *   get:
 *     summary: Retrieve a player by ID
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: playerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A player
 */
router.get("/player/:playerId", isUser, getPlayer);

/**
 * @swagger
 * /playersWithSameTeam/{teamId}:
 *   get:
 *     summary: Retrieve players with the same team by team ID
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Players with the same team
 */
router.get("/playersWithSameTeam/:teamId", isUser, playersWithSameTeam);

export default router;
