const sequelize = require('./sqlConnection')

const bookingDBServices = function () {

    const getAllBooking = async (propertyId) => { //tested
        let query = `select id,
         start_date as startDate,
         end_date as endDate,
         guests, channel, nights,
         first_name as firstName,
         last_name as lastName,
         img, phone, email, external_property_name
         from booking where property = ${propertyId};`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const saveBooking = async (booking) => { //tested
        const query = `INSERT INTO booking VALUES(
            null,
            "${booking.startDate}",
            "${booking.endDate}",
            ${booking.propertyId},
            ${booking.guests},
            "${booking.channel}",
            ${booking.nights},
            "${booking.firstName}",
            "${booking.lastName}",
            "${booking.img}",
            "${booking.exPropertyName}",
            "${booking.phone}",
            "${booking.email}");`
        const responseFromDB = await sequelize.query(query)
        return responseFromDB
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

    return {
        saveBooking,
        updateBooking,
        getAllBooking,
        removeBooking
    }
}

module.exports = bookingDBServices