import Match from "../models/matchModel";
import Team from "../models/teamModel";
import Stadium from "../models/stadiumModel";
import { Player } from "../models/persons";

const addMatch = async (req, res) => {
    const team = await Team.findById(req.body.homeTeam);

    const match = new Match({
        homeTeam: req.body.homeTeam,
        awayTeam: req.body.awayTeam,
        referee: req.body.referee,
        commentator: req.body.commentator,
        stadium: team['stadium'],
        date: req.body.date
    });
    const result = await match.save().catch((err) => console.log(err));
    res.send(result);
};

const getAllMatches = async (req, res) => {
    const result = await Match.find({});
    res.send(result);
};

const getAllMatchesWithNames = async (req, res) => {
    const result = await Match.find({}).populate('homeTeam', 'name').populate('awayTeam', 'name').populate('referee', 'name').populate('commentator', 'name');
    res.send(result);
};

const getMatchWithNames = async (req, res) => {
    const result = await Match.findById(req.params['id']).populate('homeTeam', 'name').populate('awayTeam', 'name').populate('referee', 'name').populate('commentator', 'name');
    res.send(result);
};

const deleteMatch = async (req, res) => {
    try {
        const result = await Match.findByIdAndDelete(req.params['id']);
        res.send(result);
    } catch (e) {
        console.log(e);
        res.send(e);
    }
};

const getMatch = async (req, res) => {
    const result = await Match.findById(req.params['id']);
    res.send(result);
};

const getLiveMatches = async (req, res) => {
    const result = await Match.find({ status: true, endState: false }).populate({
        path: 'homeTeam',
        populate: {
            path: 'squad',
            model: 'Player',
            select: 'name'
        }
    })
        .populate({
            path: 'awayTeam',
            populate: {
                path: 'squad',
                model: 'Player',
                select: 'name'
            }
        }).populate('referee', 'name')
        .populate('commentator', 'name').populate('stadium', 'name');
    res.send(result);
};

const getHistoryMatches = async (req, res) => {
    const result = await Match.find({ endState: true, status: true }).populate({
        path: 'homeTeam',
        populate: {
            path: 'squad',
            model: 'Player',
            select: 'name'
        }
    })
        .populate({
            path: 'awayTeam',
            populate: {
                path: 'squad',
                model: 'Player',
                select: 'name'
            }
        }).populate('referee', 'name').populate('commentator', 'name');
    res.send(result);
};

const goal = async (req, res) => {
    const match = await Match.findById(req.body.match);
    const homeTeam = await Team.findById(match['homeTeam']);
    const awayTeam = await Team.findById(match['awayTeam']);
    const isHome = req.body.team === String(match['homeTeam']);
    if (!(homeTeam['squad'].includes(req.body.player)) && !(awayTeam['squad'].includes(req.body.player))) {
        console.log("no player with this name in the match");
        res.send("no player with this name in the match");
        return;
    }
    if (match['cards'].get(req.body.player) && match['cards'].get(req.body.player) === 'red') {
        console.log("this player is suspended can't score a goal");
        res.send("this player is suspended can't score a goal");
        return;
    }
    if (isHome) {
        await Match.findByIdAndUpdate(req.body.match, { homeGoals: ++match['homeGoals'] });
    } else {
        await Match.findByIdAndUpdate(req.body.match, { awayGoals: ++match['awayGoals'] });
    }
    let result;
    const matchofGoals = JSON.parse(JSON.stringify(match['goals']));
    const playerName = await Player.findById(req.body.player);
    if (match['goals'].get(req.body.player)) {
        const playername = await Player.findById(req.body.player);
        matchofGoals[req.body.player]++;
        result = await Match.findByIdAndUpdate(match['_id'], { 'goals': matchofGoals, $push: { events: [req.body.player, 'goal'] } }, { new: true });
        message['notification']['title'] = 'Goal';
        message['notification']['body'] = playername['name'];
        console.log(playername['name']);
        messaging.send(message);
    } else {
        matchofGoals[req.body.player] = 1;
        result = await Match.findByIdAndUpdate(match['_id'], { 'goals': matchofGoals, $push: { events: [req.body.player, 'goal'] } }, { new: true });
        const playername = await Player.findById(req.body.player);
        message['notification']['title'] = 'Goal';
        message['notification']['body'] = playername['name'];
        console.log(playername['name']);
        messaging.send(message);
    }
    res.send(result);
    const score = isHome ? `[${result["homeGoals"]}] : ${result["awayGoals"]}` : `${result["homeGoals"]} : [${result["awayGoals"]}]`;
    const payload = {
        message: {
            topic: "all",
            notification: {
                title: "Goal!",
                body: `${homeTeam['name']} ${score} ${awayTeam['name']}\n${playerName['name']}`
            },
            android: {
                notification: {
                    channel_id: "noti2"
                }
            }
        }
    };

    try {
        await axios.post(
            "https://fcm.googleapis.com/v1/projects/premier-noti/messages:send",
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await getFcmAccessToken()}`
                }
            }
        );
    } catch (e) {
        console.log(e);
    }
};

const endMatch = async (req, res) => {
    const result = await Match.findByIdAndUpdate(req.params['id'], { endState: true, status: false }, { new: true });
    await Stadium.findByIdAndUpdate(result['stadium'], { state: false });
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
                topic: "all",
                notification: {
                    title: "Match Ended",
                    body: `${homeTeam['name']} ${result['homeGoals']} - ${result['awayGoals']} ${awayTeam['name']}`
                },
                android: {
                    notification: {
                        channel_id: "noti1"
                    }
                }
            }
        };
        await axios.post(
            "https://fcm.googleapis.com/v1/projects/premier-noti/messages:send",
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await getFcmAccessToken()}`
                }
            }
        );
    } catch (e) {
        console.log(e);
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
            res.send("no player with this name in the match");
            return;
        }
        const playerName = await Player.findById(req.body.player);
        if (match['cards'].get(req.body.player) && match['cards'].get(req.body.player) === 'yellow') {
            const update = {};
            cardType = "red";
            update['cards.' + req.body.player] = 'red';
            const result = await Match.findByIdAndUpdate(req.body.match, { $set: update, $push: { events: [req.body.player, 'red'] } }, { new: true });
            res.send(result);
        } else if (match['cards'].get(req.body.player) && match['cards'].get(req.body.player) === 'red') {
            console.log("error player already suspended");
            res.send("error player already suspended");
        } else {
            const update = {};
            update['cards.' + req.body.player] = req.body.card;
            const result = await Match.findByIdAndUpdate(req.body.match, { $set: update, $push: { events: [req.body.player, req.body.card] } }, { new: true });
            res.send(result);
        }
        const payload = {
            message: {
                topic: "all",
                notification: {
                    title: "Card!",
                    body: `${homeTeam['name']} VS ${awayTeam['name']}\n${playerName['name']} ${cardType} card`
                },
                android: {
                    notification: {
                        channel_id: "noti3"
                    }
                }
            }
        };
        await axios.post(
            "https://fcm.googleapis.com/v1/projects/premier-noti/messages:send",
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await getFcmAccessToken()}`
                }
            }
        );
    } catch (e) {
        console.log(e);
        res.send(e);
    }
};

const matchWithAllData = async (req, res) => {
    const result = await Match.findById(req.params['id']).populate('homeTeam').populate('awayTeam').populate('referee').populate('commentator').populate('stadium');
    res.send(result);
};

const startMatch = async (req, res) => {
    const result = await Match.findByIdAndUpdate(req.params['id'], { status: true }, { new: true });
    await Stadium.findByIdAndUpdate(result['stadium'], { state: true });
    res.send(result);
    try {
        const homeTeam = await Team.findById(result['homeTeam']);
        const awayTeam = await Team.findById(result['awayTeam']);
        const payload = {
            message: {
                topic: "all",
                notification: {
                    title: "Match Started",
                    body: `${homeTeam['name']} VS ${awayTeam['name']}`
                },
                android: {
                    notification: {
                        channel_id: "noti1"
                    }
                }
            }
        };
        await axios.post(
            "https://fcm.googleapis.com/v1/projects/premier-noti/messages:send",
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getFcmAccessToken()}`
                }
            }
        );
    } catch (e) {
        console.log(e);
    }
};

const getUpcomingMatches = async (req, res) => {
    const result = await Match.find({ status: false, endState: false });
    res.send(result);
};

const fixMatches = async (req, res) => {
    const matches = await Match.updateMany({}, { homeGoals: 0, awayGoals: 0, goals: {}, cards: {}, status: false, endState: false, events: [] });
    res.send(matches);
};

const getSortedEvents = async (req, res) => {
    const match = await Match.findById(req.params['id']);
    const events = match['events'];

    const sortedEvents = [];
    for (const event of events) {
        const player = await Player.findById(event[0]).populate('team', 'name');
        const playerName = player['name'];
        const playerTeam = player['team']['name'];
        const eventType = event[1];

        const transformedEvent = [
            playerName,
            playerTeam,
            eventType,
        ];

        sortedEvents.push(transformedEvent);
    }

    res.send(sortedEvents);
};

export { addMatch, getAllMatches, getAllMatchesWithNames, getMatchWithNames, deleteMatch, getMatch, getLiveMatches, getHistoryMatches, goal, endMatch, giveCard, matchWithAllData, startMatch, getUpcomingMatches, getSortedEvents, fixMatches };
