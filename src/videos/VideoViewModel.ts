export type VideoViewModel = {
    /**
     *  This view model for responses
     */
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number,
    createdAt: string,
    publicationDate: string,
    availableResolutions: string[]
}