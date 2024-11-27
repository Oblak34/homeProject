import {db} from "../db/db";
import {VideoViewModel} from "../videos/VideoViewModel";


export const videosRepository = {
    findVideos(title:string| undefined) {
        if(title) {
            return db.videos.filter(v => v.title.indexOf(title) > -1)
        }else{
            return db.videos
        }
    },

    createVideo(title: string, author: string, availableResolutions: string[]){

        const newVideo: VideoViewModel = {
            id: +(new Date()),
            author: author,
            title: title,
            canBeDownloaded: true,
            minAgeRestriction: 0,
            createdAt: new Date().toISOString().slice(-3, 3),
            publicationDate: new Date().toISOString().slice(-3, 3),
            availableResolutions: [...availableResolutions]
        }
            db.videos.push(newVideo)
            return newVideo
    },

    updateVideo(id: string, title: string, author:string , availableResolutions: string[], canBeDownloaded: boolean, minAgeRestriction: number) {

        let date = new Date()
        date.setDate(date.getDate() + 1)

        let foundVideo: VideoViewModel | undefined = db.videos.find(v => v.id === +id)

        if(foundVideo){
            foundVideo.title = title
            foundVideo.author = author
            foundVideo.availableResolutions = availableResolutions
            foundVideo.canBeDownloaded = canBeDownloaded
            foundVideo.minAgeRestriction = minAgeRestriction
            foundVideo.publicationDate = date.toISOString().slice(-3, 3)

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