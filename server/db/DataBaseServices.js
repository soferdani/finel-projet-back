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
        const query = `SELECT *
        FROM PROPERTY, OWNERS
       WHERE PROPERTY.ONWER = OWNERS.id
       AND PROPERTY.maneger = ${id};`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const saveProperty = async (propertie) => {
        const query = `INSERT INTO PROPERTY VALUES(
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
        ${propertie.owner},
        ${propertie.manager})`
        const id = await sequelize.query(query)
        return id
    }

    const updateProperty = async (propertyData, id) => {
        const query = `UPDATE PROPERTY
        SET ac = ${propertyData.ac},
        adress = '${propertyData.adress}',
        bathroms = ${propertyData.bathrooms},
        img = '${propertyData.img}',
        kitchen = ${propertyData.kitchen},
        maneger = ${propertyData.manager},
        max_gusts = ${propertyData.maxGusts},
        num_roms = ${propertyData.numRooms},
        onwer = ${propertyData.owner},
        pool = ${propertyData.pool},
        wifi = ${propertyData.wifi}
        WHERE id = ${id}`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const deleteProperty = async (id) => {
        const query = `DELETE FROM PROPERTY WHERE id = ${id}`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    //todos
    const getTodos = async (id) => {
        const query = `SELECT *
        FROM TODO, SERVICE_TYPE
        WHERE TODO.service_provider_type = SERVICE_TYPE.id
        AND TODO.property = ${id};`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const saveTodo = async (todo) => {
        const query = `INSERT INTO TODO VALUES(
        null,
        '${todo.task}',
        ${todo.property},
        ${todo.type},
        false);`
        //'${moment().format('YYYY-MM-DD')}',
        const id = await sequelize.query(query)
        return id
    }

    const updateTodo = async (id) => {
        const query = `UPDATE TODO
        SET  is_complite = 1
        WHERE id = ${id}`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const deleteTodo = async (id) => {
        const query = `DELETE FROM todos WHERE id = ${id}`
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
        updateTodo,
        deleteTodo
    }
}

module.exports = DBServices