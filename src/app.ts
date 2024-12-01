import express, {Express, Request, Response} from "express";
import {videosRouter} from "./routes/videos-router";
import {testRouter} from "./routes/tests-router";
import {SETTINGS} from "./settings";

export const app: Express = express()

app.use(express.json())

app.use(SETTINGS.PATH.VIDEOS, videosRouter)
app.use('/testing/all-data', testRouter)

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({version: '1.0'})
})







