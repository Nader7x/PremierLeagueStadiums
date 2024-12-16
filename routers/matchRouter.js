import { addMatch, getAllMatches, getAllMatchesWithNames, getMatchWithNames, deleteMatch, getMatch, getLiveMatches, getHistoryMatches, goal, endMatch, giveCard, matchWithAllData, startMatch, getUpcomingMatches, getSortedEvents, fixMatches, updateMatch } from '../controllers/matchController.js';
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
router.get("/matches", isUser, getAllMatches);

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
router.get("/matchesLive", isUser, getLiveMatches);

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
router.get("/matchesHistory", isUser, getHistoryMatches);

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
router.get("/upcomingMatches", isUser, getUpcomingMatches);

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
router.get("/matchesWithNames", isUser, getAllMatchesWithNames);

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
router.get("/adminMatchesWithNames", isAdmin, getAllMatchesWithNames);

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
router.post("/match", isAdmin, addMatch);

/**
 * @swagger
 * /goal:
 *   post:
 *     summary: Add a goal
 *     tags: [Matches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
*               match:
 *                     type: string
 *               team:
 *                 type: string
*               player:
 *                 type: string
 *     responses:
 *       201:
 *         description: Goal added
 */
router.post("/goal", isAdmin, goal);

/**
 * @swagger
 * /card:
 *   post:
 *     summary: Give a card
 *     tags: [Matches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               match:
 *                 type: string
 *               player:
 *                 type: string
 *               card:
 *                 type: string
 *             required:
 *               - match
 *               - player
 *               - card
 */
router.post("/card", isAdmin, giveCard);

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
router.get("/matchWithNames/:id", isUser, getMatchWithNames);

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
router.get("/match/:id", isUser, getMatch);

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
router.delete("/match/:id", isAdmin, deleteMatch);

/**
 * @swagger
 * /match/{id}:
 *   patch:
 *     summary: Update a match by ID
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Match updated
 */
router.patch("/match/:id", isAdmin, updateMatch);

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
router.get("/endMatch/:id", isAdmin, endMatch);

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
router.get("/matchWithAllData/:id", isUser, matchWithAllData);

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
router.get("/matchStart/:id", isAdmin, startMatch);

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
router.get("/sortedEvents/:id", isUser, getSortedEvents);

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
router.get("/fixMatches", isAdmin, fixMatches);


export default router;
