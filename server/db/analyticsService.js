const sequelize = require('./sqlConnection')


const analyticsDBServices = function () {


    const getMostBookingForManger = async (userId) => {
        const query = `select count(b.id),channel 
        from user as u join property_user as pu
        on u.user_id = pu.user
        join property as p on p.id = pu.property
        join booking as b on b.property = p.id
        where  u.user_id = ${userId}
        group by channel;`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }


    return {
        getMostBookingForManger
    }

}



module.exports = analyticsDBServices