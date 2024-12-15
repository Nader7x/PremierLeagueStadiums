import { ObjectId } from "mongoose";
import { Player } from "./player-interface";
import { Coach } from "./coach-interface";
import { Stadium } from "./stadium-interface";

interface Team  {
    _id: ObjectId,
    name: string,
    squad: Player[],
    coach: Coach,
    wins: number,
    loss: number,
    draw: number,
    points: number,
    kit: string[],
    logo: string;
    stadium: Stadium,
    __v: number

}

export {Team};