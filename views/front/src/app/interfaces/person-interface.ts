import { ObjectId } from "mongoose";

interface Person{
    _id: ObjectId,
    name: string;
    nationality: string;
    age: number;
    type: string;
    __v: number
}

export {Person};