import * as dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

const app = express();
const server = http.createServer(app);
const io: Server = new Server(server);

io.on('connection', async (socket) => {
  console.log('New client connected');
  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', message);
  });
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
