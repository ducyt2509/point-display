const fs = require('fs');

class PointServices {
    fs
    constructor() {

    }
    #readData() {
        return new Promise((resolve, reject) => {
            fs.readFile('./database/database.json', 'utf8', (err, data) => {
                if (err) reject(err);
                resolve(JSON.parse(data));
            });
        })
    }


    #writeData(data) {
        return new Promise((resolve, reject) => {

            fs.writeFile('./database/database.json', data, 'utf8', (err) => {
                if (err) reject(err);
                resolve();
            });
        })
    }

    async getAllPoint() {
        return this.#readData()
    }

    async addAPoint(newPoint) {
        const listPoints = await this.#readData()
        const checkList = listPoints.points.filter(point => point.x == newPoint.x && point.y == newPoint.y);
        if (checkList.length) throw new Error("The point is already exist ")

        listPoints.points.push(newPoint)
        const data = JSON.stringify(listPoints);
        if (typeof data !== 'string') {
            throw new Error('Invalid data format. The "data" argument must be a string.');
        }
        await this.#writeData(data);
        console.log("bean")

    }


}
const pointServices = new PointServices()
module.exports = pointServices