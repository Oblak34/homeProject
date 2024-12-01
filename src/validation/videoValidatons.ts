export const titleValidation= (
    title: string | undefined,
    errorsMessages: Array<{message: string, field: string}>) => {

    if(!title){
        errorsMessages.push({message: 'title is required', field: 'title'})
    }
    if(title && title.trim().length > 40){
        errorsMessages.push({message: 'more than 40 symbols', field: 'title'})
    }
    if(title && title.trim().length < 1){
        errorsMessages.push({message: 'title is required', field: 'title'})
    }
}

export const authorValidation= (
    author: string | undefined,
    errorsMessages: Array<{message: string, field: string}>) => {

    if(!author){
        errorsMessages.push({message: 'author is required', field: 'author'})
    }
    if(author && author.trim().length > 20){
        errorsMessages.push({message: 'more than 40 symbols', field: 'author'})
    }
    if(author && author.trim().length < 1){
        errorsMessages.push({message: 'author is required', field: 'author'})
    }
}

export const availableResolutionsValidation= (
    availableResolutions: string[] | undefined,
    errorsMessages: Array<{message: string, field: string}>,
    enumTitles: string[]) => {

    if(!Array.isArray(availableResolutions) || !availableResolutions.length){
        errorsMessages.push({message: 'empty data', field: 'availableResolutions'})
    }

    if(availableResolutions){
        for( let item of availableResolutions ){
            if(!enumTitles.includes(item)){
                errorsMessages.push({message: 'non-existent resolutions', field: 'availableResolutions'})
            }
        }
    }
}

export const minAgeRestrictionValidation= (
    minAgeRestriction: number | null,
    errorsMessages: Array<{message: string, field: string}>) => {

    if(!minAgeRestriction){
        errorsMessages.push({message: 'Incorrect input data', field: 'minAgeRestriction'})
        return;
    }

    if ( minAgeRestriction < 0 || minAgeRestriction > 18){
        errorsMessages.push({message: 'exceeds the value of 18', field: 'minAgeRestriction'})
    }
}

export const canBeDownloadedValidator= (
    canBeDownloaded: boolean,
    errorsMessages: Array<{message: string, field: string}>) => {

    if(typeof canBeDownloaded !== 'boolean'){
        errorsMessages.push({message: 'incorrect data type', field: 'canBeDownloaded'})
    }
}

export const publicationDateValidator = (
    publicationDate: string,
    errorsMessages: Array<{message: string, field: string}> ) => {

    if(typeof publicationDate !== 'string'){
        errorsMessages.push({message: 'incorrect data type', field: 'publicationDate'})
    }
}


