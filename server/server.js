import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import axios from "axios";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWA-9834876D-639C-40B9-B12B-65544A0D61E0&format=JSON&StationId=C0D660'
    }
});
const PORT = 3000

// app.get('/api/data', async (req, res) => {
//     try {
//         const response = await Axios.get('https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001', {
//             params: {
//                 Authorization: 'CWA-9834876D-639C-40B9-B12B-65544A0D61E0',
//                 format: 'JSON',
//                 StationId: 'C0D660'
//             }
//         });
//         res.json(response.data);
//         console.log(res)
//     } catch (error) {
//         res.status(500).send(error.toString());
//     }
// });

io.on("connection", (socket) => {
    console.log('connected')
    // console.log(socket)
    socket.on("requestData", async () => {
        try {
            const response = await axios.get('https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001', {
                params: {
                    Authorization: 'CWA-9834876D-639C-40B9-B12B-65544A0D61E0',
                    format: 'JSON',
                    StationId: 'C0D660'
                }
            });
            socket.emit('data', response.data);
        } catch (error) {
            socket.emit('data', { error: error.toString() });
        }

    })
    socket.on("disconnect", (reason) => {
        console.log('disconnected')
    });
});

httpServer.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
});