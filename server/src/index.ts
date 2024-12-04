import express from "express"
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import * as nodePty from 'node-pty'
import os from "os"

const shell = process.env['/bin/sh'] as string;
const ptyProcess = nodePty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.INIT_CWD || process.cwd(),
    env: process.env
  });


const app = express();
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin : "*"
    }
})

ptyProcess.onData((data) => {
    io.emit("terminal:data", data)
})

io.on('connection', (socket) => {
    console.log("socket connected", socket.id)

    socket.on("terminal:write", (data: string) => {
        ptyProcess.write(data + "\r")
    })
})


server.listen(3000, () => {
    console.log("listening the port 3000")
} )

