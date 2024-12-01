export type VideoType = {
    id: number,
    author: string,
    title: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: string[]
}

export const db: {videos: VideoType[]} = {
    videos: [
        //  {
        //     id: 1,
        //     author: 'Disney',
        //     title: 'Mikky Maus',
        //     canBeDownloaded: false,
        //     minAgeRestriction: 10,
        //     createdAt: '10=4-2024',
        //     publicationDate: '10=4-2024',
        //     availableResolutions: ["P144"]
        // },
        // {
        //     id: 2,
        //     author: 'Marvel',
        //     title: 'Spider-Man',
        //     canBeDownloaded: false,
        //     minAgeRestriction: 10,
        //     createdAt: '10=4-2024',
        //     publicationDate: '10=4-2024',
        //     availableResolutions: ["P360"]
        // },
        // {
        //     id: 3,
        //     author: 'MathTV',
        //     title: 'Football Math',
        //     canBeDownloaded: false,
        //     minAgeRestriction: 10,
        //     createdAt: '10=4-2024',
        //     publicationDate: '10=4-2024',
        //     availableResolutions: ["P144", "P240", "P360"]
        // }
    ]
}

export const setDB = (dataset: VideoType[]) => {
    if (!dataset) {
        db.videos = []
        return
    }

    db.videos = dataset || db.videos
}
