const fs = require('fs');

const readData = () => new Promise((resolve, reject) => {
    fs.readFile('database.json', 'utf8', (err, data) => {
        if (err) reject(err);
        resolve(JSON.parse(data));
    });
});




const writeData = (data) => new Promise((resolve, reject) => {

    fs.writeFile('database.json', data, 'utf8', (err) => {
        if (err) reject(err);
        resolve();
    });
});

