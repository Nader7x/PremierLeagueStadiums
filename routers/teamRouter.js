import express from "express";
import {
    getTeam,
    addTeam,
    updateTeam,
    deleteTeam,
    getAllTeams,
    getTeamWithPlayers,
    teamsWithPlayers,
    getTeamsWithNoStadium,
    getLeagueStandings
} from "../controllers/teamController.js";
import {authenticateToken} from '../controllers/apiSecurityController.js';

const router = express.Router();
const isAdmin = authenticateToken('admin');
const isUser = authenticateToken('user');

/**
 * @swagger
 * /teamsWithPlayers:
 *   get:
 *     summary: Retrieve a list of teams with players
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: A list of teams with players
 */
router.get("/teamsWithPlayers", teamsWithPlayers);

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Retrieve a list of teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: A list of teams
 */
router.get("/teams", getAllTeams);

/**
 * @swagger
 * /teamsWithNoStadium:
 *   get:
 *     summary: Retrieve a list of teams with no stadium
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: A list of teams with no stadium
 */
router.get("/teamsWithNoStadium", getTeamsWithNoStadium);

/**
 * @swagger
 * /team:
 *   post:
 *     summary: Add a new team
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               squad:
 *                 type: array
 *                 items:
 *                   type: string
 *               coach:
 *                 type: string
 *               wins:
 *                 type: integer
 *               loss:
 *                 type: integer
 *               draw:
 *                 type: integer
 *               points:
 *                 type: integer
 *               kit:
 *                 type: string
 *               logo:
 *                 type: string
 *             required:
 *               - name
 *               - coach
 *     responses:
 *       201:
 *         description: Team added
 */
router.post("/team", addTeam);

/**
 * @swagger
 * /team/{id}:
 *   get:
 *     summary: Retrieve a team by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A team
 */
router.get("/team/:id", getTeam);

/**
 * @swagger
 * /teamWithPlayers/{id}:
 *   get:
 *     summary: Retrieve a team with players by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A team with players
 */
router.get("/teamWithPlayers/:id", getTeamWithPlayers);

/**
 * @swagger
 * /team/{id}:
 *   delete:
 *     summary: Delete a team by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Team deleted
 */
router.delete('/team/:id', deleteTeam);

/**
 * @swagger
 * /team/{id}:
 *   patch:
 *     summary: Update a team by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Team updated
 */
router.patch('/team/:id', updateTeam);

/**
 * @swagger
 * /leagueStandings:
 *   get:
 *     summary: Retrieve the league standings by points
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: League standings by points
 */
router.get("/leagueStandings", getLeagueStandings);

export default router;
