import {Request, Response, Router} from "express";
import {db} from "../db/db";
import {HTTP_STATUSES} from "../settings";

export const testRouter = Router();

testRouter.delete('/', (req: Request, res: Response) =>{
    db.videos = [];
    res.sendStatus(HTTP_STATUSES.CREATED_201)
})