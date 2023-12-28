import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = "ws://localhost:3000"

export const socket = io(URL, {
  transports: ['websocket']
})

socket.on("connect", () => {
    state.connected = true;
  console.log('connect')
  socket.emit("requestData", (res) => {
    console.log(res)
  })
});

socket.on("disconnect", () => {
    state.connected = false;
    console.log('disconnect')
});

// socket.on("foo", (...args) => {
//   state.fooEvents.push(args);
// });

// socket.on("bar", (...args) => {
//   state.barEvents.push(args);
// });