import express, {Express, Request, Response} from "express";
import {videosRouter} from "./routes/videos-router";
import {testRouter} from "./routes/tests-router";

export const app: Express = express()

app.use(express.json())

app.use('/videos', videosRouter)
app.use('/__test__/data', testRouter)

app.get('/', (req: Request, res: Response) => {
    res.json({word: 'Hello World!'})
})






