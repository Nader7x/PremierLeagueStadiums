import { addMatch, getAllMatches, getAllMatchesWithNames, getMatchWithNames, deleteMatch, getMatch, getLiveMatches, getHistoryMatches, goal, endMatch, giveCard, matchWithAllData, startMatch, getUpcomingMatches, getSortedEvents, fixMatches } from '../controllers/matchController.js';
import express from 'express';
import { authenticateToken } from '../controllers/apiSecurityController.js';

const isAdmin = authenticateToken('admin');
const isUser = authenticateToken('user');
const router = express.Router();

/**
 * @swagger
 * /matches:
 *   get:
 *     summary: Retrieve a list of matches
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: A list of matches
 */
router.get("/matches", getAllMatches);

/**
 * @swagger
 * /matchesLive:
 *   get:
 *     summary: Retrieve a list of live matches
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: A list of live matches
 */
router.get("/matchesLive", getLiveMatches);

/**
 * @swagger
 * /matchesHistory:
 *   get:
 *     summary: Retrieve a list of historical matches
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: A list of historical matches
 */
router.get("/matchesHistory", getHistoryMatches);

/**
 * @swagger
 * /upcomingMatches:
 *   get:
 *     summary: Retrieve a list of upcoming matches
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: A list of upcoming matches
 */
router.get("/upcomingMatches", getUpcomingMatches);

/**
 * @swagger
 * /matchesWithNames:
 *   get:
 *     summary: Retrieve a list of matches with names
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: A list of matches with names
 */
router.get("/matchesWithNames", getAllMatchesWithNames);

/**
 * @swagger
 * /adminMatchesWithNames:
 *   get:
 *     summary: Retrieve a list of matches with names (admin)
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: A list of matches with names (admin)
 */
router.get("/adminMatchesWithNames", getAllMatchesWithNames);

/**
 * @swagger
 * /match:
 *   post:
 *     summary: Add a new match
 *     tags: [Matches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               homeTeam:
 *                 type: string
 *               awayTeam:
 *                 type: string
 *               referee:
 *                 type: string
 *               commentator:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *             required:
 *               - homeTeam
 *               - awayTeam
 *               - referee
 *               - commentator
 *               - date
 *     responses:
 *       201:
 *         description: Match added
 */
router.post("/match", addMatch);

/**
 * @swagger
 * /goal:
 *   post:
 *     summary: Add a goal
 *     tags: [Matches]
 *     responses:
 *       201:
 *         description: Goal added
 */
router.post("/goal", goal);

/**
 * @swagger
 * /card:
 *   post:
 *     summary: Give a card
 *     tags: [Matches]
 *     responses:
 *       201:
 *         description: Card given
 */
router.post("/card", giveCard);

/**
 * @swagger
 * /matchWithNames/{id}:
 *   get:
 *     summary: Retrieve a match with names by ID
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A match with names
 */
router.get("/matchWithNames/:id", getMatchWithNames);

/**
 * @swagger
 * /match/{id}:
 *   get:
 *     summary: Retrieve a match by ID
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A match
 */
router.get("/match/:id", getMatch);

/**
 * @swagger
 * /match/{id}:
 *   delete:
 *     summary: Delete a match by ID
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Match deleted
 */
router.delete("/match/:id", deleteMatch);

/**
 * @swagger
 * /endMatch/{id}:
 *   get:
 *     summary: End a match by ID
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Match ended
 */
router.get("/endMatch/:id", endMatch);

/**
 * @swagger
 * /matchWithAllData/{id}:
 *   get:
 *     summary: Retrieve a match with all data by ID
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A match with all data
 */
router.get("/matchWithAllData/:id", matchWithAllData);

/**
 * @swagger
 * /matchStart/{id}:
 *   get:
 *     summary: Start a match by ID
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Match started
 */
router.get("/matchStart/:id", startMatch);

/**
 * @swagger
 * /sortedEvents/{id}:
 *   get:
 *     summary: Retrieve sorted events by match ID
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sorted events
 */
router.get("/sortedEvents/:id", getSortedEvents);

/**
 * @swagger
 * /fixMatches:
 *   get:
 *     summary: Fix matches
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: Matches fixed
 */
router.get("/fixMatches", fixMatches);

export default router;
