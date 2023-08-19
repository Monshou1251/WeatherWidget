<template>
  <div class="settings">
    <div class="card">
      <div class="settings-title">Settings</div>

      <div class="city-list">
        <draggable
          class="city-draggable"
          v-model="localCityList"
          group="people"
          handle=".drag-handle"
          item-key="id"
          ghost-class="ghost"
        >
          <template #item="{ element, index }">
            <div class="city">
              <div class="city-content">
                <svg-icon
                  type="mdi"
                  :path="iconPaths.drag"
                  class="drag-icon drag-handle"
                />
                <div class="city-name">{{ element.name }}</div>
              </div>
              <svg-icon
                type="mdi"
                :path="iconPaths.bin"
                class="trash-icon"
                @click="removeCity(index)"
              />
            </div>
          </template>
        </draggable>
      </div>

      <div class="add-city">
        <input
          v-model="newCity"
          placeholder="Enter city name"
          class="city-input"
          @focus="inputFocused = true"
          @blur="inputFocused = false"
        />
        <svg-icon
          type="mdi"
          :path="iconPaths.plus"
          class="add-icon"
          @click="addCity"
        />
      </div>
    </div>
  </div>
</template>

  
<script setup>
import { ref, computed, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiTrashCanOutline, mdiPlusBoxOutline, mdiDrag  } from '@mdi/js';
import Draggable from 'vuedraggable';


// Access the Vuex store
const store = useStore();

// Get the city list from the store
const cityList = computed(() => store.getters.getCityList);

// Create a local copy of the city list
const localCityList = ref([...cityList.value]);

// Create a ref for the new city input
const newCity = ref('');

// Icon paths for SVG icons
const iconPaths = {
    bin: mdiTrashCanOutline,
    plus: mdiPlusBoxOutline,
    drag: mdiDrag,
};

// Add a city to the local city list
const addCity = () => {
  if (newCity.value) {
    const newCityItem = { id: Date.now(), name: newCity.value };
    localCityList.value.push(newCityItem);
    // Update local storage and store
    updateLocalStorageAndStore();
    newCity.value = '';
  }
};

// Remove a city from the local city list
const removeCity = (index) => {
  const removedCity = localCityList.value.splice(index, 1)[0];
  store.commit('REMOVE_CITY', removedCity.id);
  // Update local storage and store
  updateLocalStorageAndStore();
};

// Update local storage and Vuex store with the local city list
const updateLocalStorageAndStore = () => {
  localStorage.setItem('weatherAppData', JSON.stringify(localCityList.value));
  store.commit('SET_CITY_LIST', localCityList.value);
};

// Listen for the 'beforeunload' event to update local storage before the page is unloaded
window.addEventListener('beforeunload', () => {
  updateLocalStorageAndStore();
});

// Cleanup before the component is unmounted
onBeforeUnmount(() => {
  updateLocalStorageAndStore();
});
</script>


<style scoped>
.settings {
  display: flex;
  justify-content: center;
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
  /* justify-content: space-between; */
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

.city-list {
  margin-top: 10px;
  flex-grow: 1;
  margin-bottom: 20px;
}

.city {
  display: flex;
  align-items: center;
  justify-content: space-between; 
  margin-bottom: 5px;
  background-color: #58625f16;
  padding: 5px;
  font-weight: 600;
}
.city-content {
  display: flex;
  align-items: center;
}
.city-name {
  margin-left: 5px; 
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

.trash-icon {
  cursor: pointer;
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
  opacity: 0.8;
  transform: scale(0.9);
}

.trash-icon:hover {
  opacity: 1;
  transform: scale(1);
  outline: none; 
}

.drag-icon {
  cursor: pointer;
  transition:  opacity 0.3s ease-in-out;
  opacity: 0.8;
  
}

.drag-icon:hover {
  opacity: 1;
  outline: none; 
}


</style>
  