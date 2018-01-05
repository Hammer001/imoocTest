const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')

const app = express();

//work with express;通过express改造+引用socketio
const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection', function(socket) {
    //console.log('user login')
    socket.on('sendmsg', function(data) {
        const { from, to, msg } = data
        const chartid = [from, to].sort().join('_')
        Chat.create({ chartid, from, to, content: msg }, function(err, doc) {
                io.emit('recvmsg', Object.assign({}, doc._doc))
            })
            // console.log(data)
            // io.emit('recvmsg',data)
    })
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

server.listen(9090, function() {
    console.log('this server is started.')
})