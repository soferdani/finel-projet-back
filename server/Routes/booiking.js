const express = require('express')
const router = express.Router()
const DBServices = require('../db/bookingServices')()
const axios = require('axios')
const cron = require('node-cron')
const moment = require('moment')

router.get('/booking/:propertyId', async (req, res) => {
    const { propertyId } = req.params
    const allRelevantBooking = await DBServices.getAllBooking(propertyId)
    res.send(allRelevantBooking)
    res.send(propertyId)
})

router.post('/booking', async (req, res) => {
    const bookingInfo = req.body
    const nBooking = await DBServices.saveBooking(bookingInfo)
    await DBServices.addBookingServices(bookingInfo)
    res.send(nBooking)
})

router.put('/booking/:id', async (req, res) => {
    const { id } = req.params
    const bookingInfo = req.body
    const uBooking = await DBServices.updateBooking(bookingInfo, id)
    res.send(uBooking)
})


router.delete('/booking/:bookingId', async (req, res) => {
    const { bookingId } = req.params
    const deleted = await DBServices.removeBooking(bookingId)
    res.send(deleted)
})

// cron.schedule('2 * * * *', async () => {
//     let newBookingFromAPI = axios.get('http://97.107.140.152/bookings_last_hour.php') //FIXME: TO MAKE SURE
//     let allBooking = []
//     for (let booking of newBookingFromAPI.data.data) {
//         let bookingExist = await DBServices.checkBooking(booking.id) 
//         if (bookingExist) {  
//             const newBooking = await DBServices.saveBooking(booking)
            
//             allBooking.push(newBooking)
//         }
//     }
//     return allBooking
// })



module.exports = router