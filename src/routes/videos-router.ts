import {Response, Router} from "express";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from "../types/videosTypes";
import {VideoGetQueryModel} from "../videos/VideoGetQueryModel";
import {VideoViewModel} from "../videos/VideoViewModel";
import {VideoCreateModel} from "../videos/VideoCreateModel";
import {VideoUpdateModel} from "../videos/VideoUpdateModel";
import {HTTP_STATUSES} from "../settings";
import {db, VideoType} from "../db/db";
import {videosRepository} from "../repositories/videos-repository";
import {ErrorModel} from "../videos/ErrorModel";



export const videosRouter = Router();


const enumTitles: string[] = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]



videosRouter.get('/', (req: RequestWithQuery<VideoGetQueryModel>, res: Response<VideoViewModel[]>) => {
    let foundVideos: VideoType[] = videosRepository.findVideos(req.query.title?.toString())
    res.status(HTTP_STATUSES.OK_200).send(foundVideos)
})

videosRouter.get('/:id', (req: RequestWithParams<{id: string}>, res: Response<VideoViewModel>) => {
    const video: VideoType | undefined = db.videos.find(v => v.id == +req.params.id)
    if(!video){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }else{
        res.status(HTTP_STATUSES.OK_200).json(video)
    }
})

videosRouter.delete('/:id', (req: RequestWithParams<{id: string}>, res: Response) => {
    const isDeleted = videosRepository.deleteVideo(+req.params.id)
    if(isDeleted){
        res.send(HTTP_STATUSES.NO_CONTENT_204)
    }else{
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})

videosRouter.post('/', (req: RequestWithBody<VideoCreateModel>,
                     res: Response<VideoViewModel|ErrorModel>) => {

    const error: ErrorModel = {
        errorMessages: []
    }

    const title: string = req.body.title
    const availableResolutions:string[] = req.body.availableResolutions
    const author: string = req.body.author


    if(!title){
        error.errorMessages.push({message: 'title is required', field: 'title'})
    }

    if(title.length > 40){
        error.errorMessages.push({message: 'incorrect input data', field: 'title'})
    }

    if(!author) {
        error.errorMessages.push({message: 'author is required', field: 'author'})
    }

    if(author.length > 20){
        error.errorMessages.push({message: 'incorrect input data', field: 'author'})
    }


    if(!Array.isArray(availableResolutions) || !availableResolutions.length){
        error.errorMessages.push({message: 'empty data', field: 'availableResolutions'})
    }

    for( let item of availableResolutions ){
        if(!enumTitles.includes(item)){
            error.errorMessages.push({message: 'non-existent resolutions', field: 'availableResolutions'})
            break;
        }
    }

    if(error.errorMessages.length){
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send(error)
        return;
    }
    const newVideo: VideoViewModel = videosRepository.createVideo(title, author, availableResolutions)
    res.status(HTTP_STATUSES.CREATED_201).send(newVideo)

})

videosRouter.put('/:id', (req: RequestWithParamsAndBody<{id: string}, VideoUpdateModel>,
                        res: Response<VideoViewModel | ErrorModel>) => {

    const error: ErrorModel = {
        errorMessages: []
    }


    let foundVideo: VideoViewModel|undefined = db.videos.find(v => v.id === +req.params.id)
    if(!foundVideo) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }else{

        const id: string = req.params.id
        const title: string = req.body.title
        const availableResolutions:string[] = req.body.availableResolutions
        const author: string = req.body.author
        const canBeDownloaded: boolean = req.body.canBeDownloaded
        const minAgeRestriction: number = req.body.minAgeRestriction


        if(!title){
            error.errorMessages.push({message: 'title is required', field: 'title'})
        }

        if(title.length > 40){
            error.errorMessages.push({message: 'incorrect input data', field: 'title'})
        }

        if(!author) {
            error.errorMessages.push({message: 'not data', field: 'author'})
        }

        if(author.length > 20){
            error.errorMessages.push({message: 'incorrect input data', field: 'author'})
        }


        if(typeof canBeDownloaded !== 'boolean'){
            error.errorMessages.push({message: 'not input data', field: 'canBeDownloaded'})
        }

        if(!minAgeRestriction){
            error.errorMessages.push({message: 'not data', field: 'minAgeRestriction'})
        }

        if(0 < minAgeRestriction && minAgeRestriction < 18 || minAgeRestriction > 120){
            error.errorMessages.push({message: 'Incorrect input data', field: 'minAgeRestriction'})
        }

        if(!Array.isArray(availableResolutions) || !availableResolutions.length){
            error.errorMessages.push({message: 'Incorrect data', field: 'availableResolutions'})
        }

        for( let item of availableResolutions ){
            if(!enumTitles.includes(item)){
                error.errorMessages.push({message: 'not found Resolutions', field: 'availableResolutions'})
                break;
            }
        }

        if(error.errorMessages.length){
            res.status(HTTP_STATUSES.BAD_REQUEST_400).send(error)
            return;
        }
        let updateVideo: VideoViewModel | undefined = videosRepository.updateVideo(id, title, author, availableResolutions, canBeDownloaded, minAgeRestriction )
        res.status(HTTP_STATUSES.NO_CONTENT_204).send(updateVideo)
    }

})