<template>
    <div>
        <h1>Location</h1>
        <div>
            <i class="fi fi-rr-brightness text-3xl"></i>
        </div>
        <div>
            <h4>Today's Weather</h4>
        </div>
        <div>
            <h4>temperature</h4>
        </div>
        {{ data }}
    </div>
</template>

<script setup>

import { socket, state } from "../socket"
import { computed, onMounted } from "vue";

const data = computed(() => {
    return state.weatherData
})

const getData = () => {
    socket.connect()
    console.log(state.weatherData)
}

onMounted(() => {
    getData()
})
// import { ref, onMounted } from 'vue';

// const data = ref(null);

// onMounted(() => {
//   fetchData();
// });

// function fetchData() {
//   fetch('https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWA-9834876D-639C-40B9-B12B-65544A0D61E0&format=JSON&StationId=467571')
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(jsonData => {
//       data.value = jsonData.records;
//     })
//     .catch(error => {
//       console.error('There was a problem with the fetch operation:', error);
//     });
// }

</script>