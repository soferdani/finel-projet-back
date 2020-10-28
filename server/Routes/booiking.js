const express = require('express')
const router = express.Router()
const DBServices = require('../db/bookingServices')()

router.post('/booking', async (req, res) => {
    const bookingInfo = req.body
    const nBooking = await DBServices.saveBooking(bookingInfo)
    res.send(nBooking)
})

router.put('/booking/:id', async (req, res) => {
    const { id } = req.params
    const bookingInfo = req.body
    const uBooking = await DBServices.updateBooking(bookingInfo, id)
    res.send(uBooking)
})

module.exports = router