import { ObjectId } from "mongoose";
import { Team } from "./team-interface";
import { Person } from "./person-interface";

interface Player extends Person{
    kitNumber: number,
    position: string,
    team: Team;
}

export {Player};