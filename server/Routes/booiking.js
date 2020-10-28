const express = require('express')
const router = express.Router()
const DBServices = require('../db/bookingServices')()

router.post('/booking', async (req, res) => {
    const bookingInfo = req.body
    const nBooking = await DBServices.saveBooking(bookingInfo)
    res.send(nBooking)
})

router.put('/booking-update/:id', async (req, res) => {
    const { id } = req.params
    const bookingInfo = req.body
    const uBooking = await DBServices.updateBooking(bookingInfo, id)
    res.send(uBooking)
})

router.get('/booking-all/:propertyId', async (req, res) => {
    const { propertyId } = req.params
    const allRelevantBooking = await DBServices.getAllBooking(propertyId)
    res.send(allRelevantBooking)
    res.send(propertyId)
})

router.delete('/booking-delete/:bookingId', async (req, res) => {
    const { bookingId } = req.params
    const deleted = await DBServices.removeBooking(bookingId)
    res.send(deleted)
}) 

module.exports = router