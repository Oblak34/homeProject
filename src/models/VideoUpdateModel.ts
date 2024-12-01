export type VideoUpdateModel = {
    title: string,
    author: string,
    availableResolutions: string[],
    canBeDownloaded: boolean,
    minAgeRestriction: number,
    publicationDate: string
}