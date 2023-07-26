const { allPoint, addPoint, checkPoint } = require('../controller/point.controller');

var router = require('express').Router();


router.get('/points', allPoint)
router.post('/points', addPoint)

module.exports = router;
