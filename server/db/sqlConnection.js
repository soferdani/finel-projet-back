require('dotenv').config()
const Sequelize = require('sequelize')

const sequelize = new Sequelize(`mysql://admin:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/manageme`)

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })

module.exports = sequelize