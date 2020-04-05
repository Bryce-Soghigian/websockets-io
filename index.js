const server = require("express")()
const http = require('http').createServer(server)
var io = require('socket.io')(http);
const cors = require('cors')
server.use(cors())
//==========INIT====================
io.on('connection', socket => {
    console.log('a user connected');
    
    socket.on('disconnect', reason => {
      console.log('user disconnected');
    });
  
    socket.on('room', data => {
      console.log('room join');
      console.log(data);
      socket.join(data.room);
    });
  
    socket.on('leave room', data => {
      console.log('leaving room');
      console.log(data);
      socket.leave(data.room)
    });
  
    socket.on('new message', data => {
      console.log(data.room);
      socket.broadcast
      .to(data.room)
      .emit('receive message', data)
    });
  });
const PORT = process.env.PORT || 5555;

server.listen(PORT , () =>{
    console.log(`=========Server is running on ${PORT}... ===========`)
})

//============Endpoints===========
// server.get("/", cors(), (req,res) => {

      
// })

