const { sign } = require('jsonwebtoken');
const { auth } = require('./fakeAuth');

var express = require('express'),
  app = express(), http = require('http'),
  server = http.createServer(app),
  { Server } = require('socket.io'),
  io = new Server(server),
  port = 3000 || process.env.PORT,
  tweets = require("./getTweets")
  
require("dotenv").config()
io.listen(server);
server.listen(port, function () {
  console.log(`Running on port ${port}`)
})
app.use(express.json());//enable JSON middleware for requests
app.get("/public/bg.jpg", (req, res) => { res.sendFile(__dirname + "/public/bg.jpg") })
app.post('/login', function (req, res) {
  
  let { username, password } = req.body
  
  if (!username || !password) {
    res.status(400).send({
      status: false,
      message: "Username and password are required"
    })
    return
  }
  
  if (username !== "username" || password !== "password") {
    res.status(400).send({
      status: false,
      message: "Wrong username or password"
    })
    return
  }

  res.cookie("auth", sign(true, process.env.SIGNATURE))
  res.status(200).send({
    status: true,
    message: "Welcome"
  })

})
app.use((req, url, next) => { auth(req, url, next) })

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

io.sockets.on('connection', async function (socket) {

  let topics = await tweets()
    
  io.sockets.emit('tweets', topics)

  setInterval(async () => {

    let topics = await tweets()
    
    io.sockets.emit('tweets', topics)

  }, 30000)


})