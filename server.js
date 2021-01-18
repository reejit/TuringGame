const io = require('socket.io')(3000, {
    cors:{
        origin:"*",
    },
});

const users = {}

// To run server type
// npm run devStart

io.on('connection', socket => {
    console.log('new user')
    socket.on('new-user', name =>{
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)

    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {message: message, name : users[socket.id]})
        console.log(message)
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id] 
    })
})