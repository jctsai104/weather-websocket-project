<script setup>
import ConnectionManager from './components/ConnectionManager.vue';
import ConnectionState from './components/ConnectionState.vue';
import WeatherCard from './components/WeatherCard.vue';
</script>

<template>
  <div>
    <WeatherCard />
  </div>
  <div class="mt-16">
    <ConnectionState />
    <ConnectionManager />
  </div>
</template>

<style scoped>
</style>
