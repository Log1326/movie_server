export const getSomeCatch = (res,codeStatus,error) => {
    res.status(codeStatus)
    throw new Error(error)
}