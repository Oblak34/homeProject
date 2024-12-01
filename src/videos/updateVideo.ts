import {RequestWithParamsAndBody} from "../types/videosTypes";
import {VideoUpdateModel} from "../models/VideoUpdateModel";
import {Response} from "express";
import {VideoViewModel} from "../models/VideoViewModel";
import {ErrorModel} from "../models/ErrorModel";
import {db} from "../db/db";
import {HTTP_STATUSES} from "../settings";
import {
    authorValidation,
    availableResolutionsValidation, canBeDownloadedValidator,
    minAgeRestrictionValidation, publicationDateValidator,
    titleValidation
} from "../validation/videoValidatons";
import {videosRepository} from "../repositories/videos-repository";



export function updateVideo(req: RequestWithParamsAndBody<{id: string}, VideoUpdateModel>,
                             res: Response<VideoViewModel | ErrorModel>){

    const enumTitles: string[] = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]

    const errorsArray: ErrorModel = {
        errorsMessages: []
    }


    let foundVideo: VideoViewModel|undefined = db.videos.find(v => v.id === +req.params.id)
    if(!foundVideo) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return;
    }

    const id: string = req.params.id
    const title: string = req.body.title
    const availableResolutions:string[] = req.body.availableResolutions
    const author: string = req.body.author
    const canBeDownloaded: boolean = req.body.canBeDownloaded
    const minAgeRestriction: number = req.body.minAgeRestriction
    const publicationDate: string = req.body.publicationDate

    titleValidation(title, errorsArray.errorsMessages);
    authorValidation(author, errorsArray.errorsMessages);
    availableResolutionsValidation(availableResolutions, errorsArray.errorsMessages, enumTitles);
    minAgeRestrictionValidation(minAgeRestriction, errorsArray.errorsMessages)
    canBeDownloadedValidator(canBeDownloaded, errorsArray.errorsMessages)
    publicationDateValidator(publicationDate, errorsArray.errorsMessages)

    if(errorsArray.errorsMessages.length){
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send(errorsArray)
        return;
    }
    const updateVideo: VideoViewModel | undefined = videosRepository.updateVideo(id, title, author, availableResolutions, canBeDownloaded, minAgeRestriction,publicationDate )
    res.status(HTTP_STATUSES.NO_CONTENT_204).send(updateVideo)
}