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
const socketIO = require('socket.io');

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
const server = app.listen(port, function (req,res) {
    console.log(`running on port ${port}`);
})

const io = socketIO(server)
const connections = [null, null];

io.on('connection', (socket) => {

  let playerIndex = -1;
  for (var i in connections) {
    if (connections[i] === null) {
      playerIndex = i;
    }
  }
  if (playerIndex == -1) return;
  connections[playerIndex] = socket;
  socket.emit('player-number', playerIndex);

  socket.on('send', (msg) => {
    socket.broadcast.emit('send', msg);
  })

  socket.on('move', (playerNum, direction) => {
    socket.broadcast.emit('move', playerNum, direction);
  });

  socket.on('disconnect', function() {
    console.log(`Player ${playerIndex} Disconnected`);
    connections[playerIndex] = null;
  });
})