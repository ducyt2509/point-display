
const express = require('express')
const app = express()
const cors = require('cors')

const port = 4000
var bodyParser = require('body-parser')
bodyParser.json()
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: true,
    credentials: true,
};
app.use(cors(corsOptions))
app.use(express.json())


const combineRoute = require('./routes');
combineRoute.forEach((item) => {
    app.use(item);
});

app.listen(port, () => {
    console.log(`Server is running in port ${port}`)
})

