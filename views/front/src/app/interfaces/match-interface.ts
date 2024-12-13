import { ObjectId } from "mongoose";
import { Team } from "./team-interface";
import { Stadium } from "./stadium-interface";
import { Referee } from "./referee-interface";
import { Commentator } from "./commentator-interface";
import { Player } from "./player-interface";

interface Match{
    _id: ObjectId,
    homeTeam: Team,
    awayTeam: Team,
    stadium: Stadium,
    referee: Referee,
    commentator: Commentator,
    cards: Object,
    homeGoals: number,
    awayGoals: number,
    status: boolean,
    endState: boolean,
    goals: Object,
    date: Date;
    events: any;
    __v: number;
}

export {Match};