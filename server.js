const express = require('express')
const fs = require('fs')
const app = express()
const bodyParser = require('body-parser')
let MongoUser = require('./mongo/userdata.js')

app.all('*', (req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080")
  res.header("Access-Control-Allow-Headers", "content-type")
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
})
app.get('/', (req, res, next)=>{
  fs.readFile(__dirname+'/index.html', 'utf-8', (err, data)=>{
    if(err)
      res.send('File not found')
    res.send(data)
  })
})

app.get('/login', (req, res, next)=>{
  fs.readFile(__dirname+'/login.html', 'utf-8', (err, data)=>{
    if(err)
      res.send('File not found')
    res.send(data)
  })
})

app.use(bodyParser.json())
app.post('/user', (req, res, next) => {
  let userData = req.body
  if (userData.checkType === "register") {
    new MongoUser({
      username: userData['username'],
      email: userData['email'],
      phoneno: userData['phoneno'],
      password: userData['password']
    }).save((err, data) => {
      if (err) {
        res.send('Register failed')
      }
    })
  } else {
    let findOptions = {
      username: userData['username'],
      password: userData['password']
    }
    let mongoUser = MongoUser.find(findOptions, (err, results) => {
      if (results.length === 0) {
        let checkResult = {
          checkPassed: false
        }
        res.send(JSON.stringify(checkResult))
      } else {
        let checkResult = {
          checkPassed: true,
          roomlist: results[0]['roomlist'],
          friendlist: results[0]['friendlist']
        }
        res.send(JSON.stringify(checkResult))
      }
    })
  }
})

app.post('/search', (req, res, next) => {
  MongoUser.findOne({username: req.body.username} ,(err, doc) => {
    friendlist = doc.friendlist
    MongoUser.find((err, results) => {
      console.log(friendlist)
      if (err) {
        console.log('mongo err')
      } else {
        results = results.filter(data => {
          return friendlist.indexOf(data.username) === -1 && data.username !== req.body.username
        })
        console.log(results)
        results = results.map((data) => {
          return {
            id: data['_id'],
            username: data['username'],
            phoneno: data['phoneno']
          }
        })
        res.send(JSON.stringify(results))
      }
    })
  })
})

app.post('/addfriend', (req, res, next) => {
  console.log(req.body)
  let data = req.body
  MongoUser.findOne({username: data.username}, (err, doc) => {
    doc.friendlist.push(data.friendname)
    MongoUser.findOne({username: data.friendname}, (err, doc1) => {
      doc1.friendlist.push(data.username)
      doc.save()
      doc1.save()
      res.send('friend add success')
    })
  })
})
app.use(express.static('./'))
const server = require('http').createServer(app)
server.listen(8088)

const socketServer = require('http').createServer()
const io = require('socket.io')(socketServer, {
  path:'/room',
  pingInterval:10000,
  pingTimeout:5000,
  cookie:false
})
io.on('connection', socket=>{
  socket.join(socket.handshake.query.from)
  console.log(socket.handshake.query)
  socket.join('osar')
  socket.on('message', (data)=>{
    socket.to(data.to).emit('message', data)
  })
})
socketServer.listen(8022)