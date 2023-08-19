import { createStore } from 'vuex';

export default createStore({
  state: {
    cityList: [],
  },
  mutations: {
    SET_CITY_LIST(state, cityList) {
      state.cityList = cityList;
    },
    ADD_CITY(state, city) {
      state.cityList.push(city);
    },
    REMOVE_CITY(state, cityId) {
      state.cityList = state.cityList.filter(city => city.id !== cityId);
    },
  },
  actions: {
    setCityList({ commit }, cityList) {
      commit('SET_CITY_LIST', cityList);
    },
  },
  getters: {
    getCityList(state) {
      return state.cityList;
    },
  },
});
