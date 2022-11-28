import { Server } from 'socket.io';

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    res.end();
  } else {
    const io = new Server(res.socket.server, { cors: { origin: 'http://localhost:8000/' } });
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log(`Status: ${socket.id} user just connected!`);
      socket.on('disconnect', () => {
        console.log('Status: A user disconnected');
      });

      socket.on('messageToPropogate', (msg) => {
        socket.broadcast.emit('messageToBeDisplayed', msg);
      });
    });
    res.end();
  }
}
