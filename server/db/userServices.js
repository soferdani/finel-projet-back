const sequelize = require('./sqlConnection')
const moment = require('moment')

const userDBServices = function () {

    const getUser = async (email) => {
        const query = `SELECT user_id as id,
        first_name as firstName,
        last_name as lastName,
        email, phone,
        datejoin as dateJoin, user_type as type , img
        FROM user
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
            '${user.img}');`
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

    return {
        getUser,
        saveUser,
        updateUser,
        deleteUser
    }
}

module.exports = userDBServices