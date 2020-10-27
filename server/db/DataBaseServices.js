require('dotenv').config()
const Sequelize = require('sequelize')
const moment = require('moment')

const sequelize = new Sequelize(`mysql://admin:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/final_project`)

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
    const getUser = async (email, password) => {
        const query = `SELECT * FROM USER
        WHERE email = '${email}'
        AND user_pass = '${password}';`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const saveUser = async (user) => {
        const query = `INSERT INTO USER VALUES(
            null,
            '${user.firstName}',
            '${user.lastName}',
            '${user.email}',
            '${user.phone}',
            '${moment().format('YYYY-MM-DD')}',
            '${user.password}',
            '${user.type}',
            '${user.token}',
            '${user.avatar}');`
        const id = await sequelize.query(query)
        return id
    }

    const updateUser = async (id, userData) => {
        const query = `UPDATE USER
        SET email = '${userData.email}',
        first_name = '${userData.firstName}',
        last_name = '${userData.lastName}',
        phone = '${userData.phone}',
        user_pass = '${userData.password}',
        user_type = '${userData.type}'
        WHERE user_id = ${id}`
        const responseFromDB = await sequelize.query(query)
        return responseFromDB
    }

    const deleteUser = async (id) => {
        const query = `DELETE FROM USER WHERE user_id = ${id}`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    //properties
    const getProperties = async (id) => {
        const query = `SELECT * FROM PROPERTY
        WHERE id = ${id};`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const saveProperty = async (propertie) => {
        const query = `INSERT INTO properties VALUES(
        ${propertie.ac},
        '${propertie.adress}',
        ${propertie.bathrooms},
        null,
        '${propertie.img}',
        ${propertie.kitchen},
        '${propertie.maneger}',
        ${propertie.maxGusts},
        ${propertie.numRooms},
        '${propertie.owner}',
        ${propertie.pool},
        ${propertie.wifi})`
        const [id] = await sequelize.query(query)
        return id
    }

    const updateProperty = async (key, value, id) => {
        const query = `UPDATE properties
        SET ac = '${userData.email}',
        adress = '${userData.firstName}',
        bathroms = '${userData.lastName}',
        img = '${userData.phone}',
        kitchen = '${userData.password}',
        maneger = '${userData.type}',
        max_gusts = '${userData.type}',
        num_roms = '${userData.type}',
        onwer = '${userData.type}',
        pool = '${userData.type}',
        wifi = '${userData.type}',
        WHERE _id = ${id}`
        const [responseFromDB] = await sequelize.query(query)
        res.send(responseFromDB)
    }

    const deleteProperty = async (id) => {
        const query = `DELETE FROM properties WHERE id = ${id}`
        const [responseFromDB] = await sequelize.query(query)
        res.send(responseFromDB)
    }

    //todos
    const getTodos = async (id) => {
        const query = `SELECT * FROM todos
        WHERE _id = ${id};`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const saveTodo = async (todo) => {
        const query = `INSERT INTO todos VALUES(
        null,
        '${todo.text}',
        '${todo.type}',
        '${moment().format('YYYY-MM-DD')}',
        false');`
        const [id] = await sequelize.query(query)
        return id
    }

    const updateTodo = async (key, value, id) => {
        const query = `UPDATE todos
        SET ${key} = '${value}'
        WHERE _id = ${id}`
        const [responseFromDB] = await sequelize.query(query)
        res.send(responseFromDB)
    }

    const deleteTodo = async (id) => {
        const query = `DELETE FROM todos WHERE _id = ${id}`
        const [responseFromDB] = await sequelize.query(query)
        res.send(responseFromDB)
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
        updateTodo,
        deleteTodo
    }
}

module.exports = DBServices