<template>
    <div class="initial-card">
      <div class="card">
        <div class="settings-title">Initial Card</div>
  
        <div class="weather-icons">
            <div class="sun-icon-container">
            <svg-icon
                type="mdi"
                :path="iconPaths.sun"
                class="sun-icon"
                @click="addUserLocation"
            />
            </div>
        </div>
        <div class="add-city">
            
          <input
            v-model="userLocation"
            placeholder="Enter your location"
            class="city-input"
            @focus="inputFocused = true"
            @blur="inputFocused = false"
          />
          <svg-icon
            type="mdi"
            :path="iconPaths.plus"
            class="add-icon"
            @click="addUserLocation"
          />
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiPlusBoxOutline, mdiWeatherSunset  } from '@mdi/js';
import { useStore } from 'vuex';

const store = useStore();
const userLocation = ref('');
const inputFocused = ref(false);

const iconPaths = {
    plus: mdiPlusBoxOutline,
    sun: mdiWeatherSunset ,
};


const addUserLocation = () => {
if (userLocation.value) {
    const newLocation = {
    id: Date.now(),
    name: userLocation.value,
    };
    store.commit('ADD_CITY', newLocation);
    localStorage.setItem('weatherAppData', JSON.stringify([newLocation]));
    userLocation.value = '';
}
};
</script>
  
  
<style scoped>
.settings {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: auto;
    color: #444746da;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.card {
    width: 200px;
    min-height: 250px;
    padding: 10px;
    background-color: #ffffffc9;
    border-radius: 10px;
    box-shadow: 2px 2px 4px 2px rgba(70, 62, 54, 0.1);
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: auto; 
}

.settings-title {
    display: flex;
    justify-content: space-between;
    align-items: center; 
    padding: 5px;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    margin-top: -5px;
}


.add-city {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 300px; 
    margin-top: 10px; 
}

.city-input {
    flex: 1;
    height: 10px;
    width: calc(100% - 50px);
    padding: 8px; 
    font-size: 14px;
    border: 1px solid #ccc; 
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s ease-in-out;
}

.city-input:focus {
    border-color: #666666ab;
    border-width: 1px;
    box-shadow: inset  0 0 2px rgba(0, 0, 0, 0.2);
}

.add-icon {
    cursor: pointer;
    color: #444746da;
    margin-left: 7px;
    transition: opacity 0.3s ease-in-out;
    opacity: 0.8;
}

.add-icon:hover {
    opacity: 1;
}

.weather-icons {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
}

.sun-icon-container {
  width: 60px; 
  height: 60px; 
}

.sun-icon {
  color: #a11d16da;
  width: 100%;
  height: 100%;
}



</style>
    