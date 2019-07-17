var app = require('express')()
var server = require('http').createServer(app)
var io = require('socket.io')(server)

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

io.on('connect',(socket)=>{
    console.log(socket.handshake.address)
    socket.on('disconnect',()=>{
        console.log('클라 접속 종료')
    })
    socket.on('msg',(val)=>{
        io.emit('msg',val)
    })
})

server.listen(80, function(){
    console.log('Server is running...')
})

