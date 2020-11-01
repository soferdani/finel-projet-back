const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const user = require('./server/Routes/user')
const property = require('./server/Routes/property')
const todo = require('./server/Routes/todo')
const booking = require('./server/Routes/booiking')
const service = require('./server/Routes/service')
const communication = require('./server/db/communicationService')()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

app.use('/', user, property, todo, booking, service)

communication.sendSMS('+972523896679', '+972524201605', 'Test the twilio package')

const port = 3001
app.listen(port, function (req,res) {
    console.log(`running on port ${port}`);
})