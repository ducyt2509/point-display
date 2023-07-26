const responseWithData = (res, statusCode, data) =>
    res.status(statusCode).send({
        statusCode,
        data
    })
const error = (res) => responseWithData(res, 500, {
    message: 'Oops! Something wrong in Server!'
})

const ok = (res, message) => responseWithData(res, 202, {
    message
})
const badRequest = (res, message) => responseWithData(res, 400, {
    message
})


module.exports = { responseWithData, error, ok, badRequest }
