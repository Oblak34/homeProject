import {RequestWithBody} from "../types/videosTypes";
import {VideoCreateModel} from "../models/VideoCreateModel";
import {Response} from "express";
import {VideoViewModel} from "../models/VideoViewModel";
import {ErrorModel} from "../models/ErrorModel";
import {HTTP_STATUSES} from "../settings";
import {videosRepository} from "../repositories/videos-repository";
import {authorValidation, availableResolutionsValidation, titleValidation} from "../validation/videoValidatons";

export function createVideo(req: RequestWithBody<VideoCreateModel>,
                            res: Response<VideoViewModel|ErrorModel>) {

    const enumTitles: string[] = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]

    const errorsArray: ErrorModel = {
        errorsMessages: []
    }

    const title: string = req.body.title
    const availableResolutions:string[] = req.body.availableResolutions
    const author: string = req.body.author

    titleValidation(title, errorsArray.errorsMessages);
    authorValidation(author, errorsArray.errorsMessages);
    availableResolutionsValidation(availableResolutions, errorsArray.errorsMessages, enumTitles);


    if(errorsArray.errorsMessages.length){
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send(errorsArray)
        return;
    }
    const newVideo: VideoViewModel = videosRepository.createVideo(title, author, availableResolutions)
    res.status(HTTP_STATUSES.CREATED_201).send(newVideo)

}

