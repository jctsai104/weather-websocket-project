<template>
    <div>
        <div class="flex flex-col gap-4 p-8 m-4 border border-gray-100 rounded-md bg-white bg-opacity-35 backdrop-blur-md">          
            <div class="flex justify-between items-center">
                <div class="grid gap-1 text-sm">
                    <p>{{ location.countyName }}</p> 
                    <p>{{ location.townName }}</p>
                </div>
                <h4 class="text-2xl">{{ weatherelements.temperature }}°C</h4>
                
            </div>
            <div>
                <i class="fi text-3xl" :class="iconClass"></i>
                <h3>{{ weatherelements.weather }}</h3>
            </div>
            <div class="flex items-center mx-auto">
                <p>風速 {{ weatherelements.windspeed }}</p>
                <i class="fi fi-rr-wind text-lg text-center ml-1"></i>
            </div>
        </div>
        <div class="p-2 text-sm text-[#e4dfda]">
            <p>{{ dailyTemp.high }}°C / {{ dailyTemp.low }}°C</p>
        </div>
    </div>
</template>

<script setup>

import { socket, state } from "../socket"
import { computed, onMounted, ref } from "vue";

const getData = () => {
    socket.connect()
    console.log(state.weatherData)
}
onMounted(() => {
    getData()
})

const location = computed(() => {
    return {
        countyName: state.weatherData?.GeoInfo?.CountyName,
        townName: state.weatherData?.GeoInfo?.TownName
    }
})

const weatherelements = computed(() => {
    return {
        weather: state.weatherData.WeatherElement?.Weather,
        temperature: state.weatherData.WeatherElement?.AirTemperature,
        windspeed: state.weatherData.WeatherElement?.WindSpeed
    }
})

const dailyTemp = computed(() => {
    return {
        high: state.weatherData.WeatherElement?.DailyExtreme.DailyHigh.TemperatureInfo.AirTemperature,
        high_dateTime: state.weatherData.WeatherElement?.DailyExtreme.DailyHigh.TemperatureInfo.Occurred_at.DateTime,
        low: state.weatherData.WeatherElement?.DailyExtreme.DailyLow.TemperatureInfo.AirTemperature,
        low_dateTime: state.weatherData.WeatherElement?.DailyExtreme.DailyLow.TemperatureInfo.Occurred_at.DateTime,
    }
})

const iconClass = computed(() => {
  const weather = state.weatherData.WeatherElement?.Weather
  if (!weather) return '';
  const weatherToIconMap = {
    '陰': 'fi-rr-cloud',
    '雲': 'fi-rr-cloud',
    '晴': 'fi-rr-brightness',
    '雨': 'fi-rr-cloud-showers-heavy',
    '霧': 'fi-rr-cloud-showers-heavy',
  };

  for (const [key, icon] of Object.entries(weatherToIconMap)) {
    if (weather.includes(key)) {
      return icon;
    }
  }

  return ''; // Default icon if no match
})

</script>