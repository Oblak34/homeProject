import {db} from "../db/db";
import {VideoViewModel} from "../models/VideoViewModel";


export const videosRepository = {
    findVideos(title:string| undefined) {
        if(title) {
            return db.videos.filter(v => v.title.indexOf(title) > -1)
        }else{
            return db.videos
        }
    },

    createVideo(title: string, author: string, availableResolutions: string[]){

        const createdAt =new Date()
        const publicationDate = new Date()
        publicationDate.setDate(createdAt.getDate() + 1)

        const newVideo: VideoViewModel = {
            id: +(new Date()),
            author: author,
            title: title,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: createdAt.toISOString(),
            publicationDate: publicationDate.toISOString(),
            availableResolutions: [...availableResolutions]
        }
            db.videos.push(newVideo)
            return newVideo
    },

    updateVideo(id: string, title: string, author:string , availableResolutions?: string[], canBeDownloaded?: boolean, minAgeRestriction?: number,publicationDate?:string) {



        let foundVideo: VideoViewModel | undefined = db.videos.find(v => v.id === +id)

        if(foundVideo){
            foundVideo.title = title
            foundVideo.author = author
            foundVideo.availableResolutions = availableResolutions ? availableResolutions :foundVideo.availableResolutions
            foundVideo.canBeDownloaded = canBeDownloaded ? canBeDownloaded :foundVideo.canBeDownloaded
            foundVideo.minAgeRestriction = minAgeRestriction ? minAgeRestriction :foundVideo.minAgeRestriction
            foundVideo.publicationDate = publicationDate  ? publicationDate :foundVideo.publicationDate

            return foundVideo
        }else{
            return undefined
        }
    },

    deleteVideo(id:number){
        for(let i: number = 0; i < db.videos.length; i++){
            if(db.videos[i].id === id){
                db.videos.splice(i, 1)
                return true
            }
        }
        return false
    }




}