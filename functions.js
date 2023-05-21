export const success = (result) => {
    return {
        status: 'success',
        result: result
    }
}

export const error = (message) => {
    return {
        status: 'error',
        message: message
    }
}