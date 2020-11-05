const sequelize = require('./sqlConnection')
// const moment = require('moment')

const employeeDBServices = function () {

    const getEmployeesByProperty = async (propertyId, userId) => {
        const lastLine = userId === '1' ? 'ut.type_id <> 1' : 'ut.type_id = 1'
        const query = `SELECT user_id as id, first_name as firstName,
        last_name as lastName, email,
        phone, datejoin AS dateJoin,
        user_type as typeId, type, img
        FROM user AS u JOIN property_user AS pu ON u.user_id = pu.user
        JOIN user_type as ut ON ut.type_id = u.user_type
        WHERE pu.property = ${propertyId}
        AND ${lastLine};`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const getEmployeesByManager = async(managerId, typeId) => {
        let query
        if(typeId === '1'){
            query = `select user_id as id, first_name as firstName, last_name as lastName,
            email, phone, datejoin as dateJoin, type, ut.type_id as typeId, img
            from user as u join manger_employee as me
            on u.user_id = me.employee_id
            join user_type as ut
            on u.user_type = ut.type_id
            where me.manager_id = ${managerId};`
        } else {
            query = `select user_id as id, first_name as firstName, last_name as lastName,
            email, phone, datejoin as dateJoin, type, ut.type_id as typeId, img
            from user as u join manger_employee as me
            on u.user_id = me.manager_id
            join user_type as ut
            on u.user_type = ut.type_id
            where me.employee_id = ${managerId};`
        }

        const [responseFromDB] = await sequelize.query(query)
        for(let e of responseFromDB){
            let messages = await sequelize.query(`SELECT m.*
                FROM  message as m
                        where( m.sender = ${managerId} or m.getter = ${managerId})
                        AND (m.sender = ${e.id} or m.getter = ${e.id})`)
            e.messages = messages[0]
        }
        return responseFromDB
    }

    const getEmployeeAndProperty = async (propertyId, typeId, employeeId) => {
        let query
        if (employeeId) {
            query = `SELECT
                u.first_name as employeeName,
                u.email as email,
                u.phone as phone,
                p.name as propertyName,
                p.address as address
                FROM property AS p, user as u
                WHERE p.id = ${propertyId}
                AND u.user_id =  ${employeeId}`
        } else {
            query = `SELECT
                            u.first_name as employeeName,
                            u.email as email,
                            u.phone as phone,
                            p.name as propertyName,
                            p.address as address
                            FROM property_user AS pu JOIN property AS p ON pu.property = p.id
                            JOIN user as u ON u.user_id = pu.user
                            WHERE p.id = ${propertyId}
                            AND u.user_type =  ${typeId}`
        }
        const [reponse] = await sequelize.query(query)
        return reponse
    }

    const saveEmployeeToProperty = async (data) => {
        const query = `INSERT INTO property_user VALUES(
            ${data.user},
        ${data.property})`

        const id = await sequelize.query(query)
        return id
    }

    const addNewEmployee = async(managerId, employeeId) => {
        console.log(managerId);
        console.log(employeeId);
        const query = `insert into manger_employee values (
            ${managerId},
            ${employeeId});`
        const responseFromDB = await sequelize.query(query)
        return responseFromDB
    }

    const removeEmployeeFromProperty = async (userId, propertyId) => {
        const [responseFromDB] = await sequelize.query(`DELETE FROM property_user
        WHERE user = ${userId}
        AND property = ${propertyId}`)
        return responseFromDB
    }


    const deleteEmployee = async(managerId,employeeId) => {
        const query = `DELETE from manger_employee where manager_id = ${managerId} and employee_id = ${employeeId};`
        const responseFromDB = await sequelize.query(query)
        return responseFromDB
    }

    // const saveAndCreateEmployee = async (user) => {
    //     const query = `INSERT INTO user VALUES(
    //         null,
    //         '${user.firstName}',
    //         '${user.lastName}',
    //         '${user.email}',
    //         '${user.phone}',
    //         '${moment().format('YYYY-MM-DD')}',
    //         null,
    //         '${user.type}',
    //         'null',
    //         '${user.img}');`
    //         const id = await sequelize.query(query)
    //         const response = await sequelize.query(`INSERT INTO property_user VALUES(${id[0]}, ${user.property})`)
    //         return response
    //     }

    // const addBookingServices = async (booking) => {
    //     const query = `INSERT INTO booking values(
    //         null,
    //         ${booking.start_date},
    //         ${booking.start_date + 500},
    //         ${booking.property},
    //         'showing');
    //         INSERT INTO booking values(
    //         null,
    //         ${booking.end_date + 1000},
    //         ${booking.start_date + 2000},
    //         ${booking.property},
    //         'cleaning');`
    //     await sequelize.query(query)
    //     const selectQuery = `SELECT email, phone
    //         FROM property_user as pu JOIN user AS u ON pu.user = u.user_id
    //         WHERE pu.property = ${booking.property}
    //         AND u.user_type = 4);`
    //     const [reponse] = await sequelize.query(selectQuery)
    //     return reponse
    // }

    return {
        getEmployeesByProperty,
        getEmployeesByManager,
        saveEmployeeToProperty,
        addNewEmployee,
        getEmployeeAndProperty,
        deleteEmployee,
        removeEmployeeFromProperty
    }
}

module.exports = employeeDBServices