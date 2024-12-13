import { ObjectId } from "mongoose";
import { Team } from "./team-interface";

interface Stadium{
    _id: ObjectId,
    homeTeam: Team,
    name: string;
    capacity: number,
    state: boolean,
    __v: number
}

export {Stadium};