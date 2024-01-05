<script setup>
import ConnectionManager from './components/ConnectionManager.vue';
import ConnectionState from './components/ConnectionState.vue';
import WeatherCard from './components/WeatherCard.vue';
</script>

<template>
  <div>
    <div>
      <div>
        <h4 class="font-bold text-2xl text-[#d4b483]">Today's Weather</h4>
      </div>
      <WeatherCard />
    </div>
    <div class="mt-16">
      <ConnectionState />
      <ConnectionManager />
    </div>
  </div>
</template>

<style scoped>
</style>
