require('dotenv').config()
const Sequelize = require('sequelize')
const moment = require('moment')

const sequelize = new Sequelize(`mysql://admin:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/manageme`)

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })

const DBServices = function () {

    //user
    const getUser = async (email) => {
        const query = `SELECT user_id, first_name, last_name, email, phone, datejoin, user_type, token, img
        FROM user
        WHERE email = '${email}';`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const saveUser = async (user) => {
        const query = `INSERT INTO user VALUES(
            null,
            '${user.firstName}',
            '${user.lastName}',
            '${user.email}',
            '${user.phone}',
            '${moment().format('YYYY-MM-DD')}',
            '${user.password}',
            '${user.type}',
            '${user.token}',
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

    //properties
    const getProperties = async (id) => {
        const query = `SELECT id, img, adress, num_roms, bathroms, max_gusts, pool, ac, wifi,kitchen, owner, name, phone, country, email
        FROM property AS p JOIN property_user AS po ON p.id = po.property
        JOIN owner AS o ON o.o_id = p.owner
        WHERE po.user = ${id}`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const saveProperty = async (propertie) => {
        const query = `INSERT INTO property VALUES(
        null,
        '${propertie.img}',
        '${propertie.adress}',
        ${propertie.numRooms},
        ${propertie.bathrooms},
        ${propertie.maxGusts},
        ${propertie.pool},
        ${propertie.ac},
        ${propertie.wifi},
        ${propertie.kitchen},
        ${propertie.owner})`
        const id = await sequelize.query(query)
        const joinQuery = `INSERT INTO property_user VALUES(
            ${propertie.manager},
            ${id[0]})`
        await sequelize.query(joinQuery)
        return id
    }

    const updateProperty = async (propertyData, id) => {
        let query = `UPDATE property SET `
        for (let i in Object.keys(propertyData)) {
            const key = Object.keys(propertyData)[i]
            const endChar = i == Object.keys(propertyData).length - 1 ? '' : ','
            if (typeof propertyData[key] === "string") {
                query += `${key} = '${propertyData[key]}'${endChar} `
            } else {
                query += `${key} = ${propertyData[key]}${endChar} `
            }
        }
        query += `WHERE id = ${id}`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const deleteProperty = async (id) => {
        await sequelize.query(`DELETE FROM todo WHERE property = ${id}`)
        await sequelize.query(`DELETE FROM property_user WHERE property = ${id}`)
        const query = `DELETE FROM property WHERE id = ${id}`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    //todos
    const getTodos = async (id) => {
        const query = `SELECT t.t_id, task, is_complete, create_date, type_name, img
        FROM todo AS t JOIN user_type AS ut
        on t.service_type = ut.type_id
        WHERE t.property = ${id};`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const saveTodo = async (todo) => {
        const query = `INSERT INTO todo VALUES(
        null,
        '${todo.task}',
        ${todo.property},
        ${todo.type},
        '${moment().format('YYYY-MM-DD')}',
        false,
        '${todo.img}');`
        const id = await sequelize.query(query)
        return id
    }

    const checkTodo = async (id) => {
        const query = `UPDATE todo
        SET  is_complete = 1
        WHERE t_id = ${id}`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const updateTodo = async (id, todo) => {
        let query = `UPDATE todo SET `
        for (let i in Object.keys(todo)) {
            const key = Object.keys(todo)[i]
            const endChar = i == Object.keys(todo).length - 1 ? '' : ','
            if (typeof todo[key] === "string") {
                query += `${key} = '${todo[key]}'${endChar} `
            } else {
                query += `${key} = ${todo[key]}${endChar} `
            }
        }
        query += `WHERE t_id = ${id}`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const deleteTodo = async (id) => {
        const query = `DELETE FROM todo WHERE t_id = ${id}`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }


    //booking

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
        let query = `select * from booking where property = ${propertyId};`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const removeBooking = async (bookingId) => { 
        let query = `delete from booking where id = ${bookingId};`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }



    return {
        getUser,
        saveUser,
        updateUser,
        deleteUser,
        getProperties,
        saveProperty,
        updateProperty,
        deleteProperty,
        getTodos,
        saveTodo,
        checkTodo,
        updateTodo,
        deleteTodo,
        saveBooking,
        updateBooking,
        getAllBooking,
        removeBooking
    }
}

module.exports = DBServices