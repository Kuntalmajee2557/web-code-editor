import express from "express"
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import * as nodePty from 'node-pty'
import path from 'path'
import os from "os"
import fs from 'fs/promises'
import cors from 'cors'
import chokidar from 'chokidar'


const shell = process.env['/bin/sh'] as string;
const ptyProcess = nodePty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.INIT_CWD + "/user",
    env: process.env
});


const app = express();
app.use(cors())
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

ptyProcess.onData((data) => {
    io.emit("terminal:data", data)
})

io.on('connection', (socket) => {
    console.log("socket connected", socket.id)

    socket.on("terminal:write", (data: string) => {
        ptyProcess.write(data)
    })

    socket.on("file:change", async ({path, content}) =>{
        await fs.writeFile(`./user${path}`, content);
    })
})

chokidar.watch('./user').on('all', (event, path) => {
    io.emit("file:refresh", path);
  });

app.get('/files', async (req, res) => {
    const fileTree = await generateFiles("./user");
    res.json({tree : fileTree});
})

app.get("/files/content", async (req, res) => {
    const path = req.query.path as string | undefined;
    if(path){
        const content = await fs.readFile(`./user${path}`, "utf-8");
        res.json({content})
    }
})

server.listen(3000, () => {
    console.log("listening the port 3000")
})


async function buildingTree(currentDir: string, currentTree: { [key: string]: any}) {
    const files = await fs.readdir(currentDir)

    for (const file of files) {
        const filePath = path.join(currentDir, file);
        const stat = await fs.stat(filePath)
        if (stat.isDirectory()){
            currentTree[file] = {}
            await buildingTree(filePath, currentTree[file])

        } else {
            currentTree[file] = null
        }
    }
}

async function generateFiles(directory: string) {
    const tree = {}
    await buildingTree(directory, tree);
    return tree;
}
