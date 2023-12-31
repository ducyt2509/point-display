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
            if (!parseFloat(x) || x < 0 || x > 100) return badRequest(res, 'X must be numeric and range from 0 to 100')
            if (!parseFloat(y) || y < 0 || y > 100) return badRequest(res, 'Y must be numeric and range from 0 to 100')
            if (!color) return badRequest(res, 'Color must be string and not null')
            await pointServices.addAPoint({
                x, y, color
            })
            ok(res, "Add new point successful")
        } catch (error) {
            badRequest(res, error?.message || error)
        }
    },

}