<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount  } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  const storedData = localStorage.getItem('weatherAppData');

  if (storedData) {
    store.commit('SET_CITY_LIST', JSON.parse(storedData));
  }
});

onBeforeUnmount(() => {
  localStorage.setItem('weatherAppData', JSON.stringify(store.getters.getCityList));
});
</script>

<style>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
