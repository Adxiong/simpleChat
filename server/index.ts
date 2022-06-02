/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-05-31 20:53:16
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-06-02 14:29:19
 */
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import {Server, Socket} from 'socket.io'
const api = require('./api/api');

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/api', api)

const server = http.createServer(app) 
const io = new Server(server, {
  cors:{
    origin:"https://simple-chat-client.vercel.app",
    methods: ['post', 'get'],
  }
})



io.on("connection", (socket: Socket) => {

  socket.on("join_room", (data)=>{
    console.log(`${data} ----- join room ${JSON.parse(data).room}`)

    socket.join(JSON.parse(data).room)
  })

  socket.on("send_message", (data) => {
    console.log(`message ===> ${data}`)    
    socket.to(JSON.parse(data).room).emit("receive_message", data)
  })

  socket.on("disconnect", () => {
    console.log(`disconnect-----${socket.id}`);
  })
})


server.listen(3001, () => {
    console.log('server is running on port 3001')
})