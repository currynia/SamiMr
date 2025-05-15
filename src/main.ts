import './assets/main.css'

import PrimeVue from 'primevue/config';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Aura from '@primeuix/themes/aura';

const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.use(router)

app.mount('#app')
