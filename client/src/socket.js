import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  weatherData: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = "ws://localhost:3000"

export const socket = io(URL, {
  transports: ['websocket']
})

socket.on("connect", () => {
  state.connected = true;
  console.log('client connected')

  socket.emit("requestData")
});

socket.on('requestData', (data) => {
  console.log(data)
  state.weatherData = data
});

socket.on('message', (data) => {
  console.log(data)
});

socket.on("disconnect", () => {
    state.connected = false;
    console.log('client disconnected')
});