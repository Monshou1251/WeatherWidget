<template>
    <div class="icon-scale">
      <svg-icon
      type="mdi"
      :path="currentIconPath"
      class="gear-icon"
      @click="toggleSettings"
    />
    </div>
    <div class="weather-cards-container">
      <settings-card v-if="showSettings" />
      <initial-card v-else-if="cityList.length === 0" />
      <weather-card
          v-for="city in cityList"
          :key="city.id"
          :cityName="city.name"
          v-else
      />
    </div>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon';
import {
  mdiCogOutline,
  mdiClose ,
} from '@mdi/js';
import WeatherCard from './WeatherCard.vue';
import SettingsCard from './SettingsCard.vue';
import InitialCard from './InitialCard.vue';
import { useStore } from 'vuex';


// Vuex
const store = useStore();
const cityList = computed(() => store.getters.getCityList);

// Icons
const iconPaths = {
    gear: mdiCogOutline,
    cross: mdiClose ,
};

const showSettings = ref(false);
const currentIconPath = ref(iconPaths.gear);

const toggleSettings = () => {
  showSettings.value = !showSettings.value;
  currentIconPath.value = showSettings.value ? iconPaths.cross : iconPaths.gear;
};
  
  
</script>

<style scoped>
.weather-cards-container {
  display: flex;
  flex-direction: column;
  gap: 20px; 
}

.icon-scale {
  color: #474544da;
  margin-left: 175px;
  margin-bottom: -37px;
}

.gear-icon {
  scale:100%;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.gear-icon:hover {
  transform: scale(1.1);
}
</style>
  