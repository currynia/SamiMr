import './assets/main.css';
import 'primeicons/primeicons.css';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { theme } from './theme';


const app = createApp(App);
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (prefersDark) {
  document.documentElement.classList.add('my-app-dark');
}

app.use(PrimeVue, {
  theme
});

app.use(router);

app.mount('#app');


