const sequelize = require('./sqlConnection')
const moment = require('moment')

const userDBServices = function () {

    const getUser = async (email) => {
        const query = `SELECT user_id as id,
        first_name as firstName,
        last_name as lastName,
        email, phone,
        datejoin as dateJoin, type , img
        FROM user JOIN user_type ON user_type.type_id = user.user_type
        WHERE email = '${email}';`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB[0]
    }

    const saveUser = async (user) => {
        const query = `INSERT INTO user VALUES(
            null,
            '${user.firstName}',
            '${user.lastName}',
            '${user.email}',
            '${user.phone}',
            '${moment().format('YYYY-MM-DD')}',
            '${user.type}',
            'https://storage.jewheart.com/content/users/avatars/2928/avatar_2928_500.jpg?1480517568');`
        const id = await sequelize.query(query)
        return id
    }


    const updateUser = async (id, userData) => {
        let query = `UPDATE user SET `
        for (let i in Object.keys(userData)) {
            const key = Object.keys(userData)[i]
            const endChar = i == Object.keys(userData).length - 1 ? '' : ','
            if (typeof userData[key] === "string") {
                query += `${key} = '${userData[key]}'${endChar} `
            } else {
                query += `${key} = ${userData[key]}${endChar} `
            }
        }
        query += `WHERE user_id = ${id}`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const deleteUser = async (id) => {
        const query = `DELETE FROM user WHERE user_id = ${id}`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }


    const addNewEmployee = async(managerId, employeeId) => {
        const query = `insert into manger_employee values (
            ${managerId},
            ${employeeId});`
        const responseFromDB = await sequelize.query(query)
        return responseFromDB
    }


    const getAllEmployee = async(managerId) => {
        const query = `select user_id as id, first_name as firstName, last_name as lastName, email, phone, datejoin, type, img
        from user as u join manger_employee as me 
        on u.user_id = me.employee_id
        join user_type as ut
        on u.user_type = ut.type_id 
        where me.manager_id = ${managerId};`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }


    const deleteEmployee = async(managerId,employeeId) => {
        const query = `DELETE from manger_employee where manager_id = ${managerId} and employee_id = ${employeeId};`
        const responseFromDB = await sequelize.query(query)
        return responseFromDB
    }


    return {
        getUser,
        saveUser,
        updateUser,
        deleteUser,
        deleteEmployee,
        addNewEmployee,
        getAllEmployee
    }
}

module.exports = userDBServices