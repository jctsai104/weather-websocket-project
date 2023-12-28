import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import axios from "axios";
import cors from 'cors';

const app = express()
const PORT = 3000

// 啟用所有 CORS 請求
app.use(cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length', 'X-Knowledge-Count']
}));

const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173/',
        methods: ["GET", "POST"]
    }
});


io.on("connection", (socket) => {
    console.log('connected')
    socket.on("requestData", async () => {
        try {
            const response = await axios.get('https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWA-9834876D-639C-40B9-B12B-65544A0D61E0&format=JSON&StationId=467571')
            socket.emit('data', response.json());
        } catch (error) {
            socket.emit('data', { error: error.toString() });
        }

    })
    socket.on('connect_error', (error) => {
        console.log('connect_error')
    })
    socket.on("disconnect", (reason) => {
        console.log('disconnected')
    });
});

httpServer.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
});

