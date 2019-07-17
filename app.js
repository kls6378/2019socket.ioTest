var app = require('express')()
var server = require('http').createServer(app)
var io = require('socket.io')(server)

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

io.on('connect',(socket)=>{
    console.log(socket.handshake.address+" 클라이언트 접속")
    socket.on('disconnect',()=>{
        console.log(socket.handshake.address+' 클라이언트 접속 종료')
    })
    socket.on('msg',(val)=>{
        socket.broadcast.emit('msg',val)
        socket.emit('msgM',val)
    })
})

server.listen(3000, function(){
    console.log('Server is running...')
})

