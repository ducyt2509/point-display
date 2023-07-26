const { responseWithData, ok, badRequest } = require("../common/handlers.response")
const pointServices = require("../service/point.service")

module.exports = {
    async allPoint(req, res) {
        const data = await pointServices.getAllPoint()
        responseWithData(res, 200, data.points)
    },
    async addPoint(req, res) {
        try {
            const { x, y, color } = req.body
            console.log(x, y, color)
            await pointServices.addAPoint({
                x, y, color
            })
            ok(res, "Add new point successful")
        } catch (error) {
            badRequest(res, error?.message || error)
        }
    },
    checkPoint(req, res) {
    }
}