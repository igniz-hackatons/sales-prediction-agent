import PrimeVue from 'primevue/config';
import { createApp } from 'vue';

import App from './App.vue';
import { ThemePreset } from './assets/ThemePreset';
import router from './router';

import './assets/index.css';

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: ThemePreset,
    options: {
      darkModeSelector: '.dark',
      order: 'reset, primevue, custom'
    }
  }
});

app.mount('#app');
