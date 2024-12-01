import {Response, Router} from "express";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from "../types/videosTypes";
import {VideoGetQueryModel} from "../models/VideoGetQueryModel";
import {VideoViewModel} from "../models/VideoViewModel";
import {VideoCreateModel} from "../models/VideoCreateModel";
import {VideoUpdateModel} from "../models/VideoUpdateModel";
import {HTTP_STATUSES} from "../settings";
import {db, VideoType} from "../db/db";
import {videosRepository} from "../repositories/videos-repository";
import {ErrorModel} from "../models/ErrorModel";
import {createVideo} from "../videos/createVideo";
import {updateVideo} from "../videos/updateVideo";



export const videosRouter: Router = Router();


const videoController = {
    getVideos: (req: RequestWithQuery<VideoGetQueryModel>, res: Response<VideoViewModel[]>) => {
        let foundVideos: VideoType[] = videosRepository.findVideos(req.query.title?.toString())
        res.status(HTTP_STATUSES.OK_200).send(foundVideos)
    },
    getVideoById: (req: RequestWithParams<{ id: string }>, res: Response<VideoViewModel>) => {
        const video: VideoType | undefined = db.videos.find(v => v.id == +req.params.id)
        if (!video) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }

        res.status(HTTP_STATUSES.OK_200).json(video)
    },
    deleteVideo: (req: RequestWithParams<{ id: string }>, res: Response) => {
        const isDeleted: boolean = videosRepository.deleteVideo(+req.params.id)
        if (isDeleted) {
            res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
            return
        }
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    },
    createVideo: (req: RequestWithBody<VideoCreateModel>, res: Response<VideoViewModel | ErrorModel>) => createVideo(req, res),
    updateVideo: (req: RequestWithParamsAndBody<{id: string}, VideoUpdateModel>, res: Response<VideoViewModel | ErrorModel>) => updateVideo(req, res)
}

videosRouter.get('/', videoController.getVideos);
videosRouter.get('/:id', videoController.getVideoById);
videosRouter.delete('/:id', videoController.deleteVideo);
videosRouter.post('/', videoController.createVideo);
videosRouter.put('/:id', videoController.updateVideo);
