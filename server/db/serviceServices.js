const sequelize = require('./sqlConnection')
const moment = require('moment')

const serviceDBServices = function () {

    const getService = async (id) => {
        const query = `SELECT *
        FROM user AS u JOIN property_user AS pu ON u.user_id = pu.user
        JOIN user_type as ut ON ut.type_id = u.user_type
        WHERE pu.property = ${id}
        AND ut.type_id <> 1;`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const saveService = async (data) => {
        const query = `INSERT INTO property_user VALUES(
            ${data.user},
        ${data.property})`
        const id = await sequelize.query(query)
        return id
    }

    const saveAndCreateService = async (user) => {
        const query = `INSERT INTO user VALUES(
            null,
            '${user.firstName}',
            '${user.lastName}',
            '${user.email}',
            '${user.phone}',
            '${moment().format('YYYY-MM-DD')}',
            null,
            '${user.type}',
            'null',
            '${user.img}');`
        const id = await sequelize.query(query)
        const response = await sequelize.query(`INSERT INTO property_user VALUES(${id[0]}, ${user.property})`)
        return response
    }

    const deleteService = async (userId, propertyId) => {
        const [responseFromDB] = await sequelize.query(`DELETE FROM property_user
        WHERE property = ${propertyId}
        AND user = ${userId}`)
        return responseFromDB
    }

    return {
        getService,
        saveService,
        saveAndCreateService,
        deleteService
    }
}

module.exports = serviceDBServices