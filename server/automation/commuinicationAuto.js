const moment = require('moment')
const DBServices = require('../db/automationServices')()
const bookingDBServices = require('../db/bookingServices')()
const communication = require('../db/communicationService')()
const axios = require('axios')

const auto = function () {
  

const automationForBookingService = async function () {
  let now = moment()
  const bookings = await DBServices.getAllBooking()
  for (let book of bookings) {
    let start = moment(book.start_date)
    let end = moment(book.end_date)
    //automation for concierge
    if (start.diff(now, 'hours') === 24) {
      const response = await DBServices.getPropertyServicer(book.property, 10) //id type of concierge 10 
      response.forEach(r => {
        const text = `Hello ${r.employeeName},
          Please show the apartment: ${r.propertyName}
          located in ${r.address}.
          Client phone: ${book.phone}`
        // console.log(text+r.email);
        // communication.sendMail(r.email, null, text)
      })
    }
    //automation for cleaner
    if (end.diff(now, 'hours') === 24) {
      const response = await DBServices.getPropertyServicer(book.property, 4) //id type of cleaner 4
      response.forEach(r => {
        const text = `Hello ${r.employeeName},
          Please go and clean the apartment: ${r.propertyName}
          located in ${r.address}`
        // console.log(text+r.email);
        // communication.sendMail(r.email, null, text)
      })
    }
  }

}


  const automationForBookingLeads = async function () {

    let newBookingFromAPI = await axios.get('http://97.107.140.152/bookings_last_hour.php')
    let allBooking = []

    for (let booking of newBookingFromAPI.data.Data) {
    
      let bookingNotExist = await DBServices.checkBooking(booking.id) //check if booking exist
      if (bookingNotExist) {
      
        console.log(booking);
        const newBooking = await bookingDBServices.saveBooking(booking)
        console.log(newBooking);
        // allBooking.push(newBooking)
      }
    }
    return "allBooking"
  }


  return {
    automationForBookingService,
    automationForBookingLeads
  }
}
  
module.exports = auto


