import { createRouter, createWebHistory } from 'vue-router';
import WeatherCardList from '@/components/WeatherCardList.vue'; 

const routes = [
    {
        path: "/",
        name: "main",
        component: WeatherCardList,
    },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
