const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const user = require('./server/Routes/user')
const property = require('./server/Routes/property')
const todo = require('./server/Routes/todo')
const booking = require('./server/Routes/booiking')
const service = require('./server/Routes/service')
const userType = require('./server/Routes/userType')
const analytics = require('./server/Routes/analytics')
const auto = require('./server/automation/commuinicationAuto')()



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

// setInterval(()=> {
//     auto.automationForBookingService()
// } , 10000)

// setInterval(()=> {
//     auto.automationForBookingLeads()
// } , 10000)


app.use('/', user, property, todo, booking, service, userType, analytics )


const port = 3001
app.listen(port, function (req,res) {
    console.log(`running on port ${port}`);
})