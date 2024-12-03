import express from "express"
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin : "*"
    }
})

io.on('connection', (socket) => {
    console.log("socket connected")
})


server.listen(3000, () => {
    console.log("listening the port 3000")
} )

