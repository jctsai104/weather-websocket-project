import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import Socketio from 'socket.io';

const app = createApp(App);

// app.use(Socketio, {
//   connection: "http://localhost:3000",
// //   options: {
// //     autoConnect: false, //关闭自动连接
// //   },
// });

app.mount("#app");
