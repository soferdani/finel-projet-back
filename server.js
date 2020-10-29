const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const user = require('./server/Routes/user')
const property = require('./server/Routes/property')
const todo = require('./server/Routes/todo')
const booking = require('./server/Routes/booiking')
const service = require('./server/Routes/service')
const path = require("path")

// const test = require ('../client-side')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../client-side/build')));

app.use('/', user, property, todo, booking, service)

const port = 3000
app.listen(port, function (req,res) {
    console.log(`running on port ${port}`);
})