const sequelize = require('./sqlConnection')

const bookingDBServices = function () {

    const saveBooking = async (booking) => { //tested
        const query = `INSERT INTO booking VALUES(
            null,
            "${booking.startData}",
            "${booking.endData}",
            ${booking.propertyId},
            ${booking.gusts},
            "${booking.channel}",
            ${booking.nights},
            "${booking.cFirstName}",
            "${booking.cLastName}",
            "${booking.cPhoto}",
            "${booking.exPropertyName}");`
        const responseFromDB = await sequelize.query(query)
        return responseFromDB
    }

    const updateBooking = async (booking, id) => { // tested !!
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


    const getAllBooking = async (propertyId) => { //tested
        let query = `select id,
         start_date as startDate,
         end_data as endDate,
         gusts, channel, nights,
         g_first_name as firstName,
         g_last_name as lastName,
         g_photo as img
         from booking where property = ${propertyId};`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const removeBooking = async (bookingId) => {
        let query = `delete from booking where id = ${bookingId};`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    return {
        saveBooking,
        updateBooking,
        getAllBooking,
        removeBooking
    }
}

module.exports = bookingDBServices