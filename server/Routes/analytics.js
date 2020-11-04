const express = require('express')
const router = express.Router()
const DBServices = require('../db/analyticsService')()




router.get('/analytics/bookingchannels/:userId', async (req, res) => {
    const { userId } = req.params
    const bookingInfo = await DBServices.getMostBookingForManger(userId)
    res.send(bookingInfo)
})



module.exports = router