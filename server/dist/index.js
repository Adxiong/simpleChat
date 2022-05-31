"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Description:
 * @version:
 * @Author: Adxiong
 * @Date: 2022-05-31 20:53:16
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-05-31 23:04:38
 */
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['post', 'get'],
    }
});
io.on("connection", (socket) => {
    socket.on("join_room", (data) => {
        console.log(`${data} ----- join room ${JSON.parse(data).room}`);
        socket.join(JSON.parse(data).room);
    });
    socket.on("send_message", (data) => {
        console.log(`message ===> ${data}`);
        console.log(JSON.parse(data).room);
        socket.to(JSON.parse(data).room).emit("receive_message", data);
    });
    socket.on("disconnect", () => {
        console.log(`disconnect-----${socket.id}`);
    });
});
server.listen(3001, () => {
    console.log('server is running on port 3001');
});
