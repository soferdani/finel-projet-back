const sequelize = require('./sqlConnection')


const automationDBServices = function () { 


    

    const checkBooking = async (bookingId) => { //tested
        bookingExist = await sequelize
            .query(`SELECT * FROM booking WHERE external_id = '${bookingId}'`)
        return bookingExist[0].length === 0
    }
    
    const getAllManagersFromDB = async () => {
        const query = `select user_id from user where user_type = 1 `
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const getAllBooking = async () => {
        const query = `select * from booking;`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const getPropertyServicer = async (propertyId, typeId) => {
        const query = `
        select email, first_name as employeeName, p.name as propertyName, p.address as address
                from user as u join property_user as pu 
                on u.user_id = pu.user
                join property as p on p.id = pu.property
                where pu.property = ${propertyId}
                and u.user_type = ${typeId};`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }


    return {
        getAllManagersFromDB,
        getAllBooking,
        getPropertyServicer,
        checkBooking
    }
}



module.exports = automationDBServices