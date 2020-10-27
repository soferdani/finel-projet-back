const express = require('express')
const router = express.Router()
require('dotenv').config()

const Sequelize = require('sequelize')
const sequelize = new Sequelize(`mysql://admin:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`)

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })

router.get('/user/:id', async (req, res) => {
    const { id } = req.params
    res.send(id)
    // const query = `SELECT * FROM users
    // WHERE _id = ${id};`
    // const [responseFromDB] = await sequelize.query(query)
    // res.send(responseFromDB)
})

router.post('/user', async (req, res) => {
    const user = req.body
    res.send(user)
    // const query = `INSERT INTO users VALUES(
    //     null,
    //     '${user.firstName + ' ' + user.lastName}',
    //     '${user.email}',
    //     '${moment().format('YYYY-MM-DD')}',
    //     null,
    //     false,
    //     '${user.country}')`
    // const [id] = await sequelize.query(query)
    // res.send(id)
})

router.put('/user', async (req, res) => {
    const {key, value, id} = req.body
    res.send(key + " " + value + " " + id)
    // const query = `UPDATE users
    // SET ${key} = '${value}'
    // WHERE _id = ${id}`
    // const [responseFromDB] = await sequelize.query(query)
    // res.send(responseFromDB)
})

router.delete('/user/:id', async (req, res) => {
    const {id} = req.params
    res.send(id)
    // const query = `DELETE FROM user WHERE _id = ${id}'
    // WHERE _id = ${id}`
    // const [responseFromDB] = await sequelize.query(query)
    // res.send(responseFromDB)
})

router.get('/properties/:id', async (req, res) => {
    const { id } = req.params
    res.send(id)
    // const query = `SELECT * FROM users
    // WHERE _id = ${id};`
    // const [responseFromDB] = await sequelize.query(query)
    // res.send(responseFromDB)
})

router.post('/property', async (req, res) => {
    const user = req.body
    res.send(user)
    // const query = `INSERT INTO users VALUES(
    //     null,
    //     '${user.firstName + ' ' + user.lastName}',
    //     '${user.email}',
    //     '${moment().format('YYYY-MM-DD')}',
    //     null,
    //     false,
    //     '${user.country}')`
    // const [id] = await sequelize.query(query)
    // res.send(id)
})

router.put('/property', async (req, res) => {
    const {key, value, id} = req.body
    res.send(key + " " + value + " " + id)
    // const query = `UPDATE users
    // SET ${key} = '${value}'
    // WHERE _id = ${id}`
    // const [responseFromDB] = await sequelize.query(query)
    // res.send(responseFromDB)
})

router.delete('/property/:id', async (req, res) => {
    const {id} = req.params
    res.send(id)
    // const query = `DELETE FROM user WHERE _id = ${id}'
    // WHERE _id = ${id}`
    // const [responseFromDB] = await sequelize.query(query)
    // res.send(responseFromDB)
})

router.get('/todos/:id', async (req, res) => {
    const { id } = req.params
    res.send(id)
    // const query = `SELECT * FROM users
    // WHERE _id = ${id};`
    // const [responseFromDB] = await sequelize.query(query)
    // res.send(responseFromDB)
})

router.post('/todo', async (req, res) => {
    const user = req.body
    res.send(user)
    // const query = `INSERT INTO users VALUES(
    //     null,
    //     '${user.firstName + ' ' + user.lastName}',
    //     '${user.email}',
    //     '${moment().format('YYYY-MM-DD')}',
    //     null,
    //     false,
    //     '${user.country}')`
    // const [id] = await sequelize.query(query)
    // res.send(id)
})

router.put('/todo', async (req, res) => {
    const {key, value, id} = req.body
    res.send(key + " " + value + " " + id)
    // const query = `UPDATE users
    // SET ${key} = '${value}'
    // WHERE _id = ${id}`
    // const [responseFromDB] = await sequelize.query(query)
    // res.send(responseFromDB)
})

router.delete('/todo/:id', async (req, res) => {
    const {id} = req.params
    res.send(id)
    // const query = `DELETE FROM user WHERE _id = ${id}'
    // WHERE _id = ${id}`
    // const [responseFromDB] = await sequelize.query(query)
    // res.send(responseFromDB)
})


module.exports = router