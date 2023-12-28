<template>
  <button @click="connect">Connect</button>
  <button @click="disconnect">Disconnect</button>
</template>

<script>
import { socket,state } from "../socket";

export default {
  name: "ConnectionManager",

  methods: {
    connect() {

      socket.connect();
      console.log(state.connected)
    },
    disconnect() {
      socket.disconnect();
    }
  }
}
</script>