const express = require("express");
let multer = require('multer');
const weatherController = require('../controllers/weatherController')

const router = express.Router()
let upload = multer();



router.get('/locations', weatherController.all_locations)
router.get('/locations/:location', weatherController.searchLocations)
router.post('/weatherdata',upload.fields([]), weatherController.weatherData)
router.post('/livedata',upload.fields([]), weatherController.liveData)
router.post('/', weatherController.createWeather)


module.exports = router
