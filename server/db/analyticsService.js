const sequelize = require('./sqlConnection')


const analyticsDBServices = function () {


    const getMostBookingForManger = async (userId) => {
        const query = `select channel, count(b.id) as numberOfBooking
        from user as u join property_user as pu
        on u.user_id = pu.user
        join property as p on p.id = pu.property
        join booking as b on b.property = p.id
        where  u.user_id = ${userId}
        group by channel;`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const getTotalTasksStatusForUser = async (userId) => {
        const query = `select complete
        from user as u join property_user as pu on pu.user = u.user_id
        join property as p on pu.property = p.id
        join todo as t on t.property = p.id
        where user_id = ${userId};`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }


    return {
        getMostBookingForManger,
        getTotalTasksStatusForUser
    }

}



module.exports = analyticsDBServices