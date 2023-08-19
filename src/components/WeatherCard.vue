<template>
    <div class="weather-widget">
        <div class="card">
        
        <div class="block1 common-row">
            
            <div>
                {{ locationName }}
            </div>
          
        </div>
        <div class="block2 common-row">
            <img :src="getWeatherIconUrl(icon)" class="weather-icon" />
            <div class="temperature">{{ temperature }}°C</div>
        </div>
        <div class="block3 common-row">
            Feels like {{ feelsLike }}°C. {{ weatherDescription }}. {{ windClassification }}
        </div>
        <div class="misc-info">
            <div class="block4">
                <div class="icon-alignment">
                    <div class="tooltip">
                    <svg-icon
                    type="mdi"
                    :path="iconPaths.windspeed"
                    class="icon-scale"
                    />
                    <div class="tooltip-text">Wind Speed</div>
                    </div>
                    <div>{{ windSpeed }} m/s</div>
                </div>
                <div class="icon-alignment">
                    <div class="tooltip" @mouseover="hovered = true" @mouseout="hovered = false">
                    <svg-icon
                    type="mdi"
                    :path="iconPaths.arrow"
                    class="wind-icon"
                    :style="{
                        '--rotation': `${windDirection}deg`,
                        transform: `rotate(var(--rotation)) scale(${hovered ? 1.2 : 1})`,
                    }"
                    />
                    <div class="tooltip-text">Wind Direction</div>
                    </div>
                    <div> {{ windDirectionText }}</div>
                </div>
                
                <div class="icon-alignment">
                    <div class="tooltip">
                    <svg-icon
                    type="mdi"
                    :path="iconPaths.visibility"
                    class="icon-scale"
                    />
                    <div class="tooltip-text">Visibility</div>
                    </div>
                        {{ visibility }} km
                </div>
                </div>

                <div class="block5">
                    <div class="icon-alignment">
                        <div class="tooltip">
                            <svg-icon
                                type="mdi"
                                :path="iconPaths.pressure"
                                class="icon-scale tooltip-icon"
                            />
                            <div class="tooltip-text">Pressure</div>
                        </div>
                        {{ pressure }} hPa
                    </div>
                <div class="icon-alignment">
                    <div class="tooltip">
                        <svg-icon
                        type="mdi"
                        :path="iconPaths.dewpoint"
                        class="icon-scale"
                        />
                        <div class="tooltip-text">Dew Point</div>
                    </div>
                    {{ dewPoint }}°C</div>
                    <div class="icon-alignment">
                    <div class="tooltip">
                    <svg-icon
                        type="mdi"
                        :path="iconPaths.humidity"
                        class="icon-scale tooltip-icon"
                    />
                    <div class="tooltip-text">Humidity</div>
                    </div>
                    {{ humidity }}%
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
  
  
<script setup>
import { ref, onMounted, computed, defineProps  } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import {
    mdiNavigation,
    mdiCloudPercentOutline,
    mdiEyeOutline,
    mdiCarBrakeLowPressure,
    mdiWaterThermometerOutline,
    mdiWindPowerOutline,
    mdiCogOutline,
} from '@mdi/js';

// Properties received from outside of current component
const props = defineProps({
  cityName: String, 
});

// Constants
const apiKey = 'a0dc6f23445e967cc838a843a7400829';

// Data
const locationName = ref('');
const temperature = ref('');
const icon = ref('');
const windSpeed = ref('');
const windDirection = ref('');
const pressure = ref('');
const humidity = ref('');
const dewPoint = ref('');
const visibility = ref('');
const feelsLike = ref('');
const weatherMain = ref('');
const weatherDescription = ref('');

// Icons
const getWeatherIconUrl = (iconCode) => {
    const iconBaseUrl = 'http://openweathermap.org/img/w/';
    return `${iconBaseUrl}${iconCode}.png`;
};

const iconPaths = {
    arrow: mdiNavigation,
    humidity: mdiCloudPercentOutline,
    visibility: mdiEyeOutline,
    pressure: mdiCarBrakeLowPressure,
    dewpoint: mdiWaterThermometerOutline,
    windspeed: mdiWindPowerOutline,
    gear: mdiCogOutline,
};

// Weather calculations
const updateWeatherData = (dataWeather) => {
    locationName.value = `${dataWeather.name}, ${dataWeather.sys.country}`;
    temperature.value = (dataWeather.main.temp - 273.15).toFixed(0);
    icon.value = dataWeather.weather[0].icon;
    windSpeed.value = dataWeather.wind.speed;
    windDirection.value = dataWeather.wind.deg;
    pressure.value = dataWeather.main.pressure;
    humidity.value = dataWeather.main.humidity;
    dewPoint.value = (temperature.value - ((100 - dataWeather.main.humidity) / 5)).toFixed(0);
    visibility.value = (dataWeather.visibility / 1000).toFixed(1);
    feelsLike.value = (dataWeather.main.feels_like - 273.15).toFixed(0);
    weatherMain.value = dataWeather.weather[0].main;
    weatherDescription.value = dataWeather.weather[0].description.charAt(0).toUpperCase() + dataWeather.weather[0].description.slice(1);
};

// Wind definitions and classifications
const windDirections = [
    { range: [348.75, 11.25], text: "North" },
    { range: [11.25, 33.75], text: "NNE" },
    { range: [33.75, 56.25], text: "NE" },
    { range: [56.25, 78.75], text: "ENE" },
    { range: [78.75, 101.25], text: "East" },
    { range: [101.25, 123.75], text: "ESE" },
    { range: [123.75, 146.25], text: "SE" },
    { range: [146.25, 168.75], text: "SSE" },
    { range: [168.75, 191.25], text: "South" },
    { range: [191.25, 213.75], text: "SSW" },
    { range: [213.75, 236.25], text: "SW" },
    { range: [236.25, 258.75], text: "WSW" },
    { range: [258.75, 281.25], text: "West" },
    { range: [281.25, 303.75], text: "WNW" },
    { range: [303.75, 326.25], text: "NW" },
    { range: [326.25, 348.75], text: "NNW" },
    { range: [0, 361], text: "North" },
];

const windDirectionText = computed(() => {
    const matchedDirection = windDirections.find(({ range }) => {
    const [start, end] = range;
    return windDirection.value >= start && windDirection.value < end;
});
return matchedDirection ? matchedDirection.text : "Unknown";
});

const windSpeedClassifications = [
    { range: [0, 0.5], classification: "Calm" },
    { range: [0.5, 1.5], classification: "Light air" },
    { range: [1.5, 3.3], classification: "Light breeze" },
    { range: [3.3, 5.5], classification: "Gentle breeze" },
    { range: [5.5, 7.9], classification: "Moderate breeze" },
    { range: [7.9, 10.7], classification: "Fresh breeze" },
    { range: [10.7, 13.8], classification: "Strong breeze" },
    { range: [13.8, 17.1], classification: "Moderate gale" },
    { range: [17.1, 20.7], classification: "Fresh gale" },
    { range: [20.7, 24.4], classification: "Strong gale" },
    { range: [24.4, 28.4], classification: "Whole gale" },
    { range: [28.4, 32.6], classification: "Storm" },
    { range: [32.6, Infinity], classification: "Hurricane" },
];

const windClassification = computed(() => {
const matchedClassification = windSpeedClassifications.find(({ range }) => {
const [start, end] = range;
return windSpeed.value >= start && windSpeed.value < end;
});
return matchedClassification ? matchedClassification.classification : "Unknown";
});

// Function that use the props value (city name), send it to the API
// to get the coordinates (lat, lon), after that send the request to get weather data using
// that coordinates
const getWeatherByLocation = async () => {
    try {
        const urlCity = `http://api.openweathermap.org/geo/1.0/direct?q=${props.cityName}&limit=1&appid=${apiKey}`;
        const responseCity = await fetch(urlCity);
        const dataCity = await responseCity.json();

        const lat = dataCity[0].lat;
        const lon = dataCity[0].lon;

        const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const weatherResponse = await fetch(urlWeather);
        const dataWeather = await weatherResponse.json();

        updateWeatherData(dataWeather);
    } catch (error) {
        console.error(error);
    }
};

const hovered = ref(false);

// Lifecycle hook
onMounted(async () => {
    await getWeatherByLocation();
});
</script>
  

<style scoped>
.weather-widget {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: auto;
    color: #444746da;
}

.card {
    width: 200px;
    height: 290px; 
    padding: 10px;
    background-color: #ffffffc9;
    border-radius: 10px;
    box-shadow: 2px 2px 4px 2px rgba(70, 62, 54, 0.1);
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.block1 {
    display: flex;
    justify-content: space-between;
    align-items: center; 
    padding: 5px;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    margin-top: -5px;
}

.block2 {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 0;
    padding: 5px;
    border-radius: 10px;
    margin-right: 50px;
    margin-top: -5px;
}

.block4,
.block5 {
    width: 100%; 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 10px;
    color: #444746da;
    font-size: 12px;
}



.weather-icon {
    scale:110%;
    padding-top: 7px;
}



.icon-alignment {
    display: flex;
    align-items: center;
}

.icon-scale {
    scale:100%;
    transition: transform 0.3s ease-in-out;
}

.icon-scale:hover {
    transform: scale(1.1);
}

.temperature {
    font-size: 36px; 
    font-weight: 600;
}


.misc-info {
    display: flex; 
    justify-content: space-around;
}



.icon-alignment {
  display: flex;
  align-items: center;
}


.tooltip {
  position: relative;
  display: inline-flex; 
  align-items: center; 
  cursor: pointer;
  width: 28px;
  height: 28px;
  padding-left: 5px;
  padding-right: 5px;
}

.tooltip-text {
  visibility: hidden;
  width: 120px;
  background-color: #444746da;
  color: #ffffff;
  text-align: center;
  border-radius: 4px;
  padding: 4px;
  position: absolute;
  z-index: 1;
  bottom: 110%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

.wind-icon {
  transition: transform 0.3s ease-in-out;
}


</style>
  