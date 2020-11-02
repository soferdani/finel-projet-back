const sequelize = require('./sqlConnection')
const axios = require('axios')
const cron = require('node-cron')
const moment = require('moment')

const bookingDBServices = function () {


    const getAllBooking = async (propertyId) => { //tested
        let query = `select id,
         start_date as startDate,
         end_date as endDate,
         guests, channel,
         name,
         phone, email
         from booking where property = ${propertyId};`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const saveBooking = async (booking) => { //tested
        let query = `insert into booking values (
            "${booking.id}",
            ${moment(booking.fromdate_c).format()}, 
            ${moment(booking.todate_c).format()},
            (select id from property where name = '${booking.villa_name}'),
            ${parseInt(booking.adults_c) + parseInt(booking.children_c)},
            "${booking.lead_source}",
            "${booking.phone_mobile}",
            "${booking.email}",
            "${booking.name}"                
        );`
        const newBooking = await sequelize.query(query)
        return newBooking
    }

    const updateBooking = async (booking, id) => {
        let query = `UPDATE booking SET `
        for (let i in Object.keys(booking)) {
            const key = Object.keys(booking)[i]
            const endChar = i == Object.keys(booking).length - 1 ? '' : ','
            if (typeof booking[key] === "string") {
                query += `${key} = '${booking[key]}'${endChar} `
            } else {
                query += `${key} = ${booking[key]}${endChar} `
            }
        }
        query += `WHERE id = ${id}`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }



    const removeBooking = async (bookingId) => {
        let query = `delete from booking where id = ${bookingId};`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    

    // cron.schedule('2 * * * *', async () => {
    //     let newBookingFromAPI = axios.get('http://97.107.140.152/bookings_last_hour.php') //FIXME: TO MAKE SURE
    //     let allBooking = []
    //     for (let booking of newBookingFromAPI.data.data) {
    //         let bookingExist = await sequelize
    //             .query(`SELECT * FROM booking WHERE id = '${booking.id}'`)
    //         if (bookingExist[0].length === 0) {
    //             let query = `insert into booking values (
    //                 "${booking.id}",
    //                 ${moment(booking.fromdate_c).format()},
    //                 ${moment(booking.todate_c).format()},
    //                 (select id from property where name = '${booking.CHINGEMEEE}'),
    //                 ${parseInt(booking.adults_c) + parseInt(booking.children_c)},
    //                 "${booking.lead_source}",
    //                 "${booking.phone_mobile}",
    //                 "${booking.email}",
    //                 "${booking.name}"
    //             );`
    //             const newBooking = await sequelize.query(query)
    //             allBooking.push(newBooking)
    //         }
    //     }
    //     return allBooking
    // })

    return {
        saveBooking,
        updateBooking,
        getAllBooking,
        removeBooking
    }
}

module.exports = bookingDBServices