import Match from "../models/matchModel.js";
import Team from "../models/teamModel.js";
import Stadium from "../models/stadiumModel.js";
import {Player} from "../models/persons.js";
import {cacheData, getCachedData} from "../index.js";
import _ from 'firebase-admin';
import axios from "axios";
import {getFcmAccessToken} from "./apiSecurityController.js";



const addMatch = async (req, res) => {
    try {
        const team = await Team.findById(req.body.homeTeam);

        const match = new Match({
            homeTeam: req.body.homeTeam,
            awayTeam: req.body.awayTeam,
            referee: req.body.referee,
            commentator: req.body.commentator,
            stadium: team['stadium'],
            date: req.body.date
        });
        const result = await match.save();
        // res.send(result);
        res.redirect("http://localhost:3000/addMatch")
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while adding the match. Please try again later.", error: err.message
        });
    }
};

const getAllMatches = async (req, res) => {
    try {
        const cacheKey = 'allMatches';
        const cachedData = await getCachedData(cacheKey);

        if (cachedData) {
            return res.status(200).json(cachedData);
        }

        const result = await Match.find({});
        await cacheData(cacheKey, result, 3600); // Cache the data with expiry
        res.status(200).json(result);
    } catch (err) {
        console.error('Error fetching matches:', err);
        res.status(500).send({
            message: "An error occurred while retrieving all matches.",
            error: err.message,
        });
    }
};

const getAllMatchesWithNames = async (req, res) => {
    try {
        const cacheKey = 'allMatchesWithNames';
        const cachedData = await getCachedData(cacheKey);
        if (cachedData) {
            return res.send(cachedData);
        }
        const result = await Match.find({}).populate('homeTeam', 'name').populate('awayTeam', 'name').populate('referee', 'name').populate('commentator', 'name');
        await cacheData(cacheKey, result, 3600);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving all matches with names. Please try again later.",
            error: err.message
        });
    }
};

const getMatchWithNames = async (req, res) => {
    try {
        const result = await Match.findById(req.params['id']).populate('homeTeam', 'name').populate('awayTeam', 'name').populate('referee', 'name').populate('commentator', 'name');
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving the match with names. Please try again later.",
            error: err.message
        });
    }
};

const deleteMatch = async (req, res) => {
    try {
        const result = await Match.findByIdAndDelete(req.params['id']);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while deleting the match. Please try again later.", error: err.message
        });
    }
};

const getMatch = async (req, res) => {
    try {
        const cacheKey = `match:${req.params['id']}`;
        const cachedData = await getCachedData(cacheKey);
        if (cachedData) {
            return res.send(cachedData);
        }
        const result = await Match.findById(req.params['id']);
        await cacheData(cacheKey, result, 3600);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving the match. Please try again later.",
            error: err.message
        });
    }
};
const getLiveMatches = async (req, res) => {
    try {
        // const cacheKey = 'liveMatches';
        // const cachedData = await getCachedData(cacheKey);
        // if (cachedData) {
        //     return res.send(cachedData);
        // }
        const result = await Match.find({status: true, endState: false}).populate({
            path: 'homeTeam', populate: {
                path: 'squad', model: 'Player', select: 'name'
            }
        })
            .populate({
                path: 'awayTeam', populate: {
                    path: 'squad', model: 'Player', select: 'name'
                }
            }).populate('referee', 'name')
            .populate('commentator', 'name').populate('stadium', 'name');
        // await cacheData(cacheKey, result, 10);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving live matches. Please try again later.",
            error: err.message
        });
    }
};

const getHistoryMatches = async (req, res) => {
    try {
        const cacheKey = 'historyMatches';
        const cachedData = await getCachedData(cacheKey);
        if (cachedData) {
            return res.send(cachedData);
        }
        const result = await Match.find({endState: true, status: true}).populate({
            path: 'homeTeam', populate: {
                path: 'squad', model: 'Player', select: 'name'
            }
        })
            .populate({
                path: 'awayTeam', populate: {
                    path: 'squad', model: 'Player', select: 'name'
                }
            }).populate('referee', 'name').populate('commentator', 'name');
        await cacheData(cacheKey, result, 100);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving history matches. Please try again later.",
            error: err.message
        });
    }
};


const goal = async (req, res) => {
    try {
        const match = await Match.findById(req.body.match);
        const homeTeam = await Team.findById(match['homeTeam']);
        const awayTeam = await Team.findById(match['awayTeam']);
        console.log(match,homeTeam,awayTeam)
        const isHome = req.body.team === String(match['homeTeam']);
        console.log(isHome)
        if (!(homeTeam['squad'].includes(req.body.player)) && !(awayTeam['squad'].includes(req.body.player))) {
            console.log("no player with this name in the match");
            res.status(400).send({
                message: "No player with this name in the match."
            });
            return;
        }
        if (match['cards'].get(req.body.player) && match['cards'].get(req.body.player) === 'red') {
            console.log("this player is suspended can't score a goal");
            res.status(400).send({
                message: "This player is suspended and can't score a goal."
            });
            return;
        }
        if (isHome) {
            await Match.findByIdAndUpdate(req.body.match, {homeGoals: ++match['homeGoals']});
        } else {
            await Match.findByIdAndUpdate(req.body.match, {awayGoals: ++match['awayGoals']});
        }
        let result;
        const matchofGoals = JSON.parse(JSON.stringify(match['goals']));
        if (match['goals'].get(req.body.player)) {
            matchofGoals[req.body.player]++;
            result = await Match.findByIdAndUpdate(match['_id'], {
                'goals': matchofGoals, $push: {events: [req.body.player, 'goal']}
            }, {new: true});
            // let message;
            // message['notification']['title'] = 'Goal';
            // message['notification']['body'] = playername['name'];
            // // _.messaging.send(message)
            // console.log(playername['name']);

        } else {
            matchofGoals[req.body.player] = 1;
            result = await Match.findByIdAndUpdate(match['_id'], {
                'goals': matchofGoals, $push: {events: [req.body.player, 'goal']}
            }, {new: true});
            // const playername = await Player.findById(req.body.player);
            // let message;
            // message['notification']['title'] = 'Goal';
            // message['notification']['body'] = playername['name'];
            // console.log(playername['name']);
            // _.messaging.send(message);
        }
        console.log(result);
        res.send(result);
        // const score = isHome ? `[${result["homeGoals"]}] : ${result["awayGoals"]}` : `${result["homeGoals"]} : [${result["awayGoals"]}]`;
        // const payload = {
        //     message: {
        //         topic: "all", notification: {
        //             title: "Goal!", body: `${homeTeam['name']} ${score} ${awayTeam['name']}\n${playerName['name']}`
        //         }, android: {
        //             notification: {
        //                 channel_id: "noti2"
        //             }
        //         }
        //     }
        // };

        try {
            // await axios.post("https://fcm.googleapis.com/v1/projects/premier-noti/messages:send", payload, {
            //     headers: {
            //         'Content-Type': 'application/json', 'Authorization': `Bearer ${await getFcmAccessToken()}`
            //     }
            // });
        } catch (e) {
            console.log(e);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while processing the goal. Please try again later.", error: err.message
        });
    }
};

const endMatch = async (req, res) => {
    try {
        const result = await Match.findByIdAndUpdate(req.params['id'], {endState: true, status: true}, {new: true});
        await Stadium.findByIdAndUpdate(result['stadium'], {state: false});
        const hometeamId = result['homeTeam'];
        const awayteamId = result['awayTeam'];
        const homeTeam = await Team.findById(hometeamId);
        const awayTeam = await Team.findById(awayteamId);
        if (result.homeGoals > result.awayGoals) {
            homeTeam['points'] += 3;
            homeTeam['wins'] += 1;
            awayTeam['loss'] += 1;
        } else if (result.awayGoals > result.homeGoals) {
            awayTeam['points'] += 3;
            awayTeam['wins'] += 1;
            homeTeam['loss'] += 1;
        } else {
            homeTeam['points'] += 1;
            homeTeam['draw'] += 1;
            awayTeam['points'] += 1;
            awayTeam['draw'] += 1;
        }
        await Team.findByIdAndUpdate(hometeamId, homeTeam);
        await Team.findByIdAndUpdate(awayteamId, awayTeam);
        res.send(result);
        try {
            const payload = {
                message: {
                    topic: "all", notification: {
                        title: "Match Ended",
                        body: `${homeTeam['name']} ${result['homeGoals']} - ${result['awayGoals']} ${awayTeam['name']}`
                    }, android: {
                        notification: {
                            channel_id: "noti1"
                        }
                    }
                }
            };
            // await axios.post("https://fcm.googleapis.com/v1/projects/premier-noti/messages:send", payload, {
            //     headers: {
            //         'Content-Type': 'application/json', 'Authorization': `Bearer ${await getFcmAccessToken()}`
            //     }
            // });
        } catch (e) {
            console.log(e);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while ending the match. Please try again later.", error: err.message
        });
    }
};

const giveCard = async (req, res) => {
    try {
        const match = await Match.findById(req.body.match);
        const homeTeam = await Team.findById(match['homeTeam']);
        const awayTeam = await Team.findById(match['awayTeam']);
        let cardType = req.body['card'];
        if (!(homeTeam['squad'].includes(req.body.player)) && !(awayTeam['squad'].includes(req.body.player))) {
            console.log("no player with this name in the match");
            res.status(400).send({
                message: "No player with this name in the match."
            });
            return;
        }
        // const playerName = await Player.findById(req.body.player);
        if (match['cards'].get(req.body.player) && match['cards'].get(req.body.player) === 'yellow') {
            const update = {};
            update['cards.' + req.body.player] = 'red';
            const result = await Match.findByIdAndUpdate(req.body.match, {
                $set: update, $push: {events: [req.body.player, 'red']}
            }, {new: true});
            res.send(result);
        } else if (match['cards'].get(req.body.player) && match['cards'].get(req.body.player) === 'red') {
            console.log("error player already suspended");
            res.status(400).send({
                message: "Error: player already suspended."
            });
        } else {
            const update = {};
            update['cards.' + req.body.player] = req.body.card;
            const result = await Match.findByIdAndUpdate(req.body.match, {
                $set: update, $push: {events: [req.body.player, req.body.card]}
            }, {new: true});
            res.send(result);
        }
        // const payload = {
        //     message: {
        //         topic: "all", notification: {
        //             title: "Card!",
        //             body: `${homeTeam['name']} VS ${awayTeam['name']}\n${playerName['name']} ${cardType} card`
        //         }, android: {
        //             notification: {
        //                 channel_id: "noti3"
        //             }
        //         }
        //     }
        // };
        // await axios.post("https://fcm.googleapis.com/v1/projects/premier-noti/messages:send", payload, {
        //     headers: {
        //         'Content-Type': 'application/json', 'Authorization': `Bearer ${await getFcmAccessToken()}`
        //     }
        // });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while giving the card. Please try again later.", error: err.message
        });
    }
};

const matchWithAllData = async (req, res) => {
    try {
        const result = await Match.findById(req.params['id']).populate('homeTeam').populate('awayTeam').populate('referee').populate('commentator').populate('stadium');
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving the match with all data. Please try again later.",
            error: err.message
        });
    }
};

const startMatch = async (req, res) => {
    try {
        const result = await Match.findByIdAndUpdate(req.params['id'], {status: true}, {new: true});
        await Stadium.findByIdAndUpdate(result['stadium'], {state: true});
        res.send(result);
        try {
            const homeTeam = await Team.findById(result['homeTeam']);
            const awayTeam = await Team.findById(result['awayTeam']);
            const payload = {
                message: {
                    topic: "all", notification: {
                        title: "Match Started", body: `${homeTeam['name']} VS ${awayTeam['name']}`
                    }, android: {
                        notification: {
                            channel_id: "noti1"
                        }
                    }
                }
            };
            // await axios.post("https://fcm.googleapis.com/v1/projects/premier-noti/messages:send", payload, {
            //     headers: {
            //         'Content-Type': 'application/json', 'Authorization': `Bearer ${await getFcmAccessToken()}`
            //     }
            // });
        } catch (e) {
            console.log(e);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while starting the match. Please try again later.", error: err.message
        });
    }
};

const getUpcomingMatches = async (req, res) => {
    try {
        const result = await Match.find({status: false, endState: false});
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving upcoming matches. Please try again later.", error: err.message
        });
    }
};

const fixMatches = async (req, res) => {
    try {
        const matches = await Match.updateMany({}, {
            homeGoals: 0, awayGoals: 0, goals: {}, cards: {}, status: false, endState: false, events: []
        });
        res.send(matches);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while fixing matches. Please try again later.", error: err.message
        });
    }
};

const getSortedEvents = async (req, res) => {
    try {
        const match = await Match.findById(req.params['id']);
        const events = match['events'];

        const sortedEvents = [];
        for (const event of events) {
            const player = await Player.findById(event[0]).populate('team', 'name');
            const playerName = player['name'];
            const playerTeam = player['team']['name'];
            const eventType = event[1];

            const transformedEvent = [playerName, playerTeam, eventType,];

            sortedEvents.push(transformedEvent);
        }

        res.send(sortedEvents);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while retrieving sorted events. Please try again later.", error: err.message
        });
    }
};

const updateMatch = async (req, res) => {
    try {
        const result = await Match.findByIdAndUpdate(req.params['id'], req.body, { new: true });
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "An error occurred while updating the match. Please try again later.",
            error: err.message
        });
    }
};

export {
    addMatch,
    getAllMatches,
    getAllMatchesWithNames,
    getMatchWithNames,
    deleteMatch,
    getMatch,
    getLiveMatches,
    getHistoryMatches,
    goal,
    endMatch,
    giveCard,
    matchWithAllData,
    startMatch,
    getUpcomingMatches,
    getSortedEvents,
    fixMatches,
    updateMatch
};
